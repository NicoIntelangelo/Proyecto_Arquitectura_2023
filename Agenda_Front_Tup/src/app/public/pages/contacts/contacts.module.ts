import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { contactsRoutingModule } from './home-routing.module';
import { ContactCardComponent } from '../../components/contact-card/contact-card.component';
import { HeaderAgendaComponent } from '../../components/header-agenda/header-agenda.component';
import { EditContactComponent } from '../../components/edit-contact/edit-contact.component';
import { FormsModule } from '@angular/forms';
import { AgendaComponent } from '../../components/agenda/agenda.component';



@NgModule({
  declarations: [
    ContactsComponent,
    ContactCardComponent,
    HeaderAgendaComponent,
    EditContactComponent,
    AgendaComponent
  ],
  imports: [
    CommonModule,
    contactsRoutingModule,
    FormsModule

  ],
  exports:[
    HeaderAgendaComponent,
    ContactsComponent
  ]
})
export class ContactsModule { }
