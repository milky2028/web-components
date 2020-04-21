// __preactDebug__
// preactDebug macro imports preact/debug. It is removed in production
import { h, render } from 'preact';
import { stylesContainer } from './styleCache';

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

      // create a div to hold our stylesheet
      shadowRoot.appendChild(stylesContainer);
      const mountPoint = document.createElement('div');

      shadowRoot.appendChild(mountPoint);

      // reander Preact with shadowRoot as the parent element and replace the mount point
      render(VRoot, shadowRoot, mountPoint);
    }
  };

  return WebComponent;
}
