import { Component } from '@angular/core';
import  {ReactiveFormsModule} from '@angular/forms';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customEmailValidator, customPasswordValidator } from '../../validators/custom-validators';
import { ErrorMessagesService } from '../../services/error-messages.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  submitted = false; // flag formulario enviado
  loginSuccess = false; // flag de exito en login
  loginError = false; // flag error en login

  

  // inyeccion de dependencias
  constructor(
    public errorMessages: ErrorMessagesService, // servicio de errorres
    private authService: AuthService, // servicio de autenticacion
    private router: Router // servicio de enrutamiento
  ) {}
// formgroup que contiene dos formcontrols: email y password
  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, customEmailValidator()]),
    password: new FormControl('', [Validators.required, customPasswordValidator()])
  })
  onSubmit() {
    this.submitted = true;

    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // guardo en constantes los valores de email y password del formulario escritos por el usuario
    const email = this.emailControl?.value || '';
    const password = this.passwordControl?.value || '';
    // llamo al metodo login del AuthService con email y password como objeto ya que implemento la interfaz de loginRequest y guardo el resultado (true o false) en loginResult
    const loginResult =this.authService.login({ email, password }).subscribe({
    next: response => {
    console.log('Token recibido:', response.token);
    // GUARDO TOKEN EN EL LOCALSTORAGE
    localStorage.setItem('token', response.token ?? '');
    // NAVEGO AL HOME
     this.router.navigate(['/home']);
  
  },
    error: error => {
    console.log('Login fallido:', email);
  }
});
    
  }

  //*************** */ getters para los campos del formulario*******************//

  // devuelven los objetos FormControl correspondientes a email y password en el formulario reactivo loginForm
  /*El valor actual del campo (control.value) - lo que el usuario ha escrito
    El estado de validez (control.valid, control.invalid)
    Los errores de validación (control.errors)
    El estado de interacción (control.touched, control.dirty)
    Métodos para manipular el control (control.setValue(), control.markAsTouched(), etc.)
    */

  get emailControl() {
    return this.loginForm.get('email');
  }

  // 

  get passwordControl() {
    return this.loginForm.get('password');
  }
 


 //   //*************** */ getters para los errores del formulario   provenientes del servicio de mensajes de error*******************//
  //devuelven la clave del primer error de validacion que tenga el campo email o password accediendo a la propiedad errors del getter del formControl.

  get emailErrorKey(): string | null {
    const errors = this.emailControl?.errors;
    return errors ? Object.keys(errors)[0] : null;
  }

  get passwordErrorKey(): string | null {
    const errors = this.passwordControl?.errors;
    return errors ? Object.keys(errors)[0] : null;
  }

}

