import { Args, Command, Flags } from '@oclif/core'
import * as path from 'node:path'

const dirController = require('../controllers/dir-controller.js');

export default class Lslens extends Command {
  static args = {
    directory: Args.string({ 
      description: 'directory to search for lenses', 
      required: false,
      default: '.'
    }),
  }

  static description = 'List valid FHIR lenses in a directory (similar to ls).'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> ./lenses',
    '<%= config.bin %> <%= command.id %> -a',
    '<%= config.bin %> <%= command.id %> -v',
    '<%= config.bin %> <%= command.id %> ./lenses | xargs -I {} echo "Processing: {}"',
  ]

  static flags = {
    all: Flags.boolean({ 
      char: 'a', 
      description: 'include lenses that may be missing content (base64 data)', 
      required: false 
    }),
    validate: Flags.boolean({ 
      char: 'v', 
      description: 'include full validation report for each lens', 
      required: false 
    }),
    json: Flags.boolean({ 
      char: 'j', 
      description: 'output as JSON format', 
      required: false 
    }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Lslens);

    const directory = path.resolve(args.directory);

    try {
      const lenses = await dirController.discoverLenses(directory);

      if (lenses.length === 0) {
        if (!flags.json) {
          this.log('No valid lenses found.');
        }
        return;
      }

      // Filter lenses based on flags
      let filteredLenses = lenses;
      
      if (!flags.all) {
        // Only include fully-fledged lenses (those with base64 content)
        filteredLenses = lenses.filter((lens: any) => lens.hasBase64);
      }

      if (flags.json) {
        // Output as JSON for programmatic use
        this.outputJson(filteredLenses, flags.validate);
      } else if (flags.validate) {
        // Output with full validation report
        this.outputWithValidation(filteredLenses);
      } else {
        // Simple output - just file paths (useful for xargs)
        this.outputSimple(filteredLenses);
      }
    } catch (error: any) {
      this.error(`Error listing lenses: ${error.message}`);
    }
  }

  private outputSimple(lenses: any[]): void {
    // Output just the file paths, one per line (ideal for xargs)
    for (const lens of lenses) {
      this.log(lens.path);
    }
  }

  private outputWithValidation(lenses: any[]): void {
    for (const lens of lenses) {
      this.log(`\n${'='.repeat(60)}`);
      this.log(`File: ${lens.path}`);
      this.log(`Name: ${lens.name}`);
      this.log(`URL: ${lens.url}`);
      this.log(`Version: ${lens.version}`);
      this.log(`Status: ${lens.status}`);
      this.log(`Has Base64 Content: ${lens.hasBase64 ? 'Yes' : 'No'}`);
      
      if (lens.enhancedWithJs) {
        this.log(`Enhanced with JS: ${lens.enhancedWithJs}`);
        this.log(`Enhancement Source: ${lens.enhanceSource}`);
      }

      // Validate the lens
      const validation = dirController.validateFHIRLens(lens.lens);
      
      this.log(`\nValidation:`);
      this.log(`  Valid: ${validation.isValid ? 'Yes' : 'No'}`);
      
      if (validation.errors.length > 0) {
        this.log(`  Errors:`);
        for (const error of validation.errors) {
          this.log(`    - ${error}`);
        }
      } else {
        this.log(`  No validation errors`);
      }
    }
    
    this.log(`\n${'='.repeat(60)}`);
    this.log(`Total lenses found: ${lenses.length}`);
  }

  private outputJson(lenses: any[], includeValidation: boolean): void {
    const output = lenses.map((lens: any) => {
      const result: any = {
        path: lens.path,
        name: lens.name,
        url: lens.url,
        version: lens.version,
        status: lens.status,
        hasBase64: lens.hasBase64,
      };

      if (lens.enhancedWithJs) {
        result.enhancedWithJs = lens.enhancedWithJs;
        result.enhanceSource = lens.enhanceSource;
      }

      if (includeValidation) {
        const validation = dirController.validateFHIRLens(lens.lens);
        result.validation = {
          isValid: validation.isValid,
          errors: validation.errors,
        };
      }

      return result;
    });

    this.log(JSON.stringify(output, null, 2));
  }
}
