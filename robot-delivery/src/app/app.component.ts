import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {icons} from "./models/others/Icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'robot-delivery';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (let icon of icons) {
      iconRegistry.addSvgIcon(icon.selector, sanitizer.bypassSecurityTrustResourceUrl(icon.path))
    }
  }

}
