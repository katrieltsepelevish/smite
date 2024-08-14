import { Component } from '@angular/core';

import { LayoutComponent } from '../../core/layout/layout.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [LayoutComponent],
  providers: [],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent {}
