import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserInformationComponent } from './user-information/user-information.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'create_user', component: CreateUserComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
