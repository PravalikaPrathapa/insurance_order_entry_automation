async function uploadFile(input, filePath) {
  await input.setInputFiles(filePath);
}

module.exports = { uploadFile };
