'use client';

import { motion } from 'framer-motion';
import { Server, Key, Terminal, Shield } from 'lucide-react';

const features = [
  {
    name: 'Easy Server Management',
    description: 'A graphical user interface to manage your servers with ease.',
    icon: <Server size={48} className="text-blue-400" />,
  },
  {
    name: 'SSH Key Management',
    description: 'Securely store and manage your SSH keys.',
    icon: <Key size={48} className="text-blue-400" />,
  },
  {
    name: 'Multiple Connections',
    description: 'Support for multiple simultaneous SSH connections.',
    icon: <Terminal size={48} className="text-blue-400" />,
  },
  {
    name: 'Secure & Encrypted',
    description: 'All communication is encrypted and secure.',
    icon: <Shield size={48} className="text-blue-400" />,
  },
];

export default function DetailsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">NT-SSHCL 소개</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto">
          NT-SSHCL은 웹 기반 SSH 클라이언트로, 어떤 브라우저에서든 안전하게 서버에 연결할 수 있습니다. 로컬 머신에 클라이언트 소프트웨어를 설치할 필요가 없습니다. 서버를 관리하기 위한 간단하고 직관적인 인터페이스를 제공합니다.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-6">{feature.icon}</div>
            <h2 className="text-2xl font-bold">{feature.name === 'Easy Server Management' ? '쉬운 서버 관리' : feature.name === 'SSH Key Management' ? 'SSH 키 관리' : feature.name === 'Multiple Connections' ? '다중 연결' : feature.name === 'Secure & Encrypted' ? '보안 및 암호화' : feature.name}</h2>
            <p className="mt-4 text-gray-400">{feature.description === 'A graphical user interface to manage your servers with ease.' ? '서버를 쉽게 관리할 수 있는 그래픽 사용자 인터페이스.' : feature.description === 'Securely store and manage your SSH keys.' ? 'SSH 키를 안전하게 저장하고 관리하세요.' : feature.description === 'Support for multiple simultaneous SSH connections.' ? '여러 개의 동시 SSH 연결을 지원합니다.' : feature.description === 'All communication is encrypted and secure.' ? '모든 통신은 암호화되어 안전합니다.' : feature.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-20 text-center">
        <a href="/connect" className="px-8 py-4 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          지금 시작하기
        </a>
      </div>
    </div>
  );
}