import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
  // se le pasa un validador, se verifica q cumpla con la regla. Si no pasa devuelve el objeto customEmailError = true
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').toString();
    const valid = emailRegex.test(value);
    return !valid ? { customEmailError: true } : null;
  };
}

