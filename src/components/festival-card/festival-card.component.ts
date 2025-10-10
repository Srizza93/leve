import { Festival } from '@/models/festival.model';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'festival-card',
  templateUrl: './festival-card.component.html',
  styleUrls: ['./festival-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
]
})
export class FestivalCardComponent {
  @Input() festival: Festival = {} as Festival
}