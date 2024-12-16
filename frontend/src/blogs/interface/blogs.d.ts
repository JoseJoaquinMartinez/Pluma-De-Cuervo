export type Blogs = AllExistingBlog[];

export interface AllExistingBlog {
  id: number;
  title: string;
  imagen: string;
  createdAt: string;
  estimatedReadTime: string;
}
