export interface SubsItemProps {
    id: string;
    key: string;
    title: string;
    link: string;
    keywords: string[];
    creator: string | null;
    content: string;
    pubDate: string;
    image_url?: string;
    source_icon: string;
    country: string;
    category: string[];
    count: number;
}
