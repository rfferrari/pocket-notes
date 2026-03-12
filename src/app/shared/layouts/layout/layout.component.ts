import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonHeader, RouterOutlet],
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  currentUrl = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => (this.currentUrl = e.urlAfterRedirects));
  }

  showBackButton(): boolean {
    return !['/notes'].includes(this.currentUrl);
  }
}
