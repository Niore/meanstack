import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user = {
      username: undefined,
      email: undefined
    };
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.authService.authenticateUser(this.user).subscribe((data: any) => {
      if (data.success) {
        console.log('logged in', data);
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
      } else {
        console.log('not logged in', data);
        this.router.navigate(['login']);
      }
    });
  }

}
