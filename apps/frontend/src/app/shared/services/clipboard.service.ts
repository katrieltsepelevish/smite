import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  public copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast.success('Text copied to clipboard successfully'))
        .catch(() => toast.error('Failed to copy text'));
    }
  }
}
