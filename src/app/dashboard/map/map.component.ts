import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MapComponent as MaplibreComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { forkJoin } from 'rxjs';
import { GeocodingService } from '../../../gecoding.service';
import { ApplicantsStore } from '../../applicants.store';

@Component({
  selector: 'iisa-map',
  template: `<mgl-map
    [style]="'https://tiles.openfreemap.org/styles/fiord'"
    [center]="[34.80092882883532, 32.08485247343606]"
    [zoom]="[6]"
    class="block h-full">
    @for (marker of markers.value(); track marker) {
      <mgl-marker [lngLat]="[marker.lng, marker.lat]"> </mgl-marker>
    }
  </mgl-map>`,
  imports: [MaplibreComponent, MarkerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  protected applicants = inject(ApplicantsStore).entities;
  protected geocoder = inject(GeocodingService);

  protected markers = rxResource({
    request: this.applicants,
    loader: ({ request }) => {
      return forkJoin(
        request.map((applicant) => {
          return this.geocoder.getLocation(applicant.city_region!).then((res) => {
            return res.results[0].geometry.location as unknown as google.maps.LatLngLiteral;
          });
        }),
      );
    },
  });
}
