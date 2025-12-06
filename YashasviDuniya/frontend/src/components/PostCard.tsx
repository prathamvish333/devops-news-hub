import { Link } from 'react-router-dom'
import { formatDate } from '@/lib/utils'

interface Post {
  id: number
  title: string
  slug: string
  summary?: string
  image_url?: string
  category: string
  views: number
  author: {
    username: string
    full_name?: string
  }
  created_at: string
}

interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  if (variant === 'featured') {
    return (
      <Link to={`/article/${post.id}`} className="group block">
        <article className="relative overflow-hidden rounded-lg">
          <div className="aspect-video">
            <img
              src={post.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800'}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded mb-3">
              {post.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            {post.summary && (
              <p className="text-gray-300 text-sm line-clamp-2 mb-3">{post.summary}</p>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{post.author.full_name || post.author.username}</span>
              <span>•</span>
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link to={`/article/${post.id}`} className="group flex gap-4">
        <div className="w-24 h-16 shrink-0 overflow-hidden rounded">
          <img
            src={post.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <span className="text-xs text-muted-foreground">{formatDate(post.created_at)}</span>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/article/${post.id}`} className="group block">
      <article className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded mb-2">
            {post.category}
          </span>
          <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.summary && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.summary}</p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.author.full_name || post.author.username}</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
