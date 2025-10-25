import { Festival, FestivalResponse } from '@/models/festival.model';
import { Component } from '@angular/core';
import { FestivalService } from '@/services/festival.services';

@Component({
  selector: 'festival-detail-page',
  templateUrl: './festival-detail-page.component.html',
  styleUrls: ['./festival-detail-page.component.scss'],
  standalone: true,
  imports: [],
})
export class FestivalDetailPageComponent {
  festival: Festival | null = null;
  isLoading: boolean = false;

  constructor(private festivalService: FestivalService) {}

  getSelectedFestival() {
    const festivalId = new URLSearchParams(window.location.search).get(
      'festivalId'
    );
    this.isLoading = true;
    this.festivalService.getFestival(festivalId).subscribe({
      next: (response: FestivalResponse) => {
        this.festival = response.results[0];
        this.isLoading = false;
      },
      error: (e: Error) => {
        console.log(e);
        this.isLoading = false;
      },
    });
  }

  ngOnInit() {
    this.getSelectedFestival();
  }
}
