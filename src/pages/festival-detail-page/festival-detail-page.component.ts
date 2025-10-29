import { Festival, FestivalResponse } from '@/models/festival.model';
import { Component } from '@angular/core';
import { FestivalService } from '@/services/festival.services';
import { CommonModule } from '@angular/common';
import { UrlUtils } from '@/utils/url.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { FestivalsPath } from '@/constants/paths.constants';

@Component({
  selector: 'festival-detail-page',
  templateUrl: './festival-detail-page.component.html',
  styleUrls: ['./festival-detail-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FestivalDetailPageComponent {
  festival: Festival | null = null;
  isLoading: boolean = false;

  constructor(
    public urlUtils: UrlUtils,
    private readonly festivalService: FestivalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  loadFestival() {
    const festivalId: string | null =
      this.route.snapshot.queryParamMap.get('festivalId');

    if (!festivalId) {
      this.router.navigate([FestivalsPath]);
      console.log('No festival ID');
      return;
    }

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
    this.loadFestival();
  }
}
