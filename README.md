
# Userscript development tool

Facilitates local development of userscripts, including a mechanism for
hot reloading userscripts.

## Installing and running

> NOTE: This package is still in the "incubation period", which is why it's not yet on npm. :-) Express your interest in [this issue](https://github.com/mihaibirsan/userscript-dev/issues/1).

Clone the repository and then install using npm:

```sh
npm install -g
```

Then, it can be run in any directory with npx:

```sh
npx userscript-dev <filename.user.js>
```

## Usage

- Filename must always end in `.user.js` to facilitate the installation of the userscript.
- The script opens the default browser when it starts, to install the development shell script.
- Edit the file with your favorite editor or IDE and save. The userscript is reloaded in the browser within less than a second.
- Make sure the last expression of the script is a cleanup function. The shell script calls this function before reloading.

See [sample.user.js](./sample.user.js) for an example of uninstall.

## Hot reload example

Clone the repository, install using npm, then run:

```sh
npx userscript-dev sample.user.js
```

- Navigate to `http://localhost:3000` and note the date and text inserted above "Hello world".
- Edit `sample.user.js` and notice the userscript is reloaded.
- Note that if the cleanup function is removed, reloading the userscript adds more nodes to the page.

> NOTE: Hot reloading userscript has been tested using Tampermonkey with Chrome and Edge. Please open an issue for any other browser and extension combination tested.
