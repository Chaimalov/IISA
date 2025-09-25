import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, GridOptions, ModuleRegistry, colorSchemeDarkBlue, themeQuartz } from 'ag-grid-community';
import { ApplicantsStore } from '../../applicants.store';
import { Applicant } from '../../applicant';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'iisa-applicants-table',
  templateUrl: './applicants-table.component.html',
  imports: [MatTableModule, MatSortModule, RouterLink, AgGridAngular],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantsTableComponent {
  public applicants = inject(ApplicantsStore).applicants;
  protected dataSource = new MatTableDataSource();

  protected theme = themeQuartz.withPart(colorSchemeDarkBlue);
  protected options = {
    defaultColDef: {
      filter: true,
    },
    columnDefs: [
      {
        field: 'full_name',
        headerName: 'Full Name',
      },
      {
        field: 'age',
        headerName: 'Age',
      },
      {
        field: 'email',
        headerName: 'Email',
      },
      {
        field: 'phone_number',
        headerName: 'Phone Number',
      },
    ],
    autoSizeStrategy: {
      type: 'fitGridWidth',
    },
  } satisfies GridOptions<Applicant>;

  // protected displayedColumns: (keyof Applicant)[] = ['full_name', 'age', 'city_region'];

  // private readonly sort = viewChild.required(MatSort);

  // public constructor() {
  //   effect(() => {
  //     this.dataSource.data = this.applicants();
  //   });

  //   effect(() => {
  //     this.dataSource.sort = this.sort();
  //   });
  // }
}
