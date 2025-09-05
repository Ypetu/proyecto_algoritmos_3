import { Component } from '@angular/core';
import  {ReactiveFormsModule} from '@angular/forms';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customEmailValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  submitted = false;

  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, customEmailValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log(this.loginForm.value);
  }

  get emailControl() {
    return this.loginForm.get('email');
  }
}
