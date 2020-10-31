declare type Post = {
  path: string
  title: string
  createdAt: Date
  updatedAt: Date
  body: string
  image?: string
}

declare type PageProps<T = {}> = { path: string } & T
