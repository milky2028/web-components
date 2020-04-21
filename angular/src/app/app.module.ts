import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(CounterComponent, {
      injector: this.injector
    });
    customElements.define('angular-counter', webComponent);
  }
}
