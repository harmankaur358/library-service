export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    isBorrowed: boolean;
    borrowerId?: string | null;
    dueDate?: string | null;
}