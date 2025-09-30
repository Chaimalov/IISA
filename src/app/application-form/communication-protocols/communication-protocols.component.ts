import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageDirective, RequiredInputDirective } from '../directives';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-communication-protocols',
  templateUrl: './communication-protocols.component.html',
  imports: [ErrorMessageDirective, ReactiveFormsModule, RequiredInputDirective],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class CommunicationProtocolsComponent {}
