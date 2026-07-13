import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.join(__dirname, "..", "skills");

export interface SkillMeta {
  name: string;
  description: string;
  directory: string;
}

export interface SkillDetail extends SkillMeta {
  content: string;
  body: string;
  references: string[];
}

interface Frontmatter {
  name?: string;
  description?: string;
}

function parseFrontmatter(content: string): { fm: Frontmatter; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { fm: {}, body: content };
  }

  let fm: Frontmatter = {};
  try {
    fm = (yaml.load(match[1]) as Frontmatter) || {};
  } catch {
    // Fallback: simple regex parsing if yaml.load fails
    const nameMatch = match[1].match(/^name:\s*(.+)$/m);
    const descMatch = match[1].match(/^description:\s*(.+)$/m);
    if (nameMatch) fm.name = nameMatch[1].trim().replace(/^["']|["']$/g, "");
    if (descMatch) fm.description = descMatch[1].trim().replace(/^["']|["']$/g, "");
  }

  return { fm, body: match[2] || "" };
}

function normalizeSkillDir(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function listSkills(): SkillMeta[] {
  if (!fs.existsSync(SKILLS_DIR)) {
    return [];
  }

  const skills: SkillMeta[] = [];
  const entries = fs.readdirSync(SKILLS_DIR);

  for (const entry of entries) {
    const entryPath = path.join(SKILLS_DIR, entry);
    const skillMdPath = path.join(entryPath, "SKILL.md");

    if (fs.statSync(entryPath).isDirectory() && fs.existsSync(skillMdPath)) {
      const content = fs.readFileSync(skillMdPath, "utf-8");
      const { fm } = parseFrontmatter(content);
      skills.push({
        name: fm.name || normalizeSkillDir(entry),
        description: fm.description || "",
        directory: entry,
      });
    }
  }

  return skills;
}

export function getSkill(name: string): SkillDetail | null {
  const skills = listSkills();
  const normalized = name.toLowerCase().replace(/\s+/g, "-");
  const skill = skills.find(
    (s) =>
      s.name === name ||
      s.name === normalized ||
      s.directory === name ||
      s.directory === normalized,
  );
  if (!skill) return null;

  const skillMdPath = path.join(SKILLS_DIR, skill.directory, "SKILL.md");
  const content = fs.readFileSync(skillMdPath, "utf-8");
  const { fm, body } = parseFrontmatter(content);

  const refDir = path.join(SKILLS_DIR, skill.directory, "references");
  const references: string[] = [];
  if (fs.existsSync(refDir) && fs.statSync(refDir).isDirectory()) {
    const files = fs.readdirSync(refDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        references.push(file.replace(/\.md$/, ""));
      }
    }
  }

  return {
    name: fm.name || skill.name,
    description: fm.description || skill.description,
    directory: skill.directory,
    content,
    body,
    references,
  };
}

export function getReference(name: string, ref: string): string | null {
  const skills = listSkills();
  const normalized = name.toLowerCase().replace(/\s+/g, "-");
  const skill = skills.find(
    (s) =>
      s.name === name ||
      s.name === normalized ||
      s.directory === name ||
      s.directory === normalized,
  );
  if (!skill) return null;

  const refPath = path.join(
    SKILLS_DIR,
    skill.directory,
    "references",
    `${ref}.md`,
  );
  if (!fs.existsSync(refPath)) {
    const tryPath = path.join(
      SKILLS_DIR,
      skill.directory,
      "references",
      `${ref}`,
    );
    if (fs.existsSync(tryPath)) {
      return fs.readFileSync(tryPath, "utf-8");
    }
    return null;
  }

  return fs.readFileSync(refPath, "utf-8");
}
