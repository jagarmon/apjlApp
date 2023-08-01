import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Invoice } from '../invoices/models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoicesUrl: string;

  constructor(private http: HttpClient) {
    this.invoicesUrl = 'http://localhost:8080/facturas';
  }

  public findAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl+"/listar");
  }

  public save(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.invoicesUrl+"/nuevo", invoice);
  }

  public update(invoice: Invoice): Observable<Invoice>{
    return this.http.put<Invoice>(this.invoicesUrl+"/actualizar/"+invoice.id,invoice);
  }

  public delete(id: number){
    return this.http.delete<Invoice>(this.invoicesUrl+"/eliminar/"+id);
  }
}