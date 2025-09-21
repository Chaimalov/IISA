import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RegistrationFormComponent } from "../registration-form/registration-form.component";

@Component({
  selector: "iisa-home",
  templateUrl: "./home.component.html",
  imports: [RegistrationFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {}
