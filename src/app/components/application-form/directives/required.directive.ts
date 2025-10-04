import { Directive, inject } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControl], [formControlName]',
  host: {
    '[attr.required]': 'hasRequired ? "" : null',
  },
})
export class RequiredInputDirective {
  private control = inject(NgControl, { self: true });

  protected get hasRequired(): boolean {
    return Boolean(this.control.control?.hasValidator(Validators.required));
  }
}
