import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { AddCategoryComponent } from './admin-component/add-category/add-category.component';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { IconsProviderModule } from '../../icons-provider.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostProductComponent } from './admin-component/post-product/post-product.component';
import { ViewProductComponent } from './admin-component/view-product/view-product.component';
import { UpdateProductComponent } from './admin-component/update-product/update-product.component';
import { GetReservationsComponent } from './admin-component/get-reservations/get-reservations.component';
import { NzTableComponent } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    DashboardComponent,
    AddCategoryComponent,
    PostProductComponent,
    ViewProductComponent,
    UpdateProductComponent,
    GetReservationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,NzCardModule,
    NzIconModule,
    NzSkeletonModule,
    NzTableComponent,
    NzAvatarModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    NzFormModule, 
    NzInputModule, 
    RouterOutlet,
    HttpClientModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    RouterModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
