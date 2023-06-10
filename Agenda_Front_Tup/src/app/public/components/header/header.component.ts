import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  isLogg(){
    //this.auth.getSession()
    return this.auth.isLoggedIn()//si esta logg devuelve true sino false
  }

  logOut(){
    this.auth.loggedIn = false; //y resetea la secsion es decir borra el token del localstorage
    this.router.navigate(['']) //al ejecutar navega al home
  }

  ngOnInit(): void {
    //sthis.isLogg() //al iniciar o al recargar la pagina corrobora si el user esta logg
  }

}
