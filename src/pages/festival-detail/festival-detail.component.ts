import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestivalService } from '@/services/festival.services';
import { FestivalCardComponent } from '@/components/festival-card/festival-card.component';
import { Festival, FestivalResponse } from '@/models/festival.model';

@Component({
  selector: 'festival-detail',
  templateUrl: './festival-detail.component.html',
  styleUrls: ['./festival-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FestivalCardComponent
  ]
})
export class FestivalDetailComponent {
  festivals: Festival[] = [];
  isLoading: boolean = false;

  constructor(private festivalService: FestivalService) {}

  ngOnInit() {
    this.isLoading = true;
    this.festivalService.getFestivals().subscribe({
      next: (response: FestivalResponse) => {
        this.festivals = response.results;
        this.isLoading = false;
        console.log(response);
      },
      error: (e: Error) => {
        console.log(e);
        this.isLoading = false;
      },
    });
  }
}
