export interface Comments {
  comments: Comment[];
}

/* export interface Comment {
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
} */

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
export interface Comment {
  id: number;
  commentBody: string;
  paragraphId: number;
  regularUserDataId: number | null;
  adminUserDataId: number | null;
  parentCommentId: number | null;
  createdAt: string;
  read: boolean;
  paragraph: Paragraph;
  replies?: Comment[];
  // Agregar información del usuario
  regularUserData?: RegularUser;
  adminUserData?: AdminUser;
}

export interface RegularUser {
  id: number;
  userName: string;
  regularUserId: number;
  regularUser: {
    email: string;
  };
}

export interface AdminUser {
  id: number;
  adminUserId: number;
  adminUser: {
    email: string;
  };
}
