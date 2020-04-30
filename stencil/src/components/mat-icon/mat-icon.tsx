import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'mat-icon',
  styleUrl: 'mat-icon.css',
  shadow: true
})
export class MatIcon {
  @Prop() clickable = false;
  // @ts-ignore
  @Event() iconClick: EventEmitter;

  render() {
    return (
      <Host>
        {this.clickable ? (
          <button
            class="mat-icon clickable"
            onClick={() => this.iconClick.emit()}
          >
            <slot></slot>
          </button>
        ) : (
          <div class="mat-icon">
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}
