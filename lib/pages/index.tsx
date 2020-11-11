import { h } from 'linjar'
import { FormattedTime } from '../components/FormattedTime'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const IndexPage = ({ path, posts }: PageProps<{ posts: Post[] }>) => {
  return (
    <DefaultLayout path={path} type="website">
      <main>
        <ul class="posts">
          {posts.map(({ title, path, createdAt }) => (
            <li>
              <a href={path}>{title}</a>
              <div class="timestamp">
                <FormattedTime datetime={createdAt} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </DefaultLayout>
  )
}
