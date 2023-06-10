import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewContactRoutingModule } from './new-contact-routing.module';
import { FormsModule } from '@angular/forms';
import { NewContactComponent } from './new-contact.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactsModule } from '../contacts/contacts.module';


@NgModule({
  declarations: [
    NewContactComponent
  ],
  imports: [
    CommonModule,
    NewContactRoutingModule,
    FormsModule,
    ContactsModule
  ],
  exports: [
  ]
})
export class NewContactModule { }
