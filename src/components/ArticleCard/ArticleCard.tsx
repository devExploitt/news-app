import { ArticleCardProps } from './ArticleCard.props';
import styles from './ArticleCard.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { subsAction } from '../../store/subs.slice';
import { AppDispatch } from '../../store/store';
import { MouseEvent, useState } from 'react';

function ArticleCard(props: ArticleCardProps) {
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

    return (
        <Link
            to={`/article/${props.id}`}
            className={cn(styles['link'], props.className)}
        >
            <div className={styles['card']}>
                <div className={styles['head']}>
                    <div className={styles['category']}>
                        {props.category[0]}
                    </div>
                    <div className={styles['date']}>{props.pubDate}</div>
                </div>
                <div className={styles['content']}>
                    <div className={styles['title']}>{props.title}</div>
                    <button
                        className={cn(styles['add-to-favorites'], {
                            [styles['active']]: isActive
                        })}
                        onClick={addToFavorites}
                    >
                        <img src='/bookmark.svg' alt='Добавить в избранное' />
                    </button>
                    <div className={styles['description']}>
                        <img
                            src={props.image_url}
                            alt=''
                            className={styles['preview']}
                        />
                        <p>{props.description}</p>
                    </div>
                </div>
                {keywords && (
                    <div className={styles['footer']}>
                        {keywords.map((el, index) => (
                            <p key={index}>{'#' + el}</p>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ArticleCard;
