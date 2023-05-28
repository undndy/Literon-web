import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: 'admin/add', pathMatch: 'full'},
          {path: 'add', component: AddPageComponent},
          {path: 'author/:id/edit', component: EditPageComponent}
        ]
      }
    ]),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
