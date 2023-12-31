import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../constants/backends';
import { iAuthRequest, iRegisterRequest } from '../interfaces/auth';
import { ISession } from '../interfaces/session.interface';

import { JwtHelperService } from '@auth0/angular-jwt'; //npm install @auth0/angular-jwt

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public loggedIn: boolean = false;

  async login(authentication:iAuthRequest) {
    const res = await fetch(BACKEND_URL + '/api/authentication/authenticate', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    console.log(res)
    if(res.status == 200) {
      return true
    }
    else return false
    // if(!res.ok) return false
    // else return true
    
    // const token = await res.text();
    // console.log(token)

    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(token);
    // const sub = decodedToken.sub;
    // console.log(sub); ///busca el id del usuario

    // if (!token) return false;
    // this.setSession(token);
    // this.setUserId(sub); //guarda el id en el local storage
    // return true;
  }

  async addUser(user: iRegisterRequest) {  //: Promise<ContactJsonPlaceholder>
    console.log(user);
    const res = await fetch(BACKEND_URL+'/api/authentication', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await res.json();
    // console.log(res.json())
  }


  isLoggedIn(){
    return this.loggedIn;
  }

  getSession(): ISession {
    const item: string = localStorage.getItem('session') || 'invalid';
    if (item !== 'invalid') {
      this.loggedIn = true;
      return JSON.parse(item);
    }
    return { expiresIn: '', token: '' };
  }


  setUserId(id : string){//**************
    localStorage.setItem('Id', id);
  }

  setSession(token: any, expiresTimeHours: number = 1) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeHours);//la hora actual+la cantidad de horas validas del token

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };

    this.loggedIn = true;
    localStorage.setItem('session', JSON.stringify(session));
    //window.location.reload();
  }

  async getMe() {
    const res = await fetch('', {
      headers: {
        Authorization: this.getSession().token!,
      },
    });
    return await res.json();
  }

  resetSession() {
    localStorage.removeItem('session');
    localStorage.removeItem('Id');
    this.loggedIn = false;
    //window.location.reload();
  }


}


