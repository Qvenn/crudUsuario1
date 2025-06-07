import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Empleado } from '../Models/Empleado';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Usuario";
  private photo_url:string = appsettings.photo_url+"";
  constructor() { }

  lista(){
    return this.http.get<Usuario[]>(this.apiUrl+'/Lista');
  }
  listaActivos(){
    return this.http.get<Empleado[]>(this.apiUrl+'/ListaActivos');
  }
  obtener(id:number){
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Usuario){
    return this.http.post<ResponseAPI>(this.apiUrl+'/CrearUsuario2',objeto);
  }

  editar(objeto:Usuario){
    return this.http.put<ResponseAPI>(this.apiUrl,objeto);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
