const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/db');

router.get('/', (req, res) => {
  const { serverGroups } = readData();
  res.json(serverGroups);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const data = readData();
  const newGroup = { id: data.serverGroups.length > 0 ? Math.max(...data.serverGroups.map(g => g.id)) + 1 : 1, name, connections: [] };
  data.serverGroups.push(newGroup);
  writeData(data);
  res.status(201).json(newGroup);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, connections } = req.body;
  const data = readData();
  const group = data.serverGroups.find(g => g.id === parseInt(id));
  if (group) {
    group.name = name || group.name;
    group.connections = connections || group.connections;
    writeData(data);
    res.json(group);
  } else {
    res.status(404).send('Group not found');
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const initialLength = data.serverGroups.length;
  data.serverGroups = data.serverGroups.filter(g => g.id !== parseInt(id));
  if (data.serverGroups.length < initialLength) {
    writeData(data);
    res.status(204).send();
  } else {
    res.status(404).send('Group not found');
  }
});

module.exports = router;
