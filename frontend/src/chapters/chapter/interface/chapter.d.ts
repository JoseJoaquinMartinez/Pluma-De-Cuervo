export interface ChapterProps {
  id: number;
  title: string;
  imagen: string;
  chapterNumber: number;
  createdAt: string;
  bookId: number;
  paragraph: Paragraph[];
  bookTitle: string;
}

export interface Paragraph {
  id: number;
  paragraphNumber: number;
  paragraphText: string;
  paragraphType: string;
  chapterId: number;
}
