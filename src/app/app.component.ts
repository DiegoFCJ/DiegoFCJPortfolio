import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_TITLE } from './constants/general'; // Import title constant
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Ensure the title is only updated in the browser (not on the server)
    if (isPlatformBrowser(this.platformId)) {
      document.title = APP_TITLE; // Set the title dynamically
    }
  }
}
