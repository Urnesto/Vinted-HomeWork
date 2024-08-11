import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '../../types';

const cx = classNames.bind(styles);
export function Button({ text, onClick, isFavourite
}: ButtonProps): ReactElement {
    return (
        <button className={cx('button', {
            'button__is--favourite': isFavourite,
        })} onClick={onClick}>
            {text}
        </button>
    );
}
