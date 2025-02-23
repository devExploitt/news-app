import styles from './Headling.module.scss';
import cn from 'classnames';
import { HeadlingProps } from './Headling.props';

function Headling({ children, className, ...props }: HeadlingProps) {
    return (
        <h1 className={cn(className, styles['h1'])} {...props}>
            {children}
        </h1>
    );
}

export default Headling;
