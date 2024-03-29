import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  Lista: any = [];

  constructor(private data: DataService, private fb: FormBuilder, private router: Router, private activeRouter: ActivatedRoute) {
    const idAnime = this.activeRouter.snapshot.params['idAnime'];
    this.obtenerRegistro(idAnime);
  }

  // Formulario

  Formulario: FormGroup = this.fb.group({
    idAnime: [],
    nombre: [, [Validators.required, Validators.maxLength(99)]],
    descripcion: [, [Validators.required, Validators.maxLength(255)]],
    categoria: [, [Validators.required, Validators.maxLength(99)]],
    imagen: [, [Validators.required, Validators.maxLength(999)]],
    link: [, [Validators.required, Validators.maxLength(255)]],
   
  });


  // Funcion de verificacion de llenado correcto de los campos del formulario
  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  // Funcion de obtencion de datos y parchado del formulario 
  
  obtenerRegistro(idAnime: any) {
    this.data.post('animes', 'traerAnimexid', { 'idAnime': idAnime }).subscribe((dato: any) => {
      console.log(dato);
      this.Formulario.patchValue({
        idAnime: dato[0].idAnime,
        nombre: dato[0].nombre,
        descripcion: dato[0].descripcion,
        categoria: dato[0].categoria,
        imagen: dato[0].imagen,
        link: dato[0].link
      });
    });

  }

  // Funcion de guardado de los elemento escritos en el formulario por medio del metodo post

  guardar() {
    this.data.post('animes', 'editarAnime', this.Formulario.value).subscribe((dato: any) => {
      console.log(dato);
      if (['estatus']) {
        Swal.fire({
          title: 'Exito',
          text: "Se ha actualizado la información",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/lista']); 
          }
        })
        console.log("Exito");
      } else {
        Swal.fire(
          'Error',
          'No se ha podido actualizar la información',
          'warning'
        )
      }
    })
  }


}
