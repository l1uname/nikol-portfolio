const sharp = require('sharp');
const path = require('path');

async function createThumbnail(inputFile) {
  try {
    const ext = path.extname(inputFile);
    const base = path.basename(inputFile, ext);
    const outputFile = `thumb-${base}${ext}`;

    await sharp(inputFile, { limitInputPixels: false })
        .resize({ width: 600, height: 400, fit: 'cover' }) // crop if needed
        .toFile(outputFile);

    console.log(`Thumbnail saved as ${outputFile}`);
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

// Get filename from command line arguments
const [,, inputFile] = process.argv;

if (!inputFile) {
  console.error('Please provide the image filename as an argument.');
  process.exit(1);
}

createThumbnail(inputFile);

