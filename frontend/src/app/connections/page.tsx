'use client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import dynamic from 'next/dynamic';

const DynamicSshTerminal = dynamic(() => import('@/components/SshTerminal'), { ssr: false });

interface SshConnection {
  id: number;
  name: string;
  host: string;
  port: number;
  username: string;
}

// Initialize socket connection
const socket = io('http://localhost:4000'); // Connect to your backend socket.io server

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<SshConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectedMessage, setConnectedMessage] = useState<string | null>(null);
  const [passwords, setPasswords] = useState<Record<number, string>>({});
  const [isTerminalActive, setIsTerminalActive] = useState(false);

  const setPassword = (id: number, value: string) => {
    setPasswords(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    // Request saved connections from the backend via socket
    socket.emit('ssh:getConnections');

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setError('연결 목록을 불러오는 데 시간이 너무 오래 걸립니다. 백엔드 서버가 실행 중인지 확인하세요.');
    }, 5000); // 5초 후 타임아웃

    socket.on('ssh:connectionsList', (data: SshConnection[]) => {
      clearTimeout(loadingTimeout);
      setConnections(data);
      setLoading(false);
    });

    // Set up socket event listeners
    socket.on('connect', () => {
      console.log('Socket connected to backend');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected from backend');
    });

    socket.on('ssh:connected', () => {
      setConnectedMessage('SSH 연결 성공!');
      console.log('SSH connected successfully!');
      setIsTerminalActive(true);
    });

    socket.on('ssh:error', (message: string) => {
      setConnectedMessage(`SSH 연결 오류: ${message}`);
      console.error('SSH connection error:', message);
      setIsTerminalActive(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ssh:connected');
      socket.off('ssh:error');
    };
  }, []);

  const handleConnect = (connection: SshConnection) => {
    setConnectedMessage(null); // Clear previous messages
    console.log('Attempting to connect to:', connection.name);
    const password = passwords[connection.id];

    socket.emit('ssh:connect', {
      id: connection.id,
      ...(password && { password }), // Only send password if it exists
    });
  };

  const handleDisconnectTerminal = () => {
    setIsTerminalActive(false);
    setConnectedMessage('SSH 연결이 종료되었습니다.');
  };

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">오류 발생: {error}</div>;

  if (isTerminalActive) {
    return (
      <div className="p-4 h-screen flex flex-col bg-black">
        <h1 className="text-2xl font-bold mb-4">SSH 터미널</h1>
        <div className="flex-grow bg-black">
          <DynamicSshTerminal socket={socket} onDisconnect={handleDisconnectTerminal} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">저장된 SSH 연결</h1>
      {connectedMessage && (
        <div className={`p-2 mb-4 rounded ${connectedMessage.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {connectedMessage}
        </div>
      )}
      {connections.length === 0 ? (
        <p>저장된 SSH 연결이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {connections.map((conn) => (
            <li key={conn.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border rounded-md shadow-sm">
              <div className="mb-2 md:mb-0">
                <h2 className="text-lg font-semibold">{conn.name}</h2>
                <p className="text-sm text-gray-600">{conn.username}@{conn.host}:{conn.port}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="password"
                  placeholder="비밀번호 (필요한 경우)"
                  className="px-3 py-2 border rounded-md bg-white text-black"
                  onChange={(e) => setPassword(conn.id, e.target.value)}
                />
                <button
                  onClick={() => handleConnect(conn)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  연결
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}