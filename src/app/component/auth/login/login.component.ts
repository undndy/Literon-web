import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";
import {FuseAlertType} from "../../alert/alert.types";
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  signInForm: FormGroup;
  showAlert: boolean = false;
  userId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email     : ['',Validators.compose([Validators.required, Validators.email])],
      password  : ['', Validators.compose([Validators.required])],
    });
  }

  signIn(): void {

    // Disable the form
    // this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.login(this.signInForm.value)
      .subscribe((data) => {

          this.tokenService.saveToken(data.token);
          this.tokenService.saveUser(data);
          this.userId = data.id;
          this._router.navigate(['/main'], {queryParams: data.id});

        },
        (response) => {

          // Re-enable the form
          this.signInForm.enable();

          // Reset the form
          this.signInNgForm.resetForm();

          // Set the alert
          this.alert = {
            type   : 'error',
            message: 'Неправильный пароль или почта'
          };

          // Show the alert
          this.showAlert = true;
        }
      );
  }

  goToSignUp() {
    this._router.navigate(['/register']);
  }

}
