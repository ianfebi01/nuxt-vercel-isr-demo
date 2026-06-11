// API route that fetches data from a free API (JSONPlaceholder)
// The server-side timestamp proves when the page was last generated (ISR).

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default defineEventHandler(async () => {
  // Fetch posts from JSONPlaceholder free API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: 'Failed to fetch posts from external API',
    })
  }

  const posts: Post[] = await res.json()

  return {
    posts,
    // This timestamp shows when the page was generated on the server
    // It will only change when ISR revalidation happens
    generatedAt: new Date().toISOString(),
    note: 'This data is cached via ISR. It will refresh every 60s (time-based) or when on-demand revalidation is triggered.',
  }
})
