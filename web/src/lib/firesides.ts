import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const CONTENT_DIR = path.resolve(process.cwd(), '../content/firesides');

export interface FiresideMetadata {
  title: string;
  id: number;
  phase: 'discovery' | 'investigation' | 'consolidation';
  topics: string[];
  status: string;
}

export interface Fireside {
  slug: string;
  metadata: FiresideMetadata;
  content: string;
  folder: string;
  sourceFile: string;
  sourceModified: string;
}

interface DraftSource {
  content: string;
  filename: string;
  modified: Date;
}

function getLatestDraft(draftsDir: string): DraftSource | null {
  if (!fs.existsSync(draftsDir)) return null;

  const files = fs.readdirSync(draftsDir);

  const read = (filename: string): DraftSource => {
    const filepath = path.join(draftsDir, filename);
    return {
      content: fs.readFileSync(filepath, 'utf-8'),
      filename,
      modified: fs.statSync(filepath).mtime,
    };
  };

  // Check for final.md first
  if (files.includes('final.md')) {
    return read('final.md');
  }

  // Prefer human drafts (v*.md), fall back to AI drafts (ai-draft-*.md)
  const pickHighest = (pattern: RegExp) =>
    files
      .filter(f => pattern.test(f))
      .sort((a, b) => parseInt(b.match(/\d+/)![0]) - parseInt(a.match(/\d+/)![0]))[0];

  const latest = pickHighest(/^v\d+\.md$/i) ?? pickHighest(/^ai-draft-\d+\.md$/i);

  if (!latest) return null;

  return read(latest);
}

export function getAllFiresides(): Fireside[] {
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  const firesides: Fireside[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!/^\d{2}-/.test(entry.name)) continue;

    const folderPath = path.join(CONTENT_DIR, entry.name);
    const metadataPath = path.join(folderPath, 'metadata.yaml');

    if (!fs.existsSync(metadataPath)) continue;

    const metadataRaw = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = parseYaml(metadataRaw) as FiresideMetadata;

    const draftsDir = path.join(folderPath, 'drafts');
    const draft = getLatestDraft(draftsDir);

    if (!draft) continue;

    // Generate slug from folder name, stripping the number prefix
    const slug = entry.name.replace(/^\d{2}-/, '');

    firesides.push({
      slug,
      metadata,
      content: draft.content,
      folder: entry.name,
      sourceFile: draft.filename,
      sourceModified: draft.modified.toISOString(),
    });
  }

  return firesides.sort((a, b) => a.metadata.id - b.metadata.id);
}

export function getFiresideBySlug(slug: string): Fireside | undefined {
  return getAllFiresides().find(f => f.slug === slug);
}
