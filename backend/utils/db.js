const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    // Fallback or throw error if initialization fails
  }
}

const db = admin.firestore();

const readData = async () => {
  const sshConnectionsRef = db.collection('sshConnections');
  const sshKeysRef = db.collection('sshKeys');

  const [connectionsSnapshot, keysSnapshot] = await Promise.all([
    sshConnectionsRef.get(),
    sshKeysRef.get()
  ]);

  const sshConnections = connectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const sshKeys = keysSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { sshConnections, sshKeys };
};

const addSshConnection = async (connection) => {
  const docRef = await db.collection('sshConnections').add(connection);
  return { id: docRef.id, ...connection };
};

const addSshKey = async (key) => {
  const docRef = await db.collection('sshKeys').add(key);
  return { id: docRef.id, ...key };
};

const deleteSshConnection = async (id) => {
  await db.collection('sshConnections').doc(id).delete();
};

const deleteSshKey = async (id) => {
  await db.collection('sshKeys').doc(id).delete();
};

module.exports = {
  readData,
  addSshConnection,
  addSshKey,
  deleteSshConnection,
  deleteSshKey,
};