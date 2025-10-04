'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Wifi, WifiOff, Server, Plus, AlertTriangle } from 'lucide-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './styles.css';

const DynamicSshTerminal = dynamic(() => import('@/components/SshTerminal'), { ssr: false });

export default function ConnectPage() {
  const [connections, setConnections] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [serverAddress, setServerAddress] = useState('');
  const [port, setPort] = useState('22');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeConnectionSocket, setActiveConnectionSocket] = useState<any>(null); // To hold the socket of the active connection
  const [isTerminalActive, setIsTerminalActive] = useState(false); // State to control terminal display

  const handleConnect = () => {
    setIsConnecting(true);
    const newConnection = { id: Date.now(), serverAddress, port, username, password, socket: io('http://localhost:4000'), status: 'connecting' };
    // setConnections([...connections, newConnection]); // We will manage a single active connection for now

    newConnection.socket.emit('ssh:connect', { host: serverAddress, port, username, password });
    newConnection.socket.on('ssh:connected', () => {
      // setConnections(prev => prev.map(c => c.id === newConnection.id ? { ...c, status: 'connected' } : c));
      setIsConnecting(false);
      setShowModal(false);
      setActiveConnectionSocket(newConnection.socket);
      setIsTerminalActive(true);
    });
    newConnection.socket.on('ssh:error', (message: string) => {
      // setConnections(prev => prev.map(c => c.id === newConnection.id ? { ...c, status: 'error' } : c));
      console.error('SSH 연결 오류:', message);
      setIsConnecting(false);
      setIsTerminalActive(false);
      alert(`SSH 연결 오류: ${message}`); // Alert the user about the error
      newConnection.socket.disconnect(); // Disconnect the socket on error
    });
  };

  const handleDisconnectTerminal = () => {
    if (activeConnectionSocket) {
      activeConnectionSocket.disconnect();
    }
    setIsTerminalActive(false);
    setActiveConnectionSocket(null);
    setShowModal(true); // Show the connection modal again
  };

  // The rest of the component's logic will be adjusted to handle a single active terminal
  // and the modal for new connections.

  if (isTerminalActive && activeConnectionSocket) {
    return (
      <div className="w-screen h-screen bg-black text-white flex flex-col">
        <div className="p-2 bg-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">SSH 세션: {username}@{serverAddress}:{port}</h2>
          <button onClick={handleDisconnectTerminal} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">연결 해제</button>
        </div>
        <div className="flex-grow">
          <DynamicSshTerminal socket={activeConnectionSocket} onDisconnect={handleDisconnectTerminal} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col">
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-10 bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-center mb-6">새 연결</h1>
              <div className="space-y-4">
                <input type="text" placeholder="서버 주소" value={serverAddress} onChange={(e) => setServerAddress(e.target.value)} className="w-full px-4 py-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="포트" value={port} onChange={(e) => setPort(e.target.value)} className="w-full px-4 py-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="사용자 이름" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mt-8">
                <button onClick={handleConnect} disabled={isConnecting} className="w-full flex items-center justify-center space-x-3 px-6 py-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500 transition-all">
                  {isConnecting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Loader size={24} /></motion.div> : <Wifi size={24} />}
                  <span>{isConnecting ? '연결 중...' : '연결'}</span>
                </button>
              </div>
              {/* No cancel button here, as the modal is for initial connection */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Removed Tabs for multiple connections, focusing on a single active terminal */}
      {/* If you need multiple connections, the logic would be more complex */}
    </div>
  );
}