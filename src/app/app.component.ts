import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FestivalDetailPath, FestivalsPath } from '@/constants/paths.constants';
import { SearchStore } from '@/store/search.store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  searchInput: FormControl<string | null> = new FormControl('', []);

  constructor(
    private readonly router: Router,
    private readonly searchStore: SearchStore
  ) {}

  get isSearchInputAllowed(): boolean {
    const currentRoute = this.currentRoute.substring(
      this.currentRoute.indexOf('/') + 1
    );

    return [FestivalsPath].includes(currentRoute);
  }

  get isBackIconAllowed(): boolean {
    const currentRoute = this.currentRoute.substring(
      this.currentRoute.indexOf('/') + 1,
      this.currentRoute.indexOf('?')
    );

    return [FestivalDetailPath].includes(currentRoute);
  }

  getRouteName() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.currentRoute = url.substring(1);
      }
    });
  }

  handleSearchInput() {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.searchStore.updateSearchInput(this.searchInput.value!);
      });
  }

  goToFestivalsPage() {
    this.router.navigate([FestivalsPath]);
  }

  ngOnInit() {
    this.getRouteName();
    this.handleSearchInput();
  }
}
