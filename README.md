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
* [`fhir-lens-bundler bundle FILE`](#fhir-lens-bundler-bundle-file)
* [`fhir-lens-bundler upload FILE`](#fhir-lens-bundler-upload-file)

## `fhir-lens-bundler bundle FILE`

Bundles raw lenses into a FHIR compliant single file.

```
USAGE
  $ fhir-lens-bundler bundle FILE -n <value> [-d]

ARGUMENTS
  FILE  file to read

FLAGS
  -d, --default       bundle lenses with default information
  -n, --name=<value>  (required) name to apply to lens

DESCRIPTION
  Bundles raw lenses into a FHIR compliant single file.

EXAMPLES
  $ fhir-lens-bundler bundle
```

_See code: [src/commands/bundle.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.1.2/src/commands/bundle.ts)_


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