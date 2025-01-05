import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../user-auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forget } from '../../user-interface';

@Component({
  selector: 'app-forgetemail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgetemail.component.html',
  styleUrl: './forgetemail.component.css',
})
export class ForgetemailComponent {
  constructor(
    private _Router: Router,
    private _UserAuthService: UserAuthService
  ) {}
  forgetemailForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });
  forgetfunc() {
    const forgetemail: forget = {
      email: this.forgetemailForm.get('email')?.value || '',
    };
    this._UserAuthService.forgetPass(forgetemail).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('email', JSON.stringify(forgetemail.email));
        if (res.statusMsg == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Verification Code was sent',
            showConfirmButton: true,
          }).then(() => {
            this._Router.navigate(['/resetCode']);
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
