import { useMemo, useState } from "react";
import { X, Terminal, Circle } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Task = {
  id: number;
  company: string;
  logo: string; // initials fallback, no external images needed
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

// ---------------------------------------------------------------------------
// Mock data (remplace par ton db.json)
// ---------------------------------------------------------------------------
const db: Task[] = [
  {
    id: 1,
    company: "Photosnap",
    logo: "PS",
    position: "Senior Frontend Developer",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    role: "Frontend",
    level: "Senior",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
    featured: true,
  },
  {
    id: 2,
    company: "Manage",
    logo: "MG",
    position: "Fullstack Developer",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    role: "Fullstack",
    level: "Midweight",
    languages: ["Python"],
    tools: ["React"],
    new: true,
  },
  {
    id: 3,
    company: "Account",
    logo: "AC",
    position: "Junior Frontend Developer",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    role: "Frontend",
    level: "Junior",
    languages: ["JavaScript"],
    tools: [],
    new: true,
  },
  {
    id: 4,
    company: "MyHome",
    logo: "MH",
    position: "Junior Frontend Developer",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    role: "Frontend",
    level: "Junior",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "LS",
    position: "Software Engineer",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    role: "Fullstack",
    level: "Senior",
    languages: ["JavaScript", "Ruby"],
    tools: ["Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "FI",
    position: "Junior Backend Developer",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    role: "Backend",
    level: "Junior",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
];

// ---------------------------------------------------------------------------
// Filter bar — presented as a shell command line
// ---------------------------------------------------------------------------
type FilterbarProps = {
  searchRole: string;
  searchLevel: string;
  searchLanguage: string;
  setSearchRole: (v: string) => void;
  setSearchLevel: (v: string) => void;
  setSearchLanguage: (v: string) => void;
};

const Filterbar = ({
  searchRole,
  searchLevel,
  searchLanguage,
  setSearchRole,
  setSearchLevel,
  setSearchLanguage,
}: FilterbarProps) => {
  const flags = [
    { key: "role", value: searchRole, clear: () => setSearchRole("") },
    { key: "level", value: searchLevel, clear: () => setSearchLevel("") },
    { key: "lang", value: searchLanguage, clear: () => setSearchLanguage("") },
  ].filter((f) => f.value !== "");

  const hasFilters = flags.length > 0;

  return (
    <div className="lg:max-w-5xl mx-auto px-4 lg:px-0 -mt-8 relative z-10">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl shadow-black/40 overflow-hidden">
        {/* fake window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/60 border-b border-slate-800">
          <Circle className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
          <Circle className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
          <Circle className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
          <span className="ml-3 text-[11px] font-mono text-slate-500 tracking-wide">
            jobs — filter
          </span>
        </div>

        <div className="px-4 py-4 font-mono text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lime-400 select-none">$</span>
            <span className="text-slate-400 select-none">grep</span>

            {!hasFilters && (
              <span className="text-slate-600 select-none">
                --role= --level= --lang=
                <span className="inline-block w-[7px] h-[15px] bg-lime-400/70 ml-1 align-middle animate-pulse" />
              </span>
            )}

            {flags.map((f) => (
              <span
                key={f.key}
                className="group flex items-center gap-1 bg-lime-400/10 text-lime-300 border border-lime-400/30 rounded px-2 py-1 text-xs"
              >
                <span className="text-slate-500">--{f.key}=</span>
                {f.value}
                <button
                  aria-label={`Remove ${f.key} filter`}
                  onClick={f.clear}
                  className="ml-1 text-lime-300/60 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {hasFilters && (
              <button
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
};

// ---------------------------------------------------------------------------
// Card — presented as a file / diff entry
// ---------------------------------------------------------------------------
type CardProps = {
  task: Task;
  index: number;
  searchLanguage: string;
  setSearchRole: (v: string) => void;
  setSearchLevel: (v: string) => void;
  setSearchLanguage: (v: string) => void;
};

const Tag = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-lime-300 hover:bg-lime-400 hover:text-slate-950 transition-colors"
  >
    {label}
  </button>
);

const Card = ({
  task,
  index,
  setSearchRole,
  setSearchLevel,
  setSearchLanguage,
}: CardProps) => {
  return (
    <li
      className={`group relative bg-slate-900 border rounded-lg px-5 py-5 lg:px-6 flex flex-col lg:flex-row lg:items-center gap-4 transition-colors ${
        task.featured
          ? "border-lime-400/50"
          : "border-slate-800 hover:border-slate-700"
      }`}
    >
      {task.featured && (
        <span className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-lime-400" />
      )}

      {/* line number, like a code editor gutter */}
      <span className="hidden lg:block font-mono text-xs text-slate-600 w-6 text-right select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="w-11 h-11 shrink-0 rounded-md bg-slate-800 flex items-center justify-center font-mono text-xs text-lime-300 border border-slate-700">
        {task.logo}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-mono text-sm text-lime-400">
            {task.company}
          </span>
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

        <h2 className="font-mono text-base text-white font-medium truncate">
          {task.position}
        </h2>

        <p className="font-mono text-xs text-slate-500 mt-1">
          {task.postedAt} · {task.contract} · {task.location}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
        <Tag label={task.role} onClick={() => setSearchRole(task.role)} />
        <Tag label={task.level} onClick={() => setSearchLevel(task.level)} />
        {task.languages.map((lang) => (
          <Tag key={lang} label={lang} onClick={() => setSearchLanguage(lang)} />
        ))}
        {task.tools.map((tool) => (
          <Tag key={tool} label={tool} onClick={() => setSearchLanguage(tool)} />
        ))}
      </div>
    </li>
  );
};

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const App = () => {
  const [searchRole, setSearchRole] = useState<string>("");
  const [searchLevel, setSearchLevel] = useState<string>("");
  const [searchLanguage, setSearchLanguage] = useState<string>("");

  const filtered = useMemo(() => {
    return db
      .filter((item) => (searchRole === "" ? true : item.role === searchRole))
      .filter((item) => (searchLevel === "" ? true : item.level === searchLevel))
      .filter((item) =>
        searchLanguage === ""
          ? true
          : item.languages.includes(searchLanguage) ||
            item.tools.includes(searchLanguage)
      );
  }, [searchRole, searchLevel, searchLanguage]);

  return (
    <section className="min-h-screen bg-slate-950">
      {/* Header */}
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
            ~/jobs <span className="text-lime-400">$</span> {filtered.length} results
          </span>
        </div>
      </div>

      <Filterbar
        setSearchRole={setSearchRole}
        setSearchLevel={setSearchLevel}
        searchRole={searchRole}
        searchLevel={searchLevel}
        searchLanguage={searchLanguage}
        setSearchLanguage={setSearchLanguage}
      />

      <ul className="lg:max-w-5xl flex flex-col gap-4 mt-10 pb-16 px-4 lg:px-0 mx-auto">
        {filtered.length === 0 ? (
          <li className="text-center font-mono text-sm text-slate-600 py-16 border border-dashed border-slate-800 rounded-lg">
            no matches — try clearing a filter
          </li>
        ) : (
          filtered.map((task, i) => (
            <Card
              key={task.id}
              task={task}
              index={i}
              searchLanguage={searchLanguage}
              setSearchLevel={setSearchLevel}
              setSearchLanguage={setSearchLanguage}
              setSearchRole={setSearchRole}
            />
          ))
        )}
      </ul>
    </section>
  );
};

export default App;