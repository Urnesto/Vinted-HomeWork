import classNames from "classnames/bind";
import { useState } from "react";
import useFetch from "../../hooks/useFetchData";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
import { IPhoto } from "../../types";
import styles from './Gallery.module.scss'

const cx = classNames.bind(styles);

const Gallery = () => {
    const [page, setPage] = useState(0);
    const { data, error, loading } = useFetch(page);
    const observerRef = useInfiniteScroll(() => setPage((prev) => prev + 1), { root: null, rootMargin: '30px', threshold: 0 });

    return (
        <div>
            <div className={cx('gallery')}>
                <div className={cx('gallery-items')}>
                {data.map((photo: IPhoto, index: number) => (
                    <LazyLoadImage key={`${photo.id}-${index}`} photo={photo} />
                ))}
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data.</p>}
            <div ref={observerRef} />
        </div>
    );
};

export default Gallery;
