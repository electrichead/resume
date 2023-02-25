const npsUtils = require('nps-utils');
const { resolve: pathResolve } = require('path');

module.exports = {
  scripts: {
    default: 'build',
    build:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./README.adoc -a pdf-style=src/theme.yml -o ./dist/nv-resume.pdf',
  },
};
