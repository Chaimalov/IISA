import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
  host: {
    class: "h-full grid grid-rows-[1fr_1fr_auto]",
  },
})
export class AppComponent {}
