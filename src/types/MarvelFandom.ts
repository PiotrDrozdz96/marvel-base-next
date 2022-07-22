type PageInfo = {
  title: string;
};

type ImageInfo = {
  url: string;
};

type Revision = {
  slots: {
    main: {
      '*': string;
    };
  };
};

type MarvelFandom<T> = {
  query: {
    pages: Record<string, PageInfo & T>;
  };
};

export type MarvelFandomPageInfo = MarvelFandom<{ revisions: [Revision] }>;
export type MarvelFandomImageInfo = MarvelFandom<{ imageinfo: [ImageInfo] }>;
