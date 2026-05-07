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

export interface Module {
  slug: string;
  metadata: ModuleMetadata;
  content: string;
  folder: string;
}

function getLatestDraft(draftsDir: string): string | null {
  if (!fs.existsSync(draftsDir)) return null;

  const files = fs.readdirSync(draftsDir);

  // Check for final.md first
  if (files.includes('final.md')) {
    return fs.readFileSync(path.join(draftsDir, 'final.md'), 'utf-8');
  }

  // Find the highest numbered v*.md file (case insensitive)
  const vFiles = files
    .filter(f => /^v\d+\.md$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)![0]);
      const numB = parseInt(b.match(/\d+/)![0]);
      return numB - numA;
    });

  if (vFiles.length === 0) return null;

  return fs.readFileSync(path.join(draftsDir, vFiles[0]), 'utf-8');
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
    const content = getLatestDraft(draftsDir);

    if (!content) continue;

    // Generate slug from folder name, stripping the number prefix
    const slug = entry.name.replace(/^\d{2}-/, '');

    modules.push({
      slug,
      metadata,
      content,
      folder: entry.name,
    });
  }

  return modules.sort((a, b) => a.metadata.id - b.metadata.id);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return getAllModules().find(m => m.slug === slug);
}
