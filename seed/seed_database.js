import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to your service account key file
const SERVICE_ACCOUNT_PATH = join(__dirname, 'serviceAccountKey.json');

// Check if dry run is enabled
const DRY_RUN = process.argv.includes('--dry-run');

console.log('==================================================');
console.log('         SPSU DATABASE SEEDING SYSTEM             ');
console.log('==================================================');

if (DRY_RUN) {
  console.log('👉 Running in DRY-RUN mode. No database writes will occur.\n');
}

// 1. Initialize Firebase Admin SDK
if (!DRY_RUN) {
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('❌ Error: serviceAccountKey.json not found in the seed/ directory.');
    console.error('To obtain this file:');
    console.error('1. Go to Firebase Console -> Project Settings -> Service Accounts.');
    console.error('2. Click "Generate New Private Key".');
    console.error('3. Save it as "seed/serviceAccountKey.json".');
    console.log('\nRunning in DRY-RUN mode instead...\n');
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin SDK Initialized Successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    process.exit(1);
  }
}

const db = !DRY_RUN ? admin.firestore() : null;

// Helper to read and parse JSON files
function readSeedFile(filename) {
  const filePath = join(__dirname, filename);
  if (!existsSync(filePath)) {
    console.warn(`⚠️ Warning: Seed file ${filename} not found.`);
    return null;
  }
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

// Seeding function helper
async function seedCollection(collectionName, data, useId = true) {
  if (!data) return;
  console.log(`\n📦 Seeding Collection: "${collectionName}" (${data.length || 1} items)...`);

  if (DRY_RUN) {
    console.log(`[DRY-RUN] Would write ${data.length || 1} items to "${collectionName}".`);
    return;
  }

  const batch = db.batch();
  const collectionRef = db.collection(collectionName);

  if (Array.isArray(data)) {
    data.forEach((item) => {
      let docRef;
      if (useId && item.id) {
        docRef = collectionRef.doc(item.id);
      } else {
        docRef = collectionRef.doc();
      }
      // Add server timestamp metadata
      const cleanItem = {
        ...item,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      batch.set(docRef, cleanItem);
    });
  } else {
    // Single document seed (like settings)
    const docId = data.id || 'global';
    const docRef = collectionRef.doc(docId);
    const cleanItem = {
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    batch.set(docRef, cleanItem);
  }

  try {
    await batch.commit();
    console.log(`✅ Successfully seeded "${collectionName}" collection.`);
  } catch (error) {
    console.error(`❌ Failed to seed "${collectionName}" collection:`, error.message);
  }
}

// 2. Load Seed Data
const departments = readSeedFile('departments.json');
const faculty = readSeedFile('faculty.json');
const programs = readSeedFile('programs.json');
const events = readSeedFile('events.json');
const news = readSeedFile('news.json');
const gallery = readSeedFile('gallery.json');
const placements = readSeedFile('placements.json');
const downloads = readSeedFile('downloads.json');
const navigation = readSeedFile('navigation.json');
const settings = readSeedFile('settings.json');

// 3. Run Seed Operations
async function main() {
  await seedCollection('departments', departments);
  await seedCollection('faculty', faculty);
  await seedCollection('programs', programs);
  await seedCollection('events', events);
  await seedCollection('news', news);
  await seedCollection('gallery_albums', gallery);
  await seedCollection('placements', placements);
  await seedCollection('downloads', downloads);
  await seedCollection('navigation', navigation);
  await seedCollection('settings', settings, false);

  console.log('\n==================================================');
  console.log('🎉 Seeding operations completed!');
  console.log('==================================================');
}

main().catch(console.error);
