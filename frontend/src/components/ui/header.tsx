'use client';

import Link from 'next/link';
import React from 'react';
import { Home, Terminal, Info, Mail, Key, Server, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold">
        <Link href="/">NT-SSHCL</Link>
      </div>
      <nav>
        <ul className="flex items-center space-x-6">
          <li>
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <Home size={20} /><span>홈</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/connect" className="flex items-center space-x-2">
                <Terminal size={20} /><span>SSH 연결</span>
              </Link>
            </Button>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Server size={20} /><span>연결</span><ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                <DropdownMenuItem asChild>
                  <Link href="/connections">
                    저장된 연결
                  </Link>
                </DropdownMenuItem>
                {/* Add other connection-related links here if needed */}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/keys" className="flex items-center space-x-2">
                <Key size={20} /><span>SSH 키</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/details" className="flex items-center space-x-2">
                <Info size={20} /><span>세부 정보</span>
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}