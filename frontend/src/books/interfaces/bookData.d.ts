export interface BookCardComponentProps {
  id: number;
  title: string;
  Synopsis: string;
  imagen: string;
  status: string;
}
export interface BookProps {
  id: number;
  Synopsis: string;
  title: string;
  imagen: string;
  chapter: Chapter[];
}

export interface LastFiveChapters {
  id: number;
  imagen: string;
  title: string;

  createdAt: string;
}
export interface Chapter {
  bookId: number;
  chapterNumber: number;
  createdAt: string;

  id: number;
  title: string;
  imagen: string;
}
