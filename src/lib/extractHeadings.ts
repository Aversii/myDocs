import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[!\"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~]/g, "");
}

export type Heading = {
  id: string
  level: number
  text: string
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = []

  const processor = unified().use(remarkParse)
  const tree = processor.parse(markdown)

  visit(tree, 'heading', (node: any) => {
    const level = node.depth
    const text = node.children
      .filter(
        (child: any) =>
          child.type === 'text' ||
          child.type === 'inlineCode' ||
          child.type === 'emphasis' ||
          child.type === 'strong'
      )
      .map((child: any) => {
        if (child.children) {
          return child.children.map((c: any) => c.value).join('')
        }
        return child.value
      })
      .join('')

    const id = slugifyHeading(text)

    headings.push({ id, level, text })
  })

  return headings
}
