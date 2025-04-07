import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './customer-component/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { AppRoutingModule } from '../../app-routing.module';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { IconsProviderModule } from '../../icons-provider.module';
import { ViewProductByCategoryComponent } from './customer-component/view-product-by-category/view-product-by-category.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PostReservationsComponent } from './customer-component/post-reservations/post-reservations.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GetAllReservationsComponent } from './customer-component/get-all-reservations/get-all-reservations.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewProductByCategoryComponent,
    PostReservationsComponent,
    GetAllReservationsComponent,
    
  ],
  imports: [ CommonModule,
    CustomerRoutingModule, 
    NzTableModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSpinModule,
    NzIconModule,
    NzSkeletonModule,
    NzAvatarModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    NzFormModule, 
    NzInputModule, 
    RouterOutlet,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    RouterModule
  ]
})
export class CustomerModule { }
