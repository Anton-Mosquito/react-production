import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}

/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
export const Loader = ({ className = '' }: LoaderProps): JSX.Element => {
    return (
        <div className={classNames('lds-ellipsis', {}, [className])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
