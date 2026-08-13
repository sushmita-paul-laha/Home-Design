import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Design, DesignService } from '../services/design.service';
import { DesignCardComponent } from '../components/design-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, DesignCardComponent],
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss'],
})
export class DesignsComponent {
  designs: Design[] = [];
  activeCategory = '';
  categories = [
    { name: 'Kitchen', slug: 'kitchen' },
    { name: 'Bedroom', slug: 'bedroom' },
    { name: 'Bathroom', slug: 'bathroom' },
    { name: 'Living room', slug: 'living-room' },
    { name: 'Balcony', slug: 'balcony' },
    { name: 'Dining room', slug: 'dining-room' },
  ];

  constructor(
    private readonly designService: DesignService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.activeCategory = params.get('category') || '';
      const category = this.activeCategory.replace('-', ' ');
      const stream = category
        ? this.designService.getDesignsByCategory(category)
        : this.designService.getAllDesigns();
      stream.subscribe((designs) => (this.designs = designs));
    });
  }
}
