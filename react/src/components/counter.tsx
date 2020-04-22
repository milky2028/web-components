import React, { useState } from 'react';
import { createWebComponent } from '../createWebComponent';

// with React/Preact and Hooks, we can create components with functions
function Counter({ initialCount = 0 }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const blueBtn = {
    backgroundColor: 'blue',
    color: 'white'
  };

  return (
    <div>
      <h2>React</h2>
      <button style={blueBtn} onClick={increment}>
        Increment
      </button>
      <button style={blueBtn} onClick={decrement}>
        Decrement
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

const name = 'react-counter';
const component = createWebComponent(<Counter initialCount={10} />);

export { name, component };
