/// <reference types="@types/google.maps" />

import { Injectable } from '@angular/core';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { GOOGLE_API_KEY } from '../../environments/environment';
import { point } from '@turf/helpers';
import { Feature, Point } from 'geojson';

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

  public async getLocation(address: string): Promise<Marker | null> {
    const { results } = await (await this.#geocoder).geocode({ address });

    const location = results.at(0)?.geometry.location;

    return location ? new Marker(location) : null;
  }
}

class Marker {
  public location: google.maps.LatLngLiteral;

  public constructor(location: google.maps.LatLng) {
    this.location = location.toJSON();
  }

  public toPoint<T extends Record<string, unknown>>(data?: T): Feature<Point, T> {
    return point([this.location.lng, this.location.lat], data);
  }
}
