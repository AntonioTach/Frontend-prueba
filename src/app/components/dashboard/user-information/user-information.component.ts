import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  //Form
  myForm: FormGroup;
  formSubmitted = false;

  //Initialization of the component
  userId: number = 0;
  name: string = "";
  email: string = "";
  age: number = 0;
  gender: string = "";
  bio: string = "";
  birth: Date = new Date();
  image_url: string = "";
  created_at: Date = new Date();

  constructor(private formBuilder: FormBuilder, public userService: UserService, private router: Router, private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 
      this.getUser(this.userId);
    });
  }

  getUser(userId: number) {
    this.userService.getUser(userId).subscribe((res:any) => {
      const user = res[0];
      this.userId = user.id;
      this.name = user.name;
      this.email = user.email;
      this.age = user.age;
      this.gender = user.gender;
      this.bio = user.bio;
      this.birth = new Date(user.birth);
      this.image_url = user.image_url;
      this.created_at = new Date(user.created_at);
    })
  }


  updateUser() {
    this.formSubmitted = true;
    this.myForm.markAllAsTouched();

    //Get the new data updated
    this.myForm.patchValue({
      name: this.name,
      email: this.email,
      age: this.age,
      gender: this.gender,
      bio: this.bio,
      birth: this.birth,
      image_url: this.image_url
    });
  
    if (this.myForm.valid) {
      this.userService.updateUser(this.myForm.value, this.userId).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Usurario actualizado correctamente',
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
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  }
}
