import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  category: string;
  image?: string;
  timeAgo: string;
  featured?: boolean;
}

const NewsCard = ({ title, category, image, timeAgo, featured = false }: NewsCardProps) => {
  if (featured) {
    return (
      <article className="group cursor-pointer relative overflow-hidden rounded-lg">
        <div className="aspect-[16/9] bg-muted relative">
          {image && (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="bg-accent text-accent-foreground mb-3">{category}</Badge>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-card leading-tight group-hover:underline">
              {title}
            </h2>
            <span className="text-card/70 text-sm mt-2 block">{timeAgo}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer flex gap-4 py-4 border-b border-border last:border-b-0">
      {image && (
        <div className="w-24 h-20 md:w-32 md:h-24 flex-shrink-0 bg-muted rounded overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Badge variant="secondary" className="text-xs mb-2">{category}</Badge>
        <h3 className="font-serif font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <span className="text-muted-foreground text-xs mt-1 block">{timeAgo}</span>
      </div>
    </article>
  );
};

export default NewsCard;