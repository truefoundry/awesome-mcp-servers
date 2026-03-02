"use client";

import { MCPServer } from "@/data/types";

const languageColors: Record<string, string> = {
  Python: "bg-[#3572A5]",
  TypeScript: "bg-[#3178C6]",
  Go: "bg-[#00ADD8]",
  Rust: "bg-[#DEA584]",
  "C#": "bg-[#178600]",
  Java: "bg-[#B07219]",
  Ruby: "bg-[#CC342D]",
  "C/C++": "bg-[#555555]",
};

export default function ServerCard({ server }: { server: MCPServer }) {
  return (
    <a
      href={server.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between rounded-lg border border-border-color bg-bg-card p-5 transition-all duration-150 hover:border-border-hover hover:shadow-sm min-h-[148px]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-semibold text-text-primary leading-snug min-w-0">
            {server.name}
          </h3>
          {server.isOfficial && (
            <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-700 border border-emerald-200 uppercase">
              Official
            </span>
          )}
        </div>
        <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary line-clamp-2">
          {server.description}
        </p>
      </div>
      <div className="mt-3.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {server.language && (
            <>
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  languageColors[server.language] || "bg-[#94a3b8]"
                }`}
              />
              <span className="text-[12px] text-text-dim">
                {server.language}
              </span>
            </>
          )}
        </div>
        <span className="rounded-full border border-border-color px-2 py-0.5 text-[11px] text-text-dim">
          {server.category}
        </span>
      </div>
    </a>
  );
}
