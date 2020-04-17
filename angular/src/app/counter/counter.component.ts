import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  public count = 0;

  public increment() {
    this.count++;
  }

  public decrement() {
    this.count--;
  }
}
