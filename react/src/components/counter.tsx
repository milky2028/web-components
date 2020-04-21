import React from 'react';
import createWebComponent from '../createWebComponent';
import { css } from '@emotion/core';

// with React/Preact and Hooks, we can create components with functions
function Counter({ initialCount = 0 }: { initialCount: number }) {
  const [count, setCount] = React.useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const blue = css`
    background-color: blue;
    color: white;
  `;

  return (
    <div>
      <h2>React</h2>
      <button css={blue} onClick={increment}>
        Increment
      </button>
      <button css={blue} onClick={decrement}>
        Decrement
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

const name = 'react-counter';
const component = createWebComponent(<Counter initialCount={10} />);

export { name, component };
