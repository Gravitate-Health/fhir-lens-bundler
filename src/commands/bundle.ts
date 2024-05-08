import { Args, Command, Flags } from '@oclif/core'
import ora from 'ora'

import { getFileData, writeBundleToFile } from '../controllers/file-controller.js';
import { changeSpinnerText, stopAndPersistSpinner } from '../controllers/spinner-controller.js'
import { LensFhirResource } from '../models/lens-fhir-resource.js'

const spinner = ora();

export default class Bundle extends Command {
  static args = {
    file: Args.string({description: 'file to read', required: true}),
  }

  static description = 'Bundles raw lenses into a FHIR compliant single file.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with no value (-f, --force)
    default: Flags.boolean({char: 'd', default: true, description: 'bundle lenses with default information'}),
    name: Flags.string({char: 'n', description: 'name to apply to lens', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Bundle);

    spinner.start('Starting process...');

    if(flags.default) this.bundleLensesDefaultInformaton(args.file, flags.name);
    else this.bundleLensesInteractive();
  }

  private bundleLensesDefaultInformaton(file: string, name: string): void {
    changeSpinnerText('Bundling lenses with default information', spinner);
    changeSpinnerText('Retrieving file data...', spinner);
    const fileData = getFileData(file);
    stopAndPersistSpinner('File data retrieved', spinner);
    changeSpinnerText('Converting file data to base64...', spinner);
    const base64FileData = this.stringTobase64(fileData);
    stopAndPersistSpinner('File data converted to base64', spinner);
    changeSpinnerText(`Making bundle with name: ${name}`, spinner);
    const bundle = LensFhirResource.defaultValues(name, base64FileData);
    stopAndPersistSpinner('Bundle created', spinner);
    changeSpinnerText('Writing bundle to file...', spinner)
    writeBundleToFile(bundle);
    stopAndPersistSpinner(`Bundle written to file: ${bundle.name}.json`, spinner);
    spinner.stopAndPersist({
      symbol: '⭐',
      text: 'Process complete',
    });
  }

  private bundleLensesInteractive(): void {
    console.log('Bundling lenses interactively');
    console.log('Still under construction...');
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
