export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface ITodoItem {
    id: string;
    name: string;
    status: 'PENDING' | 'IN-PROGRESS' | 'DONE';
    assignedTo?: IUser;
}

export interface ITodoList {
    id: string;
    name: string;
    description: string;
    items: ITodoItem[];
    status: 'IN-PROGRESS' | 'DONE';
}