export type Note = {
    id: string;
    title: string;
    content: string;
    isFavorite?: boolean;
    createdAt: Date;
    updatedAt: Date;
}