export interface User {
    username: string;
    password: string;
    confirmPassword?: string;
    firstName: string;
    lastName: string;
    isKeepLoggedIn?: boolean;
}