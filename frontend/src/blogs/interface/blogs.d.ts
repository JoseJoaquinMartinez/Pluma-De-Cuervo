import { SingleBlog } from "../blog/singleBlog";
export type Blogs = AllExistingBlog[];

export interface AllExistingBlog {
  id: number;
  title: string;
  imagen: string;
  createdAt: string;
}

export interface SingleBlog {
  id: number;
  title: string;
  blogText: string;
  imagen: string | File;
  createdAt: string;
}
