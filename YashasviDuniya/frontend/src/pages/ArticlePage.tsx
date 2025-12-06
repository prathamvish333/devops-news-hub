import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clock, Eye, User } from 'lucide-react'
import { postsApi } from '@/lib/api'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postsApi.getById(Number(id)),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Button asChild>
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      {/* Category */}
      <Link
        to={`/category/${post.category}`}
        className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded mb-4 hover:bg-primary/90 transition-colors"
      >
        {post.category}
      </Link>

      {/* Title */}
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{post.author.full_name || post.author.username}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{formatDateTime(post.created_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{post.views} views</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.image_url && (
        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Summary */}
      {post.summary && (
        <p className="text-lg text-muted-foreground border-l-4 border-primary pl-4 mb-8">
          {post.summary}
        </p>
      )}

      {/* Content */}
      <div
        className="prose prose-invert max-w-none prose-headings:font-heading prose-p:text-foreground prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-sm font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
