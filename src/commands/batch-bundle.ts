import { Args, Command, Flags } from '@oclif/core'
import * as fs from 'node:fs'
import * as path from 'node:path'
import ora from 'ora'

import * as dirController from '../controllers/dir-controller.js'
import { changeSpinnerText, stopAndPersistSpinner } from '../controllers/spinner-controller.js'

const spinner = ora();

interface BatchResult {
  processed: number;
  skipped: number;
  updated: number;
  errors: number;
  details: Array<{
    file: string;
    action: 'updated' | 'skipped' | 'error';
    reason: string;
  }>;
}

export default class BatchBundle extends Command {
  static args = {
    directory: Args.string({ 
      description: 'directory containing lenses to bundle', 
      required: false,
      default: '.'
    }),
  }

  static description = 'Batch process and bundle multiple lenses in a directory.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> ./lenses',
    '<%= config.bin %> <%= command.id %> ./lenses --skip-valid',
    '<%= config.bin %> <%= command.id %> ./lenses --skip-date',
    '<%= config.bin %> <%= command.id %> ./lenses --exclude "test.*"',
  ]

  static flags = {
    'skip-valid': Flags.boolean({ 
      char: 's', 
      description: 'skip lenses that already have valid base64 content', 
      required: false 
    }),
    'skip-date': Flags.boolean({ 
      char: 'd', 
      description: 'do not update the date field when bundling', 
      required: false 
    }),
    exclude: Flags.string({ 
      char: 'e', 
      description: 'regex pattern to exclude files (applied to filename)', 
      required: false 
    }),
    force: Flags.boolean({ 
      char: 'f', 
      description: 'force bundle all lenses even if content is up to date', 
      required: false 
    }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(BatchBundle);

    const directory = path.resolve(args.directory);
    const skipValid = flags['skip-valid'] || false;
    const skipDate = flags['skip-date'] || false;
    const excludePattern = flags.exclude ? new RegExp(flags.exclude) : null;
    const force = flags.force || false;

    spinner.start('Starting batch bundle process...');

    try {
      // Check if directory exists
      if (!fs.existsSync(directory)) {
        spinner.fail(`Directory does not exist: ${directory}`);
        return;
      }

      changeSpinnerText('Discovering lenses...', spinner);
      const lenses = await dirController.discoverLenses(directory);
      const enhanceFiles = dirController.findEnhanceFiles(directory);
      
      stopAndPersistSpinner(`Found ${lenses.length} lens(es)`, spinner);

      if (lenses.length === 0) {
        spinner.info('No lenses found to process.');
        return;
      }

      const result: BatchResult = {
        processed: 0,
        skipped: 0,
        updated: 0,
        errors: 0,
        details: []
      };

      // Build exclude regex if provided
      let excludeRegex: RegExp | null = null;
      if (excludePattern) {
        try {
          excludeRegex = new RegExp(excludePattern.source);
        } catch (error: any) {
          spinner.fail(`Invalid exclude regex: ${error.message}`);
          return;
        }
      }

      // Process each lens
      for (const lens of lenses) {
        const fileName = path.basename(lens.path);
        
        // Check if file should be excluded
        if (excludeRegex && excludeRegex.test(fileName)) {
          result.skipped++;
          result.details.push({
            file: lens.path,
            action: 'skipped',
            reason: 'Matched exclude pattern'
          });
          continue;
        }

        // Check if lens already has valid content and skip-valid flag is set (unless force is true)
        if (!force && skipValid && lens.hasBase64) {
          // Check if it was enhanced or already had content
          if (!lens.enhancedWithJs) {
            result.skipped++;
            result.details.push({
              file: lens.path,
              action: 'skipped',
              reason: 'Already has valid base64 content'
            });
            continue;
          }
        }

        try {
          // Determine which JS file to use
          let jsFile = enhanceFiles.exact[lens.path];
          let enhanceSource = 'exact-match';

          if (!jsFile) {
            const fileDir = path.dirname(lens.path);
            const fallbackFiles = enhanceFiles.fallback[fileDir];
            if (fallbackFiles && fallbackFiles.length > 0) {
              jsFile = fallbackFiles[0];
              enhanceSource = 'fallback';
            }
          }

          if (!jsFile) {
            result.skipped++;
            result.details.push({
              file: lens.path,
              action: 'skipped',
              reason: 'No corresponding JS file found'
            });
            continue;
          }

          // Read the JS file and convert to base64
          const jsContent = fs.readFileSync(jsFile, 'utf8');
          const base64Content = Buffer.from(jsContent, 'binary').toString('base64');

          // Check if content needs update
          const currentContent = lens.lens.content?.[0]?.data;
          const needsUpdate = currentContent !== base64Content;

          if (!needsUpdate && flags['skip-valid']) {
            result.skipped++;
            result.details.push({
              file: lens.path,
              action: 'skipped',
              reason: 'Content already up to date'
            });
            continue;
          }

          // Update the lens
          lens.lens.content = lens.lens.content || [];
          if (lens.lens.content.length === 0) {
            lens.lens.content.push({});
          }
          lens.lens.content[0].contentType = 'application/javascript';
          lens.lens.content[0].data = base64Content;

          // Update date unless skip-date flag is set
          if (!skipDate) {
            lens.lens.date = new Date().toISOString();
          }

          // Write the updated lens back to file
          const lensJson = JSON.stringify(lens.lens, null, 2);
          fs.writeFileSync(lens.path, lensJson);

          result.updated++;
          result.processed++;
          result.details.push({
            file: lens.path,
            action: 'updated',
            reason: `Bundled with ${enhanceSource} JS: ${jsFile}`
          });

          this.log(`✓ Updated: ${fileName}`);
        } catch (error: any) {
          result.errors++;
          result.processed++;
          result.details.push({
            file: lens.path,
            action: 'error',
            reason: error.message
          });
          this.log(`✗ Error: ${fileName} - ${error.message}`);
        }
      }

      // Display summary
      spinner.stopAndPersist({
        symbol: '⭐',
        text: 'Batch bundle complete',
      });

      this.log('\n' + '='.repeat(60));
      this.log('Summary:');
      this.log(`  Total lenses found: ${lenses.length}`);
      this.log(`  Updated: ${result.updated}`);
      this.log(`  Skipped: ${result.skipped}`);
      this.log(`  Errors: ${result.errors}`);
      this.log('='.repeat(60));

    } catch (error: any) {
      spinner.fail(`Error during batch bundle: ${error.message}`);
      this.error(error);
    }
  }
}
