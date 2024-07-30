import { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { Article } from '../../interfaces/article.interface';
import Headling from '../../components/Headling/Headling';
import { MainList } from './MainList/MainList';
import FormPage from '../Form/FormPage';

export function Main() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const getArticles = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<Article[]>(`${PREFIX}/articles`);
            setArticles(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <>
            <div className={styles['body-head']}>
                <Headling>Подборка дня</Headling>
            </div>
            <div id='content'>
                {error && <>{error}</>}
                {!isLoading && <MainList articles={articles} />}
                {isLoading && <>Loading...</>}
            </div>
            <FormPage />
        </>
    );
}

export default Main;
