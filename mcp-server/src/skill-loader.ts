import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.join(__dirname, "..", "skills");

export interface SkillMeta {
  name: string;
  description: string;
  trigger: string;
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
  trigger?: string;
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
    const triggerMatch = match[1].match(/^trigger:\s*(.+)$/m);
    if (nameMatch) fm.name = nameMatch[1].trim().replace(/^["']|["']$/g, "");
    if (descMatch) fm.description = descMatch[1].trim().replace(/^["']|["']$/g, "");
    if (triggerMatch) fm.trigger = triggerMatch[1].trim().replace(/^["']|["']$/g, "");
  }

  return { fm, body: match[2] || "" };
}

function normalizeSkillDir(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/**
 * 净化参考资料文件名，防止路径遍历攻击。
 * 只允许字母、数字、下划线、连字符，过滤掉所有路径分隔符和特殊字符。
 */
function sanitizeRef(ref: string): string | null {
  const sanitized = ref.replace(/[^a-zA-Z0-9_-]/g, "");
  return sanitized || null;
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
        let trigger = fm.trigger || "";
        // Auto-extract trigger from description if not explicitly set
        if (!trigger && fm.description) {
          const triggerMatch = fm.description.match(/当[^(时|触发)]*?(?:时|触发)/);
          if (triggerMatch) {
            trigger = triggerMatch[0];
          }
        }
        skills.push({
          name: fm.name || normalizeSkillDir(entry),
          description: fm.description || "",
          trigger,
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
    trigger: fm.trigger || skill.trigger || "",
    directory: skill.directory,
    content,
    body,
    references,
  };
}

export function getReference(name: string, ref: string): string | null {
  const safeRef = sanitizeRef(ref);
  if (!safeRef) return null;

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
    `${safeRef}.md`,
  );
  if (!fs.existsSync(refPath)) {
    const tryPath = path.join(
      SKILLS_DIR,
      skill.directory,
      "references",
      safeRef,
    );
    if (fs.existsSync(tryPath)) {
      return fs.readFileSync(tryPath, "utf-8");
    }
    return null;
  }

  return fs.readFileSync(refPath, "utf-8");
}
