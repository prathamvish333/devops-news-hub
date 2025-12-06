import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@/lib/api'
import { Link } from 'react-router-dom'

export default function NewsTicker() {
  const { data: posts } = useQuery({
    queryKey: ['posts-ticker'],
    queryFn: () => postsApi.getAll({ limit: 10 }),
  })

  if (!posts?.length) return null

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex items-center">
        <span className="bg-white text-primary font-bold px-4 py-1 text-sm shrink-0">
          BREAKING
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...posts, ...posts].map((post, index) => (
              <Link
                key={`${post.id}-${index}`}
                to={`/article/${post.id}`}
                className="mx-8 hover:underline text-sm"
              >
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
