import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { JSDOM } from 'jsdom'
import stringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { unified } from 'unified'

const readTimestamps = (path: string) => {
  const cmd = `git --no-pager log --no-color --pretty=format:'%ad' -- ${path}`
  const output = execSync(cmd).toString()
  if (output) {
    const timestamps = output.split('\n')
    const updatedAt = new Date(timestamps[0])
    const createdAt = new Date(timestamps.pop()!!)
    return { createdAt, updatedAt }
  } else {
    const now = new Date()
    return { createdAt: now, updatedAt: now }
  }
}

const parseMarkdownWithFrontMatter = (path: string) => {
  const { data: frontmatter, content } = matter(readFileSync(path))

  const result = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(stringify)
    .processSync(content)

  const body = String(result)

  return { frontmatter, body }
}

const findImage = (document: Document): string | undefined => {
  const img = document.querySelector('img')
  return (img && img.src) || undefined
}

const findSummary = (document: Document): string => {
  const text = document.querySelector('p')?.textContent || ''
  return text.replace(/(?<=。).+/, '')
}

export const parseMarkdown = (path: string): Omit<Post, 'path'> => {
  const { createdAt, updatedAt } = readTimestamps(path)
  const { frontmatter, body } = parseMarkdownWithFrontMatter(path)

  const { document } = new JSDOM(body).window

  const image = findImage(document)
  const summary = findSummary(document)
  const { title } = frontmatter

  return {
    title,
    createdAt,
    updatedAt,
    body,
    image,
    summary,
  }
}
