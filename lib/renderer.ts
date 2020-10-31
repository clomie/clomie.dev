import '@prettier/plugin-xml'
import { mkdirSync, writeFileSync } from 'fs'
import { join, parse } from 'path'
import { VNode } from 'preact'
import renderToString from 'preact-render-to-string'
import { format, Options as PrettierOptions } from 'prettier'

type Route<T> = {
  path: string
  pageComponent: (props: PageProps<T>) => VNode
  pageProps: T
}

export function route<T>(
  path: string,
  pageComponent: (props: PageProps<T>) => VNode,
  pageProps: T
): Route<T> {
  return { path, pageComponent, pageProps }
}

const calculatePaths = (outDir: string, path: string) => {
  const parsed = parse(path)

  const name = parsed.name || 'index'
  const ext = parsed.ext || '.html'

  const parent = join(outDir, parsed.dir)
  const outputPath = join(parent, name + ext)

  return { parent, outputPath }
}

const prettify = (body: string, path: string) => {
  const prettierOptions: PrettierOptions = {
    filepath: path,
    printWidth: Number.MAX_SAFE_INTEGER,
    // @ts-ignore
    xmlWhitespaceSensitivity: 'ignore',
  }
  return format(body, prettierOptions)
}

export const renderer = (
  outDir: string,
  { path, pageComponent, pageProps }: Route<any>
) => {
  const { parent, outputPath } = calculatePaths(outDir, path)

  mkdirSync(parent, { recursive: true })

  const node = pageComponent({ path, ...pageProps })
  const rendered = renderToString(node)
  const prettified = prettify(rendered, outputPath)

  writeFileSync(outputPath, prettified)

  console.log(`Generated path: ${outputPath}`)
}
