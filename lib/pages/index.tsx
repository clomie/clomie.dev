import { h } from 'preact'
import { FormattedTime } from '../components/FormattedTime'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const IndexPage = ({ path, posts }: PageProps<{ posts: Post[] }>) => {
  return (
    <DefaultLayout path={path} type="website">
      <main>
        <section>
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
        </section>
      </main>
    </DefaultLayout>
  )
}
