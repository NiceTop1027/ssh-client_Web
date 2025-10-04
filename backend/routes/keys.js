const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { readData, addSshKey, deleteSshKey } = require('../utils/db'); // Updated import

const encryptionKey = 'your-super-secret-key'; // In a real app, use environment variables and a more secure key management system.

// Encrypt a private key
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, encryptionKey).toString();
};

// Decrypt a private key
const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

router.get('/', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.sshKeys);
  } catch (error) {
    console.error("Error fetching SSH keys:", error);
    res.status(500).send("Error fetching SSH keys");
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, publicKey, privateKey } = req.body;
    const encryptedPrivateKey = encrypt(privateKey);
    const newKey = { name, publicKey, privateKey: encryptedPrivateKey };
    const addedKey = await addSshKey(newKey); // Use addSshKey
    res.status(201).json(addedKey);
  } catch (error) {
    console.error("Error adding SSH key:", error);
    res.status(500).send("Error adding SSH key");
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSshKey(id); // Use deleteSshKey
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting SSH key:", error);
    res.status(500).send("Error deleting SSH key");
  }
});

module.exports = router;