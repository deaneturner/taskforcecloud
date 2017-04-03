import { ClientItem } from './clientitem.interface.ts';

export interface Client {
    company: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    email: string;
    phone: string;
    clientItems: Array<ClientItem>;
}
