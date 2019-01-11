import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/service/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {
      this.user = {
        username: undefined,
        password: undefined,
        email: undefined
      };
    }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log(this.user);

    if (!this.validateService.validateRegister(this.user)) {
      this.flashMessagesService.show('Please fill out all the form fields', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    if (!this.validateService.validateEmail(this.user.email)) {
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    this.authService.registerUser(this.user).subscribe((data: any) => {
      if (data.success) {
        this.flashMessagesService.show('You are now registered', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);
      }
    });

  }

}
