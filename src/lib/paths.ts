import fs from 'fs'
import path from 'path'

const contentPath = path.join(process.cwd(), 'content')

export function getAllSlugs() {
  const files = fs.readdirSync(contentPath)
  return files.map((file) => file.replace('.mdx', ''))
}
