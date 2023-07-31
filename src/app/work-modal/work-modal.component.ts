import { Component, Inject } from '@angular/core';
import { Work } from '../works/models/work';
import { WorkService } from '../services/work.service';
import { Customer } from '../customers/models/customer';
import { CustomerService } from '../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-modal',
  templateUrl: './work-modal.component.html',
  styleUrls: ['./work-modal.component.css']
})
export class WorkModalComponent {
  work = {} as Work;
  customers= [] as Customer[];
  type: string = "";
  selectedStates = [] as Customer[];
  checkIcon=faCheck;
  cancelIcon=faXmark;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _router: Router,
    private workService: WorkService,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<WorkModalComponent>){
      this.work = data.work;
      this.type = data.type;
    }

  compareByID(itemOne: any, itemTwo: any){
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
    }
  ngOnInit(): void {
   
    this.customerService.findAll().subscribe(
      (data: Customer[]) => {

      if(data){
        this.customers = data; 
        this.selectedStates = data; 
        if (this.work.customer.firstName === "") this.work.customer = data[0];
        
      } 
    })    
  }

  saveClick(){
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

  closeClick(){
    this.dialogRef.close();
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

  generateInvoiceClick(idWork: number){
    this.dialogRef.close();
    this._router.navigateByUrl("trabajos/factura/"+idWork)
  }

  keyUp(value: any){
    this.selectedStates = this.search(value.value);
  }
  search(value: string) { 
    let filter = value.toLowerCase();
    
    return this.customers.filter(option =>{
      let fullName = option.firstName.toLowerCase() + " " + option.lastName.toLowerCase();
      
      return fullName.includes(filter);
    });
  }

}
