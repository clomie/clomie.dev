import { Fragment, h } from 'preact'
import { FormattedTime } from '../components/FormattedTime'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const PostPage = ({ path, post }: PageProps<{ post: Post }>) => {
  const { title, updatedAt, createdAt, body, image } = post
  return (
    <DefaultLayout path={path} type="article" title={title} image={image}>
      <main>
        <article>
          <h1>{title}</h1>
          <div class="timestamp">
            {updatedAt.getTime() !== createdAt.getTime() ? (
              <Fragment>
                <FormattedTime datetime={createdAt} />, Updated:
                <FormattedTime datetime={updatedAt} />
              </Fragment>
            ) : (
              <FormattedTime datetime={createdAt} />
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </article>
      </main>
    </DefaultLayout>
  )
}
