export interface Comments {
  comments: Comment[];
}

export interface Comment {
  id: number;
  commentBody: string;
  paragraphId: number;
  regularUserDataId: number;
  adminUserDataId: any;
  parentCommentId: any;
  createdAt: string;
  read: boolean;
  paragraph: Paragraph;
  replies?: Comment[];
}

export interface Paragraph {
  id: number;
  paragraphNumber: number;
  paragraphText: string;
  paragraphType: string;
  chapterId: number;
  chapter: Chapter;
}

export interface Chapter {
  title: string;
  book: Book;
}

export interface Book {
  title: string;
}
