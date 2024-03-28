module.exports = {
  scripts: {
    default: 'build',
    build:
      'docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./src/resume-202403.adoc --theme=src/theme-new.yml -a pdf-fontsdir=assets/fonts -o ./dist/nv-resume.pdf',
  },
};
