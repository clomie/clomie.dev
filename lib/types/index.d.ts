declare type Post = {
  path: string
  title: string
  createdAt: Date
  updatedAt: Date
  body: string
  image?: string
  summary: string
}

declare type PageProps<T = {}> = { path: string } & T

declare type ContentFile = {
  path: string
  content: string
}
