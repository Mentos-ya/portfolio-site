const fs = require('fs');
const path = require('path');

const src = path.join(process.env.HOME || '', 'Downloads', 'chest_transparent.gif');
const dest = path.join(__dirname, '..', 'public', 'images', 'chest-open.gif');

try {
  if (!fs.existsSync(src)) {
    console.error('Файл не найден:', src);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('OK: chest_transparent.gif скопирован в public/images/chest-open.gif');
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
