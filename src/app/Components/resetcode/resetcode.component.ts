import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAuthService } from '../../user-auth.service';
import { Router } from '@angular/router';
import { Rest } from '../../user-interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetcode',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resetcode.component.html',
  styleUrl: './resetcode.component.css',
})
export class ResetcodeComponent {
  constructor(
    private _UserAuthService: UserAuthService,
    private _Router: Router
  ) {}
  resetCodeForm = new FormGroup({
    resetcode: new FormControl('', Validators.required),
  });

  reset() {
    const reset: Rest = {
      resetCode: this.resetCodeForm.get('resetcode')?.value || '',
    };
    this._UserAuthService.verifyResetCode(reset).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'Success') {
          Swal.fire({
            icon: 'success',
            title: 'The code has been verified successfully.',
            showConfirmButton: true,
          }).then(() => {
            this._Router.navigate(['/resetPassword']);
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
