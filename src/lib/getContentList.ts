import fs from 'fs';
import path from 'path';

export async function getContentList() {
  const contentDir = path.join(process.cwd(), 'src', 'content');

  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const title = extractTitle(fileContent) || formatSlug(slug);

    return { slug, title };
  });
}

function extractTitle(content: string) {
  const match = content.match(/^# (.+)$/m);
  return match ? match[1].trim() : null;
}

function formatSlug(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
