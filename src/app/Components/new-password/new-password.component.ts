import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ResetPassword } from '../../user-interface';
import { UserAuthService } from '../../user-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit {
  constructor(
    private _UserAuthService: UserAuthService,
    private _Router: Router
  ) {}

  em: string = '';
  ngOnInit() {
    this.em = JSON.parse(localStorage.getItem('email')!);
  }

  updatePassword = new FormGroup({
    newPassword: new FormControl('', Validators.required),
  });

  updatePasswordFunc() {
    const updateData: ResetPassword = {
      email: this.em,
      newPassword: this.updatePassword.get('newPassword')?.value || '',
    };
    this._UserAuthService.resetPassword(updateData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.token) {
          Swal.fire({
            icon: 'success',
            title: 'Password Updated, Please login with New Password',
            showConfirmButton: true,
          }).then(() => {
            this._Router.navigate(['/login']);
            localStorage.clear();
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
