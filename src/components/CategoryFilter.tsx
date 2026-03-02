"use client";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => {
          const isActive = selected === category;
          const count = category === "All" ? undefined : counts[category];
          if (count === undefined && category !== "All") return null;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-[6px] text-[13px] transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-accent-blue border-accent-blue text-white font-medium"
                  : "bg-bg-card border-border-color text-text-secondary hover:border-border-hover hover:text-text-primary"
              }`}
            >
              {category}
              {count !== undefined && (
                <span className={isActive ? "text-white/60" : "text-text-dim"}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
