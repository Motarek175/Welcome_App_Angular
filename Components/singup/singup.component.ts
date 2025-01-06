import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { signUp } from '../../user-interface';
import { UserAuthService } from '../../user-auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css',
})
export class SingupComponent {
  constructor(
    private _Router: Router,
    private _UserAuthService: UserAuthService
  ) {}
  regForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8,}$/),
    ]),
  });
  isMatched: boolean = false;
  mathcedPasswords() {
    if (this.regForm.value.password === this.regForm.value.rePassword) {
      this.isMatched = true;
    } else {
      this.isMatched = false;
    }
  }
  SignUp() {
    const regData: signUp = {
      name: this.regForm.value.name || '',
      email: this.regForm.value.email || '',
      password: this.regForm.value.password || '',
      rePassword: this.regForm.value.rePassword || '',
      phone: this.regForm.value.phone || '',
    };
    this._UserAuthService.Register(regData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Your  account has been created, Login Now',
            showConfirmButton: true,
          }).then(() => {
            this._Router.navigate(['/login']);
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
