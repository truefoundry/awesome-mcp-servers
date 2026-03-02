"use client";

interface LanguageFilterProps {
  languages: string[];
  selected: string;
  onChange: (language: string) => void;
}

export default function LanguageFilter({
  languages,
  selected,
  onChange,
}: LanguageFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="shrink-0 rounded-lg border border-border-color bg-bg-input px-3 py-2.5 text-[14px] text-text-secondary outline-none transition-colors focus:border-border-hover cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%222%22%20stroke%3D%22%2394a3b8%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_8px_center] bg-no-repeat"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang === "All" ? "All Languages" : lang}
        </option>
      ))}
    </select>
  );
}
