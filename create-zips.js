const { createClient } = require('@supabase/supabase-js');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const MODULOS_DIR = 'C:\\Users\\alber\\OneDrive\\Documentos\\Modulos IA\\BIBLIOTECA_IA_52_MODULOS_renombrados';
const BUCKET = 'modulos';
const TMP_DIR = path.join(__dirname, 'tmp_zips');

const GROUPS = {
  'pack-1': [1,2,3,4,5,6,7],
  'pack-2': [8,9,10,11,12,13],
  'pack-3': [14,15,16,17,18,19,20,21],
  'pack-4': [22,23,24,25,26,27],
  'pack-5': [28,29,30,31,32,33,34],
  'pack-6': [35,36,37,38,39,40,41],
  'pack-7': [42,43,44,45,46,47,48,49,50,51,52],
};

function getFileName(num) {
  const files = fs.readdirSync(MODULOS_DIR);
  const padded = String(num).padStart(2, '0');
  return files.find(f => f.startsWith(`Modulo_${padded}_`));
}

function createZip(zipPath, moduleNumbers) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    for (const num of moduleNumbers) {
      const fileName = getFileName(num);
      if (fileName) {
        archive.file(path.join(MODULOS_DIR, fileName), { name: fileName });
      } else {
        console.warn(`  ⚠️  No encontrado: Modulo_${String(num).padStart(2,'0')}`);
      }
    }

    archive.finalize();
  });
}

async function run() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

  for (const [productId, modules] of Object.entries(GROUPS)) {
    const zipName = `${productId}.zip`;
    const zipPath = path.join(TMP_DIR, zipName);

    console.log(`📦 Creando ${zipName} (${modules.length} módulos)...`);
    await createZip(zipPath, modules);

    const content = fs.readFileSync(zipPath);
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(zipName, content, { contentType: 'application/zip', upsert: true });

    if (uploadError) {
      console.error(`  ❌ Error subiendo ${zipName}:`, uploadError.message);
      continue;
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ file_path: zipName })
      .eq('id', productId);

    if (updateError) {
      console.error(`  ❌ Error actualizando BD para ${productId}:`, updateError.message);
    } else {
      console.log(`  ✅ ${productId} → ${zipName}`);
    }

    fs.unlinkSync(zipPath); // limpiar tmp
  }

  fs.rmdirSync(TMP_DIR);
  console.log('\n🎉 ¡ZIPs creados, subidos y enlazados!');
}

run().catch(console.error);
