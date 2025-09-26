import { Directive, inject } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControl]',
  host: {
    '[attr.required]': 'isRequired ? `` : null',
  },
})
export class RequiredInputDirective {
  private control = inject(NgControl, { self: true });

  protected get isRequired(): boolean {
    return this.control.control.hasValidator(Validators.required);
  }
}
