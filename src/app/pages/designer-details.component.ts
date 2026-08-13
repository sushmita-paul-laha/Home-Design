import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Designer } from '../models/designer.model';
import { DesignerService } from '../services/designer.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './designer-details.component.html',
  styleUrls: ['./designer-details.component.scss'],
})
export class DesignerDetailsComponent {
  designer?: Designer;

  constructor(route: ActivatedRoute, designerService: DesignerService) {
    route.paramMap.subscribe((params) =>
      designerService
        .getDesignerById(Number(params.get('id')))
        .subscribe((designer) => (this.designer = designer)),
    );
  }
}
