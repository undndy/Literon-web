import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainHeaderComponent} from "./component/header-menu/main-header/main-header.component";
import {AuthorListComponent} from "./component/author-tasks-list/author-list.component";
import {MatCardModule} from "@angular/material/card";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthorInfoComponent } from './component/author-info/author-info.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PoemListComponent} from "./component/poem-list/poem-list/poem-list.component";
import { TaskComponent } from "./component/task/task.component";
import { TaskTeacherComponent } from './component/task-teacher/task-teacher.component';
import { AuthInterceptorService , authInterceptorProviders } from "./service/auth/auth-interceptor.service";
import {ErrorInterceptorService, provideErrorInterceptor} from "./service/auth/error-interceptor.service";
import { RegisterComponent } from './component/auth/register/register.component';
import { LoginComponent } from './component/auth/login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SharedModule } from './shared.module';
import {PdfComponent} from "./pdf/pdf.component"; // Импортируйте SharedModule

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    AuthorListComponent,
    AuthorInfoComponent,
    PoemListComponent,
    TaskComponent,
    TaskTeacherComponent,
    RegisterComponent,
    LoginComponent,
    PdfComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        SharedModule
    ],
  providers: [ErrorInterceptorService,AuthInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
