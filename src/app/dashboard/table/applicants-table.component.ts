import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  viewChild,
} from "@angular/core";
import { Applicant } from "../../applicant";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { ApplicantsStore } from "../../applicants.store";

@Component({
  selector: "iisa-applicants-table",
  templateUrl: "./applicants-table.component.html",
  imports: [MatTableModule, MatSortModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantsTableComponent {
  public applicants = inject(ApplicantsStore).entities;
  protected dataSource = new MatTableDataSource();

  protected displayedColumns: (keyof Applicant | "link")[] = [
    "fullName",
    "age",
    "city",
    "email",
    "link",
  ];

  private sort = viewChild.required(MatSort);

  constructor() {
    effect(() => {
      this.dataSource.data = this.applicants();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }
}
