export type UserComments = Comment[];

export interface Comment {
  id: number;
  commentBody: string;
  paragraphId: number;
  regularUserDataId: number;
  adminUserDataId: number | null;
  parentCommentId: number | null;
  createdAt: string;
}

export interface UpdatedUserCommentProps {
  id: number;
  paragraphId: number | null;
  commentBody: string;
}
