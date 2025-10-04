import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApplicantStore, ColorSchemeService, GeocodingService } from '@IISA/services';
import { MapComponent as MaplibreComponent, MarkerComponent, PopupComponent } from '@maplibre/ngx-maplibre-gl';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'iisa-map',
  templateUrl: './map.component.html',
  imports: [MaplibreComponent, MarkerComponent, PopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  private applicants = inject(ApplicantStore).entities;
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
          return this.geocoder
            .getLocation(applicant.city_region)
            .then((marker) => marker?.toPoint(applicant))
            .catch((error) => {
              console.error(error);
              return null;
            });
        }),
      ).pipe(map((markers) => markers.filter((marker) => !!marker)));
    },
  });
}
