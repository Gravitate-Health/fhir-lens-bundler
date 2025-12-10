import { Args, Command, Flags } from '@oclif/core'
import * as fs from 'node:fs'
import inquirer from 'inquirer';
import ora from 'ora'

import { changeSpinnerText, stopAndPersistSpinner } from '../controllers/spinner-controller.js'
import { LensFhirResource } from '../models/lens-fhir-resource.js'

const spinner = ora();
const LENS_TEMPLATE_URL = 'https://raw.githubusercontent.com/Gravitate-Health/lens-template/refs/heads/main/my-lens.js';

export default class New extends Command {
  static args = {
    name: Args.string({ description: 'name of the lens to create', required: true }),
  }

  static description = 'Creates a new lens with JavaScript file and FHIR bundle.'

  static examples = [
    '<%= config.bin %> <%= command.id %> MyLens',
    '<%= config.bin %> <%= command.id %> MyLens -d',
  ]

  static flags = {
    default: Flags.boolean({ char: 'd', description: 'use default values for the bundle', required: false }),
    force: Flags.boolean({ char: 'f', description: 'overwrite existing files if they exist', required: false }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(New);

    spinner.start('Starting process...');

    // Check if files already exist (unless force flag is set)
    if (!flags.force) {
      const jsFileName = `${args.name}.js`;
      const bundleFileName = `${args.name}.json`;
      
      if (fs.existsSync(jsFileName)) {
        spinner.fail(`File ${jsFileName} already exists. Use --force (-f) to overwrite.`);
        return;
      }
      
      if (fs.existsSync(bundleFileName)) {
        spinner.fail(`File ${bundleFileName} already exists. Use --force (-f) to overwrite.`);
        return;
      }
    }

    // Fetch template from URL
    changeSpinnerText('Fetching lens template from repository...', spinner);
    let lensTemplate: string;
    try {
      lensTemplate = await this.fetchLensTemplate();
      stopAndPersistSpinner('Lens template fetched successfully', spinner);
    } catch (error) {
      spinner.fail(`Error fetching lens template: ${error}`);
      throw error;
    }

    if (flags.default) this.createLensWithDefaults(args.name, lensTemplate);
    else this.createLensInteractive(args.name, lensTemplate);
  }

  private async fetchLensTemplate(): Promise<string> {
    try {
      const response = await fetch(LENS_TEMPLATE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      throw new Error(`Failed to fetch lens template: ${error}`);
    }
  }

  private createLensWithDefaults(name: string, lensTemplate: string): void {
    changeSpinnerText('Creating new lens with default values', spinner);
    
    // Create JavaScript file
    const jsFileName = `${name}.js`;
    changeSpinnerText(`Creating JavaScript file: ${jsFileName}`, spinner);
    try {
      fs.writeFileSync(jsFileName, lensTemplate);
      stopAndPersistSpinner(`JavaScript file created: ${jsFileName}`, spinner);
    } catch (error) {
      spinner.fail(`Error creating JavaScript file: ${error}`);
      throw error;
    }

    // Convert template to base64
    changeSpinnerText('Converting template to base64...', spinner);
    const base64FileData = this.stringTobase64(lensTemplate);
    stopAndPersistSpinner('Template converted to base64', spinner);

    // Create FHIR bundle
    changeSpinnerText(`Creating FHIR bundle: ${name}`, spinner);
    const bundle = LensFhirResource.defaultValues(name, base64FileData);
    const bundleJson = JSON.stringify(bundle, null, 2);
    const bundleFileName = `${name}.json`;
    
    try {
      fs.writeFileSync(bundleFileName, bundleJson);
      stopAndPersistSpinner(`FHIR bundle created: ${bundleFileName}`, spinner);
    } catch (error) {
      spinner.fail(`Error creating FHIR bundle: ${error}`);
      throw error;
    }

    spinner.stopAndPersist({
      symbol: '⭐',
      text: `Lens created successfully: ${jsFileName} and ${bundleFileName}`,
    });
  }

  private createLensInteractive(name: string, lensTemplate: string): void {
    changeSpinnerText('Creating new lens', spinner);
    
    // Create JavaScript file first
    const jsFileName = `${name}.js`;
    changeSpinnerText(`Creating JavaScript file: ${jsFileName}`, spinner);
    try {
      fs.writeFileSync(jsFileName, lensTemplate);
      stopAndPersistSpinner(`JavaScript file created: ${jsFileName}`, spinner);
    } catch (error) {
      spinner.fail(`Error creating JavaScript file: ${error}`);
      throw error;
    }

    // Convert template to base64
    changeSpinnerText('Converting template to base64...', spinner);
    const base64FileData = this.stringTobase64(lensTemplate);
    stopAndPersistSpinner('Template converted to base64', spinner);

    // Ask for bundle metadata
    inquirer.prompt([
      {
        default: name,
        message: 'Enter the name of the lens:',
        name: 'name',
        type: 'input',
      },
      {
        message: 'Enter a description for the lens:',
        name: 'description',
        type: 'input',
      },
      {
        message: 'Enter the usage of the lens:',
        name: 'usage',
        type: 'input',
      },
      {
        message: 'Enter the purpose of the lens:',
        name: 'purpose',
        type: 'input',
      }
    ]).then((answers) => {
      changeSpinnerText(`Creating FHIR bundle: ${answers.name}`, spinner);
      const bundle = LensFhirResource.interactiveValues(
        answers.name,
        answers.description,
        answers.purpose,
        answers.usage,
        base64FileData
      );
      
      const bundleJson = JSON.stringify(bundle, null, 2);
      const bundleFileName = `${answers.name}.json`;
      
      try {
        fs.writeFileSync(bundleFileName, bundleJson);
        stopAndPersistSpinner(`FHIR bundle created: ${bundleFileName}`, spinner);
        spinner.stopAndPersist({
          symbol: '⭐',
          text: `Lens created successfully: ${jsFileName} and ${bundleFileName}`,
        });
      } catch (error) {
        spinner.fail(`Error creating FHIR bundle: ${error}`);
        throw error;
      }
    });
  }

  private stringTobase64(str: string): string {
    try {
      return Buffer.from(str, 'binary').toString('base64');
    } catch (error) {
      console.log('Error converting string to base64:', error);
      throw error;
    }
  }
}
