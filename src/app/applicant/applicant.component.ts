import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { ApplicantsStore } from "../applicants.store";

@Component({
  selector: "iisa-applicant",
  templateUrl: "./applicant.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantComponent {
  private applicants = inject(ApplicantsStore);
  public id = input.required<string>();

  protected applicant = computed(() => {
    return this.applicants.get(this.id());
  });
}
