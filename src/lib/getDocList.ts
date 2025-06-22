import path from "path";
import fs from "fs";
import { getSlugToFileMap } from "./slugfyString";

export function getDocsList() {
  const slugToFileMap = getSlugToFileMap();

  return Object.entries(slugToFileMap).map(([slug, file]) => {
    const filePath = path.join(process.cwd(), "src", "content", file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const titleMatch = fileContent.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.mdx$/, "");

    return { slug, title };
  });
}