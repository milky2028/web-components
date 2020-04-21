import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(CounterComponent, {
      injector: this.injector
    });
    customElements.define('angular-counter', webComponent);
  }
}
