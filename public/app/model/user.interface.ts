export interface User {
    username: string;
    password: string;
    confirmPassword?: string;
    isKeepLoggedIn?: boolean;
}