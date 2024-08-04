import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmtButtonDirective } from '@smite/design-system';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLoader } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmSpinnerComponent,
    FormsModule,
    HlmLabelDirective,
    HlmCardDirective,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideGithub, lucideLoader })],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoading = signal(false);

  send() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }
}
