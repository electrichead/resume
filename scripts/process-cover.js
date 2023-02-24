const { resolve: pathResolve } = require('path');
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { sync: rimrafSync } = require('rimraf');

const { PDFDocument } = require('pdf-lib');

// const thatBlueColor = 0x0395de;

const paths = {
  tmpFolder: pathResolve('./tmp'),
  adocPath: pathResolve('./src/cover-letters/mozilla-staff.adoc'),
  outPath: pathResolve('./dist/cover-letters/mozilla-staff.pdf'),
  tempCoverPDF: pathResolve('./tmp/tempCoverPDF.pdf'),
  tempModifiedAsciidocPDF: pathResolve('./tmp/tempModifiedAsciidocPDF.pdf'),
  tempPageNumCountPDF: pathResolve('./tmp/tempPageNumCountPDF.pdf'),
  tempPathTitle: pathResolve('./tmp/tempPathTitle.pdf'),
};

async function renderNewPDF() {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  const origPdfRaw = readFileSync(paths.tempCoverPDF);

  // Load a PDFDocument from each of the existing PDFs
  const origDoc = await PDFDocument.load(origPdfRaw);
  const pages = origDoc.getPageIndices();

  const copiedPages = await pdfDoc.copyPages(origDoc, pages.slice(1));

  copiedPages.forEach((page) => {
    pdfDoc.addPage(page);
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const outPdfRaw = await pdfDoc.save();
  writeFileSync(paths.outPath, outPdfRaw);
}

function cleanAllFiles() {
  //rimrafSync(paths.tmpFolder);
}

function createTempFolder() {
  if (!existsSync(paths.tmpFolder)) {
    mkdirSync(paths.tmpFolder);
  }
}

function checkPDFExists() {
  return new Promise((resolve, reject) => {
    if (existsSync(paths.adocPath)) {
      createTempFolder();
      return resolve();
    }
    return reject('Missing source PDF! Run `npm run build` first.');
  });
}

console.log('Generating PDF from Asciidoc');

(async function doit() {
  checkPDFExists()
    .then(renderNewPDF)
    .then(cleanAllFiles)
    .catch((e) => console.error(e));
})();
