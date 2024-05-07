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
$ npm install -g fhir-lens-bundler
$ fhir-lens-bundler COMMAND
running command...
$ fhir-lens-bundler (--version)
fhir-lens-bundler/0.1.1 linux-x64 node-v20.10.0
$ fhir-lens-bundler --help [COMMAND]
USAGE
  $ fhir-lens-bundler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fhir-lens-bundler bundle FILEDIR`](#fhir-lens-bundler-bundle-filedir)

## `fhir-lens-bundler bundle FILEDIR`

Bundles a given Lens file with source code into a FHIR compatible JSON file

```
USAGE
  $ fhir-lens-bundler bundle FILEDIR -n <outputname> -d

ARGUMENTS
  FILEDIR  File name to bundle

FLAGS
  -n, --name=<value>  (required) Name that the output file will be saved as
  -d, --default       (required) If the output file will have the default values (always true for now)

DESCRIPTION
  Bundles a given Lens file with source code into a FHIR compatible JSON file
```

_See code: [src/commands/bundle.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/0.1.1/src/commands/bundle.ts)_