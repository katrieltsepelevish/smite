import { Component, Input } from '@angular/core';

@Component({
  selector: 'smt-tooltip-content',
  standalone: true,
  template: `{{ label }}`,
  host: {
    class:
      'rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md fade-in-0 zoom-in-95',
  },
})
export class SmtTooltipContentComponent {
  @Input() label = '';
}
