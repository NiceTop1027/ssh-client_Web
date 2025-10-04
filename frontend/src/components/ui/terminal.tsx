'use client';

import { useEffect, useRef } from 'react';
import { Terminal as Xterm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export default function Terminal({ socket }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Xterm({ cursorBlink: true });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    setTimeout(() => fitAddon.fit(), 1);

    socket.on('ssh:data', (data) => {
      term.write(data);
    });

    term.onData((data) => {
      socket.emit('ssh:command', data);
    });

    return () => {
      term.dispose();
      socket.off('ssh:data');
    };
  }, [socket]);

  return <div ref={terminalRef} className="w-full h-full" />;
}
