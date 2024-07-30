import { MainListProps } from './MainList.props';
import styles from './MainList.module.scss';
import { lazy, Suspense } from 'react';

export function MainList({ articles }: MainListProps) {
    const ArticleCard = lazy(
        () => import('../../../components/ArticleCard/ArticleCard')
    );
    return (
        <div className={styles['wrapper']}>
            <Suspense fallback={<>Loading...</>}>
                {articles.map((a, index) => (
                    <ArticleCard
                        key={a.id}
                        id={a.id}
                        title={a.title}
                        link={a.link}
                        keywords={a.keywords}
                        creator={a.creator}
                        description={a.description}
                        content={a.content}
                        pubDate={a.pubDate}
                        image_url={a.image_url}
                        source_id={a.source_id}
                        source_icon={a.source_icon}
                        country={a.country}
                        category={a.category}
                        className={styles[`article-${index + 1}`]}
                    />
                ))}
            </Suspense>
        </div>
    );
}
