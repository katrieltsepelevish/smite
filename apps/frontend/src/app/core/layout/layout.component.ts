import { Component, computed, input } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
            <app-header>
              <ng-content select="[layoutHeader]"></ng-content>
            </app-header>
            <main [class]="_computedClass()">
              <ng-content></ng-content>
            </main>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LayoutComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx('flex-1 p-8', this.overrideClass())),
  );
}
