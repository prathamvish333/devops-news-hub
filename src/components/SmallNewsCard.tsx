import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface SmallNewsCardProps {
  title: string;
  category: string;
  image?: string;
  timeAgo: string;
  slug: string;
}

const SmallNewsCard = ({ title, category, image, timeAgo, slug }: SmallNewsCardProps) => {
  return (
    <Link to={`/article/${slug}`}>
      <article className="group cursor-pointer">
        <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-2">
          {image && (
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          )}
        </div>
        <Badge variant="secondary" className="text-xs mb-1">{category}</Badge>
        <h3 className="font-serif font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <span className="text-muted-foreground text-xs">{timeAgo}</span>
      </article>
    </Link>
  );
};

export default SmallNewsCard;