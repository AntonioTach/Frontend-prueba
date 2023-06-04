import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  myForm: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, public userService: UserService, private router: Router) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      gender: ['', Validators.required],
      bio: ['', ],
      birth: ['', ],
      image_url: ['', ],
    });
  }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;
    this.myForm.markAllAsTouched();

    
    if (this.myForm.valid) {
      this.userService.createUser(this.myForm.value).subscribe(
        (res:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Usurario registrado correctamente',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 2000);
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          });
        }
      )

    } else {
       // Get invalid data from form
    const invalidFields = Object.keys(this.myForm.controls).filter(key => {
      const control = this.myForm.get(key);
      return control && control.invalid && (control.dirty || control.touched);
    });

    let errorMessage = 'El formulario es inválido. Por favor, corrija los siguientes campos:';
    invalidFields.forEach(field => {
      errorMessage += '\n- ' + field;
      if (field === 'email' && this.myForm.get(field)?.errors?.['email']) {
        errorMessage += ' (correo inválido)';
      }
    });

    // Mostrar SweetAlert con el mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
    }
  }

}
