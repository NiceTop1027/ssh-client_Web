'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Plus, Trash, Copy } from 'lucide-react';

export default function KeysPage() {
  const [keys, setKeys] = useState([]);
  const [name, setName] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/keys').then(res => res.json()).then(setKeys);
  }, []);

  const handleAddKey = async () => {
    const res = await fetch('http://localhost:4000/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, publicKey, privateKey }),
    });
    const newKey = await res.json();
    setKeys([...keys, newKey]);
    setName('');
    setPublicKey('');
    setPrivateKey('');
  };

  const handleDeleteKey = async (id) => {
    await fetch(`http://localhost:4000/api/keys/${id}`, { method: 'DELETE' });
    setKeys(keys.filter(key => key.id !== id));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">SSH 키 관리</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto">
          안전한 연결을 위한 SSH 키를 관리하세요.
        </p>
      </div>
      <motion.div
        className="mt-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">새 키 추가</h2>
          <div className="space-y-4">
            <input type="text" placeholder="키 이름" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <textarea placeholder="공개 키" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} rows={4} className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            <textarea placeholder="개인 키" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} rows={8} className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
          <div className="mt-6 text-right">
            <button onClick={handleAddKey} className="flex items-center space-x-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <Plus size={20} />
              <span>키 추가</span>
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">내 키</h2>
          <div className="space-y-4">
            {keys.map(key => (
              <div key={key.id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Key size={24} className="text-blue-400" />
                  <span className="font-semibold text-lg">{key.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handleCopy(key.publicKey)} className="p-2 rounded-md hover:bg-gray-700"><Copy size={20} /></button>
                  <button onClick={() => handleDeleteKey(key.id)} className="p-2 rounded-md hover:bg-gray-700"><Trash size={20} className="text-red-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
