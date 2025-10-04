import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  GridOptions,
  ModuleRegistry,
  colorSchemeDarkBlue,
  colorSchemeLight,
  themeQuartz,
} from 'ag-grid-community';
import { Applicant } from '../../../../lib/applicant.types';
import { ColorSchemeService } from '../../../services/color-scheme.service';
import { ApplicantStore } from '../../../services/applicants.store';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'iisa-applicants-table',
  templateUrl: './applicants-table.component.html',
  imports: [MatTableModule, MatSortModule, AgGridAngular],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantsTableComponent {
  public applicants = inject(ApplicantStore).applicants;
  public colorScheme = inject(ColorSchemeService);
  protected dataSource = new MatTableDataSource();

  protected readonly theme = computed(() =>
    themeQuartz.withPart(this.colorScheme.theme() === 'dark' ? colorSchemeDarkBlue : colorSchemeLight),
  );
  protected options = {
    suppressDragLeaveHidesColumns: true,
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
}
