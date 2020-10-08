import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rprojex';
  constructor(public auth: AuthService, private route: Router) {
    auth.authenticationState.subscribe((data) => {
      if (data) {
        this.route.navigateByUrl('home');
      } else this.route.navigateByUrl('auth');
    });
  }
  isLoggin() {
    return this.auth.checkToken();
  }
}
