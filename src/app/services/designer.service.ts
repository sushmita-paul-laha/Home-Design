import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Designer } from '../models/designer.model';

@Injectable({ providedIn: 'root' })
export class DesignerService {
  private readonly designers$ = this.http
    .get<Designer[]>('assets/data/designers.json')
    .pipe(shareReplay(1));

  constructor(private readonly http: HttpClient) {}

  getAllDesigners(): Observable<Designer[]> {
    return this.designers$;
  }

  getDesignerById(id: number): Observable<Designer | undefined> {
    return this.designers$.pipe(
      map((designers) => designers.find((designer) => designer.id === id)),
    );
  }
}
