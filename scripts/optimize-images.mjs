import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

const images = [
  { file: 'software/capcut.png', width: 160, height: 106 },
  { file: 'software/premiere-pro.png', width: 106, height: 106 },
  { file: 'software/after-effects.png', width: 106, height: 106 },
];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(publicDir, img.file);
    const baseName = path.basename(img.file, '.png');
    const dir = path.dirname(img.file);

    const webpPath = path.join(publicDir, dir, `${baseName}.webp`);
    const webp2xPath = path.join(publicDir, dir, `${baseName}@2x.webp`);

    await sharp(inputPath)
      .resize(img.width, img.height, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);

    await sharp(inputPath)
      .resize(img.width * 2, img.height * 2, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80, effort: 6 })
      .toFile(webp2xPath);

    const originalSize = (await sharp(inputPath).metadata()).size;
    const newSize = (await sharp(webpPath).metadata()).size;
    console.log(`✓ ${img.file} → ${baseName}.webp (${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB)`);
  }
}

optimize().catch(console.error);
