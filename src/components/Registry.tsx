"use client";

import { useState, useMemo, useCallback } from "react";
import { MCPServer, CATEGORIES, LANGUAGES } from "@/data/types";
import ServerCard from "./ServerCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import LanguageFilter from "./LanguageFilter";

const ITEMS_PER_PAGE = 60;

export default function Registry({ servers }: { servers: MCPServer[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [showOfficial, setShowOfficial] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const server of servers) {
      counts[server.category] = (counts[server.category] || 0) + 1;
    }
    return counts;
  }, [servers]);

  const filtered = useMemo(() => {
    let result = servers;
    if (category !== "All") result = result.filter((s) => s.category === category);
    if (language !== "All") result = result.filter((s) => s.language === language);
    if (showOfficial) result = result.filter((s) => s.isOfficial);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.repo.toLowerCase().includes(q)
      );
    }
    return result;
  }, [servers, search, category, language, showOfficial]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = useCallback(() => {
    setCategory("All");
    setLanguage("All");
    setShowOfficial(false);
    setSearch("");
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const officialCount = servers.filter((s) => s.isOfficial).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="pt-8 pb-6">
        <h1 className="text-[24px] font-semibold text-text-primary">
          Awesome MCP Servers
        </h1>
        <p className="mt-1.5 text-[14px] text-text-secondary">
          Browse and compare {servers.length.toLocaleString()}+ MCP servers. Search, filter by category, language, or official status.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={(val) => { setSearch(val); setVisibleCount(ITEMS_PER_PAGE); }}
          totalCount={servers.length}
          filteredCount={filtered.length}
        />
        <div className="flex items-center gap-2">
          <LanguageFilter
            languages={[...LANGUAGES]}
            selected={language}
            onChange={(l) => { setLanguage(l); setVisibleCount(ITEMS_PER_PAGE); }}
          />
          <button
            onClick={() => { setShowOfficial(!showOfficial); setVisibleCount(ITEMS_PER_PAGE); }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] transition-all whitespace-nowrap ${
              showOfficial
                ? "border-emerald-600/30 bg-emerald-50 text-emerald-700"
                : "border-border-color bg-bg-input text-text-secondary hover:text-text-primary hover:border-border-hover"
            }`}
          >
            Official ({officialCount})
          </button>
        </div>
      </div>

      {/* Count + clear */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[13px] text-text-dim">
          {filtered.length.toLocaleString()} servers
        </span>
        {(category !== "All" || language !== "All" || showOfficial || search) && (
          <button onClick={resetFilters} className="text-[13px] text-text-dim hover:text-text-secondary">
            Clear filters
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="mt-3">
        <CategoryFilter
          categories={[...CATEGORIES]}
          selected={category}
          onChange={(cat) => { setCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
          counts={categoryCounts}
        />
      </div>

      {/* Card grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((server, i) => (
          <ServerCard key={`${server.repo}-${i}`} server={server} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[15px] text-text-primary">No servers found</p>
          <p className="mt-1 text-[13px] text-text-dim">Try adjusting your search or filter criteria.</p>
          <button onClick={resetFilters} className="mt-3 text-[13px] text-accent-blue hover:text-accent-blue/80">
            Clear all filters
          </button>
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="text-[13px] text-text-dim">
            Showing {Math.min(visibleCount, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
          </span>
          <button
            onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
            className="rounded-md border border-border-color px-4 py-1.5 text-[13px] text-text-secondary hover:border-border-hover hover:text-text-primary"
          >
            Load more
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-border-color pt-6 pb-8">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[12px] text-text-dim">
            Data from{" "}
            <a href="https://github.com/punkpeye/awesome-mcp-servers" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary underline underline-offset-2">
              awesome-mcp-servers
            </a>
          </p>
          <p className="text-[12px] text-text-dim">
            Built by{" "}
            <a href="https://www.truefoundry.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary underline underline-offset-2">
              TrueFoundry
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
