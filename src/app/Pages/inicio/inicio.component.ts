import { Component, Inject,OnInit, inject } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule,MatCardContent} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';  
import { Router } from '@angular/router';
import { appsettings } from '../../Settings/appsettings';
import { UsuarioServices } from '../../Services/UsuarioServices';
import { Usuario } from '../../Models/Usuario'; 
import { MatFormField } from '@angular/material/form-field';
import SubSerieComponent from '../dialog-subserie/dialog-subSerie.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { SubSerieEliminarComponent } from '../sub-serie-eliminar/sub-serie-eliminar.component';
import { MatCard } from '@angular/material/card'; 
import { MatInput } from '@angular/material/input';
/* import { SerieService } from '../../Services/Serie.Service'; */

/* const ELEMENT_DATA: Usuario[] = [
  { idUsuario: 1, userr: "yougur gloria", estado: "activo", codigo: 2, idSerie: 2, nombreSerie:"" },
  { idSubSerie: 2, nombre: "Detergente sapolio", estado: "activo", codigo: 1, idSerie: 1, nombreSerie:"" },
  { idSubSerie: 3, nombre: "Mantequilla lavie", estado: "activo", codigo: 3, idSerie:3 , nombreSerie:"" },

]; */

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatFormField,MatCardContent,MatButton,MatCard],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class InicioComponent implements OnInit {

  NombreSerie: any= [];

  private subSerieServicio = inject(UsuarioServices);
  // private SerieServicio = inject(SerieService);
  public listaSubSerie:Usuario[] = [];
  //public listaSerie:Serie[] = [];
  public displayedColumns : string[] = ['userr','password','idRol','des','photos','esActive','accion'];
  dataSource = new MatTableDataSource();
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
  
  constructor(private router:Router, private _snackBar: MatSnackBar, private dialog: MatDialog,
    /* @Inject(MAT_DIALOG_DATA) public subSerieEditar: SubSerie,
    private _SerieServicio: SerieService */
  ){
    
    
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
  ngOnInit(): void {
    this.obtenerSubSerie();

  }

  agregarProducto() {
    
    this.dialog.open(SubSerieComponent, {
      disableClose: true 
    }).afterClosed().subscribe(result => {
      if (result === "agregado") {
        this.obtenerSubSerie();
      }
    });
  }
  nuevo(){
    this.router.navigate(['/subSerie',0]);
  }


  editarProducto(subserie: Usuario) {
    this.dialog.open(SubSerieComponent, {
      disableClose: true,
      data: subserie
    }).afterClosed().subscribe(result => {
 
      if (result === "editado")
        this.obtenerSubSerie();
 
    });
  }

  editar(objeto:Usuario){
    this.router.navigate(['/subSerie',objeto.idUsuario]);
  } 

  eliminar(objeto:Usuario){

    this.dialog.open(SubSerieEliminarComponent, {
      disableClose: true,
      data: objeto
    }).afterClosed().subscribe(result => {
    
      if (result === "eliminar") {
    
        this.subSerieServicio.eliminar(objeto.idUsuario).subscribe({
          next: (data) => {
    
            if (data.isSuccess) {
              this.mostrarAlerta("El producto fue eliminado", "Listo!")
              this.obtenerSubSerie();
            } else {
              this.mostrarAlerta("No se pudo eliminar el producto", "Error");
            }
    
          },
          error: (e) => {
          },
          complete: () => {
          }
        })
    
      }
    
    
    
    });



    /* if(confirm("Desea eliminar el empleado" + objeto.nombre)){
      this.subSerieServicio.eliminar(objeto.idSubSerie).subscribe({
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
    } */
 
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
