'use client';

import React, { useState, useRef } from 'react';

const copyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function PreWithCopy({ children }: { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (!preRef.current) return;

    const nodes = preRef.current.childNodes;
    let textToCopy = '';

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textToCopy += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName !== 'BUTTON') {
          textToCopy += el.innerText;
        }
      }
    });

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ position: 'relative', width: '95%', marginLeft: '1%' }}>
      <pre
        ref={preRef}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#e0e0e0',
          padding: '1rem',
          paddingRight: '4rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
          maxHeight: '500px',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: '#555 transparent',
        }}
      >
        {children}
      </pre>

      <style>
        {`
          pre, pre code {
            white-space: pre-wrap;
            word-break: break-word;
            overflow-wrap: anywhere;
          }

          pre code {
            display: block;
            width: 100%;
          }

          pre::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }
          pre::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 10px;
          }
          pre::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>

      <button
        onClick={handleCopy}
        aria-label="Copiar código"
        style={{
          position: 'absolute',
          top: '-14px',
          right: '-14px',
          color: copied ? '#191919' : '#cf7d25',
          border: '1px solid rgba(207, 125, 37, 0.6)',
          borderRadius: 6,
          padding: '6px 10px',
          cursor: 'pointer',
          backgroundColor: copied ? '#cf7d25' : '#191919',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: copied ? 6 : 0,
          fontWeight: 600,
          fontSize: 14,
          userSelect: 'none',
          transition:
            'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
          boxShadow: copied
            ? '0 0 10px 2px rgba(207, 125, 37, 0.9), 0 0 20px 4px rgba(207, 125, 37, 0.6)'
            : '0 0 8px rgba(207, 125, 37, 0.7), 0 0 16px rgba(207, 125, 37, 0.4)',
          minWidth: copied ? undefined : 36,
          height: 36,
          transform: copied ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            transition: 'transform 0.3s ease',
            transform: copied ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          {copied ? checkIcon : copyIcon}
        </span>
        <span
          style={{
            userSelect: 'none',
            display: copied ? 'inline' : 'none',
          }}
        >
          Copiado
        </span>
      </button>
    </div>
  );
}
