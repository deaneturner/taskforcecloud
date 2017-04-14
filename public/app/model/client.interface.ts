import { ClientItem } from './clientitem.interface.ts';

export interface Client {
    _id: string;
    company: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    email: string;
    phone: string;
}
