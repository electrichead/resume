const { resolve: pathResolve } = require('path');
const { copySync } = require('fs-extra');

const paths = {
  srcImages: pathResolve('./src/images'),
  tmpImages: pathResolve('./tmp/images')
};

copySync(paths.srcImages, paths.tmpImages);
