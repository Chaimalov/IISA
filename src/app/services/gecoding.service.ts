/// <reference types="@types/google.maps" />

import { Injectable } from '@angular/core';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { GOOGLE_API_KEY } from '../../environment';
import { point } from '@turf/helpers';
import { Feature, Point, Position } from 'geojson';

setOptions({
  libraries: ['geocoding'],
  key: GOOGLE_API_KEY,
  language: 'en',
  region: 'IL',
});

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  #geocoder = importLibrary('geocoding').then(({ Geocoder }) => new Geocoder());

  public async getLocation(address: string): Promise<Position | null> {
    const { results } = await (await this.#geocoder).geocode({ address });

    const location = results.at(0)?.geometry.location;

    return location ? [location.lng(), location.lat()] : null;
  }
}
