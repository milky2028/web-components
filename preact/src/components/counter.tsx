import { h } from 'preact';
import { useState } from 'preact/hooks';
import createWebComponent from '../bootstrap';

// with React/Preact and Hooks, we can create components with functions
function Counter() {
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

const { name, component } = createWebComponent('preact-counter', Counter());

export { name, component };
