import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MapComponent as MaplibreComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'iisa-map',
  template: `<mgl-map
    [style]="'https://tiles.openfreemap.org/styles/liberty'"
    [center]="[34.80092882883532, 32.08485247343606]"
    [zoom]="[15]"
    class="block h-100"></mgl-map>`,
  imports: [MaplibreComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {}
