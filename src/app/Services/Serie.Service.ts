import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings'; 
import { ResponseAPI } from '../Models/ResponseAPI';
import { Rol } from '../Models/Rol';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Rol";
  private photo_url:string = appsettings.photo_url+"";
  constructor() { }

  lista(){
    return this.http.get<Rol[]>(this.apiUrl+'/ListaRol');
  } 
}