export interface User {
    name: string;
    password: string;
}

export interface Users {
    [key: string]: User;
}