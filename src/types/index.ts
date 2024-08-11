export interface IPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  isFavorited?: boolean;
}

export type FetchHookData = {
  data: IPhoto[];
  loading: boolean;
  error: boolean;
  lastImageElementRef: (node: HTMLElement | null) => void;
};

export interface IIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
  isFavourite?: boolean;
}
