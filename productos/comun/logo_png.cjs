const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 620, height: 200 }, deviceScaleFactor: 1 });
  await p.setContent(`<style>*{margin:0}body{background:transparent}</style><div style="padding:0">${fs.readFileSync(__dirname + '/logo.svg','utf8').replace('<svg ','<svg height="200" ')}</div>`);
  const el = await p.$('svg'); await el.screenshot({ path: __dirname + '/logo.png', omitBackground: true }); await b.close(); })();
