import { Terminal as XTerm } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

import '@xterm/xterm/css/xterm.css';
import './Terminal.scss';

import { Resizable } from 're-resizable';

export interface TerminalProps {
  onMount: (xterm: XTerm) => void;
  onResize?: (terminalMeta: { rows: number; cols: number }) => void;
}

export default function Terminal({ onMount, onResize }: TerminalProps) {
  const terminalElementRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<XTerm>(null);

  useEffect(() => {
    const initializeXterm = async () => {
      const { Terminal: XTerm } = await import('@xterm/xterm');
      const { FitAddon } = await import('@xterm/addon-fit');
      const { WebLinksAddon } = await import('@xterm/addon-web-links');

      const element = terminalElementRef.current!;

      const fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();

      const terminal = new XTerm({
        cursorBlink: true,
        convertEol: true,
        fontFamily: 'IBM Plex Mono, courier-new, courier, monospace',
        theme: {
          background: '#1e1e1e',
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

      onMount?.(terminal);

      return [terminal, resizeObserver] as const;
    };

    const res = initializeXterm();

    return () => {
      res.then(([terminal, resizeObserver]) => {
        terminal.dispose();
        resizeObserver.disconnect();
      });
    };
  }, []);

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
