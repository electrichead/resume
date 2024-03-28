#!/usr/bin/env zx
import { $ } from 'zx';

const filename = process.argv[2];

$`docker run --rm -v $PWD:/documents/ asciidoctor/docker-asciidoctor asciidoctor-pdf ./src/${filename} --theme=src/theme-new.yml -a pdf-fontsdir=assets/fonts -o ./dist/${filename}.pdf`;
