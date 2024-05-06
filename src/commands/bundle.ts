import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'node:fs'

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
    default: Flags.boolean({char: 'd'}),
    name: Flags.string({char: 'n', description: 'name to apply to lens'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Bundle);

    this.getFileData(args.file);
  }

  private getFileData(file: string): string {
    console.log('Opening file:', file)
    const fileData = fs.readFileSync(file, 'utf8')

    return fileData;
  }
}
