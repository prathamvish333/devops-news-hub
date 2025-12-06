import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@/lib/api'
import PostCard from '@/components/PostCard'

const categories = ['India', 'World', 'Business', 'Tech', 'Sports', 'Entertainment']

export default function HomePage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postsApi.getAll({ limit: 20 }),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const featuredPost = posts?.[0]
  const secondaryPosts = posts?.slice(1, 5) || []
  const remainingPosts = posts?.slice(5) || []

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {featuredPost && (
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PostCard post={featuredPost} variant="featured" />
          </div>
          <div className="space-y-4">
            {secondaryPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {/* Category Sections */}
      {categories.map((category) => {
        const categoryPosts = remainingPosts.filter((p) => p.category === category)
        if (categoryPosts.length === 0) return null

        return (
          <section key={category}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-heading font-bold text-xl">{category}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
