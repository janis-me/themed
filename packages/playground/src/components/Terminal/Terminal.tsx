import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { Terminal as XTerm } from '@xterm/xterm';
import { Resizable } from 're-resizable';
import { useEffect, useRef } from 'react';

import { useTheme } from '@janis.me/react-themed/js';

import '@xterm/xterm/css/xterm.css';
import './Terminal.scss';

export interface TerminalProps {
  onMount: (xterm: XTerm) => void;
}

export default function Terminal({ onMount }: TerminalProps) {
  const { theme } = useTheme();
  const terminalElementRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<XTerm>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.options.theme = {
        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        foreground: theme === 'dark' ? '#fafafa' : '#1e1e1e',
      };
    }
  }, [theme]);

  useEffect(() => {
    const initializeXterm = () => {
      console.log('Initializing terminal');
      const fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();

      const terminal = new XTerm({
        cursorBlink: true,
        convertEol: true,
        fontFamily: 'IBM Plex Mono, courier-new, courier, monospace',
        theme: {
          background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
          foreground: theme === 'dark' ? '#fafafa' : '#1e1e1e',
        },
      });

      terminal.loadAddon(fitAddon);
      terminal.loadAddon(webLinksAddon);

      onMount(terminal);

      return terminal;
    };

    const terminal = initializeXterm();

    terminalRef.current = terminal;
    const element = terminalElementRef.current;
    if (element) {
      element.innerHTML = '';
      terminal.open(element);
    }

    return () => {
      console.log('Disposing terminal');
      terminal.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- theme updates are not handled here
  }, [onMount]);

  return (
    <Resizable enable={{ top: true }} defaultSize={{ height: '30%' }} maxHeight="50%" minHeight="20%" className="terminal__container" as="div">
      <div className="terminal__instance" ref={terminalElementRef} />
    </Resizable>
  );
}
