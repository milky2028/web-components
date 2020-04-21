import { h } from 'preact';
import { useState } from 'preact/hooks';
import createWebComponent from '../bootstrap';

// with React/Preact and Hooks, we can create components with functions
function Counter({ initialCount = 0 }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const blue = {
    backgroundColor: 'blue',
    color: 'white'
  };

  return (
    <div>
      <h2>Preact</h2>
      <button style={blue} onClick={increment}>
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </div>
  );
}

const name = 'preact-counter';
const component = createWebComponent(<Counter initialCount={10} />);

export { name, component };
