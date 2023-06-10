import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ContactJsonPlaceholder } from 'src/app/interfaces/contact.interface';
import { AgendaService } from 'src/app/services/agenda.service';
import { ContactService } from 'src/app/services/contact.service.service';
import { AgendaComponent } from '../../components/agenda/agenda.component';
import { HeaderAgendaComponent } from '../../components/header-agenda/header-agenda.component';
import { NewContactComponent } from '../new-contact/new-contact.component';



//import { contactsData } from 'src/assets/mockData/data';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsData:ContactJsonPlaceholder[] = [];//lista con la cual itera el ngfor en el html

  contacts: ContactJsonPlaceholder [] = [
    {
      id : 1,
      nombre : "Santiago",
      apellido : "Crucianelli",
      mail : "austral@gmail.com",
      telefono : "12345678",
      direccion : "la rioja 143",
      agendaId : 1,
    },
    {
      id : 2,
      nombre : "Mateo",
      apellido : "Monti",
      mail : "austral@gmail.com",
      telefono : "12345678",
      direccion : "san juan 645",
      agendaId : 1,
    },
    {
      id : 3,
      nombre : "Juan",
      apellido : "Saglione",
      mail : "austral@gmail.com",
      telefono : "12345678",
      direccion : "santa fe 920",
      agendaId : 1,
    },
    {
      id : 4,
      nombre : "Nicolas",
      apellido : "Intelangelo",
      mail : "austral@gmail.com",
      telefono : "12345678",
      direccion : "buenos aires 483",
      agendaId : 1,
    },
    {
      id : 5,
      nombre : "Tio",
      apellido : "Juan",
      mail : "juan@gmail.com",
      telefono : "12345678",
      direccion : "salta 673",
      agendaId : 2,
    },
    {
      id : 6,
      nombre : "Primo",
      apellido : "Estevan",
      mail : "estevan@gmail.com",
      telefono : "12345678",
      direccion : "jujuy 113",
      agendaId : 2,
    },
    {
      id : 7,
      nombre : "Susana",
      apellido : "Oria",
      mail : "susi@gmail.com",
      telefono : "12345678",
      direccion : "entre rios 892",
      agendaId : 3,
    },
    {
      id : 8,
      nombre : "Leo",
      apellido : "Messi",
      mail : "leo10@gmail.com",
      telefono : "12345678",
      direccion : "Miami",
      agendaId : 3,
    },
  ];

  constructor(private cs:ContactService,private as:AgendaService, private router:Router) { }  //private Ha: HeaderAgendaComponent

  idContactoForEdit: number = 0 //este dato llega desde la contact card y es utilizado por el edit contact component

  abrirContactEdit: number = 0 //0 contact card,1 editar contacto, 2 crear agenda

  editarAgenda: boolean= false

  agendaMostrada: number = -1 //id de la agenda mostrada, si es -1 muestra el titulo "seleccionar agenda"

  agendaMostradaNombre: string = ""

  ngOnInit(): void {
  }


  async getData(agendaId : number): Promise<void>{
    //this.contactsData = await this.cs.getContacts(agendaId); //rellena ContactData con todos los contactos de una agenda
    this.contactsData = this.contacts.filter((contact) => contact.agendaId === agendaId)
  }

  async deleteContacto(contactoId : number): Promise<void>{ //se ejecuta desde la contact card
    await this.cs.deleteContact(contactoId);
  }

  reload(){
    this.getData(this.agendaMostrada)
  }

  editAgenda(){ //metodo llamado desde un boton en el html
    this.abrirContactEdit = 2 //abre el componente de agenda y cierra las contact card
    this.editarAgenda = true //hace que el html de el componente agenda cambie de crear agenda a editar agenda
  }

  agregarcontacto(){
    this.router.navigate(['/new-contact',this.agendaMostrada])
  }

  deleteAgenda(){ //toma el valor del input(html)
    const  agendaId = this.as.deleteAgenda(this.agendaMostrada.toString()) // agrega la agenda con ese id
    console.log("agenda:",agendaId,"eliminada")
    window.location.reload();//recarga la pagina automaticamente
  }

}
