import {Args, Command, Flags} from '@oclif/core'
import ora from 'ora'

import { getFileData } from '../controllers/file-controller.js'
import * as spinnerController from '../controllers/spinner-controller.js'
import { uploadLenses } from '../controllers/upload-controller.js'

const spinner = ora();

export default class Upload extends Command {
  static override args = {
    file: Args.string({description: 'file to read', required: true}),
  }

  static override description = 'upload file (json format) to a valid FHIR server.'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    // flag with a value (-n, --name=VALUE)
    domain: Flags.string({char: 'd', description: 'domain where FHIR server is hosted (with http/https)', required: true}),
  }

  public async run(): Promise<void> {
    spinner.start('Starting upload process...');
    const {args, flags} = await this.parse(Upload);
    spinnerController.changeSpinnerText('Retrieving file data...', spinner);
    const fileData = getFileData(args.file);
    spinnerController.stopAndPersistSpinner('File data retrieved', spinner);
    spinnerController.changeSpinnerText('Uploading lenses...', spinner);
    await uploadLenses(fileData, flags.domain);
    spinner.stopAndPersist({
      symbol: '⭐',
      text: 'Process complete',
    });
  }
}
