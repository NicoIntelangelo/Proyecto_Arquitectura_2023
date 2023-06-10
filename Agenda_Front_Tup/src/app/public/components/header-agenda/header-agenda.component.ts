import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AgendaJsonPlaceholder } from 'src/app/interfaces/agenda.interface';
import { AgendaService } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsComponent } from '../../pages/contacts/contacts.component';

@Component({
  selector: 'app-header-agenda',
  templateUrl: './header-agenda.component.html',
  styleUrls: ['./header-agenda.component.scss']
})
export class HeaderAgendaComponent implements OnInit {


  agendas:AgendaJsonPlaceholder[] = [{
    id: 1,
    nombre: 'Trabajo',
    codigo: '4506'
  },
  {
    id: 2,
    nombre: 'Familia',
    codigo: '9374'
  },
  {
    id: 3,
    nombre: 'Amigos',
    codigo: '6302'
  }];//lista con la cual itera el ngfor en el html


  constructor(private as:AgendaService, private auth:AuthService, private Cc:ContactsComponent,private router:Router) { }

  @Input() agenda:AgendaJsonPlaceholder = {
    id: 0,
    nombre: '',
    codigo: ''
  };

  ngOnInit(): void {
    //this.getDataAgendas();//ejecuta el metodo para traer las agendas del usuario
  }


  async getDataAgendas(){
    this.agendas = await this.as.getAgendas(); //trae todas las agendas del usuario
  }

  addAgenda(agendaid:string){ //toma el valor del input(html)
    const  agendaId = this.as.addAgenda(agendaid) // agrega la agenda con ese id
    window.location.reload();//recarga la pagina automaticamente
    console.log(agendaId)
  }

  agendaSelec(agendaId: number, agendaNom: string){
    this.Cc.agendaMostrada = agendaId //cambia el valor de la variable agendaMostrada en el contact.component(la utiliza para mostrar el codigo de la agenda en el titulo)
    this.Cc.agendaMostradaNombre = agendaNom //guarda el nombre de la agenda
    this.Cc.abrirContactEdit = 0 //para q el html muestre las contact card
    this.Cc.getData(agendaId) //ejecuta el metodo getdata() del contact component el cual trae todos los contactos de una agenda
  }

  crearAgenda(){
    this.Cc.abrirContactEdit = 2 //hace q se cierren las contact-card y se abra el crear agenda
    this.Cc.editarAgenda = false //hace q el html de el agenda component este en modo crear agenda y no editar ageenda
  }

  // deleteAgenda(agendaid:string){ //toma el valor del input(html)
  //   const  agendaId = this.as.deleteAgenda(agendaid) // agrega la agenda con ese id
  //   console.log("agenda:",agendaId,"eliminada")
  //   window.location.reload();//recarga la pagina automaticamente
  // }

}
