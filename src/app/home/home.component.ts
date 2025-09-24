import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { RegistrationFormComponent } from "../registration-form/registration-form.component";

const className = "grid gap-4 h-full place-items-center p-4";

@Component({
  selector: "iisa-home",
  templateUrl: "./home.component.html",
  imports: [RegistrationFormComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: className,
  },
})
export class HomeComponent {}
