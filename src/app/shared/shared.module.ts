import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from './card-list/card-list.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { DetailsModalComponent } from './card-list/details-modal/details-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FilterCardListPipe } from './card-list/filter-card-list.pipe';

@NgModule({
  declarations: [
    FloatingButtonComponent,
    CardListComponent,
    DetailsModalComponent,
    ConfirmationModalComponent,
    NavbarComponent,
    FilterCardListPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    FloatingButtonComponent,    
    CardListComponent,
    DetailsModalComponent,
    NavbarComponent,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    FilterCardListPipe
  ]
})
export class SharedModule { }
