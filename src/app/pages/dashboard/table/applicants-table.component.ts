import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Applicant } from '@IISA/lib';
import { ApplicantStore, ColorSchemeService } from '@IISA/services';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  GridOptions,
  ModuleRegistry,
  colorSchemeDarkBlue,
  colorSchemeLight,
  themeQuartz,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'iisa-applicants-table',
  templateUrl: './applicants-table.component.html',
  imports: [MatTableModule, MatSortModule, AgGridAngular],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantsTableComponent {
  public applicants = inject(ApplicantStore).applicants.value;
  public colorScheme = inject(ColorSchemeService);

  protected readonly theme = computed(() =>
    themeQuartz.withPart(this.colorScheme.isDark() ? colorSchemeDarkBlue : colorSchemeLight),
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
