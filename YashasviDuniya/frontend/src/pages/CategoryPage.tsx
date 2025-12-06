import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@/lib/api'
import PostCard from '@/components/PostCard'

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', category],
    queryFn: () => postsApi.getAll({ category }),
    enabled: !!category,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-heading font-bold text-3xl">{category}</h1>
        <div className="h-px flex-1 bg-border" />
      </div>

      {posts?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
