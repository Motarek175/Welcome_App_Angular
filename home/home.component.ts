import { Component } from '@angular/core';
import { UserAuthService } from '../../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private _UserAuthService: UserAuthService,
    private _Router: Router
  ) {
    if (this._UserAuthService.isuserlogin.value == false) {
      this._Router.navigate(['/login']);
    }
  }
}
