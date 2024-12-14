export interface ChapterProps {
    id: number
    title: string
    imagen: string
    chapterNumber: number
    createdAt: string
    estimatedReadTime: string
    bookId: number
    paragraph: Paragraph[]
}

export interface Paragraph {
    id: number
    paragraphNumber: number
    paragraphText: string
    paragraphType: string
    chapterId: number
}

