import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Pencil, Trash2, Shield, User } from 'lucide-react'
import { postsApi, adminApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { formatDate } from '@/lib/utils'

export default function AdminDashboard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postsApi.getAll({ limit: 100 }),
  })

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminApi.getUsers,
  })

  const deleteMutation = useMutation({
    mutationFn: postsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({ title: 'Post deleted successfully' })
    },
    onError: () => {
      toast({ title: 'Failed to delete post', variant: 'destructive' })
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, isAdmin }: { userId: number; isAdmin: boolean }) =>
      adminApi.updateUserRole(userId, isAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast({ title: 'User role updated successfully' })
    },
    onError: () => {
      toast({ title: 'Failed to update user role', variant: 'destructive' })
    },
  })

  return (
    <div className="space-y-8">
      <h1 className="font-heading font-bold text-3xl">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-2xl font-bold text-primary">{posts?.length || 0}</p>
          <p className="text-sm text-muted-foreground">Total Posts</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-2xl font-bold text-primary">{users?.length || 0}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-2xl font-bold text-primary">
            {users?.filter((u: any) => u.is_admin).length || 0}
          </p>
          <p className="text-sm text-muted-foreground">Admins</p>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-2xl font-bold text-primary">
            {posts?.reduce((sum: number, p: any) => sum + p.views, 0) || 0}
          </p>
          <p className="text-sm text-muted-foreground">Total Views</p>
        </div>
      </div>

      {/* Users Table */}
      <section>
        <h2 className="font-heading font-semibold text-xl mb-4">Manage Users</h2>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Username</th>
                <th className="text-left p-3 text-sm font-medium">Email</th>
                <th className="text-left p-3 text-sm font-medium">Role</th>
                <th className="text-left p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="p-3 text-sm">{user.username}</td>
                  <td className="p-3 text-sm text-muted-foreground">{user.email}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        user.is_admin
                          ? 'bg-primary/20 text-primary'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {user.is_admin ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                      {user.is_admin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button
                      size="sm"
                      variant={user.is_admin ? 'outline' : 'default'}
                      onClick={() =>
                        updateRoleMutation.mutate({
                          userId: user.id,
                          isAdmin: !user.is_admin,
                        })
                      }
                      disabled={user.username === 'admin'}
                    >
                      {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Posts Table */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-xl">Manage Posts</h2>
          <Button asChild>
            <Link to="/post/create">Create New Post</Link>
          </Button>
        </div>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Title</th>
                <th className="text-left p-3 text-sm font-medium">Category</th>
                <th className="text-left p-3 text-sm font-medium">Author</th>
                <th className="text-left p-3 text-sm font-medium">Date</th>
                <th className="text-left p-3 text-sm font-medium">Views</th>
                <th className="text-left p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post: any) => (
                <tr key={post.id} className="border-t border-border">
                  <td className="p-3 text-sm max-w-xs truncate">{post.title}</td>
                  <td className="p-3 text-sm">{post.category}</td>
                  <td className="p-3 text-sm text-muted-foreground">{post.author.username}</td>
                  <td className="p-3 text-sm text-muted-foreground">{formatDate(post.created_at)}</td>
                  <td className="p-3 text-sm">{post.views}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/post/edit/${post.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this post?')) {
                            deleteMutation.mutate(post.id)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
