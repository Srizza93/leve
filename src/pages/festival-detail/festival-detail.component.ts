import { Component } from '@angular/core';
import { FestivalService } from '@/services/festival.services';

@Component({
  selector: 'festival-detail',
  templateUrl: './festival-detail.component.html',
  standalone: true,
})
export class FestivalDetailComponent {
  constructor(private festivalService: FestivalService) {}

  ngOnInit() {
    this.festivalService.getFestivals().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (e: Error) => {
        console.log(e);
      },
    });
  }
}
