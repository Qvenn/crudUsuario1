import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MatDialogContent,MatDialogActions,MatDialogModule, MatDialogClose } from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'; 
import { Router } from '@angular/router';
import { Usuario } from '../../Models/Usuario';
import { appsettings } from '../../Settings/appsettings';
import {  UsuarioServices } from '../../Services/UsuarioServices';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { SerieService } from '../../Services/Serie.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, NgFor } from '@angular/common';
import { SerieService } from '../../Services/Serie.Service';
import { Rol } from '../../Models/Rol';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dialog-subSerie',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,FormsModule,MatDialogContent,MatDialogActions,NgFor,MatDialogModule,MatDialogClose],
  templateUrl: './dialog-subSerie.component.html',
  styleUrl: './dialog-subSerie.component.css'
})
export default class SubSerieComponent implements OnInit {

  
  NombreSerie: any;
  listaRol : Rol[] = [];
  //@Input('id') idSubSerie! : number; 
  //private SerieServicio = inject(SerieService);
  //public formBuild = inject(FormBuilder);
  formUsuario: FormGroup;
  PhotoPath=appsettings.photo_url; 
   
 /*  public formSubSerie:FormGroup = this.formBuild.group({
      usuario:['', Validators.required], 
      contra:['', Validators.required],
      IdRol:['', Validators.required],
      description:['' ],
      phot:['', Validators.required] ,
      act:['']
  }); */

  constructor( private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public productoEditar: Usuario,
  private dialogoReferencia: MatDialogRef<SubSerieComponent>,
  private fb: FormBuilder,
private usuarioServicio: UsuarioServices,
  private _rolServicio: SerieService,
  
   private serieServicio:SerieService,
  private _snackBar: MatSnackBar)
  {


    this.formUsuario = this.fb.group({
      usuario: ['', Validators.required],
      contra:['', Validators.required],
      IdRol:['', Validators.required],
      description:['' ],
      phot:['anonymous.png'] ,
      act:['']
    })


    /* if (this.productoEditar) {
      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    } */

    this._rolServicio.lista().subscribe({
      next: (data) => {

        

          this.listaRol = data;

          if (this.productoEditar)
            this.formUsuario.patchValue({
              IdRol: this.productoEditar.idRol
            })

        
      },
      error: (e) => {
      },
      complete: () => {
      }
    })


  }

  /* nuevo(){
    this.router.navigate(['/subSerie',0]);
  } */
  ngOnInit(): void {
   // this.idSubSerie=0;
    //if(this.idSubSerie != 0){

    if( this.productoEditar){

      this.formUsuario.patchValue({
        usuario: this.productoEditar.userr,
        contra:this.productoEditar.password,
         IdRol:this.productoEditar.idRol, 
        // description:this.productoEditar.des,
        phot: this.productoEditar.photo ,
        act : this.productoEditar.esActive
      })
    }
      /* this.subSerieServicio.obtener(this.idSubSerie).subscribe({
        next:(data) =>{
          this.formSubSerie.patchValue({
            nombre: data.nombre,
            estado:data.estado,
            codigo:data.codigo,
            idSerie:data.idSerie,
            nombreSerie:data.nombreSerie 
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
       */
   // }
    this.serieServicio.lista().subscribe((data:any)=>{
      this.NombreSerie=data;
    })
      
  }

guardar(){
  
  const objeto : Usuario = { 
    idUsuario : this.productoEditar  == null ? 0 : this.productoEditar.idUsuario,
      userr: this.formUsuario.value.usuario,
      password:this.formUsuario.value.contra, 
      idRol:this.formUsuario.value.IdRol,
      des:"",
      photo:this.formUsuario.value.phot,
      esActive: true
  }

  if(this.productoEditar){
    this.usuarioServicio.editar(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.mostrarAlerta("El producto fue editado", "Exito");
          this.dialogoReferencia.close('editado');
        }else{
          this.mostrarAlerta("No se pudo editar el producto", "Error");
        }
      },
      error:(err) =>{
        console.log(err.message)
      },
      complete: () => {
      }
    })


    
  }else{
    
    this.usuarioServicio.crear(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.mostrarAlerta("El producto fue registrado", "Exito");
          this.dialogoReferencia.close('agregado');
        }else{
          this.mostrarAlerta("No se pudo registrar el producto", "Error");
          
        }
      },
      error:(err) =>{
        console.log(err.message)
      },
      complete: () => {
      }
    })
  }

  


}

  imageUpload(event:any){

    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
    this.http.post(appsettings.apiUrl+'Usuario/SaveFile',formData)
    .subscribe((data:any)=>{
      this.formUsuario.value.phot=data.toString();
   }); 
  }
   
/* volver(){
  this.router.navigate(["/"]);
} */


mostrarAlerta(mensaje: string, tipo: string) {
  this._snackBar.open(mensaje, tipo, {
    horizontalPosition: "end",
    verticalPosition: "top",
    duration: 3000
  });
}

}
