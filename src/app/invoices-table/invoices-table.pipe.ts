import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from '../invoices/models/invoice';

@Pipe({
  name: 'invoicesTable'
})
export class InvoicesTablePipe implements PipeTransform {

  transform(invoices: Invoice[], searchWord: string, filterBy: string): Invoice[] {
    let result: Invoice[] = invoices;
    searchWord = searchWord.toLowerCase();
    
    if(searchWord === "") return result
    if(filterBy === "0"){
      result = invoices.filter(val => val.invoiceID.toLowerCase().includes(searchWord));}
    else if(filterBy === "1"){
      result = invoices.filter(val => val.invoiceState.toLowerCase().includes(searchWord));      
    }else if(filterBy === "2"){
      result = invoices.filter(val => val.work.name.toLowerCase().includes(searchWord));
    }else if(filterBy === "3"){      
      result = invoices.filter(val =>{ 
        let completeName: string = val.work.customer.firstName + " "+ val.work.customer.lastName
        return completeName.toLowerCase().includes(searchWord)
      });
      
    }
    return result;
  }

}