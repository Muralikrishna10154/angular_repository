import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator, passwordValidator } from './validator/validator';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userForm : FormGroup;
  constructor(private formBuilder: FormBuilder,private _userService: UserService){}
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userName: ['',[Validators.required,Validators.minLength(3),forbiddenNameValidator(/password/)]],
      email: [''],
      password: [''],
      confirmPassword: [''],
      subscribe: [''],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.formBuilder.array([])
    }, { validator: passwordValidator });
    this.userForm.get('subscribe').valueChanges
    .subscribe(checkedValue =>{
     const email = this.userForm.get('email');
      if (checkedValue){
        email.setValidators(Validators.required);
     }else{
        email.clearValidators();
     }
     email.updateValueAndValidity();
    })
  }
  get userName(){
    return this.userForm.get('userName');
  }
  get email(){
    return this.userForm.get('email');
  }
  loadApiData(){
  this.userForm.setValue({
    userName:'Krishna',
    email:'mmm@gmail.com',
    password:'lll',
    confirmPassword:'lll'
  })
}
  addAlternateEmail(){
    return this.alternateEmails.push(this.formBuilder.control(''));
  }
  get alternateEmails(){
    return this.userForm.get('alternateEmails') as FormArray;
  }
  onSubmit(){
    console.log(this.userForm.value);
    /***this._userService.submitUser(this.userForm.value)
    .subscribe(
      response => console.log('Success!',response),
      error => console.log('Error!',error)
    );***/
  }
}
