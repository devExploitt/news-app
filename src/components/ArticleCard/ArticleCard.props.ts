export interface ArticleCardProps {
    id: string;
    title: string;
    link: string;
    keywords: string[];
    creator: string | null;
    description: string | null;
    content: string;
    pubDate: string;
    image_url?: string;
    source_id: string;
    source_icon: string;
    country: string;
    category: string[];
    className?: string;
}
