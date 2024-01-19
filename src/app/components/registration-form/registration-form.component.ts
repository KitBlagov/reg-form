import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  get fullName() {
    return this.registrationForm.get('fullName');
  }

  get email() {
    return this.registrationForm.get('emailAddress');
  }

  get phone() {
    return this.registrationForm.get('phoneNumber');
  }

  get createPassword() {
    return this.registrationForm.get('createPassword');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')
  }

  constructor(private fb: FormBuilder) {
    this.registrationForm = new FormGroup({});
  }

  ngOnInit() {
    this._createForm()
  }

  private _createForm() {



    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/), this.checkFullNameValidator]],
      emailAddress: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.minLength(5)]],
      phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(/^\+7[0-9]{10}$/)]],
      createPassword: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  checkFullNameValidator(control: FormControl) {
    if(!control.value.includes(' ')) {
      return {'fullName': true};
    }
    return null;
  }
  passwordValidator(control: FormControl): { [s: string]: boolean } | null {
    const regex = new RegExp('[@!#$%^&*()<>?/\|}{~:]');

    if (!regex.test(control.value)) {
      return {'password': true};
    }
    return null;
  }

  passwordMatchValidator(formGroup: FormGroup) {

    const password = formGroup.get('createPassword');
    const confirmPassword = formGroup.get('confirmPassword');

    if(!password || !confirmPassword) {
      return null;
    }

    if(password.value !== confirmPassword.value) {
      return {
        passwordMismatch: true
      };
    }

    return null;

  }


}