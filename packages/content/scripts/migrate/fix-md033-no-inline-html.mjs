import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = new Set(process.argv.slice(2));

const getArgValue = (name, fallback) => {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
};

const usage = () => {
  // ASCII only
  console.log(
    [
      "Usage: node ./scripts/migrate/fix-md033-no-inline-html.mjs [--src <dir>] [--dest <dir>] [--file <path>] [--files <paths>] [--overwrite] [--dry-run]",
      "",
      "Defaults:",
      "  --src  ./posts",
      "  --dest ./posts",
      "",
      "Notes:",
      "  --file can be repeated; --files is comma-separated.",
      "  File filtering matches by basename.",
    ].join("\n"),
  );
};

if (args.has("--help") || args.has("-h")) {
  usage();
  process.exit(0);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, "..", "..");
const projectRoot = path.resolve(process.cwd());
const defaultSrc = path.join(packageRoot, "posts");
const defaultDest = path.join(packageRoot, "posts");

const srcDir = path.resolve(getArgValue("--src", defaultSrc));
const destDir = path.resolve(getArgValue("--dest", defaultDest));

const overwrite = args.has("--overwrite");
const dryRun = args.has("--dry-run");

const collectFileArgs = () => {
  const values = [];

  for (let i = 0; i < process.argv.length; i += 1) {
    const arg = process.argv[i];

    if (arg === "--file") {
      const next = process.argv[i + 1];
      if (next) values.push(next);
    } else if (arg.startsWith("--file=")) {
      values.push(arg.slice("--file=".length));
    } else if (arg === "--files") {
      const next = process.argv[i + 1];
      if (next) values.push(...next.split(","));
    } else if (arg.startsWith("--files=")) {
      values.push(...arg.slice("--files=".length).split(","));
    }
  }

  return values.filter(Boolean);
};

const normalizeTargetName = (name) => {
  const baseName = path.basename(name);
  if (baseName.endsWith(".mdx")) {
    return baseName.replace(/\.mdx$/, ".md");
  }
  return baseName;
};

const targetNames = new Set(collectFileArgs().map(normalizeTargetName));
const hasTargets = targetNames.size > 0;

const isDirectory = async (dir) => {
  try {
    const result = await stat(dir);
    return result.isDirectory();
  } catch {
    return false;
  }
};

if (!(await isDirectory(srcDir))) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

await mkdir(destDir, { recursive: true });

const entries = await readdir(srcDir, { withFileTypes: true });
const markdownFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => entry.name)
  .sort();

const filteredFiles = hasTargets
  ? markdownFiles.filter((name) => targetNames.has(name))
  : markdownFiles;

if (filteredFiles.length === 0) {
  if (hasTargets) {
    console.log("No matching .md files found.");
  } else {
    console.log("No .md files found.");
  }
  process.exit(0);
}

const replaceInlineBold = (segment) =>
  segment.replace(/<b>(.*?)<\/b>/g, "**$1**").replace(/<strong>(.*?)<\/strong>/g, "**$1**");

const replaceInlineHtml = (segment, { inTableRow }) => {
  let next = replaceInlineBold(segment);
  next = next.replace(/<br\s*\/?>/gi, inTableRow ? " / " : "  \n");
  next = next.replace(/<\/?b>/gi, "**");
  next = next.replace(/<\/?s>/gi, "~~");
  next = next.replace(/<\/?del>/gi, "~~");
  return next;
};

const getIframeReplacement = (block) => {
  const match = block.match(/src\s*=\s*["']([^"']+)["']/i);
  if (!match) return "Embedded content";
  return `[Embedded content](${match[1]})`;
};

const transformLine = (line, { inTableRow }) => {
  const parts = line.split(/(`+)/);
  let changed = false;
  const next = parts.map((part, index) => {
    if (part.startsWith("`")) return part;
    const replaced = replaceInlineHtml(part, { inTableRow });
    if (replaced !== part) changed = true;
    return replaced;
  });
  return { line: next.join(""), changed };
};

const transformContent = (content) => {
  const lines = content.split(/\r?\n/);
  const nextLines = [];
  let inFence = false;
  let changed = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.startsWith("```") || line.startsWith("~~~")) {
      inFence = !inFence;
      nextLines.push(line);
      continue;
    }

    if (inFence) {
      nextLines.push(line);
      continue;
    }

    if (line.includes("<iframe")) {
      let block = line;
      let endIndex = i;
      const hasEnd =
        line.toLowerCase().includes("</iframe>") || line.includes("/>");
      if (!hasEnd) {
        while (endIndex + 1 < lines.length) {
          endIndex += 1;
          block += `\n${lines[endIndex]}`;
          const nextLine = lines[endIndex];
          if (nextLine.toLowerCase().includes("</iframe>") || nextLine.includes("/>")) {
            break;
          }
        }
      }
      const replacement = getIframeReplacement(block);
      nextLines.push(replacement);
      if (replacement.trim() !== block.trim()) {
        changed = true;
      }
      i = endIndex;
      continue;
    }

    const inTableRow = line.includes("|");
    const { line: nextLine, changed: lineChanged } = transformLine(line, { inTableRow });
    if (lineChanged) {
      changed = true;
    }
    nextLines.push(nextLine);
  }

  const nextContent = nextLines.join("\n");
  return { content: nextContent, changed };
};

let updated = 0;
let skipped = 0;

for (const fileName of filteredFiles) {
  const srcPath = path.join(srcDir, fileName);
  const destPath = path.join(destDir, fileName);

  if (!overwrite && srcPath !== destPath) {
    try {
      await stat(destPath);
      console.log(`Skip (exists): ${path.relative(projectRoot, destPath)}`);
      skipped += 1;
      continue;
    } catch {
      // continue
    }
  }

  if (await isDirectory(destPath)) {
    console.log(`Skip (directory): ${path.relative(projectRoot, destPath)}`);
    skipped += 1;
    continue;
  }

  const content = await readFile(srcPath, "utf8");
  const { content: transformed, changed } = transformContent(content);

  if (!changed && srcPath === destPath) {
    console.log(`No change: ${path.relative(projectRoot, srcPath)}`);
    continue;
  }

  if (dryRun) {
    console.log(`Would write: ${path.relative(projectRoot, destPath)}`);
    updated += 1;
    continue;
  }

  await writeFile(destPath, transformed, "utf8");
  console.log(`Wrote: ${path.relative(projectRoot, destPath)}`);
  updated += 1;
}

console.log(`Done. updated=${updated} skipped=${skipped}`);
