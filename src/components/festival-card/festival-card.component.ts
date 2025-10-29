import { Festival } from '@/models/festival.model';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FestivalDetailPath } from '@/constants/paths.constants';
import { UrlUtils } from '@/utils/url.utils';

@Component({
  selector: 'festival-card',
  templateUrl: './festival-card.component.html',
  styleUrls: ['./festival-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterLink],
})
export class FestivalCardComponent {
  @Input() festival: Festival = {} as Festival;

  constructor(public urlUtils: UrlUtils) {}

  festivalDetailPath: string = FestivalDetailPath;
}
