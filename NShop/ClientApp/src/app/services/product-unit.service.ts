import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Unit } from '../model/units';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService {

  constructor(private http: HttpClient) { }

  getProductUnits(): Observable<Unit[]> {
    return of(
      [
        {unitId: 1, unitDescription: 'piece'},
        {unitId: 2, unitDescription: 'dozen'}
      ]
    );
  }
}
