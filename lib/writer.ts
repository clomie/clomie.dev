import { parse, join } from 'path'
import { mkdirSync, writeFileSync } from 'fs'

export const writeContent = (
  outDir: string,
  { path, content }: ContentFile
) => {
  const { dir, base } = parse(path)

  const parent = join(outDir, dir)
  const outputPath = join(parent, base)
  mkdirSync(parent, { recursive: true })

  writeFileSync(outputPath, content)

  return outputPath
}
