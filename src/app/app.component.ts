import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, MatIcon],
  templateUrl: "./app.component.html",
  host: {
    class: "h-full grid grid-rows-[1fr_auto]",
  },
})
export class AppComponent {}
