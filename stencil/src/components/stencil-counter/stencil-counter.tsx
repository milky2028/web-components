import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-counter',
  styleUrl: 'stencil-counter.css',
  shadow: true
})
export class StencilCounter {
  @Prop() count = 0;

  #increment = () => this.count++;
  #decrement = () => this.count--;

  render() {
    return (
      <Host>
        <div>
          <h2>Stencil</h2>
          <button onClick={this.#increment}>Increment</button>
          <button onClick={this.#decrement}>Decrement</button>
          <p>Count: {this.count}</p>
        </div>
      </Host>
    );
  }
}
