import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;

  get fullName() {
    return this.registrationForm.get('fullName');
  }

  get email() {
    return this.registrationForm.get('emailAddress');
  }

  get createPassword() {
    return this.registrationForm.get('createPassword');
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} | null {
    const regex = new RegExp('[@!#$%^&*()<>?/\|}{~:]');

    if(!regex.test(control.value)) {
      return { 'password': true };
    }
    return null;
  }

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required]],
      emailAddress: [''],
      phoneNumber: [''],
      createPassword: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    });
  }




}
