import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth-component/signup/signup.component';
import { LoginComponent } from './auth-component/login/login.component';

const routes: Routes = [
  { path: 'signup', component:SignupComponent},
  { path: '', component:LoginComponent},
  { path: 'admin', loadChildren:()=>import("./modules/admin/admin.module").then(m=>m.AdminModule)},
  { path: 'customer', loadChildren:()=>import("./modules/customer/customer.module").then(m=>m.CustomerModule)},
 
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
