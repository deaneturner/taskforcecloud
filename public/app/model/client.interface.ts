export interface Client {
    username: string;
    password: string;
    confirmPassword?: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    isKeepLoggedIn?: boolean;
}
