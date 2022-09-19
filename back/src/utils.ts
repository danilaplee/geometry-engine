const admin = require("firebase-admin");
// const serviceAccount = require("../serviceAccountKey.json");
import { firebaseConfig } from './config'

admin.initializeApp({
  ...firebaseConfig,
  // credential: admin.credential.cert(serviceAccount),
  databaseAuthVariableOverride: {
    uid: "polygon-sqs-processor"
  }
});

const db = admin.database();

export const setCors = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    // res.send('Hello World!');
  }
  return res
}

export const getDB = () => {
  return db;
}