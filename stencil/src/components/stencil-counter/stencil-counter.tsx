import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-counter',
  styleUrl: 'stencil-counter.css',
  shadow: true
})
export class StencilCounter {
  @Prop() public count = 0;

  #increment = () => this.count++;
  #decrement = () => this.count--;

  render() {
    return (
      <Host>
        <div>
          <h1>
            <slot></slot>
          </h1>
          <button onClick={this.#increment}>Increment</button>
          <button onClick={this.#decrement}>Decrement</button>
          <p>Count: {this.count}</p>
        </div>
      </Host>
    );
  }
}
