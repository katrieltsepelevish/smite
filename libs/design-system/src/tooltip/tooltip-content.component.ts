import { Component, Input } from '@angular/core';

@Component({
  selector: 'smt-tooltip-content',
  standalone: true,
  templateUrl: './tooltip-content.component.html',
})
export class SmtTooltipContentComponent {
  @Input() label = '';
}
