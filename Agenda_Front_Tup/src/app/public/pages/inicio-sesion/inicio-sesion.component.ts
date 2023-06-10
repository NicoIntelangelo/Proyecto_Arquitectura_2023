import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { iAuthRequest } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {

  constructor(private auth:AuthService, private router:Router) { }

  //Hecho usando NgModel
  authData:iAuthRequest = {
    email : "",
    password : ""
  };


  async login(form:NgForm){
    console.log(form.value);
    const token = await this.auth.login(form.value);//ejecutamos el metodo login de auth service con los datos del form
    if(token) {
      this.router.navigate(['/contacts']); //si recibe el token nos lleva a contactos
      this.auth.loggedIn = true
    }
    //this.router.navigate(['/contacts'])
  }

}
