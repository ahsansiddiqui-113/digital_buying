"use client";
import { useState } from "react";

interface CopyButtonProps {
  code: string;
  /** compact = small inline button for hex swatches etc. */
  compact?: boolean;
}

export function CopyButton({ code, compact = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <button
        onClick={copy}
        title={`Copy ${code}`}
        className="text-[10px] font-semibold text-slate-400 hover:text-slate-700 transition leading-none"
      >
        {copied ? "✓" : "⧉"}
      </button>
    );
  }

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-semibold
        bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}
