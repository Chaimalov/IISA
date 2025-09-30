import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApplicantsStore, ColorSchemeService, GeocodingService } from '@IISA/services';
import { MapComponent as MaplibreComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'iisa-map',
  template: `<mgl-map
    [style]="style()"
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
  private applicants = inject(ApplicantsStore).entities;
  private geocoder = inject(GeocodingService);
  private colorScheme = inject(ColorSchemeService);

  protected readonly style = computed(() =>
    this.colorScheme.theme() === 'dark'
      ? 'https://tiles.openfreemap.org/styles/fiord'
      : 'https://tiles.openfreemap.org/styles/liberty',
  );

  protected markers = rxResource({
    request: this.applicants,
    loader: ({ request }) => {
      return forkJoin(
        request.map((applicant) => {
          return this.geocoder.getLocation(applicant.city_region).then((res) => {
            return res.results[0].geometry.location as unknown as google.maps.LatLngLiteral;
          });
        }),
      );
    },
  });
}
