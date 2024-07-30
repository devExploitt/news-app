import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import cn from 'classnames';
import Search from '../../components/Search/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function Layout() {
    const items = useSelector((s: RootState) => s.subs.items);
    let dateTime: Date = new Date();

    let dataOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let formatedDate: string = dateTime.toLocaleDateString(
        'ru-RU',
        dataOptions
    );

    return (
        <div className={styles['layout']}>
            <div className={styles['high-layout-bar']}>
                <div className={styles['today']}>{formatedDate}</div>
                <div className={styles['search-block']}>
                    <div className={styles['search']}>
                        <Search placeholder='Поиск...' />
                    </div>
                </div>
            </div>
            <div className={styles['header-logo']}>
                <Link to='/' className={styles['logo']}>
                    <img src='/logo.svg' alt='Логотип' />
                </Link>
            </div>
            <div className={styles['mainpanel']}>
                <ul className={styles['menu']}>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive
                            })
                        }
                    >
                        Меню
                    </NavLink>
                    <NavLink
                        to='/politics'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive
                            })
                        }
                    >
                        Политика
                    </NavLink>
                    <NavLink
                        to='/economy'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive
                            })
                        }
                    >
                        Экономика
                    </NavLink>
                    <NavLink
                        to='/ulyanovsk'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive
                            })
                        }
                    >
                        Наш край
                    </NavLink>
                    <NavLink
                        to='/subs'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive
                            })
                        }
                    >
                        Подписки (
                        {items.reduce((acc, i) => (acc += i.count), 0)})
                    </NavLink>
                </ul>
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>
    );
}
