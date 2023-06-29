import { Component, Inject } from '@angular/core';
import { Work } from '../works/models/work';
import { WorkService } from '../services/work.service';
import { Customer } from '../customers/models/customer';
import { CustomerService } from '../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-work-modal',
  templateUrl: './work-modal.component.html',
  styleUrls: ['./work-modal.component.css']
})
export class WorkModalComponent {
  work = {} as Work;
  customers= [] as Customer[];
  settingsPressed: boolean = false;
  type: string = "";

  invoiceIcon=faFileInvoice;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private workService: WorkService,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<WorkModalComponent>){
      this.work = data.work;
      this.settingsPressed = data.settingsPressed;
      this.type = data.type;
    }

  compareByID(itemOne: any, itemTwo: any){
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
    }
  ngOnInit(): void {
   
    this.customerService.findAll().subscribe(
      (data: Customer[]) => {
      if(data) this.customers = data;      
    })
  }

  saveClick(){
    window.close()
    console.log("CUSTOMERRR: ",this.work.customer)
      if(this.type === 'create')      
      setTimeout(()=>{
        this.workService.save(this.createWorkObject()).subscribe();
        
      },2000);   
    else if(this.type === 'update')
      setTimeout(()=>{
        this.workService.update(this.createWorkObject()).subscribe();
        
      },2000);
      
    this.dialogRef.close();
    if(this.type==='create') setTimeout(()=>{window.location.reload();},2000);
    
  }
  
  createWorkObject(): Work{
    let work: Work = {
      id: this.work.id,
      name: this.work.name,
      description: this.work.description,
      address: this.work.address,
      city: this.work.city,
      price: this.work.price,
      customer: this.work.customer,
      paid: this.work.paid
    }
    return work;
  }

  generateInvoiceClick(){
    
  }

}
