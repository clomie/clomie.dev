interface Env {
  BASIC_AUTH_USERNAME: string
  BASIC_AUTH_PASSWORD: string
}

export const onRequest: PagesFunction<Env> = async ({ request, next, env }) => {
  const authToken = btoa(
    env.BASIC_AUTH_USERNAME + ':' + env.BASIC_AUTH_PASSWORD,
  )
  if (request.headers.get('Authorization') === `Basic ${authToken}`) {
    return next(request)
  }

  return new Response('Unauthorized', {
    status: 401,
    statusText: 'Unauthorized',
    headers: {
      'WWW-Authenticate': 'Basic realm="Access to staging site"',
    },
  })
}
