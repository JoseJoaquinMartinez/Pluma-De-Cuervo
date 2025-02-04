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

/* Nuevas interfaces para las relaciones */

/* export interface RegularUser {
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
} */

/* Actualización de la interfaz para comentarios formateados */

/* export interface FormattedComment {
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
  // Hacemos opcional la información del usuario, ya que puede venir de regular o admin
  regularUserData?: RegularUserData;
  adminUserDataId: number | null;
  adminUserData?: AdminUserData | null;
  replies?: {
    id: number;
    commentBody: string;
    adminUserData?: AdminUserData | null;
  }[];
} */
