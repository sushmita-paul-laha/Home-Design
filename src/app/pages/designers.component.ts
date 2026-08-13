import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Designer } from '../models/designer.model';
import { DesignerService } from '../services/designer.service';
import { DesignerCardComponent } from '../components/designer-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DesignerCardComponent],
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.scss'],
})
export class DesignersComponent {
  designers: Designer[] = [];
  filteredDesigners: Designer[] = [];
  states = [
    'Delhi',
    'Haryana',
    'Uttar Pradesh',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Telangana',
    'Kerala',
    'Rajasthan',
    'Goa',
    'Punjab',
  ];
  specializations = [
    'Modern',
    'Luxury',
    'Minimalist',
    'Contemporary',
    'Traditional',
    'Scandinavian',
  ];
  searchTerm = '';
  selectedState = '';
  selectedSpecialization = '';
  sortBy = 'projects';
  loading = true;

  constructor(
    private readonly designerService: DesignerService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || '';
      this.load();
    });
  }

  load(): void {
    this.designerService.getAllDesigners().subscribe({
      next: (designers) => {
        this.designers = designers;
        this.loading = false;
        this.filterDesigners();
      },
      error: () => (this.loading = false),
    });
  }

  filterDesigners(): void {
    const search = this.searchTerm.trim().toLowerCase();
    this.filteredDesigners = this.designers
      .filter((designer) => {
        const searchable = [
          designer.name,
          designer.description,
          ...designer.states,
          ...designer.specialization,
        ]
          .join(' ')
          .toLowerCase();
        const specialization = this.selectedSpecialization
          ? designer.specialization.some((item) =>
              item
                .toLowerCase()
                .includes(this.selectedSpecialization.toLowerCase()),
            )
          : true;
        return (
          (!search || searchable.includes(search)) &&
          (!this.selectedState ||
            designer.states.includes(this.selectedState)) &&
          specialization
        );
      })
      .sort((a, b) =>
        this.sortBy === 'rating'
          ? b.rating - a.rating
          : this.sortBy === 'experience'
            ? parseInt(b.experience, 10) - parseInt(a.experience, 10)
            : b.projectsCompleted - a.projectsCompleted,
      );
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedState = '';
    this.selectedSpecialization = '';
    this.sortBy = 'projects';
    this.filterDesigners();
  }
}
