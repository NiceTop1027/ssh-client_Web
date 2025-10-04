const express = require('express');
const router = express.Router();
const { readData } = require('../utils/db');

// Endpoint to list all saved SSH connections
router.get('/', async (req, res) => {
  try {
    const { sshConnections } = await readData();
    res.json(sshConnections);
  } catch (error) {
    console.error("Error fetching SSH connections:", error);
    res.status(500).send("Error fetching SSH connections");
  }
});

// Endpoint to retrieve details of a saved SSH connection by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sshConnections } = await readData();
    const connectionDetails = sshConnections.find(conn => conn.id === parseInt(id));

    if (!connectionDetails) {
      return res.status(404).send('Saved connection not found');
    }

    // Return the connection details. The client will use these to initiate the SSH connection.
    res.json(connectionDetails);
  } catch (error) {
    console.error("Error fetching SSH connection details:", error);
    res.status(500).send("Error fetching SSH connection details");
  }
});

module.exports = router;