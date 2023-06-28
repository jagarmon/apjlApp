import { Customer } from "../../customers/models/customer";

export interface Work {
    id: number,
    name: string;
    description: string,
    address: string,
    city: string;
    price: number;
    paid: boolean;
    customer: Customer;
}