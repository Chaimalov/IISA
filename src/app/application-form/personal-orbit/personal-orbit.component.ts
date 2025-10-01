import { CdkListbox, CdkListboxModule } from '@angular/cdk/listbox';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
  viewChild,
} from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationFormControls } from '../application-form.types';

export const WORD_START = /\b\w/g;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-personal-orbit',
  imports: [ReactiveFormsModule, FormsModule, CdkListboxModule],
  templateUrl: './personal-orbit.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class PersonalOrbitComponent implements OnInit {
  private injector = inject(Injector);
  private parentContainer = inject(ControlContainer);

  private get control(): FormGroup<ApplicationFormControls> {
    return this.parentContainer.control as FormGroup;
  }

  private readonly list = viewChild.required<CdkListbox<string>>(CdkListbox);

  protected readonly hobbies = signal([
    'Stargazing ✨',
    'Photography 📷',
    'Astronomy 🔭',
    'Rocketry 🚀',
    'Science 🧪',
    'Robotics 🤖',
    'Trekking 🥾',
    'Programming 💻',
    'Drone Flying 🛸',
    'Martial Arts 🥋',
    'Reading 📚',
    'Strategy Games ♟️',
    'Community Work 🤝',
  ]);

  public ngOnInit(): void {
    this.hobbies.update((hobbies) => [...new Set([...hobbies, ...(this.control.controls.hobbies.value ?? [])])]);
  }

  protected addAnotherHobby(otherHobby: string): void {
    const hobby = otherHobby.trim().replace(WORD_START, (match) => match.toUpperCase());

    if (!hobby) return;

    this.hobbies.update((hobbies) => (hobbies.includes(hobby) ? hobbies : [...hobbies, hobby]));

    runInInjectionContext(this.injector, () => {
      afterNextRender({
        write: () => {
          this.list().selectValue(hobby);
          this.control.controls.hobbies.setValue([...this.list().value]);
        },
      });
    });
  }
}
