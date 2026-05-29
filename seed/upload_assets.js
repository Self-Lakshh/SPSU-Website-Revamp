import { readFileSync, existsSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVICE_ACCOUNT_PATH = join(__dirname, 'serviceAccountKey.json');
const STORAGE_BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET || 'spsu-website-revamp.appspot.com';

console.log('==================================================');
console.log('         SPSU MEDIA SYNCHRONIZATION SYSTEM        ');
console.log('==================================================');

if (!existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('❌ serviceAccountKey.json not found. Please put it in the seed/ folder to run sync.');
  process.exit(1);
}

try {
  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: STORAGE_BUCKET_NAME
  });
  console.log('✅ Firebase Admin SDK Initialized.');
} catch (error) {
  console.error('❌ Admin SDK Init Failed:', error.message);
  process.exit(1);
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Function to upload a local file to storage and get public URL
async function uploadFile(localPath, destination) {
  if (!existsSync(localPath)) {
    console.warn(`⚠️ File not found: ${localPath}`);
    return null;
  }

  console.log(`📤 Uploading ${localPath} to gs://${STORAGE_BUCKET_NAME}/${destination}...`);
  try {
    const [file] = await bucket.upload(localPath, {
      destination,
      public: true,
      metadata: {
        cacheControl: 'public, max-age=31536000'
      }
    });

    const publicUrl = `https://storage.googleapis.com/${STORAGE_BUCKET_NAME}/${destination}`;
    console.log(`✅ Uploaded. Public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`❌ Failed upload for ${localPath}:`, error.message);
    return null;
  }
}

async function syncAllAssets() {
  // Mock asset paths - would correspond to local downloaded PDFs
  const localAssetsDir = join(__dirname, 'assets');
  if (!existsSync(localAssetsDir)) {
    console.log('📂 Local assets folder not found. No files to sync. Creating folder placeholder...');
    return;
  }

  const files = readdirSync(localAssetsDir);
  for (const file of files) {
    const localPath = join(localAssetsDir, file);
    const destination = `resources/${file}`;
    const publicUrl = await uploadFile(localPath, destination);

    if (publicUrl) {
      // Update matching download or program document in Firestore
      const downloadsRef = db.collection('downloads');
      const querySnapshot = await downloadsRef.where('title', '>=', file.split('.')[0]).get();
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({
            url: publicUrl,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`🔗 Updated Firestore Document ${doc.id} with new URL.`);
        });
      }
    }
  }
}

syncAllAssets().then(() => {
  console.log('🎉 Sync execution finished.');
}).catch(console.error);
