/** @jsx jsx */
import { useState } from 'react';
import { createWebComponent } from '../createWebComponent';
import { css, jsx, CacheProvider } from '@emotion/core';
import { shadowCache } from '../styleCache';

// with React/Preact and Hooks, we can create components with functions
function Counter({ initialCount = 0 }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // styles using emotion css
  const blue = css`
    background-color: blue;
    color: white;
    &:hover {
      color: orange;
    }
  `;

  // CacheProvider is the container for emotion's styles
  return (
    <CacheProvider value={shadowCache}>
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
    </CacheProvider>
  );
}

const name = 'react-counter';
const component = createWebComponent(<Counter initialCount={10} />);

export { name, component };
