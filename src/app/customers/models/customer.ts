export interface Customer {
    id: number;
    dni: string;
    lastName: string;
    firstName: string;
    address: string;
    city: string;
    postalCode: string;
    bankAccount: string;
    image?: string;
}
