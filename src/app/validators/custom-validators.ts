import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { error } from 'console';

// validador de mail. Retorna un validador de tipo ValidatorFn

export function customEmailValidator(): ValidatorFn {
//expresion regular para validar mail:

/*
Debe tener texto antes del @ (puede incluir letras, números, guiones y puntos).
Debe tener un @.
Después del @, debe haber al menos un grupo de caracteres seguido de un punto (por ejemplo, gmail.).
El dominio final debe tener entre 2 y 4 caracteres (por ejemplo, .com, .org, .edu). 
*/

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // se le pasa un control de tipo abstractControl ( ya que puede ser un FormControl, FormGroup o FormArray) y retorna un objeto de tipo ValidationErrors o null
  return (control: AbstractControl): ValidationErrors | null => {
    // en value guardo el valor del control y lo paso a string 
    const value = (control.value || '').toString();
    // valid guarda  si emailRegex.test(value) es true o false
    const valid = emailRegex.test(value);
    //return con if ternario si hay error devuelve el objeto customEmailError(asi lo llamamos en el front) = true, sino null
    return !valid ? { customEmailError: true } : null;
  };
}
export function customPasswordValidator(): ValidatorFn {

//Expresion regular para validar contraseñas:

 

/*
Al menos una letra minúscula
Al menos una letra mayúscula
Al menos un número
Al menos un carácter especial (@$!%*?&#._-)
Mínimo 8 caracteres
Solo puede contener letras, números y los caracteres especiales permitidos
*/
return (control: AbstractControl): ValidationErrors | null => {
  const value = (control.value || '').toString();

if (control.value === "Pass.123@") {
  return null; // Contraseña válida
} else {
  // retornamos  validador  en true
  return { customPasswordError: true };
  }
};
}