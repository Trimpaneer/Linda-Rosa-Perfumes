import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Para poder usar __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DATA_PATH = path.join(__dirname, '../src/data/products.ts');
const OUTPUT_DIR = path.join(__dirname, '../public/images/products');

// Función para extraer los slugs del archivo products.ts sin ejecutar la aplicación completa
function getProductSlugs() {
  try {
    const content = fs.readFileSync(PRODUCTS_DATA_PATH, 'utf-8');
    // Expresión regular para buscar todos los campos "slug" en el array de productos
    const slugRegex = /slug:\s*['"`]([^'"`]+)['"`]/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return Array.from(new Set(slugs)); // Retorna slugs únicos
  } catch (error) {
    console.error('Error al leer products.ts:', error);
    return [];
  }
}

async function main() {
  console.log('🌹 Linda Rosa Perfumes — Gestor de Imágenes de Productos 🌹');
  
  // Asegurar que el directorio de salida existe
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Creado directorio de salida: ${OUTPUT_DIR}`);
  }

  const slugs = getProductSlugs();
  if (slugs.length === 0) {
    console.log('No se encontraron productos o slugs en src/data/products.ts');
    return;
  }

  console.log(`Total de productos registrados: ${slugs.length}`);

  // Verificar argumentos de línea de comandos para ver si se desea importar una imagen
  const args = process.argv.slice(2);
  const [sourceImagePath, targetSlug] = args;

  if (sourceImagePath && targetSlug) {
    // Modo importación
    if (!slugs.includes(targetSlug)) {
      console.error(`❌ Error: El slug "${targetSlug}" no existe en el catálogo.`);
      console.log('Slugs válidos:', slugs.join(', '));
      return;
    }

    if (!fs.existsSync(sourceImagePath)) {
      console.error(`❌ Error: La imagen origen "${sourceImagePath}" no existe.`);
      return;
    }

    const outputFileName = `${targetSlug}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      console.log(`Optimizando y convirtiendo "${sourceImagePath}"...`);
      await sharp(sourceImagePath)
        .resize(800, 800, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Fondo transparente
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`✅ ¡Imagen importada con éxito! Guardada en: /images/products/${outputFileName}`);
    } catch (error) {
      console.error('❌ Error durante la conversión de imagen:', error);
    }
    return;
  }

  // Si no se pasaron argumentos, listar estado de las imágenes
  console.log('\n--- Estado de las imágenes de productos ---');
  let missingCount = 0;
  for (const slug of slugs) {
    const webpPath = path.join(OUTPUT_DIR, `${slug}.webp`);
    const exists = fs.existsSync(webpPath);
    if (exists) {
      console.log(`  [OK]       /images/products/${slug}.webp`);
    } else {
      console.log(`  [FALTA]    /images/products/${slug}.webp`);
      missingCount++;
    }
  }

  console.log('\n----------------------------------------');
  if (missingCount === 0) {
    console.log('🎉 ¡Todas las imágenes de los productos están disponibles!');
  } else {
    console.log(`⚠️ Faltan ${missingCount} imágenes por importar.`);
    console.log('\nPara importar una imagen, ejecuta:');
    console.log('  node scripts/import-images.mjs <ruta-a-imagen-origen> <slug-del-producto>');
    console.log('\nEjemplo:');
    console.log('  node scripts/import-images.mjs C:\\descargas\\yara.jpg yara-candy-lattafa');
  }
}

main();
