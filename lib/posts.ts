import { sync as globbySync } from 'globby'
import { join, relative, parse } from 'path'
import { parseMarkdown } from './parser/markdown'

export const listPosts = (root: string): Post[] => {
  const paths = globbySync(root, { expandDirectories: ['**'] })

  const toUrlPath = (path: string) => {
    const { dir, name } = parse(path)
    return join('/', relative(root, dir), name)
  }

  const posts = paths.map((actualPath) => {
    const path = toUrlPath(actualPath)
    const post = parseMarkdown(actualPath)
    return { path, ...post }
  })

  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return posts
}
