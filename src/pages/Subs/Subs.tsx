import { useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import SubsItem from '../../components/SubsItem/SubsItem';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import { Article } from '../../interfaces/article.interface';

function Subs() {
    const [subscriptions, setSubscriptions] = useState<Article[]>([]);
    const items = useSelector((s: RootState) => s.subs.items);

    const getItem = async (id: string) => {
        const { data } = await axios.get(`${PREFIX}/articles/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setSubscriptions(res);
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);
    return (
        <>
            <Headling>Ваши понравившиеся новости</Headling>
            {items.map((i) => {
                const article = subscriptions.find((a) => a.id === a.id);
                if (!article) {
                    return;
                }
                return (
                    <SubsItem key={article.id} count={i.count} {...article} />
                );
            })}
        </>
    );
}

export default Subs;
