import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ContactJsonPlaceholder } from 'src/app/interfaces/contact.interface';
import { ContactService } from 'src/app/services/contact.service.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactCardComponent } from '../../components/contact-card/contact-card.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { HomeComponent } from '../home/home.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  //edit_new:boolean = true //true/false //para cambiar entre edicion y creacion de contacto


  contactData:ContactJsonPlaceholder = {
    nombre: '',
    apellido: '',
    mail: '',
    telefono: '',
    direccion: '',
    agendaId: 0
  };


  constructor(private cs : ContactService, private router:Router, private ar:ActivatedRoute) { }  //private Cc: ContactCardComponent


  ngOnInit(): void {
    this.ar.params.subscribe(params =>{const sub: any = params['id'] || null;
    this.contactData.agendaId =parseInt(sub)
  });
  }


  async newcontact(form:NgForm){ /***************** */
  console.log(form.value);
  const contactocreado = this.cs.addContact(this.contactData); //ejectua addContact del contact service con los valores del form
  console.log("el contacto ",(await contactocreado).nombre," fue creado con el id: ",(await contactocreado).id);
  this.router.navigate(['/contacts']); //cuando iniciamos secion nos lleva a contactos if(await contactocreado)
  }


}
