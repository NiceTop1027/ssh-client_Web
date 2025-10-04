'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import io from 'socket.io-client';
import Link from 'next/link';

interface SshConnection {
  id: number;
  name: string;
  host: string;
  port: number;
  username: string;
}

const socket = io('http://localhost:4000');

export default function RecentConnections() {
  const [connections, setConnections] = useState<SshConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.emit('ssh:getConnections');

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setError('최근 연결 목록을 불러오는 데 시간이 너무 오래 걸립니다. 백엔드 서버가 실행 중인지 확인하세요.');
    }, 5000); // 5초 후 타임아웃

    socket.on('ssh:connectionsList', (data: SshConnection[]) => {
      clearTimeout(loadingTimeout);
      setConnections(data);
      setLoading(false);
    });

    socket.on('connect', () => {
      console.log('Socket connected to backend from RecentConnections');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected from backend from RecentConnections');
    });

    return () => {
      socket.off('ssh:connectionsList');
      socket.off('connect');
      socket.off('disconnect');
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (loading) return <div className="text-center text-gray-400">로딩 중...</div>;
  if (error) return <div className="text-center text-red-500">오류 발생: {error}</div>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <History size={28} />
        <span>최근 연결</span>
      </h2>
      <div className="space-y-4">
        {connections.length === 0 ? (
          <p className="text-gray-400 text-center">저장된 연결이 없습니다.</p>
        ) : (
          connections.map((conn, index) => (
            <motion.div
              key={conn.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between relative z-10 opacity-100"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <span className="font-semibold text-lg">{conn.name}</span>
                <p className="text-gray-400">{conn.username}@{conn.host}:{conn.port}</p>
              </div>
              <Link href={`/connections?id=${conn.id}`} className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">연결</Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
