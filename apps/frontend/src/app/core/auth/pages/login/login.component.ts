import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmtButtonDirective, SmtCardComponent } from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLoader } from '@ng-icons/lucide';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    HlmInputDirective,
    HlmSpinnerComponent,
    FormsModule,
    HlmLabelDirective,
    SmtButtonDirective,
    SmtCardComponent,
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
