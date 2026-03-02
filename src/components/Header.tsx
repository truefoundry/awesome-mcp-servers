"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 border-b border-border-color bg-white">
      <div className="mx-auto flex h-[52px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/2026-03-03_01.59.58.png"
            alt="TrueFoundry"
            width={140}
            height={28}
          />
          <span className="text-[13px] text-text-dim">/</span>
          <span className="text-[14px] font-medium text-text-primary tracking-[-0.01em]">
            Awesome MCP Servers
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <a
            href="https://docs.truefoundry.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            Docs
          </a>
          <a
            href="https://github.com/punkpeye/awesome-mcp-servers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://truefoundry.com/book-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-md bg-accent-orange px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-orange-hover"
          >
            Book Demo
          </a>
        </nav>
      </div>
    </header>
  );
}
