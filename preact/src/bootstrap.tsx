// __preactDebug__
// preactDebug macro imports preact/debug. It is removed in production
import { h, render } from 'preact';

// this is a factory function for creating web components, it takes a JSX Element
export default function createWebComponent(VRoot: h.JSX.Element) {
  // web component root, virtual dom root is mounted inside this element's shadow dom
  const WebComponent = class extends HTMLElement {
    constructor() {
      super();
    }

    // part of the the web component's api, akin to ngOnInit
    public connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // reander Preact inside the shadow root
      render(VRoot, shadowRoot);
    }
  };

  return WebComponent;
}
