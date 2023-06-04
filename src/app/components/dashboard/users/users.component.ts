import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  list: any = []
  displayedColumns: string[] = ['Id', 'Nombre', 'Email', 'Genero', 'Acciones'];
  dataSource = new MatTableDataSource(this.list);


  constructor(public userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.list);
   }

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() { // Get all the users and add in the data source, table
    this.userService.getUsers().subscribe(
      (res) => {
        this.list = res;
        this.dataSource = new MatTableDataSource(this.list);
      },
      (error) => {
        console.log('Error al obtener los usuarios', error);
        this.list = [];
        return this.list;
      }
    );
  }

  delete(id:any){ //Delete the user
    swal.fire({
      title: 'Estas seguro de eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((res) => {
          this.getUsers();
          swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado!',
            'success'
          )
        },
        err => {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          });
        })
      }
    })
  }

  seeUser(id: number) {
    this.router.navigate(['/user/' + id.toString()]);

  }

  createUser() {
    this.router.navigateByUrl('/create_user');
  }
}
