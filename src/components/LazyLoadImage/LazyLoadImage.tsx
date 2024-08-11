import classNames from "classnames/bind";
import { useState } from "react";
import useLazyLoadImage from "../../hooks/useLazyLoadImage";
import { IPhoto } from "../../types";
import { Button } from "../Button/Button";
import heartIcon from '../../assets/icons/hearth.svg';
import styles from './lazyloadimage.module.scss';

const cx = classNames.bind(styles);

const LazyLoadImage = ({ photo }: { photo: IPhoto }) => {
    const baseImgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    const imageSizes = [
        { suffix: "_s", width: 75 },
        { suffix: "_q", width: 150 },
        { suffix: "_t", width: 100 },
        { suffix: "_m", width: 240 },
        { suffix: "_n", width: 320 },
        { suffix: "_z", width: 640 },
    ];

    const { imgRef, isLoaded } = useLazyLoadImage(baseImgUrl, imageSizes);

    const [isFavorited, setIsFavorited] = useState<boolean>(() => {
        const storedFavorites = localStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        return favorites.includes(photo.id);
    });

    const toggleFavorite = () => {
        const storedFavorites = localStorage.getItem("favorites");
        let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (favorites.includes(photo.id)) {
            favorites = favorites.filter((id: string) => id !== photo.id);
        } else {
            favorites.push(photo.id);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorited(!isFavorited);
    };

    return (
        <div className={cx('img-container', { loaded: isLoaded })}>
            <img ref={imgRef} alt={photo.title} />
            {isFavorited && (
                <img
                    src={heartIcon}
                    alt="Favorited icon"
                    className={cx('heart-icon')}
                />
            )}
            <div className={cx('img-container__data')}>
                <div>
                    <h3>{photo.title ? photo.title : "Image title"}</h3>
                    <hr />
                    <p>{photo.owner}</p>
                </div>
                <Button
                    text={isFavorited ? "Unfavourite" : "Favourite"}
                    onClick={toggleFavorite}
                    isFavourite={isFavorited}
                />
            </div>
        </div>
    );
};

export default LazyLoadImage;
