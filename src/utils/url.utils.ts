import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlUtils {
  constructor() {}

  formatUrl(url?: string | null) {
    if (!url) {
      return '#';
    }
    if (!url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }
}
