const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const MODULOS_DIR = 'C:\\Users\\alber\\OneDrive\\Documentos\\Modulos IA\\BIBLIOTECA_IA_52_MODULOS_renombrados';
const BUCKET = 'modulos';

async function uploadAndLink() {
  const files = fs.readdirSync(MODULOS_DIR).filter(f => f.endsWith('.html'));
  console.log(`📁 ${files.length} archivos encontrados\n`);

  for (const file of files) {
    const filePath = path.join(MODULOS_DIR, file);
    const content = fs.readFileSync(filePath);

    // 1. Subir a Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(file, content, {
        contentType: 'text/html',
        upsert: true
      });

    if (uploadError) {
      console.error(`❌ Error subiendo ${file}:`, uploadError.message);
      continue;
    }

    // 2. Extraer número del módulo (ej: "03" de "Modulo_03_...")
    const match = file.match(/Modulo_(\d+)_/);
    if (!match) {
      console.warn(`⚠️  No se pudo extraer número de: ${file}`);
      continue;
    }
    const num = parseInt(match[1], 10);
    const productId = `mod-${String(num).padStart(2, '0')}`;

    const { data: product, error: findError } = await supabase
      .from('products')
      .select('id, name')
      .eq('id', productId)
      .single();

    if (findError || !product) {
      console.warn(`⚠️  Subido pero sin producto en BD: ${file}`);
      continue;
    }

    // 3. Actualizar file_path
    const { error: updateError } = await supabase
      .from('products')
      .update({ file_path: file })
      .eq('id', product.id);

    if (updateError) {
      console.error(`❌ Error actualizando BD para ${file}:`, updateError.message);
    } else {
      console.log(`✅ ${file}`);
    }
  }

  console.log('\n🎉 ¡Proceso completado!');
}

uploadAndLink().catch(console.error);
