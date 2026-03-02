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
      className="group flex flex-col justify-between rounded-lg border border-border-default bg-bg-secondary p-5 transition-all duration-200 hover:border-border-light hover:bg-bg-surface min-h-[148px]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-semibold text-text-primary leading-snug min-w-0 group-hover:text-accent-purple-hover transition-colors">
            {server.name}
          </h3>
          {server.isOfficial && (
            <span className="shrink-0 rounded-[4px] bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-400 border border-emerald-500/20 uppercase">
              Official
            </span>
          )}
        </div>
        <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary line-clamp-2">
          {server.description}
        </p>
      </div>
      <div className="mt-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {server.language && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-block h-[8px] w-[8px] rounded-full ${
                  languageColors[server.language] || "bg-[#6b6578]"
                }`}
              />
              <span className="text-[12px] text-text-muted">
                {server.language}
              </span>
            </div>
          )}
        </div>
        <span className="rounded-full bg-bg-elevated px-2 py-0.5 text-[11px] font-medium text-text-muted">
          {server.category}
        </span>
      </div>
    </a>
  );
}
