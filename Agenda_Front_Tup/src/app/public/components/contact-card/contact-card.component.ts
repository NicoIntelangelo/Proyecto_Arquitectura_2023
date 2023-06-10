import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContactJsonPlaceholder } from 'src/app/interfaces/contact.interface';
import { ContactsComponent } from '../../pages/contacts/contacts.component';
import { NewContactComponent } from '../../pages/new-contact/new-contact.component';
//import { Contact, defaultContact, Eric, Catherine } from 'src/app/interfaces/contactData';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  constructor(private cc:ContactsComponent, private router:Router) { }



  @Input() contact:ContactJsonPlaceholder = { //recibe los datos del contacto
    id: 0,
    nombre: '',
    apellido: '',
    mail: '',
    telefono: '',
    direccion: '',
    agendaId: 0,
  };

  ngOnInit(): void {
  }


  deleteContacto(id:number){  //metodo llamado desde el boton borrar del html(recibe el id del contacto de esa agenda)
    console.log("contacto id: ",id," eliminado")
    this.cc.deleteContacto(id) //ejecuta el metodo deleteContacto() del contact component
    setTimeout(()=>{
      this.cc.reload();
    },100);//recarga la ultima agenda, con un retraso de 50mls para asegurarnos q los metodos anteriores hayan terminado
  }

  editContacto(id:number){  //metodo llamado desde el boton edit del html(recibe el id del contacto de esa agenda)
    console.log("contacto id: ",id," edit")
    this.cc.idContactoForEdit = id //cambia el valor de idContactoForEdit en el contact component
    this.cc.abrirContactEdit = 1 //cambia el valor de abrirContactEdit en el contact component por 1 para q se cierre las contact-card y se abra el edit-form
  }

}

