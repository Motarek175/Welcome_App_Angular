import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { signIn } from '../../user-interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _UserAuthService: UserAuthService,
    private _Router: Router
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  login() {
    const loginData: signIn = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };
    this._UserAuthService.Login(loginData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: true,
          }).then(() => {
            this._Router.navigate(['/home']);
            this._UserAuthService.isuserlogin.next(true);
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
