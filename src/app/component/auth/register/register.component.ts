import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../animations";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {FuseAlertType} from "../../alert/alert.types";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class RegisterComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  signUpForm: FormGroup;
  showAlert: boolean = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
        firstname      : ['', Validators.required],
        lastname     : ['', [Validators.required, Validators.email]],
        password  : ['', Validators.required],
        confirmPassword   : [''],
        email: ['', Validators.requiredTrue, Validators.email]
      }
    );
  }

  signUp(): void
  {
    // Do nothing if the form is invalid
    if ( this.signUpForm.invalid )
    {
      return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign up
    this._authService.register(this.signUpForm.value)
      .subscribe(
        (response) => {

          // Navigate to the confirmation required page
          this._router.navigate(['']);
        },
        (response) => {

          // Re-enable the form
          this.signUpForm.enable();

          // Reset the form
          this.signUpNgForm.resetForm();

          // Set the alert
          this.alert = {
            type   : 'error',
            message: 'Something went wrong, please try again.'
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
