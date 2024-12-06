export interface ITodoList {
    id: string;
    name: string;
    description: string;
    items: ITodoItem[];
}

export interface ITodoItem {
    id: string;
    name: string;
    status: 'PENDING' | 'IN-PROGRESS' | 'DONE';
}