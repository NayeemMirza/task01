import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Vehicle, Film, VechiclRepsonse } from './vehicle';
import { catchError, filter, forkJoin, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { toSignal, toObservable  } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles/'
  private vehicles$ = this.http.get<VechiclRepsonse>(this.url).pipe(
    map((data) =>
      data.results.map((v) => ({
        ...v,
        cost_in_credits: isNaN(Number(v.cost_in_credits)) ? String(Math.random() * 100000) : v.cost_in_credits,
      }) as Vehicle)
    ),
    shareReplay(1),
    catchError(this.handleError)
  );

  
  vehicles = toSignal<Vehicle[], Vehicle[]>(this.vehicles$, {initialValue: []})
  selectedVehicle = signal<Vehicle | undefined>(undefined)

  private vechileFilms$ = toObservable(this.selectedVehicle).pipe(
    filter(Boolean), switchMap(vechile => forkJoin(vechile.films.map(link => 
        this.http.get<Film>(link)
      )))
  )

  
  vehicleFilms = toSignal<Film[], Film[]>(this.vechileFilms$, {initialValue: []})

  constructor(private http: HttpClient) { }


  vehicleSelected(vehicleName: string) {
    const foundVehicle = this.vehicles().find((v) => v.name === vehicleName);
    this.selectedVehicle.set(foundVehicle);
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`
    } else{
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.error(errorMessage)
    return throwError(() => errorMessage)
  }
}
