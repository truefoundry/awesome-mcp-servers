"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-bg-page/95 backdrop-blur-md">
      <div className="mx-auto flex h-[56px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/tfy-logo.svg"
            alt="TrueFoundry"
            width={30}
            height={30}
            className="h-[30px] w-[30px]"
          />
          <span className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
            MCP Server Registry
          </span>
        </a>

        <nav className="flex items-center gap-0.5">
          <a
            href="https://docs.truefoundry.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              className="h-[16px] w-[16px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Docs
          </a>
          <a
            href="https://github.com/punkpeye/awesome-mcp-servers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              className="h-[16px] w-[16px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.truefoundry.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-md bg-accent-orange px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-orange-hover"
          >
            Book Demo
          </a>
        </nav>
      </div>
    </header>
  );
}
