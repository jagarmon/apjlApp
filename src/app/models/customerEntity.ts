import { CustomerService } from '../services/customer.service';
import { Entity } from './Entity';

export class CustomerEntity extends Entity{
    id: number = -1;
    firstName: string = "";
    lastName: string = "";
    address: string = "";
    city: string = "";
    image?: string = "";

    constructor(private customerService: CustomerService, id: number, firstName: string, lastName: string, address: string, city: string, image?: string){
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.image = image;
    }
    override save(): void{
        this.customerService.update(this).subscribe();
    }

}