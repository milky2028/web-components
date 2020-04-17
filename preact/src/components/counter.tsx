// __preactDebug__
import { h, render, Component } from 'preact';
import { useState } from 'preact/hooks';

// with React/Preact and Hooks, we can create components with functions
function counterComponent() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h2>Preact</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </div>
  );
}

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
