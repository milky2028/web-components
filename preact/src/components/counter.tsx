import { h, render } from 'preact';
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

// we still need a base class that creates the web component
class PreactCounter extends HTMLElement {
  // we cannot create DOM in the constructor, it's part of the spec
  constructor() {
    // super instantiates the parent class
    super();
  }

  // web component methods akin to ngOnInit
  public connectedCallback() {
    // the mount point for Preact/React
    // in a formal app/SPA, this is the app-root
    const mountPoint = document.createElement('div');

    // append root div to custom element itself, remember "this" is an HTMLElement
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    // create our component, render it inside the mount point
    const counter = counterComponent();
    render(counter, mountPoint);
  }
}

const name = 'preact-counter';
export { PreactCounter as component, name };
