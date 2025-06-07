import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings'; 
import { ResponseAPI } from '../Models/ResponseAPI';
import { Usuario } from '../Models/Usuario';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServices {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Usuario";
  private photo_url:string = appsettings.photo_url+"";
  constructor() { }

  lista(){
    return this.http.get<Usuario[]>(this.apiUrl+'/Lista');
  } 

  obtener(id:number){
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  
  crear(objeto:Usuario) {
    return this.http.post(this.apiUrl,objeto);
  }

  editar(objeto:Usuario){
    return this.http.put(this.apiUrl+'/Editar',objeto);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

}