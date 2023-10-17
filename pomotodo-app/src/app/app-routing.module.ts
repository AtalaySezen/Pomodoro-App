import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisteraccountComponent } from './pages/registeraccount/registeraccount.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'createAccount', component: RegisteraccountComponent, title: 'Register' },
  { path: 'settings', component: SettingComponent, title: 'Settings', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
