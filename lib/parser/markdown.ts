import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import stringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import { JSDOM } from 'jsdom'

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

const findImage = (body: string): string | undefined => {
  const { document } = new JSDOM(body).window
  const img = document.querySelector('img')
  return (img && img.src) || undefined
}

export const parseMarkdown = (path: string): Omit<Post, 'path'> => {
  const { createdAt, updatedAt } = readTimestamps(path)
  const { frontmatter, body } = parseMarkdownWithFrontMatter(path)

  const image = findImage(body)
  const { title } = frontmatter

  return {
    title,
    createdAt,
    updatedAt,
    body,
    image,
  }
}
