import fs from "fs-extra";
import path from "path";
import { globby } from "globby";
import { fileURLToPath } from "url";
import simpleGit from "simple-git";
import { readFile, writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const gitRepoUrl = "https://github.com/silverbirder/silverbirder.github.io";
    const localClonePath = path.join(__dirname, "silverbirder.github.io");
    const destinationDir = path.join(__dirname, "../", "app", "blog", "posts");

    // Clone the repository
    if (!fs.existsSync(localClonePath)) {
      console.log("Cloning repository...");
      await simpleGit().clone(gitRepoUrl, localClonePath);
    } else {
      console.log("Repository already cloned.");
    }

    // Define the source glob pattern
    const sourceGlobPattern = path.join(
      localClonePath,
      "apps",
      "docs",
      "src",
      "routes",
      "\\(ja\\)",
      "blog",
      "contents",
      "**",
      "index.mdx"
    );

    // Find all index.mdx files in the specified folder structure
    const files = await globby(sourceGlobPattern, {
      globstar: true,
      dot: true,
    });

    if (files.length === 0) {
      console.log("No files found for migration.");
      return;
    }

    console.log(`Found ${files.length} files for migration.`);

    // Copy each index.mdx file to the destination directory with updated front matter
    for (const file of files) {
      const folderName = path.basename(path.dirname(file));
      const destinationFile = path.join(destinationDir, `${folderName}.mdx`);

      console.log(`Processing ${file}...`);
      let content = await readFile(file, "utf-8");

      // Replace front matter
      content = content.replace(
        /---\s*title: (.*?)\s*published: .*?\s*lang: .*?\s*date: (.*?)\s*description: (.*?)\s*tags: (\[.*?\])[^]*?---/s,
        (match, title, date, description, tags) =>
          `---\ntitle: '${title}'\npublishedAt: '${date}'\nsummary: '${description}'\ntags: ${tags}\n---`
      );
      // Remove specific import statement
      content = content.replace(
        /\nimport \{ Image \} from "~\/components\/image\/image";\n/,
        ""
      );
      content = content.replace(/layout=\"constrained\"\s*/g, "");
      content = content.replace(/\.\.\/([^/]+)\/index.mdx/g, "./$1");

      console.log(`Copying ${file} to ${destinationFile}...`);
      await writeFile(destinationFile, content);
    }

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("An error occurred during migration:", error);
  }
})();
