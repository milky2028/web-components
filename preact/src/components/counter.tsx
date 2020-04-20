import { h } from 'preact';
import { useState } from 'preact/hooks';

// with React/Preact and Hooks, we can create components with functions
export default function counterComponent() {
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
