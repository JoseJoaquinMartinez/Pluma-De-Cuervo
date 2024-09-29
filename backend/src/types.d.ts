declare module "pdf2table" {
  const pdf2table: any;
  export default pdf2table;
}

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
  image?: string | null;
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
