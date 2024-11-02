declare module "pdf2table" {
  const pdf2table: any;
  export default pdf2table;
}

export type Book = {
  id: number;
  title: string;
  synopsis: string;
  imagen: string;
  chapter?: Chapter[];
};

export type Paragraph = {
  id: number;
  paragraphNumber: number;
  comment?: Comment[];
  paragraphText: string;
  paragraphType: string;
  chapterId: number;
};

export type Chapter = {
  id: number;
  title: string;
  imagen?: string | null;
  chapterNumber: number;
  paragraph: Paragraph[];
  bookId: number;
};

export type Comment = {
  id: number;
  createdAt: Date;
  commentBody: string;
  paragraphId: number;
  regularUserDataId: number;
  adminUserDataId: number;
};

export type getBlogsResponse = {
  title: string;
  imagen: string;
  createdAt: Date;
};

export interface AuthenticationRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}
export interface ParagraphComment {
  id: string;
  paragraphText: string;
  chapter: {
    title: string;
    book: {
      title: string;
    };
  };
}

export interface RegularUserData {
  userName: string;
  imagen: string;
}

export interface AdminUserData {
  id: number;
}

export interface FormattedComment {
  id: number;
  createdAt: Date;
  commentBody: string;
  paragraph: {
    id: number;
    paragraphText: string;
    chapter: {
      title: string;
      book: {
        title: string;
      };
    };
  };
  regularUserData: RegularUserData;
  adminUserDataId: number | null;
  adminUserData?: AdminUserData | null;
  replies?: {
    id: number;
    commentBody: string;
    adminUserData?: AdminUserData | null;
  }[];
}
