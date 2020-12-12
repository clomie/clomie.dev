import { URL_PREFIX } from './env'

export const renderSitemap: (paths: string[]) => ContentFile = (
  paths: string[]
) => {
  const path = 'sitemap.txt'
  const content = paths.map((path) => URL_PREFIX + path).join('\n')
  return { path, content }
}
