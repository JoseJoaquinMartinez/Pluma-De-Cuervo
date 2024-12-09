export interface ChapterProps {
    id: number,
    title: string,
    chapterNumber: number,
    paragraph: Paragraph[]
    createdAt: string,
    estimatedReadTime: string,
    bookId,
}

export interface Paragraph {
    id: number,
    paragraphNumber: number,
    comment: Comment[],
    paragraphText: string,
    paragraphType: string,
    chapterId: number,
}

export interface Comment{
    id: number,
    commnetBody: string,
    paragraphId: number,
    regularUserDataId?: number,
    adminUserDataId?: number,
    parentCommentId?: number,
    replies: Commnet[],
    createdAt: string,

}