import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FestivalsPath } from '@/constants/paths.constants';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentRoute: string = '';
  test: FormControl<string | null> = new FormControl('', []);

  constructor(private router: Router) {}

  get isSearchInputAllowed(): boolean {
    const currentRoute = this.currentRoute.substring(
      this.currentRoute.indexOf('/') + 1
    );

    return [FestivalsPath].includes(currentRoute);
  }

  getRouteName() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.currentRoute = url.substring(1);
      }
    });
  }

  ngOnInit() {
    this.getRouteName();
  }
}
