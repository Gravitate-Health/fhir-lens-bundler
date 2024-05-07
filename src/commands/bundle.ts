import { Args, Command, Flags } from '@oclif/core'
import * as fs from 'node:fs'

import { LensFhirResource } from '../models/lens-fhir-resource.js'

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

    if(flags.default) this.bundleLensesDefaultInformaton(args.file, flags.name);
    else this.bundleLensesInteractive();
  }

  private bundleLensesDefaultInformaton(file: string, name: string): void {
    console.log('Bundling lenses with default information');
    console.log('Retrieving file data...');
    const fileData = this.getFileData(file);
    console.log('Converting file data to base64...');
    const base64FileData = this.stringTobase64(fileData);
    console.log('Making bundle with name:', name);
    const bundle = LensFhirResource.defaultValues(name, base64FileData);
    console.log('Bundle:', JSON.stringify(bundle));
    console.log('Writing bundle to file...');
    this.writeBundleToFile(bundle);
    console.log('Bundle written to file:', `${bundle.name}.json`);
    console.log('Done!');
  }

  private bundleLensesInteractive(): void {
    console.log('Bundling lenses interactively');
    console.log('Still under construction...');
  }

  private getFileData(file: string): string {
    let fileData;
    console.log('Opening file:', file);
    try {
      fileData = fs.readFileSync(file, 'utf8');
    } catch (error) {
      console.log('Error reading file:', error);
      throw error;
    }

    return fileData;
  }

  private stringTobase64(str: string): string {
    try {
      return Buffer.from(str, 'binary').toString('base64');
    } catch (error) {
      console.log('Error converting string to base64:', error);
      throw error;
    }
  }

  private writeBundleToFile(bundle: LensFhirResource): void {
    const bundleJson = JSON.stringify(bundle, null, 2);
    const bundleFileName = `${bundle.name}.json`;
    try {
      fs.writeFileSync(bundleFileName, bundleJson);
    } catch (error) {
      console.log('Error writing bundle to file:', error);
      throw error;
    }
  }
}
