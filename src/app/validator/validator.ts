import { AbstractControl, ValidatorFn } from '@angular/forms';
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn{

    return (control: AbstractControl):{[key:string]:any} | null =>{

    const forbidden = forbiddenName.test(control.value);
    return forbidden ? {'forbiddenName':{value: control.value}}:null;
    }
}
export function passwordValidator(control: AbstractControl): {[key: string]: boolean} {

       const password = control.get('password');
       const confirmPassword = control.get('confirmPassword');
       if(password.pristine || confirmPassword.pristine){
           return null;
       }
        return password && confirmPassword &&
        password.value != confirmPassword.value?
        {'misMatch': true}:null;
}