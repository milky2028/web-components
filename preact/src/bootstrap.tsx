// __preactDebug__
// always import h from Preact or VSCode gets weird
import { h, render } from 'preact';

// this is a factory function for creating web components
export default function createWebComponent(VRoot: h.JSX.Element) {
  // web component root, virtual dom root is mounted inside this element's shadow dom
  const WebComponent = class extends HTMLElement {
    constructor() {
      super();
    }

    // part of the the web component's api, akin to ngOnInit
    public connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // create Preact/React and mount it to the shadow root of our root HTML element
      render(VRoot, shadowRoot);
    }
  };

  return WebComponent;
}
