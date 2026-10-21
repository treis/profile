export { default as sf368img } from "./sf368-sample.jpg";

export const sqlIntro = `Two pieces of SQL I've written: the similarity search behind the Smart Corrective Action Assistant, and a PL/pgSQL procedure that summarizes how tags are used across a small relational schema.`;

export const vectorSearchSummary = `The smart assistant answers engineers' questions from documents like product quality deficiency reports. Each document is split into chunks, every chunk gets an embedding, and both live in PostgreSQL with pgvector. This query finds the chunks closest in meaning to a question.`;

export const vectorSearchSql = `SELECT dc.id AS chunk_id,                                   -- which chunk
       dc.doc_id, dc.chunk_index, dc.page, dc.section,      -- where it sits in its document
       dc.text,                                             -- the text itself
       d.filename AS doc_filename,                          -- which document it came from
       d.metadata - 'text_blocks' AS doc_metadata,          -- document details, minus one huge key
       1 - (dc.embedding <=> CAST(:embedding AS vector))    -- similarity score: bigger = better
         AS vector_score
FROM document_chunks dc
JOIN documents d ON dc.doc_id = d.id                        -- attach each chunk to its document
WHERE dc.embedding IS NOT NULL                              -- skip chunks with no embedding yet
  AND <shared filters>                                      -- status, model, system, and so on
ORDER BY dc.embedding <=> CAST(:embedding AS vector)        -- closest first
LIMIT :limit                                                -- only the top candidates`;

export const vectorSearchNotes = [
  `<=> is pgvector's cosine distance operator, so 1 minus the distance gives a similarity score where higher means a closer match.`,
  `Ordering by the raw distance expression, rather than by the computed score, lets PostgreSQL use the vector index for a fast nearest-neighbor scan.`,
  `metadata - 'text_blocks' drops one large key from the JSONB metadata so each result row stays small.`,
  `The shared filters are the same conditions the keyword search uses, so both halves of the hybrid search look at the same set of documents.`,
];

export const sf368Caption = `A public sample of Standard Form 368, the kind of report the assistant ingests. The table above is an approximation of how such a document is stored.`;

export type SchemaColumn = {
  name: string;
  type: string;
  key?: boolean;
  nullable?: boolean;
};

export type SchemaTable = {
  name: string;
  columns: SchemaColumn[];
  note?: string;
};

export const schemaTables: SchemaTable[] = [
  {
    name: "ac_item_tag",
    columns: [
      { name: "id", type: "uuid", key: true },
      { name: "category", type: "text" },
      { name: "name", type: "text", nullable: true },
    ],
  },
  {
    name: "ac_loot_tags",
    columns: [
      { name: "loot_id", type: "uuid", key: true },
      { name: "tag_id", type: "uuid", key: true },
    ],
    note: "Links each item to its tags",
  },
  {
    name: "ac_loot",
    columns: [
      { name: "id", type: "uuid", key: true },
      { name: "check_id", type: "varchar" },
      { name: "name", type: "text" },
      { name: "category_id", type: "uuid" },
      { name: "tier_id", type: "uuid" },
      { name: "type", type: "text", nullable: true },
      { name: "nature", type: "varchar" },
      { name: "is_dm_select", type: "bool", nullable: true },
      { name: "event_category", type: "varchar", nullable: true },
      { name: "tier_display", type: "text" },
    ],
    note: "Also has weight and is_rolled, used below",
  },
];

export const tagSummarySummary = `This procedure builds a per-tag report: how many rolled items carry each tag, their combined weight, a rank, and whether the tag sits above the average.`;

export const tagSummarySql = `CREATE OR REPLACE PROCEDURE public.sp_build_tag_summary()
LANGUAGE plpgsql
AS $$
BEGIN
  DROP TABLE IF EXISTS pg_temp.tmp_tag_summary;

  CREATE TEMP TABLE tmp_tag_summary AS
  WITH tag_stats AS (
    SELECT t.id, t.name AS tag,
           COUNT(l.id)                  AS items,
           COALESCE(SUM(l.weight), 0)   AS total_weight
    FROM public.ac_item_tag t
    LEFT JOIN public.ac_loot_tags lt ON lt.tag_id = t.id
    LEFT JOIN public.ac_loot l       ON l.id = lt.loot_id AND l.is_rolled AND l.weight IS NOT NULL
    GROUP BY t.id, t.name
  )
  SELECT tag, items, total_weight,
         RANK() OVER (ORDER BY total_weight DESC)                AS tag_rank,
         total_weight > (SELECT AVG(total_weight) FROM tag_stats) AS above_average
  FROM tag_stats;
END;
$$;`;

export const tagSummaryUsage = `CALL public.sp_build_tag_summary();
SELECT * FROM tmp_tag_summary ORDER BY tag_rank;`;

export const tagSummaryNotes = [
  `Both joins are LEFT JOINs, so a tag with no items still appears with zeros. That's why holy shows up at the bottom instead of disappearing.`,
  `The is_rolled and weight conditions sit in the ON clause, not in WHERE. In WHERE they would throw away the empty rows and quietly turn the LEFT JOIN into an inner join.`,
  `COUNT(l.id) counts only matched items, and COALESCE turns the empty SUM into 0 so those tags still rank and compare correctly.`,
  `The result goes into a temp table, so each database session gets its own copy and it cleans itself up when the session ends.`,
];

export type TagRow = {
  tag: string;
  items: number;
  total_weight: number;
  tag_rank: number;
  above_average: boolean;
};

export const tagSummaryRows: TagRow[] = [
  { tag: "mainhand", items: 4, total_weight: 81, tag_rank: 1, above_average: true },
  { tag: "body", items: 3, total_weight: 33, tag_rank: 2, above_average: true },
  { tag: "arcane", items: 4, total_weight: 32, tag_rank: 3, above_average: true },
  { tag: "ice", items: 1, total_weight: 25, tag_rank: 4, above_average: false },
  { tag: "fire", items: 2, total_weight: 21, tag_rank: 5, above_average: false },
  { tag: "undead", items: 1, total_weight: 3, tag_rank: 6, above_average: false },
  { tag: "holy", items: 0, total_weight: 0, tag_rank: 7, above_average: false },
];
