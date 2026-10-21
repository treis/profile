import type { ReactNode } from "react";
import {
  sqlIntro,
  vectorSearchSummary,
  vectorSearchSql,
  vectorSearchNotes,
  sf368img,
  sf368Caption,
  schemaTables,
  tagSummarySummary,
  tagSummarySql,
  tagSummaryUsage,
  tagSummaryNotes,
  tagSummaryRows,
} from "./assets/sqlExamples";

const KEYWORDS = new Set([
  "SELECT", "FROM", "JOIN", "LEFT", "ON", "WHERE", "AND", "OR", "NOT", "NULL", "IS",
  "AS", "ORDER", "BY", "GROUP", "LIMIT", "WITH", "CREATE", "REPLACE", "PROCEDURE",
  "LANGUAGE", "BEGIN", "END", "DROP", "TABLE", "IF", "EXISTS", "TEMP", "OVER",
  "DESC", "ASC", "CALL", "CAST",
]);
const FUNCTIONS = new Set(["COUNT", "SUM", "AVG", "COALESCE", "RANK"]);

// Tiny SQL highlighter: enough for these snippets, no dependency needed.
function highlightCode(code: string): ReactNode[] {
  return code.split("\n").map((line, i) => {
    const commentAt = line.indexOf("--");
    const body = commentAt >= 0 ? line.slice(0, commentAt) : line;
    const comment = commentAt >= 0 ? line.slice(commentAt) : "";

    const parts = body.split(/(\s+|'[^']*'|[(),;]|:[a-z_]+|<[a-z ]+>|<=>)/).filter(Boolean);
    const tokens = parts.map((part, j) => {
      const upper = part.toUpperCase();
      if (KEYWORDS.has(part)) return <span key={j} className="text-pink-400">{part}</span>;
      if (FUNCTIONS.has(upper)) return <span key={j} className="text-sky-400">{part}</span>;
      if (part.startsWith("'")) return <span key={j} className="text-amber-300">{part}</span>;
      if (/^:[a-z_]+$/.test(part)) return <span key={j} className="text-violet-300">{part}</span>;
      if (/^<[a-z ]+>$/.test(part)) return <span key={j} className="text-gray-400 italic">{part}</span>;
      if (part === "<=>") return <span key={j} className="text-cyan-300 font-bold">{part}</span>;
      return part;
    });

    return (
      <span key={i} className="block">
        {tokens}
        {comment && <span className="text-gray-500">{comment}</span>}
        {line === "" && "\u00a0"}
      </span>
    );
  });
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <figure className="mt-6">
      <figcaption className="sr-only">{label}</figcaption>
      <pre
        tabIndex={0}
        aria-label={label}
        className="bg-black text-gray-100 font-mono text-sm leading-relaxed p-5 rounded-lg border border-cyan-300/40 overflow-x-auto focus:outline-2 focus:outline-cyan-300"
      >
        <code>{highlightCode(code)}</code>
      </pre>
    </figure>
  );
}

function Notes({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 text-white leading-relaxed list-disc pl-6 marker:text-cyan-300 max-w-3xl">
      {items.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-gray-950 p-6 md:p-10 shadow-xl shadow-cyan-300/20 border-3 border-cyan-300 rounded-lg">
      <h2 className="text-2xl font-bold text-cyan-300 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function SchemaDiagram() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr] items-start">
      {schemaTables.map((table) => (
        <div key={table.name} className="bg-black rounded-lg border border-cyan-300/40 overflow-hidden">
          <p className="font-mono font-bold text-white px-4 py-2 border-b border-cyan-300/40">{table.name}</p>
          <table className="w-full font-mono text-sm">
            <caption className="sr-only">Columns of {table.name}</caption>
            <tbody>
              {table.columns.map((col) => (
                <tr key={col.name} className="border-b border-gray-800 last:border-0">
                  <th scope="row" className="text-left font-normal text-gray-100 px-4 py-1.5 whitespace-nowrap">
                    {col.name}
                    {col.key && <span className="ml-2 text-amber-300 text-xs">key</span>}
                    {col.nullable && <span className="ml-2 text-gray-500 text-xs">nullable</span>}
                  </th>
                  <td className="text-right text-gray-400 px-4 py-1.5">{col.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {table.note && <p className="text-gray-400 text-sm px-4 py-2 border-t border-gray-800">{table.note}</p>}
        </div>
      ))}
    </div>
  );
}

function ResultsTable() {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-cyan-300/40">
      <table className="w-full font-mono text-sm text-gray-100 bg-black">
        <caption className="sr-only">Sample output of tmp_tag_summary</caption>
        <thead className="bg-gray-800 text-cyan-300">
          <tr>
            <th scope="col" className="text-left px-4 py-2">tag</th>
            <th scope="col" className="text-right px-4 py-2">items</th>
            <th scope="col" className="text-right px-4 py-2">total_weight</th>
            <th scope="col" className="text-right px-4 py-2">tag_rank</th>
            <th scope="col" className="text-left px-4 py-2">above_average</th>
          </tr>
        </thead>
        <tbody>
          {tagSummaryRows.map((row) => (
            <tr key={row.tag} className="border-t border-gray-800">
              <td className="px-4 py-2">{row.tag}</td>
              <td className="px-4 py-2 text-right">{row.items}</td>
              <td className="px-4 py-2 text-right">{row.total_weight}</td>
              <td className="px-4 py-2 text-right">{row.tag_rank}</td>
              <td className={`px-4 py-2 ${row.above_average ? "text-cyan-300" : "text-gray-500"}`}>
                {String(row.above_average)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SqlExamples() {
  return (
    <div className="animate-fly-in-up">
      <header className="max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-20">
        <h1 className="text-cyan-300 text-6xl font-bold mb-6">SQL Examples</h1>
        <p className="text-white text-lg leading-loose max-w-3xl">{sqlIntro}</p>
      </header>

      <div className="w-full bg-gray-900 border-t-3 border-cyan-500 inset-shadow-black inset-shadow-xs">
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-20 pb-24 space-y-16">

      <Panel title="Vector search for the Sikorsky corrective action assistant">
        <p className="text-white text-lg leading-loose max-w-3xl">{vectorSearchSummary}</p>
        <CodeBlock code={vectorSearchSql} label="Vector similarity search query" />

        <figure className="mt-10 flex flex-col items-center">
          <img
            src={sf368img}
            alt="Sample Standard Form 368 product quality deficiency report for an SH-60F helicopter, listing critical, major and minor deficiencies"
            className="max-h-[36rem] w-auto rounded border-3 border-cyan-300/60 bg-white"
            loading="lazy"
          />
          <figcaption className="mt-4 text-gray-400 text-center max-w-xl">{sf368Caption}</figcaption>
        </figure>
      </Panel>

      <Panel title="Tag statistics procedure">
        <p className="text-white text-lg leading-loose max-w-3xl">{tagSummarySummary}</p>

        <h3 className="text-xl font-bold text-white mt-8">Schema</h3>
        <SchemaDiagram />

        <h3 className="text-xl font-bold text-white mt-10">Procedure</h3>
        <CodeBlock code={tagSummarySql} label="sp_build_tag_summary procedure" />

        <h3 className="text-xl font-bold text-white mt-10">Running it</h3>
        <CodeBlock code={tagSummaryUsage} label="Calling the procedure" />
        <ResultsTable />
      </Panel>
      </div>
      </div>
    </div>
  );
}
