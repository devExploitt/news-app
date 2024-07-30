import styles from './SubsItem.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { subsAction } from '../../store/subs.slice';
import { AppDispatch } from '../../store/store';
import { MouseEvent, useState } from 'react';
import { SubsItemProps } from './SubsItem.props';

function SubsItem(props: SubsItemProps) {
    const keywords: string[] | undefined =
        Array.isArray(props.keywords) && props.keywords.length > 0
            ? props.keywords
            : undefined;

    const dispatch = useDispatch<AppDispatch>();
    const addToFavorites = (e: MouseEvent) => {
        setIsActive(!isActive);
        e.preventDefault();
        dispatch(subsAction.add(props.id));
    };

    const [isActive, setIsActive] = useState(false);
    const imageUrl = props.image_url ?? undefined;

    const remove = () => {
        setIsActive(!isActive);
        dispatch(subsAction.remove(props.id));
    };

    return (
        <div className={styles['card']}>
            <div className={styles['head']}>
                <div className={styles['category']}>{props.category[0]}</div>
                <div className={styles['date']}>{props.pubDate}</div>
            </div>
            <div className={styles['content']}>
                <div className={styles['title']}>{props.title}</div>
                <button
                    className={cn(styles['add-to-favorites'], {
                        [styles['active']]: isActive
                    })}
                    onClick={remove}
                >
                    <img
                        src='/bookmark.svg'
                        alt='Добавить в избранное'
                        className={styles['active']}
                    />
                </button>
                <div className={styles['description']}>
                    <img src={imageUrl} alt='' className={styles['preview']} />
                    <div className={styles['text']}>{props.content}</div>
                    <div className={styles['creator']}>{props.creator}</div>
                </div>
            </div>
            <div className={styles['origin']}>
                <div>
                    <span>Источник:</span>
                    <img src={imageUrl} alt='' className={styles['icon']} />
                </div>
                <a className={styles['source-link']}>{props.link}</a>
            </div>
            {keywords && (
                <div className={styles['footer']}>
                    {keywords.map((el, index) => (
                        <p key={index}>{'#' + el}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SubsItem;
