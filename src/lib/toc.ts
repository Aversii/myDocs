export type Heading = {
  id: string
  text: string
  level: number
}

export function extractToc(content: string): Heading[] {
  const regex = /^(### |## |# )(.+)/gm
  const matches = [...content.matchAll(regex)]

  return matches.map((match) => {
    const level = match[1].trim().length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w]+/g, '-')
      .replace(/^-|-$/g, '')

    return { id, text, level }
  })
}
