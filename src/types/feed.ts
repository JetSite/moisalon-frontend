export interface IBeautyCategories {
  id: string;
  title: string;
  feeds: IFeed[];
}

export interface IFeed {
  id: string;
  title: string;
  content: string;
  shortDescription: string;
  cover: ICoverImage;
  feed_category: ICategorySummary[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ICoverImage {
  id: string;
  name: string;
  alternativeText: string | null;
  formats: {
    large?: IImageFormat;
    medium?: IImageFormat;
    small?: IImageFormat;
    thumbnail?: IImageFormat;
  };
  url: string;
  previewUrl: string | null;
}

export interface IImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface ICategorySummary {
  id: string;
  title: string;
}
