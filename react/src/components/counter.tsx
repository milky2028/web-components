import React, { useState } from 'react';
import { createWebComponent } from '../createWebComponent';
import { stylesheet } from '../styles';

// with React/Preact and Hooks, we can create components with functions
function Counter({ initialCount = 0 }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // styles using emotion css
  const blue = stylesheet.css`
    background-color: blue;
    color: white;
    &:hover {
      color: orange;
    }
  `;

  return (
    <div>
      <h2>React</h2>
      <button className={blue} onClick={increment}>
        Increment
      </button>
      <button className={blue} onClick={decrement}>
        Decrement
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

const name = 'react-counter';
const component = createWebComponent(<Counter initialCount={10} />);

export { name, component };
