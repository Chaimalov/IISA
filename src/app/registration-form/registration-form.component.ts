import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'iisa-registration-form',
  templateUrl: './registration-form.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatStepperModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  protected form = new FormGroup({
    fullName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { validators: [Validators.required] }),
    age: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    hobbies: new FormControl(''),
    reason: new FormControl(''),
    image: new FormControl(null),
  });
}
