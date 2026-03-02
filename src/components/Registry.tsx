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
    <div>
      {/* Hero — matches truefoundry.com/models hero */}
      <div className="relative overflow-hidden border-b border-border-default">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-hero-center via-bg-page to-bg-page opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-surface/60 px-4 py-1.5 text-[13px] text-text-secondary mb-5">
            <svg className="h-[14px] w-[14px] text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            MCP Server Catalog
          </div>

          {/* Title */}
          <h1 className="text-[32px] font-bold tracking-[-0.02em] text-text-primary sm:text-[40px]">
            Supported MCP Servers
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-text-secondary">
            Browse and compare MCP servers from the community. Search, filter,
            and sort by categories, features, and languages.
          </p>

          {/* Search row — full width search + language dropdown */}
          <div className="mx-auto mt-8 flex max-w-3xl gap-3">
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              totalCount={servers.length}
              filteredCount={filtered.length}
            />
            <LanguageFilter
              languages={[...LANGUAGES]}
              selected={language}
              onChange={(l) => {
                setLanguage(l);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Count row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-text-primary">
              {filtered.length.toLocaleString()} servers
            </span>
            <button
              onClick={() => {
                setShowOfficial(!showOfficial);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all ${
                showOfficial
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-border-default text-text-muted hover:border-border-light hover:text-text-secondary"
              }`}
            >
              <svg className="h-[12px] w-[12px]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Official ({officialCount})
            </button>
          </div>
          {(category !== "All" || language !== "All" || showOfficial || search) && (
            <button
              onClick={resetFilters}
              className="text-[13px] text-text-muted hover:text-text-secondary transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Category pills */}
        <CategoryFilter
          categories={[...CATEGORIES]}
          selected={category}
          onChange={(cat) => {
            setCategory(cat);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          counts={categoryCounts}
        />

        {/* Card grid */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((server, i) => (
            <ServerCard key={`${server.repo}-${i}`} server={server} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="h-10 w-10 text-text-muted/30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p className="mt-3 text-[15px] font-medium text-text-primary">No servers found</p>
            <p className="mt-1 text-[13px] text-text-muted">Try adjusting your search or filter criteria.</p>
            <button onClick={resetFilters} className="mt-4 text-[13px] font-medium text-accent-purple hover:text-accent-purple-hover">
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination / Load more */}
        {hasMore && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-[13px] text-text-muted">
              Showing {Math.min(visibleCount, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} servers
            </span>
            <button
              onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
              className="rounded-md border border-border-default bg-bg-surface px-4 py-1.5 text-[13px] font-medium text-text-secondary transition-all hover:border-border-light hover:text-text-primary"
            >
              Next
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-border-default pt-6 pb-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-[12px] text-text-muted">
              Data sourced from{" "}
              <a href="https://github.com/punkpeye/awesome-mcp-servers" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary underline underline-offset-2 decoration-border-default">
                awesome-mcp-servers
              </a>
            </p>
            <p className="text-[12px] text-text-muted">
              Built by{" "}
              <a href="https://www.truefoundry.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary underline underline-offset-2 decoration-border-default">
                TrueFoundry
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
