import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FestivalService } from '@/services/festival.services';
import { FestivalCardComponent } from '@/components/festival-card/festival-card.component';
import { Festival, FestivalResponse, FestivalKeys, festivalKeyTranslation } from '@/models/festival.model';

@Component({
  selector: 'festival-detail',
  templateUrl: './festival-detail.component.html',
  styleUrls: ['./festival-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FestivalCardComponent,
    MatDividerModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class FestivalDetailComponent {  
  festivals: Festival[] = [];
  isLoading: boolean = false;
  pageSize: number = 5;
  pageIndex: number = 1;
  itemsLength: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  searchInput: FormControl<string | null> = new FormControl('', []);
  orderBy: FormControl<keyof Festival | null> = new FormControl(FestivalKeys.NOM_DU_FESTIVAL, [])
  festivalKeys = this.mapFestivalKeysForSelction();

  constructor(private festivalService: FestivalService) { }

  mapFestivalKeysForSelction() {
    return Object.values(FestivalKeys).map((key) => {
      const translation = festivalKeyTranslation[key] ?? null;
      return {
      value: key,
      valueView: translation
    }
    }).filter((option) => !!option.valueView);
  }
  
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
    this.festivalService.getFestivals(this.pageIndex, this.pageSize, this.orderBy.value, this.searchInput.value).subscribe({
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

  handleSearchInput() {
    this.searchInput.valueChanges.subscribe(() => this.getFestivals());
  }

  handleSort() {
    this.orderBy.valueChanges.subscribe(() => this.getFestivals());
  }

  ngOnInit() {
    this.getFestivals();
    this.handleSearchInput();
    this.handleSort();
  }
}
