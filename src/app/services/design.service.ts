import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DesignerService } from './designer.service';
import { Project } from '../models/project.model';

export interface Design extends Project {
  designerId: number;
  designerName: string;
}

@Injectable({ providedIn: 'root' })
export class DesignService {
  constructor(private readonly designerService: DesignerService) {}

  getAllDesigns(): Observable<Design[]> {
    return this.designerService.getAllDesigners().pipe(
      map((designers) =>
        designers.flatMap((designer) =>
          designer.projects.map((project) => ({
            ...project,
            designerId: designer.id,
            designerName: designer.name,
          })),
        ),
      ),
    );
  }

  getDesignsByCategory(category: string): Observable<Design[]> {
    return this.getAllDesigns().pipe(
      map((designs) =>
        designs.filter(
          (design) => design.category.toLowerCase() === category.toLowerCase(),
        ),
      ),
    );
  }
}
