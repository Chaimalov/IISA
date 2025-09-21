import { Component, computed, inject, input } from "@angular/core";
import { ApplicantsStore } from "../applicants.store";

@Component({
  selector: "iisa-applicant",
  templateUrl: "./applicant.component.html",
})
export class ApplicantComponent {
  public id = input.required<string>();
  public applicants = inject(ApplicantsStore);

  protected applicant = computed(() => {
    return this.applicants.get(this.id());
  });
}
