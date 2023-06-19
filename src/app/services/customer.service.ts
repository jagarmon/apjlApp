import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersUrl: string;

  constructor(private http: HttpClient) {
    this.customersUrl = 'http://localhost:8080/clientes';
  }

  public findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl+"/listar");
  }

  public save(customer: Customer) {
    return this.http.post<Customer>(this.customersUrl+"/nuevo", customer);
  }
}
