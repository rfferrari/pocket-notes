import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { IonHeader, IonContent, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [IonToolbar, IonTitle, IonContent, IonHeader, RouterOutlet],
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
