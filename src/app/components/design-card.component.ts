import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Design } from '../services/design.service';

@Component({
  selector: 'app-design-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './design-card.component.html',
  styleUrls: ['./design-card.component.scss'],
})
export class DesignCardComponent {
  @Input({ required: true }) design!: Design;
}
