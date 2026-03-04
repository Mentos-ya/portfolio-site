const fs = require('fs');
const path = require('path');
// Файлы из чата (картинки, которые ты кидаешь, сохраняются в ассеты Cursor)
const assetsDir = path.join(process.env.HOME || '', '.cursor/projects/Users-ilyayakupov-Downloads-IT/assets');
const candidates = [
  '______________2026-03-04___14.35.09-bc3d3959-5225-48cd-8d74-f2ce4b43259f.png',
  'app_preview11-d6c63f7a-ed9c-4839-b28e-b71a51f77ff8.png',
  'app_preview11-1fb95def-d488-4f60-b6e5-1591773d0cc6.png',
];
const dest = path.join(__dirname, '..', 'public', 'videos', 'ponyatno-poster.png');
try {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const src = candidates.map((name) => path.join(assetsDir, name)).find((p) => fs.existsSync(p));
  if (src) {
    fs.copyFileSync(src, dest);
    console.log('OK:', dest);
  } else {
    console.error('Source not found. Tried:', candidates.map((n) => path.join(assetsDir, n)));
    process.exit(1);
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
