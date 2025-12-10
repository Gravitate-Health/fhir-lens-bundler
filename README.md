FHIR Lens Bundler
=================

This is a CLI tool to bundle FHIR lenses into a single file.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @gravitate-health/fhir-lens-bundler
$ fhir-lens-bundler COMMAND
running command...
$ fhir-lens-bundler (--version)
@gravitate-health/fhir-lens-bundler/0.1.2 linux-x64 node-v20.10.0
$ fhir-lens-bundler --help [COMMAND]
USAGE
  $ fhir-lens-bundler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fhir-lens-bundler batch-bundle [DIRECTORY]`](#fhir-lens-bundler-batch-bundle-directory)
* [`fhir-lens-bundler bundle FILE`](#fhir-lens-bundler-bundle-file)
* [`fhir-lens-bundler lsenhancejs [DIRECTORY]`](#fhir-lens-bundler-lsenhancejs-directory)
* [`fhir-lens-bundler lslens [DIRECTORY]`](#fhir-lens-bundler-lslens-directory)
* [`fhir-lens-bundler new NAME`](#fhir-lens-bundler-new-name)
* [`fhir-lens-bundler upload FILE`](#fhir-lens-bundler-upload-file)

## `fhir-lens-bundler bundle FILE`

Bundles raw lenses into a FHIR compliant single file.

```
USAGE
  $ fhir-lens-bundler bundle FILE -n <value> [-d] [-u]

ARGUMENTS
  FILE  file to read

FLAGS
  -d, --default       use default values for the bundle
  -n, --name=<value>  (required) name to apply to lens
  -u, --update        update existing bundle file (content and date only)

DESCRIPTION
  Bundles raw lenses into a FHIR compliant single file.
  
  By default, the command runs in interactive mode, prompting for bundle metadata.
  Use -d flag to skip prompts and use default values.
  Use -u flag to update an existing bundle file with new content and updated date.

EXAMPLES
  $ fhir-lens-bundler bundle mylens.js -n MyLens
  $ fhir-lens-bundler bundle mylens.js -n MyLens -d
  $ fhir-lens-bundler bundle mylens.js -n MyLens -u
```

_See code: [src/commands/bundle.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/bundle.ts)_

## `fhir-lens-bundler batch-bundle [DIRECTORY]`

Batch process and bundle multiple lenses in a directory.

```
USAGE
  $ fhir-lens-bundler batch-bundle [DIRECTORY] [-s] [-d] [-e <value>] [-f]

ARGUMENTS
  DIRECTORY  [default: .] directory containing lenses to bundle

FLAGS
  -d, --skip-date   do not update the date field when bundling
  -e, --exclude=<value>  regex pattern to exclude files (applied to filename)
  -f, --force       force bundle all lenses even if content is up to date
  -s, --skip-valid  skip lenses that already have valid base64 content

DESCRIPTION
  Batch process and bundle multiple lenses in a directory.
  
  Automatically discovers lenses (valid or missing content) and their corresponding
  JavaScript files, then bundles them together. For each lens:
  - If it's missing content, adds the JS code as base64
  - If it has content, checks if it needs updating against the JS file
  - Updates the date field (unless --skip-date is used)
  
  The command uses exact matching (same filename) or fallback matching (any JS 
  file in the same directory with an enhance function) to find the appropriate
  JavaScript code for each lens.
  
  The --force flag bypasses the content check and bundles all lenses regardless 
  of whether their content is already up to date. This overrides --skip-valid.

EXAMPLES
  $ fhir-lens-bundler batch-bundle
  $ fhir-lens-bundler batch-bundle ./lenses
  $ fhir-lens-bundler batch-bundle ./lenses --skip-valid
  $ fhir-lens-bundler batch-bundle ./lenses --force
  $ fhir-lens-bundler batch-bundle ./lenses --skip-date
  $ fhir-lens-bundler batch-bundle ./lenses --exclude "test.*"
  $ fhir-lens-bundler batch-bundle ./lenses -s -d -e "draft.*"
