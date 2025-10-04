'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck } from 'lucide-react';

import RecentConnections from '@/components/ui/recent-connections';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center text-center p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold">NT-SSHCL</h1>
        <p className="mt-4 text-2xl">쉽고 안전한 SSH 연결 플랫폼.</p>
        <div className="mt-12 flex space-x-6">
          <Link href="/connect" className="flex items-center space-x-3 px-8 py-4 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            <Rocket size={24} />
            <span>SSH 연결 시작</span>
          </Link>
          <Link href="/details" className="flex items-center space-x-3 px-8 py-4 font-semibold text-white bg-gray-700 rounded-lg shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105">
            <ShieldCheck size={24} />
            <span>더 알아보기</span>
          </Link>
        </div>
      </motion.div>
      <RecentConnections />
    </div>
  );
}
