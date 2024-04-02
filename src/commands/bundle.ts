import {Args, Command, Flags} from '@oclif/core'

export default class Bundle extends Command {
  static args = {
    file: Args.string({description: 'file to read', required: false}),
  }

  static description = 'Bundles raw lenses into a FHIR compliant single file.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Bundle)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/aalonso/LST/GravitateHealth/fhir-lens-bundler/src/commands/bundle.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
