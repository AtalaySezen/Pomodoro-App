import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { PomoTimerComponent } from './components/pomo-timer/pomo-timer.component';
import { SettingComponent } from './pages/setting/setting.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from 'src/environments/environments';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RegisteraccountComponent } from './pages/registeraccount/registeraccount.component';
import { PomotodoTodoComponent } from './components/pomotodo-todo/pomotodo-todo.component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContainerDetailComponent } from './components/container-detail/container-detail.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PomoTimerComponent,
    SettingComponent,
    LoginComponent,
    RegisteraccountComponent,
    PomotodoTodoComponent,
    HeaderComponent,
    SnackbarComponent,
    ContainerDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoaderComponent,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    MatSnackBarModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatExpansionModule,
    TextFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    DropdownMenuComponent,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
