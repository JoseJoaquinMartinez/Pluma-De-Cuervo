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

/* Nuevas interfaces para las relaciones */

export interface RegularUser {
  id: number;
  email: string;
  // Otras propiedades si las necesitas
}

export interface RegularUserData {
  userName: string;
  imagen?: string | null;
  regularUser: RegularUser; // Incluye el email del usuario regular
}

export interface AdminUser {
  id: number;
  email: string;
  // Otras propiedades si las necesitas
}

export interface AdminUserData {
  id: number;
  adminUser: AdminUser; // Incluye el email del administrador
}

/* Actualización de la interfaz para comentarios formateados */

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
  // Se hace opcional, ya que puede venir de admin
  regularUserData?: RegularUserData;
  adminUserDataId: number | null;
  adminUserData?: AdminUserData | null;
  replies?: {
    id: number;
    commentBody: string;
    adminUserData?: AdminUserData | null;
  }[];
}
