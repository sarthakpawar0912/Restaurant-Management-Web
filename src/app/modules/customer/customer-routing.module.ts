import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './customer-component/dashboard/dashboard.component';
import { ViewProductByCategoryComponent } from './customer-component/view-product-by-category/view-product-by-category.component';
import { PostReservationsComponent } from './customer-component/post-reservations/post-reservations.component';
import { GetAllReservationsComponent } from './customer-component/get-all-reservations/get-all-reservations.component';

const routes: Routes = [
  { path: 'dashboard', component:DashboardComponent},
  { path: ':categoryId/products', component:ViewProductByCategoryComponent},
  { path: 'reservation', component:PostReservationsComponent},
  { path: 'reservations', component:GetAllReservationsComponent},



 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
