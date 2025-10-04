'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Socket } from 'socket.io-client';

interface SshTerminalProps {
  socket: Socket;
  onDisconnect: () => void;
}

const SshTerminal: React.FC<SshTerminalProps> = ({ socket, onDisconnect }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontFamily: 'monospace',
        fontSize: 14,
        theme: {
          background: '#000000',
          foreground: '#FFFFFF',
          cursor: '#FFFFFF',
          selectionBackground: '#888888',
        },
      });
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      setTimeout(() => fitAddon.fit(), 0); // Defer fit() call slightly

      xtermRef.current = term;
      fitAddonRef.current = fitAddon;

      // Handle incoming data from the SSH server
      socket.on('ssh:data', (data: string) => {
        term.write(data);
      });

      // Handle terminal input from the user
      term.onData((data) => {
        socket.emit('ssh:command', data);
      });

      // Handle disconnect from the backend
      socket.on('ssh:disconnected', () => {
        console.log('SSH disconnected from backend');
        onDisconnect();
      });

      // Handle window resize
      const handleResize = () => {
        fitAddon.fit();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        term.dispose();
        socket.off('ssh:data');
        socket.off('ssh:disconnected');
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [socket, onDisconnect]);

  return <div ref={terminalRef} className="w-full h-full" />;
};

export default SshTerminal;
