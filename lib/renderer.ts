import '@prettier/plugin-xml'
import { mkdirSync, writeFileSync } from 'fs'
import { join, parse } from 'path'
import { h } from 'preact'
import render from 'preact-render-to-string'
import { format, Options as PrettierOptions } from 'prettier'

type Route<T> = {
  path: string
  page: (props: PageProps<T>) => h.JSX.Element
  props: T
}

export function route<T>(
  path: string,
  page: (props: PageProps<T>) => h.JSX.Element,
  props: T
) {
  return { path, page, props }
}

const calculatePaths = (outDir: string, path: string) => {
  const parsed = parse(path)

  const name = parsed.name || 'index'
  const ext = parsed.ext || '.html'

  const parent = join(outDir, parsed.dir)
  const basename = name + ext

  const outputPath = join(parent, basename)
  const actualPath = join(parsed.dir, basename)

  return {
    parent,
    outputPath,
    actualPath,
    ext,
  }
}

export const renderer = (outDir: string, { path, page, props }: Route<any>) => {
  const { parent, outputPath, actualPath, ext } = calculatePaths(outDir, path)

  mkdirSync(parent, { recursive: true })

  const node = page({ path, ...props })
  const rendered = render(node)

  const prettierOptions: PrettierOptions = {
    printWidth: Number.MAX_SAFE_INTEGER,
    filepath: actualPath,
  }
  if (ext === '.xml') {
    // @ts-ignore
    prettierOptions.xmlWhitespaceSensitivity = 'ignore'
  }

  const prettified = format(rendered, prettierOptions)

  writeFileSync(outputPath, prettified)
  console.log(`Generated path: ${actualPath}`)
}
