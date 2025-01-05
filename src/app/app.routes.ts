import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SingupComponent } from './Components/singup/singup.component';
import { HomeComponent } from './Components/home/home.component';
import { ForgetemailComponent } from './Components/forgetemail/forgetemail.component';
import { ResetcodeComponent } from './Components/resetcode/resetcode.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SingupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetemailComponent,
  },
  {
    path: 'resetCode',
    component: ResetcodeComponent,
  },
  {
    path: 'resetPassword',
    component: NewPasswordComponent,
  },
];
