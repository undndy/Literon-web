import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorInfoComponent} from "./component/author-info/author-info.component";
import {AuthorListComponent} from "./component/author-tasks-list/author-list.component";
import {PoemListComponent} from "./component/poem-list/poem-list/poem-list.component";
import { TaskComponent} from "./component/task/task.component";
import {TaskTeacherComponent} from "./component/task-teacher/task-teacher.component";
import {LoginComponent} from "./component/auth/login/login.component";
import {RegisterComponent} from "./component/auth/register/register.component";
import {PdfComponent} from "./pdf/pdf.component";

const routes: Routes = [
  {path: 'main', component: AuthorListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'biograph/:id', component: AuthorInfoComponent},
  {path: 'poem/:poemId', component: PoemListComponent},
  {path: 'tasks/:taskId', component: TaskComponent},
  {path: 'tasks/:taskId/teacher', component: TaskTeacherComponent},
  {path: 'tasks/:taskId/pdf', component: PdfComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
