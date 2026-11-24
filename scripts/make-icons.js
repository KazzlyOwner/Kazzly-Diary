// Genera los iconos (Windows, Mac, Linux y Android) a partir de logo/logo.svg
const fs = require('fs'), path = require('path'), sharp = require('sharp');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'logo', 'logo.svg'), 'utf8');
const i = src.indexOf('</defs>') + 7, head = src.slice(0, i), body = src.slice(i, src.lastIndexOf('</svg>'));
const layers = body
  .replace(/<rect width="512"[^>]*fill="url\(#bg\)"\/>/, '')
  .replace(/<g clip-path="url\(#tile\)">[\s\S]*?<\/g>/, '')
  .replace(/<rect x="1" y="1"[^>]*\/>/, '');
const out = {
  'build/icon.png': src,
  'assets/icon-only.png': src.replace(/rx="11[12]"/g, 'rx="0"'),
  'assets/icon-foreground.png': head + '<g transform="translate(256 256) scale(.62) translate(-256 -256)">' + layers + '</g></svg>',
  'assets/icon-background.png': head + '<rect width="512" height="512" fill="url(#bg)"/></svg>'
};
(async () => {
  for (const [f, svg] of Object.entries(out)) {
    const p = path.join(root, f);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    await sharp(Buffer.from(svg)).resize(1024, 1024).png().toFile(p);
    console.log('listo', f);
  }
})();
