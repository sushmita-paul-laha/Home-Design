import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Designer } from '../models/designer.model';
import { DesignerService } from '../services/designer.service';
import { DesignerCardComponent } from '../components/designer-card.component';
import { CategoryCardComponent } from '../components/category-card.component';

@Component({
  standalone: true,
  imports: [RouterLink, DesignerCardComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  featuredDesigners: Designer[] = [];
  categories = [
    {
      name: 'Kitchen',
      slug: 'kitchen',
      count: 12,
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700',
    },
    {
      name: 'Bedroom',
      slug: 'bedroom',
      count: 11,
      image:
        'https://images.unsplash.com/photo-1617104678098-de229db51175?w=700',
    },
    {
      name: 'Bathroom',
      slug: 'bathroom',
      count: 8,
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700',
    },
    {
      name: 'Living room',
      slug: 'living-room',
      count: 13,
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700',
    },
    {
      name: 'Balcony',
      slug: 'balcony',
      count: 6,
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700',
    },
    {
      name: 'Dining room',
      slug: 'dining-room',
      count: 5,
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700',
    },
  ];

  constructor(private readonly designerService: DesignerService) {
    this.designerService
      .getAllDesigners()
      .subscribe(
        (designers) => (this.featuredDesigners = designers.slice(0, 4)),
      );
  }
}
