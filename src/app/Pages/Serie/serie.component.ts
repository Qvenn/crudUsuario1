import { Component, inject } from '@angular/core';
import { Rol } from '../../Models/Rol';
import { Router } from '@angular/router';
import { SerieService } from '../../Services/Serie.Service';
import { appsettings } from '../../Settings/appsettings';

@Component({
  selector: 'app-serie',
  standalone: true,
  imports: [],
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.css'
})
export default class SerieComponent {

  
    NombreSerie: any= [];
  
    private serieServicio = inject(SerieService);
    // private SerieServicio = inject(SerieService);
    public listaSerie:Rol[] = [];
    //public listaSerie:Serie[] = [];
    public displayedColumns : string[] = ['nombre','codigo','nombreSerie','estado','idSerie'];
    public PhotoPath=appsettings.photo_url;
    Imagen="anonymous.png";
  
    /* obtenerSerie(){
      this.SerieServicio.lista().subscribe({
        next:(data)=>{
          if(data.length > 0){
            this.listaSerie = data;
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
  
    } */
    obtenerSubSerie(){
      this.serieServicio.lista().subscribe({
        next:(data)=>{
          if(data.length > 0){
            this.listaSerie = data;
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      }) 
  
      
      
      /* this.SerieServicio.lista().subscribe(data=>{
        this.NombreSerie=data;
      }) */
      
        
    } 
    
    constructor(private router:Router,
      /* @Inject(MAT_DIALOG_DATA) public subSerieEditar: SubSerie,
      private _SerieServicio: SerieService */
    ){
      
      this.obtenerSubSerie();
      // this.obtenerSerie();
     /*  this._SerieServicio.lista().subscribe({
        next: () => {
         
            if (this.subSerieEditar) 
                idCategoria: this.subSerieEditar.idSubSerie 
        },
        error: (e) => {
        },
        complete: () => {
        }
      }) */
    }
    
    nuevo(){
      this.router.navigate(['/Serie']);
    }
  
    editar(objeto:Rol){
      this.router.navigate(['/Serie',objeto.idRol]);
    } 
  
}
