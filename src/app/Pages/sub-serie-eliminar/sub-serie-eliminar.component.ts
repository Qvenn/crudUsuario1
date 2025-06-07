 
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Usuario } from '../../Models/Usuario';
import { MatDialogClose, MatDialogContent,MatDialogTitle,MatDialogActions} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-sub-serie-eliminar',
  standalone: true,
  imports: [MatDialogClose,MatDialogContent,MatDialogTitle,MatDialogActions,MatButton],
  templateUrl: './sub-serie-eliminar.component.html',
  styleUrl: './sub-serie-eliminar.component.css'
})
export class SubSerieEliminarComponent implements OnInit{


  constructor(
    private dialogoReferencia: MatDialogRef<SubSerieEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public subSerieEliminar: Usuario
  ) { }

  ngOnInit(): void {
  }


  eliminarSubSerie() {
    if (this.subSerieEliminar) {
      this.dialogoReferencia.close('eliminar')
    }
  }

}
