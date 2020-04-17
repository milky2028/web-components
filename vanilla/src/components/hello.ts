class HelloComponent extends HTMLElement {
  constructor() {
    super();
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const hello = document.createElement('p');
    hello.textContent = 'Hello world!';
    this.shadowRoot?.appendChild(hello);
  }
}

const name = 'hello-vanilla';
export { HelloComponent as component, name };
