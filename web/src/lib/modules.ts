import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const CONTENT_DIR = path.resolve(process.cwd(), '../content/modules');

export interface ModuleMetadata {
  title: string;
  id: number;
  phase: 'discovery' | 'investigation' | 'consolidation';
  topics: string[];
  status: string;
}

export interface GradeDimension {
  name: string;
  score: number;
  max: number;
  sub_items?: { text: string; passed: boolean; evidence?: string }[];
}

export interface Grade {
  module_id: string | number;
  draft_version: string;
  graded_at: string;
  rubric_version: number;
  dimensions: GradeDimension[];
  ai_tells_found?: { pattern: string; match: string; location?: string }[];
  mechanical_check?: Record<string, boolean>;
  total: number;
  max: number;
  coverage_gate_passed: boolean;
  advance_gate_passed: boolean;
  ship_gate_passed: boolean;
  summary_fixes?: string[];
  spec_missing?: boolean;
  filename: string;
}

export interface DraftWithGrade {
  filename: string;     // e.g., "ai-draft-6.md"
  version: string;      // e.g., "ai-draft-6"
  content: string;
  modified: string;     // ISO date
  grade: Grade | null;  // most-recent grade whose draft_version matches
}

export interface Module {
  slug: string;
  metadata: ModuleMetadata;
  folder: string;
  drafts: DraftWithGrade[];   // sorted newest first by mtime
  // Legacy aliases for drafts[0]
  content: string;
  sourceFile: string;
  sourceModified: string;
  latestGrade: Grade | null;
}

function readAllGrades(gradesDir: string): Grade[] {
  if (!fs.existsSync(gradesDir)) return [];
  const files = fs.readdirSync(gradesDir).filter(f => f.endsWith('.json'));
  const grades: Grade[] = [];
  for (const name of files) {
    try {
      const filepath = path.join(gradesDir, name);
      const raw = fs.readFileSync(filepath, 'utf-8');
      const parsed = JSON.parse(raw) as Omit<Grade, 'filename'>;
      grades.push({ ...parsed, filename: name });
    } catch {
      // skip unparseable grades
    }
  }
  // Sort by mtime descending so the most-recent grade for a draft wins
  return grades.sort((a, b) => {
    const am = fs.statSync(path.join(gradesDir, a.filename)).mtime.getTime();
    const bm = fs.statSync(path.join(gradesDir, b.filename)).mtime.getTime();
    return bm - am;
  });
}

function getAllDrafts(draftsDir: string, gradesDir: string): DraftWithGrade[] {
  if (!fs.existsSync(draftsDir)) return [];

  const allGrades = readAllGrades(gradesDir);
  const files = fs.readdirSync(draftsDir).filter(f => f.endsWith('.md'));

  const drafts: DraftWithGrade[] = files.map((filename) => {
    const filepath = path.join(draftsDir, filename);
    const stat = fs.statSync(filepath);
    const version = filename.replace(/\.md$/i, '');
    // Match the most-recent grade whose draft_version corresponds (case-insensitive)
    const matchedGrade = allGrades.find(
      g => g.draft_version.toLowerCase() === version.toLowerCase()
    ) ?? null;
    return {
      filename,
      version,
      content: fs.readFileSync(filepath, 'utf-8'),
      modified: stat.mtime.toISOString(),
      grade: matchedGrade,
    };
  });

  // Sort newest first by mtime
  drafts.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
  return drafts;
}

export function getAllModules(): Module[] {
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  const modules: Module[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!/^\d{2}-/.test(entry.name)) continue;

    const folderPath = path.join(CONTENT_DIR, entry.name);
    const metadataPath = path.join(folderPath, 'metadata.yaml');

    if (!fs.existsSync(metadataPath)) continue;

    const metadataRaw = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = parseYaml(metadataRaw) as ModuleMetadata;

    const draftsDir = path.join(folderPath, 'drafts');
    const gradesDir = path.join(folderPath, 'grades');
    const drafts = getAllDrafts(draftsDir, gradesDir);

    if (drafts.length === 0) continue;

    const slug = entry.name.replace(/^\d{2}-/, '');
    const newest = drafts[0];

    modules.push({
      slug,
      metadata,
      folder: entry.name,
      drafts,
      // Aliases pointing at the newest draft + its grade
      content: newest.content,
      sourceFile: newest.filename,
      sourceModified: newest.modified,
      latestGrade: newest.grade,
    });
  }

  return modules.sort((a, b) => a.metadata.id - b.metadata.id);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return getAllModules().find(m => m.slug === slug);
}
