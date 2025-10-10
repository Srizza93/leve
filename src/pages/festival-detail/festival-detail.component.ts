import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FestivalService } from '@/services/festival.services';
import { FestivalCardComponent } from '@/components/festival-card/festival-card.component';
import { Festival, FestivalResponse, FestivalKeys } from '@/models/festival.model';

@Component({
  selector: 'festival-detail',
  templateUrl: './festival-detail.component.html',
  styleUrls: ['./festival-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FestivalCardComponent,
    MatDividerModule,
    MatPaginatorModule
  ]
})
export class FestivalDetailComponent {  
  festivals: Festival[] = [];
  isLoading: boolean = false;
  pageSize: number = 5;
  pageIndex: number = 1;
  itemsLength: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private festivalService: FestivalService) { }
  
  handlePageEvent(event: any) {
    const hasPageSizeChanged: boolean = this.pageSize != event.pageSize;
    const hasPageIndexChanged: boolean = this.pageIndex != event.pageIndex + 1;
    
    if (hasPageSizeChanged || hasPageIndexChanged) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex + 1;
      this.getFestivals();
    }
  }

  getFestivals() {
    this.isLoading = true;
    this.festivalService.getFestivals(this.pageIndex, this.pageSize, FestivalKeys.NOM_DU_FESTIVAL).subscribe({
      next: (response: FestivalResponse) => {
        this.festivals = response.results;
        this.itemsLength = response.total_count;
        this.isLoading = false;
      },
      error: (e: Error) => {
        console.log(e);
        this.isLoading = false;
      },
    });
  }

  ngOnInit() {
    this.getFestivals();
  }
}
