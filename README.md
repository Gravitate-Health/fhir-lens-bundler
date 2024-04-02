oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

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
fhir-lens-bundler/0.4.27 linux-x64 node-v20.10.0
$ fhir-lens-bundler --help [COMMAND]
USAGE
  $ fhir-lens-bundler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fhir-lens-bundler hello PERSON`](#fhir-lens-bundler-hello-person)
* [`fhir-lens-bundler hello world`](#fhir-lens-bundler-hello-world)
* [`fhir-lens-bundler help [COMMAND]`](#fhir-lens-bundler-help-command)
* [`fhir-lens-bundler plugins`](#fhir-lens-bundler-plugins)
* [`fhir-lens-bundler plugins:install PLUGIN...`](#fhir-lens-bundler-pluginsinstall-plugin)
* [`fhir-lens-bundler plugins:inspect PLUGIN...`](#fhir-lens-bundler-pluginsinspect-plugin)
* [`fhir-lens-bundler plugins:install PLUGIN...`](#fhir-lens-bundler-pluginsinstall-plugin-1)
* [`fhir-lens-bundler plugins:link PLUGIN`](#fhir-lens-bundler-pluginslink-plugin)
* [`fhir-lens-bundler plugins:uninstall PLUGIN...`](#fhir-lens-bundler-pluginsuninstall-plugin)
* [`fhir-lens-bundler plugins reset`](#fhir-lens-bundler-plugins-reset)
* [`fhir-lens-bundler plugins:uninstall PLUGIN...`](#fhir-lens-bundler-pluginsuninstall-plugin-1)
* [`fhir-lens-bundler plugins:uninstall PLUGIN...`](#fhir-lens-bundler-pluginsuninstall-plugin-2)
* [`fhir-lens-bundler plugins update`](#fhir-lens-bundler-plugins-update)

## `fhir-lens-bundler hello PERSON`

Say hello

```
USAGE
  $ fhir-lens-bundler hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.4.27/src/commands/hello/index.ts)_

## `fhir-lens-bundler hello world`

Say hello world

```
USAGE
  $ fhir-lens-bundler hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ fhir-lens-bundler hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Gravitate-Health/fhir-lens-bundler/blob/v0.4.27/src/commands/hello/world.ts)_

## `fhir-lens-bundler help [COMMAND]`

Display help for fhir-lens-bundler.

```
USAGE
  $ fhir-lens-bundler help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for fhir-lens-bundler.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.20/src/commands/help.ts)_

## `fhir-lens-bundler plugins`

List installed plugins.

```
USAGE
  $ fhir-lens-bundler plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ fhir-lens-bundler plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/index.ts)_

## `fhir-lens-bundler plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fhir-lens-bundler plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ fhir-lens-bundler plugins add

EXAMPLES
  $ fhir-lens-bundler plugins add myplugin 

  $ fhir-lens-bundler plugins add https://github.com/someuser/someplugin

  $ fhir-lens-bundler plugins add someuser/someplugin
```

## `fhir-lens-bundler plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ fhir-lens-bundler plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ fhir-lens-bundler plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/inspect.ts)_

## `fhir-lens-bundler plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fhir-lens-bundler plugins install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ fhir-lens-bundler plugins add

EXAMPLES
  $ fhir-lens-bundler plugins install myplugin 

  $ fhir-lens-bundler plugins install https://github.com/someuser/someplugin

  $ fhir-lens-bundler plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/install.ts)_

## `fhir-lens-bundler plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ fhir-lens-bundler plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ fhir-lens-bundler plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/link.ts)_

## `fhir-lens-bundler plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fhir-lens-bundler plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fhir-lens-bundler plugins unlink
  $ fhir-lens-bundler plugins remove

EXAMPLES
  $ fhir-lens-bundler plugins remove myplugin
```

## `fhir-lens-bundler plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ fhir-lens-bundler plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/reset.ts)_

## `fhir-lens-bundler plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fhir-lens-bundler plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fhir-lens-bundler plugins unlink
  $ fhir-lens-bundler plugins remove

EXAMPLES
  $ fhir-lens-bundler plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/uninstall.ts)_

## `fhir-lens-bundler plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fhir-lens-bundler plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fhir-lens-bundler plugins unlink
  $ fhir-lens-bundler plugins remove

EXAMPLES
  $ fhir-lens-bundler plugins unlink myplugin
```

## `fhir-lens-bundler plugins update`

Update installed plugins.

```
USAGE
  $ fhir-lens-bundler plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/update.ts)_
<!-- commandsstop -->
