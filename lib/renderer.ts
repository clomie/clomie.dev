import '@prettier/plugin-xml'
import { mkdirSync, writeFileSync } from 'fs'
import { join, parse } from 'path'
import { render, VNode } from 'linjar'
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

const declaration = (path: string) => {
  if (path.endsWith('.html')) {
    return '<!DOCTYPE html>'
  }
  if (path.endsWith('.xml')) {
    return '<?xml version="1.0" encoding="UTF-8"?>'
  }
  return ''
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
  const rendered = render(node, { xml: outputPath.endsWith('.xml') })
  const prettified = prettify(declaration(outputPath) + rendered, outputPath)

  writeFileSync(outputPath, prettified)

  console.log(`Generated path: ${outputPath}`)
}
