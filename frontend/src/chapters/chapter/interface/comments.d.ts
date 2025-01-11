export type UserComments = Comment[];

export interface Comment {
  id: number;
  commentBody: string;
  paragraphId: number;
  regularUserDataId: number;
  adminUserDataId: any;
  parentCommentId: any;
  createdAt: string;
}
