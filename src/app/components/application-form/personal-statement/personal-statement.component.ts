import { CdkListboxModule } from '@angular/cdk/listbox';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, ControlContainer } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-personal-statement',
  imports: [ReactiveFormsModule, FormsModule, CdkListboxModule],
  templateUrl: './personal-statement.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class PersonalStatementComponent {}
