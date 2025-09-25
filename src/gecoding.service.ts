/// <reference types="@types/google.maps" />

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GOOGLE_API_KEY } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  #http = inject(HttpClient);

  private url(address: string): string {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;
  }

  public getLocation(address: string): Promise<google.maps.GeocoderResponse> {
    return firstValueFrom(this.#http.get<google.maps.GeocoderResponse>(this.url(address)));
  }
}
