import slugify from "slugify";
import path from "path";
import fs from "fs";



export function slugifyString(str: string) {
  return slugify(str, {
    lower: true,
    strict: true,
    locale: "pt", // para remover acentos corretamente
  });
}

export function getSlugToFileMap() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"));

  const map: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const titleMatch = fileContent.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.mdx$/, "");

    const slug = slugifyString(title);
    map[slug] = file;
  }

  return map;
}

