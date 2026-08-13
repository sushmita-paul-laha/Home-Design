import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Designer } from '../models/designer.model';

@Component({
  selector: 'app-designer-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './designer-card.component.html',
  styleUrls: ['./designer-card.component.scss'],
})
export class DesignerCardComponent {
  @Input({ required: true }) designer!: Designer;
}
