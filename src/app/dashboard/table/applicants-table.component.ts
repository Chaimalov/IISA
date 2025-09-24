import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Applicant } from '../../applicant';
import { ApplicantsStore } from '../../applicants.store';

@Component({
  selector: 'iisa-applicants-table',
  templateUrl: './applicants-table.component.html',
  imports: [MatTableModule, MatSortModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantsTableComponent {
  public applicants = inject(ApplicantsStore).applicants;
  protected dataSource = new MatTableDataSource();

  protected displayedColumns: (keyof Applicant | 'link')[] = [
    'full_name',
    'date_of_birth',
    'city_region',
    'email',
    'link',
  ];

  private sort = viewChild.required(MatSort);

  public constructor() {
    effect(() => {
      this.dataSource.data = this.applicants();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }
}
