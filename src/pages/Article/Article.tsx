import { Await, useLoaderData } from 'react-router-dom';
import { Article as ArticleUnit } from '../../interfaces/article.interface';
import { Suspense } from 'react';

export function Article() {
    const data = useLoaderData() as { data: ArticleUnit };
    return (
        <>
            <Suspense fallback={<>Пососал...</>}>
                <Await resolve={data.data}>
                    {({ data }: { data: ArticleUnit }) => (
                        <>Article - {data.title}</>
                    )}
                </Await>
            </Suspense>
        </>
    );
}

export default Article;
