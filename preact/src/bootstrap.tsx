// __preactDebug__
import { h, render, Component } from 'preact';
import counterComponent from './components/counter';

class PreactRoot extends Component {
  public render() {
    return counterComponent();
  }
}

// web component wrapper
class PreactCounter extends HTMLElement {
  constructor() {
    super();
  }

  public connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // create Preact/React and attach mount it to the shadow root
    render(<PreactRoot />, shadowRoot);
  }
}

const name = 'preact-counter';
export { PreactCounter as component, name };
