// Convierte un HTML de producto en PDF A4 con cabecera y pie en todas las páginas.
// Uso: node render.cjs entrada.html salida.pdf cabecera.html pie.html
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const fs = require('fs');
(async () => {
  const [inp, out, cab, pie] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + require('path').resolve(inp)); await p.waitForTimeout(300);
  await p.pdf({ path: out, format: 'A4', printBackground: true, displayHeaderFooter: true,
    headerTemplate: fs.readFileSync(cab, 'utf8'), footerTemplate: fs.readFileSync(pie, 'utf8'),
    margin: { top: '22mm', bottom: '20mm', left: '16mm', right: '16mm' } });
  await b.close();
})();
