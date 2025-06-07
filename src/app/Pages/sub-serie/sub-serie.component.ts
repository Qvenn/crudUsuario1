import { Component, inject, OnInit} from '@angular/core';
import { Usuario } from '../../Models/Usuario';
import { UsuarioServices } from '../../Services/UsuarioServices'; 
import {MatIconModule} from '@angular/material/icon'; 
import { appsettings } from '../../Settings/appsettings';
import { Router } from '@angular/router'; 
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; 
import {MatButtonModule} from '@angular/material/button';   
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-sub-serie',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatFormField,MatDialogModule],
  templateUrl: './sub-serie.component.html',
  styleUrl: './sub-serie.component.css'
})
export default class SubSerieComponent {


  private subSerieServicio = inject(UsuarioServices); 
    public listaSubSerie:Usuario[] = []; 
    public displayedColumns : string[] = [ 'userr','password','idRol','des','photos','esActive','accion'];
    dataSource = new MatTableDataSource();
    public PhotoPath=appsettings.photo_url;
    Imagen="anonymous.png";


    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
  obtenerSubSerie(){
    this.subSerieServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaSubSerie = data;
          this.dataSource.data = data;
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
      this.router.navigate(['/subSerie',0]);
    }
  
    editar(objeto:Usuario){
      this.router.navigate(['/subSerie',objeto.idUsuario]);
    } 
  
    eliminar(objeto:Usuario){
      if(confirm("Desea eliminar el empleado" + objeto.userr)){
        this.subSerieServicio.eliminar(objeto.idUsuario).subscribe({
          next:(data)=>{
            if(data.isSuccess){
              this.obtenerSubSerie();
            }else{
              alert("no se pudo eliminar")
            }
          },
          error:(err)=>{
            console.log(err.message)
          }
        })
      }
    }
}
