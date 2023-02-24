const npsUtils = require('nps-utils');
const { resolve: pathResolve } = require('path');

module.exports = {
  scripts: {
    default: '',
    build: npsUtils.series(
      npsUtils.rimraf(pathResolve('./tmp')),
      npsUtils.concurrent.nps('genPDF'),
      'node scripts/process-files.js',
      npsUtils.rimraf(pathResolve('./tmp'))
    ),
    genCover: npsUtils.series(
      npsUtils.rimraf(pathResolve('./tmp')),
      npsUtils.concurrent.nps('genCover'),
      'node scripts/process-cover.js',
      npsUtils.rimraf(pathResolve('./tmp'))
    ),
    epub: npsUtils.series.nps('copyImages', 'genDocbook', 'genEpub'),
    copyImages: npsUtils.copy(
      `${pathResolve('./src/images/**')} ${pathResolve('./tmp/images')}`
    ),
    genPDF:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./src/nv-resume-2020.adoc -a pdf-style=src/theme.yml -o ./tmp/tempOrigAsciidocPDF.pdf',
    genPDF2023:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./src/nv-resume-2023.adoc -a pdf-style=src/theme.yml -o ./dist/resume-2023.pdf',
    genDocbook:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor -d book -b docbook5 ./src/nv-resume-2020.adoc -o ./tmp/output.docbook',
    genEpub:
      'docker run --rm -v `pwd`/tmp:/source jagregory/pandoc -f docbook -t epub output.docbook -o nv-resume.epub',
    genCover:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./src/cover-letters/mozilla-staff.adoc -a pdf-style=src/theme.yml -o ./tmp/tempCoverPDF.pdf',
  },
};
