import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CardListComponent } from './card-list/card-list.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { DetailsModalComponent } from './card-list/details-modal/details-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    FloatingButtonComponent,
    CardListComponent,
    DetailsModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    FloatingButtonComponent,    
    CardListComponent,
    DetailsModalComponent
  ]
})
export class SharedModule { }
