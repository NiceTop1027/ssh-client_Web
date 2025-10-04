'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Plus, Trash, Edit } from 'lucide-react';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/groups').then(res => res.json()).then(setGroups);
  }, []);

  const handleAddGroup = async () => {
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newGroup = await res.json();
    setGroups([...groups, newGroup]);
    setName('');
  };

  const handleDeleteGroup = async (id) => {
    await fetch(`/api/groups/${id}`, { method: 'DELETE' });
    setGroups(groups.filter(group => group.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Server Group Management</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto">
          Organize your servers into groups for easy access.
        </p>
      </div>
      <motion.div
        className="mt-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Create New Group</h2>
          <div className="flex space-x-4">
            <input type="text" placeholder="Group Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <button onClick={handleAddGroup} className="flex items-center space-x-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <Plus size={20} />
              <span>Create Group</span>
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Your Groups</h2>
          <div className="space-y-4">
            {groups.map(group => (
              <div key={group.id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Server size={24} className="text-blue-400" />
                  <span className="font-semibold text-lg">{group.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-md hover:bg-gray-700"><Edit size={20} /></button>
                  <button onClick={() => handleDeleteGroup(group.id)} className="p-2 rounded-md hover:bg-gray-700"><Trash size={20} className="text-red-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
