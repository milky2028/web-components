import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css',
  shadow: true
})
export class HelloWorld {
  render() {
    return (
      <Host>
        <h2>Hello world!</h2>
      </Host>
    );
  }
}
