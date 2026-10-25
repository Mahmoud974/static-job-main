import { useMemo, useState } from "react";
import { X, Terminal, Circle } from "lucide-react";
import jobsData from "./assets/db.json";

type Task = {
  id: number | string;
  company: string;
  logo?: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  role: string;
  level: string;
  languages: string[];
  tools: string[];
  new?: boolean;
  featured?: boolean;
};

type FilterbarProps = {
  searchRole: string;
  searchLevel: string;
  searchLanguage: string;
  setSearchRole: (value: string) => void;
  setSearchLevel: (value: string) => void;
  setSearchLanguage: (value: string) => void;
};

// JSON Server utilisait la collection /articles : elle se trouve ici dans db.json.
// Accepte également un fichier JSON dont la racine est directement un tableau.
const rawData: unknown = jobsData;
const articles: unknown = Array.isArray(rawData)
  ? rawData
  : rawData && typeof rawData === "object" && "articles" in rawData
    ? (rawData as { articles: unknown }).articles
    : null;

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== "object") return false;
  const job = value as Record<string, unknown>;
  return (
    (typeof job.id === "number" || typeof job.id === "string") &&
    typeof job.company === "string" &&
    typeof job.position === "string" &&
    typeof job.postedAt === "string" &&
    typeof job.contract === "string" &&
    typeof job.location === "string" &&
    typeof job.role === "string" &&
    typeof job.level === "string" &&
    Array.isArray(job.languages) && job.languages.every((v) => typeof v === "string") &&
    Array.isArray(job.tools) && job.tools.every((v) => typeof v === "string")
  );
};

const validData = Array.isArray(articles) && articles.every(isTask);
const jobs: Task[] = validData ? (articles as Task[]) : [];

function Filterbar({
  searchRole,
  searchLevel,
  searchLanguage,
  setSearchRole,
  setSearchLevel,
  setSearchLanguage,
}: FilterbarProps) {
  const flags = [
    { key: "role", value: searchRole, clear: () => setSearchRole("") },
    { key: "level", value: searchLevel, clear: () => setSearchLevel("") },
    { key: "lang", value: searchLanguage, clear: () => setSearchLanguage("") },
  ].filter((flag) => flag.value !== "");

  return (
    <div className="lg:max-w-5xl mx-auto px-4 lg:px-0 -mt-8 relative z-10">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl shadow-black/40 overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/60 border-b border-slate-800">
          <Circle className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
          <Circle className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
          <Circle className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
          <span className="ml-3 text-[11px] font-mono text-slate-500 tracking-wide">jobs — filter</span>
        </div>
        <div className="px-4 py-4 font-mono text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lime-400 select-none">$</span>
            <span className="text-slate-400 select-none">grep</span>
            {flags.length === 0 && (
              <span className="text-slate-600 select-none">
                --role= --level= --lang=
                <span className="inline-block w-[7px] h-[15px] bg-lime-400/70 ml-1 align-middle animate-pulse" />
              </span>
            )}
            {flags.map((flag) => (
              <span
                key={flag.key}
                className="group flex items-center gap-1 bg-lime-400/10 text-lime-300 border border-lime-400/30 rounded px-2 py-1 text-xs"
              >
                <span className="text-slate-500">--{flag.key}=</span>
                {flag.value}
                <button
                  type="button"
                  aria-label={`Remove ${flag.key} filter`}
                  onClick={flag.clear}
                  className="ml-1 text-lime-300/60 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {flags.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearchRole("");
                  setSearchLevel("");
                  setSearchLanguage("");
                }}
                className="ml-auto text-xs text-slate-500 hover:text-white underline underline-offset-2 decoration-slate-700 transition-colors"
              >
                clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  task: Task;
  index: number;
  setSearchRole: (value: string) => void;
  setSearchLevel: (value: string) => void;
  setSearchLanguage: (value: string) => void;
};

function Tag({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-lime-300 hover:bg-lime-400 hover:text-slate-950 transition-colors"
    >
      {label}
    </button>
  );
}

function Card({ task, index, setSearchRole, setSearchLevel, setSearchLanguage }: CardProps) {
  return (
    <li
      className={`group relative bg-slate-900 border rounded-lg px-5 py-5 lg:px-6 flex flex-col lg:flex-row lg:items-center gap-4 transition-colors ${
        task.featured ? "border-lime-400/50" : "border-slate-800 hover:border-slate-700"
      }`}
    >
      {task.featured && <span className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-lime-400" />}
      <span className="hidden lg:block font-mono text-xs text-slate-600 w-6 text-right select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="w-11 h-11 shrink-0 rounded-md bg-slate-800 flex items-center justify-center font-mono text-xs text-lime-300 border border-slate-700">
        {task.company.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-mono text-sm text-lime-400">{task.company}</span>
          {task.new && (
            <span className="text-[10px] font-mono uppercase tracking-wider bg-lime-400 text-slate-950 px-1.5 py-0.5 rounded-sm">
              new
            </span>
          )}
          {task.featured && (
            <span className="text-[10px] font-mono uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded-sm">
              featured
            </span>
          )}
        </div>
        <h2 className="font-mono text-base text-white font-medium truncate">{task.position}</h2>
        <p className="font-mono text-xs text-slate-500 mt-1">
          {task.postedAt} · {task.contract} · {task.location}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
        <Tag label={task.role} onClick={() => setSearchRole(task.role)} />
        <Tag label={task.level} onClick={() => setSearchLevel(task.level)} />
        {task.languages.map((language) => (
          <Tag key={`lang-${language}`} label={language} onClick={() => setSearchLanguage(language)} />
        ))}
        {task.tools.map((tool) => (
          <Tag key={`tool-${tool}`} label={tool} onClick={() => setSearchLanguage(tool)} />
        ))}
      </div>
    </li>
  );
}

export default function App() {
  const [searchRole, setSearchRole] = useState("");
  const [searchLevel, setSearchLevel] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");

  const filtered = useMemo(
    () =>
      jobs.filter(
        (item) =>
          (searchRole === "" || item.role === searchRole) &&
          (searchLevel === "" || item.level === searchLevel) &&
          (searchLanguage === "" || item.languages.includes(searchLanguage) || item.tools.includes(searchLanguage))
      ),
    [searchRole, searchLevel, searchLanguage]
  );

  return (
    <section className="min-h-screen bg-slate-950">
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 h-40 lg:h-48 flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex items-center gap-3 text-slate-300">
          <Terminal className="w-6 h-6 text-lime-400" />
          <span className="font-mono text-sm tracking-wide">
            ~/jobs <span className="text-lime-400">$</span>{" "}
            {!validData ? "error" : `${filtered.length} results`}
          </span>
        </div>
      </div>

      <Filterbar
        searchRole={searchRole}
        searchLevel={searchLevel}
        searchLanguage={searchLanguage}
        setSearchRole={setSearchRole}
        setSearchLevel={setSearchLevel}
        setSearchLanguage={setSearchLanguage}
      />

      <div className="lg:max-w-5xl mx-auto px-4 lg:px-0 mt-10 pb-16" aria-live="polite">
        {!validData ? (
          <div role="alert" className="text-center font-mono text-sm text-red-400 py-16">
            Données invalides : vérifie que src/assets/db.json contient une collection "articles" avec les champs attendus.
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center font-mono text-sm text-slate-600 py-16 border border-dashed border-slate-800 rounded-lg">
            no matches — try clearing a filter
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {filtered.map((task, index) => (
              <Card
                key={task.id}
                task={task}
                index={index}
                setSearchRole={setSearchRole}
                setSearchLevel={setSearchLevel}
                setSearchLanguage={setSearchLanguage}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