```

_See code: [src/commands/batch-bundle.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/batch-bundle.ts)_

## `fhir-lens-bundler lsenhancejs [DIRECTORY]`

List valid enhance JavaScript files in a directory (similar to ls).

```
USAGE
  $ fhir-lens-bundler lsenhancejs [DIRECTORY] [-d] [-j]

ARGUMENTS
  DIRECTORY  [default: .] directory to search for enhance JS files

FLAGS
  -d, --details  show details about matches (exact vs fallback)
  -j, --json     output as JSON format

DESCRIPTION
  List valid enhance JavaScript files in a directory (similar to ls).
  
  Finds JavaScript files that contain an enhance function definition.
  Files are categorized as:
  - Exact match: JS file has the same name as a corresponding JSON lens file
  - Fallback: JS file in same directory but no matching JSON file name
  
  Default output shows just file paths, making it ideal for piping to xargs.

EXAMPLES
  $ fhir-lens-bundler lsenhancejs
  $ fhir-lens-bundler lsenhancejs ./lenses
  $ fhir-lens-bundler lsenhancejs -d
  $ fhir-lens-bundler lsenhancejs ./lenses | xargs -I {} echo "Processing: {}"
```

_See code: [src/commands/lsenhancejs.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/lsenhancejs.ts)_

## `fhir-lens-bundler lslens [DIRECTORY]`

List valid FHIR lenses in a directory (similar to ls).

```
USAGE
  $ fhir-lens-bundler lslens [DIRECTORY] [-a] [-v] [-j]

ARGUMENTS
  DIRECTORY  [default: .] directory to search for lenses

FLAGS
  -a, --all       include lenses that may be missing content (base64 data)
  -j, --json      output as JSON format
  -v, --validate  include full validation report for each lens

DESCRIPTION
  List valid FHIR lenses in a directory (similar to ls).
  
  By default, only lists fully-fledged lenses with complete base64 content.
  Use -a to include lenses that may be missing content.
  Use -v to show detailed validation reports.
  Use -j for JSON output (useful for scripting).
  
  Default output shows just file paths, making it ideal for piping to xargs.

EXAMPLES
  $ fhir-lens-bundler lslens
  $ fhir-lens-bundler lslens ./lenses
  $ fhir-lens-bundler lslens -a
  $ fhir-lens-bundler lslens -v
  $ fhir-lens-bundler lslens ./lenses | xargs -I {} echo "Processing: {}"
```

_See code: [src/commands/lslens.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/lslens.ts)_

## `fhir-lens-bundler new NAME`

Creates a new lens with JavaScript file and FHIR bundle.

```
USAGE
  $ fhir-lens-bundler new NAME [-d] [-f]

ARGUMENTS
  NAME  name of the lens to create

FLAGS
  -d, --default  use default values for the bundle
  -f, --force    overwrite existing files if they exist

DESCRIPTION
  Creates a new lens with JavaScript file and FHIR bundle.
  
  Creates two files:
  - <name>.js: JavaScript file with lens template from GitHub repository
  - <name>.json: FHIR-compliant bundle with the JS code encoded in base64
  
  By default, the command runs in interactive mode, prompting for bundle metadata.
  Use -d flag to skip prompts and use default values.
  Use -f flag to overwrite existing files.
  
  The JavaScript template is fetched from the Gravitate Health lens template 
  repository at runtime, ensuring you always get the latest version.

EXAMPLES
  $ fhir-lens-bundler new MyLens
  $ fhir-lens-bundler new MyLens -d
  $ fhir-lens-bundler new MyLens -d -f
```

_See code: [src/commands/new.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/new.ts)_


## `fhir-lens-bundler upload FILE`

upload file (json format) to a valid FHIR server.

```
USAGE
  $ fhir-lens-bundler upload FILE -d <value>

ARGUMENTS
  FILE  file to read

FLAGS
  -d, --domain=<value>  (required) domain where FHIR server is hoste (with http/https)

DESCRIPTION
  upload file (json format) to a valid FHIR server.

EXAMPLES
  $ fhir-lens-bundler upload
```

_See code: [src/commands/upload.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/upload.ts)_