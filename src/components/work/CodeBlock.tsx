import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const CodeBlock = ({ code, label }: { code: string; label?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="code-wrap group">
      {label && <div className="code-label">{label}</div>}
      <button onClick={copy} className="code-copy" aria-label="Copy">
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
      <pre className="code-pre"><code>{code}</code></pre>
    </div>
  );
};

export default CodeBlock;
