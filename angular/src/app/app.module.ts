import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  Injector
} from '@angular/core';

import { CounterComponent } from './counter/counter.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [CounterComponent],
  imports: [BrowserModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(CounterComponent, {
      injector: this.injector
    });
    customElements.define('angular-counter', webComponent);
  }

  ngDoBootstrap() {}
}
