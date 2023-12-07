const npsUtils = require('nps-utils');
const { resolve: pathResolve } = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

console.log({ argv });

module.exports = {
  scripts: {
    default: 'build',
    build:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./resume.adoc --theme=src/theme-new.yml -a pdf-fontsdir=assets/fonts -o ./dist/nv-resume.pdf',
  },
};
