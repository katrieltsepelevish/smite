import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  providers: [],
  template: `
    <div class="relative flex min-h-screen bg-background">
      <div class="bg-background w-full h-full">
        <app-sidebar />
        <div class="grid h-screen w-full pl-[56px]">
          <div class="flex flex-col">
            <app-header />
            <main
              class="flex flex-1 justify-center overflow-auto p-8 gap-8 bg-muted/40"
            >
              <ng-content></ng-content>
            </main>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LayoutComponent {}
