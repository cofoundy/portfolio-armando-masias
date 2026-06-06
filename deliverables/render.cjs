const { chromium } = require('/Users/styreep/cofoundy/projects/pollada/node_modules/playwright');
const path = require('path');

(async () => {
  const dir = '/Users/styreep/cofoundy/projects/pollada/clients/2026-06-05_armando-masias/deliverables';
  const htmlPath = 'file://' + path.join(dir, 'cv-masias.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(htmlPath, { waitUntil: 'networkidle' });

  // PDF
  await page.pdf({
    path: path.join(dir, 'cv-masias.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  // Screenshot for inspection (A4 @ ~2x)
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.screenshot({ path: path.join(dir, 'preview.png'), fullPage: true });

  await browser.close();
  console.log('done');
})();
