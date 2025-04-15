import { Terminal as XTerm } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

import '@xterm/xterm/css/xterm.css';
import './Terminal.scss';

import { Resizable } from 're-resizable';

import { useTheme } from '@janis.me/react-themed/js';

export interface TerminalProps {
  onMount: (xterm: XTerm) => void;
  onResize?: (terminalMeta: { rows: number; cols: number }) => void;
}

export default function Terminal({ onMount, onResize }: TerminalProps) {
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
  }, [theme, terminalRef.current]);

  useEffect(() => {
    const initializeXterm = async () => {
      if (terminalRef.current) throw new Error('Terminal already initialized');
      if (!terminalElementRef.current) throw new Error('Terminal element ref is null');

      const { Terminal: XTerm } = await import('@xterm/xterm');
      const { FitAddon } = await import('@xterm/addon-fit');
      const { WebLinksAddon } = await import('@xterm/addon-web-links');

      const element = terminalElementRef.current;

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

      terminalRef.current = terminal;

      terminal.loadAddon(fitAddon);
      terminal.loadAddon(webLinksAddon);
      terminal.open(element);

      const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
        onResize?.({ rows: terminal.rows, cols: terminal.cols });
      });

      resizeObserver.observe(element);

      onMount(terminal);

      return [terminal, resizeObserver] as const;
    };

    const res = initializeXterm();

    return () => {
      res
        .then(([terminal, resizeObserver]) => {
          terminal.dispose();
          resizeObserver.disconnect();
        })
        .catch((error: unknown) => {
          console.error('Terminal error:', error);
        });
    };
  }, [onMount, onResize, theme]);

  return (
    <Resizable
      enable={{ top: true }}
      defaultSize={{ height: '30%' }}
      maxHeight="50%"
      minHeight="20%"
      className="terminal__container"
      as="div"
    >
      <div className="terminal__instance" ref={terminalElementRef} />
    </Resizable>
  );
}
