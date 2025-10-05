import { Application } from '@IISA/lib';
import { ApplicantStore } from '@IISA/services';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FileInputAccessorModule, ICustomFile } from 'file-input-accessor';
import { LucideAngularModule } from 'lucide-angular';
import { catchError, EMPTY, filter, finalize, from, merge, Subject, switchMap, tap } from 'rxjs';
import { ApplicationFormControls } from '../application-form';
import { ErrorMessageDirective } from '../directives/error-message.directive';
import { RequiredInputDirective } from '../directives/required.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-astronaut-identity',
  templateUrl: './astronaut-identity.component.html',
  imports: [
    ErrorMessageDirective,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    RequiredInputDirective,
    FileInputAccessorModule,
    LucideAngularModule,
    MatTooltip,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class AstronautIdentityComponent implements OnInit {
  private store = inject(ApplicantStore);
  private parentContainer = inject(ControlContainer);

  private get control(): FormGroup<Pick<ApplicationFormControls, 'avatar'>> {
    return this.parentContainer.control as FormGroup;
  }

  protected readonly avatar = {
    value: signal<ICustomFile[] | undefined>(undefined),
    loading: signal(false),
    error: signal<string | undefined>(undefined),
  };

  private initialAvatarUrl$ = new Subject<Application['avatar']>();

  protected avatarUrl$ = merge(
    this.initialAvatarUrl$,
    toObservable(this.avatar.value).pipe(
      filter(Boolean),
      tap(() => this.avatar.loading.set(true)),
      switchMap((file) =>
        from(this.store.upload(file[0])).pipe(
          tap({
            error: () => {
              this.avatar.error.set('Something went wrong');
            },
            next: (url) => {
              this.avatar.error.set(undefined);

              this.control.controls.avatar.setValue(url);
            },
          }),
          catchError(() => EMPTY),
          finalize(() => this.avatar.loading.set(false)),
        ),
      ),
    ),
  );

  protected readonly avatarUrl = toSignal(this.avatarUrl$, {
    initialValue: null,
  });

  public ngOnInit(): void {
    this.initialAvatarUrl$.next(this.control.controls.avatar.value);
  }
}
