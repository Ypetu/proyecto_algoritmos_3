import { Component } from '@angular/core';
import  {ReactiveFormsModule} from '@angular/forms';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customEmailValidator, customPassworValidator } from '../../validators/custom-validators';
import { ErrorMessagesService } from '../../services/error-messages.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  submitted = false;
  constructor(public errorMessages: ErrorMessagesService) {}
// formgroup que contiene dos formcontrols: email y password
  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, customEmailValidator()]),
    password: new FormControl('', [Validators.required, customPassworValidator()])
  })
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log(this.loginForm.value);
  }

  //*************** */ getters para los campos del formulario*******************//

  // getter para el formcontrol email
  get emailControl() {
    return this.loginForm.get('email');
  }

  // getter para el formControl dela pass

  get passwordControl() {
    return this.loginForm.get('password');
  }
 


 //   //*************** */ getters para los errores del formulario   provenientes del servicio de mensajes de error*******************//
  get emailErrorKey(): string | null {
    const errors = this.emailControl?.errors;
    return errors ? Object.keys(errors)[0] : null;
  }

  get passwordErrorKey(): string | null {
    const errors = this.passwordControl?.errors;
    return errors ? Object.keys(errors)[0] : null;
  }

}

