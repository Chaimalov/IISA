import { afterNextRender, Directive, ElementRef, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[iisaErrorMessage]',
})
export class ErrorMessageDirective {
  private control = inject(NgControl, { self: true });
  private viewContainerRef = inject(ViewContainerRef);

  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly template = input.required<TemplateRef<unknown>>({ alias: 'iisaErrorMessage' });

  public constructor() {
    afterNextRender(() => {
      this.control.control?.events?.subscribe(() => {
        this.viewContainerRef.clear();

        if (this.control.invalid && this.control.touched) {
          for (const error in this.control.errors) {
            this.viewContainerRef.createEmbeddedView(this.template(), {
              $implicit: this.getErrorMessage(error),
            });
          }
        }
      });
    });
  }

  private getErrorMessage(error: string): string {
    const fieldName = this.element.nativeElement.closest('label')?.textContent ?? 'This field';

    switch (error) {
      case 'required':
        return `${fieldName} is required`;
      case 'email':
        return 'Invalid email address';
      case 'pattern':
        return 'Invalid phone number';
      default:
        return '';
    }
  }
}
