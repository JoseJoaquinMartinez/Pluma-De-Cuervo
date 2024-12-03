export interface BookCardComponentProps {
  id: number;
  title: string;
  Synopsis: string;
  imagen: string;
}

export interface LastFiveChapters {
  id: number;
  imagen: string;
  title: string;
  estimatedReadTime: string;
  createdAt: string;
}
