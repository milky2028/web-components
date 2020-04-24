# web-components

### Popularity of Some Common Web Components Solutions

| Framework/Tool              | Weekly NPM Downloads |
| --------------------------- | -------------------- |
| @vue/web-components-wrapper | 470,000              |
| lit-html                    | 108,000              |
| @angular/elements           | 58,000               |
| @stencil/core               | 23,000               |
| skate-js                    | 12,000               |
| lwc                         | 3,000                |

The packages below are not web components tools per se, but just JavaScript tools in general, so they're not really applicable to the table above. I'm inlcuding their popularity since I used them in this process.

| Framework/Tool | Weekly NPM Downloads |
| -------------- | -------------------- |
| react          | 8,402,000            |
| rollup         | 1,800,000            |
| vue            | 1,600,000            |
| preact         | 279,000              |
| ngx-build-plus | 29,000               |

### Counter Component Size Comparisons

These comparisons aren't perfect since the code isn't _exactly_ the same, but the differences aren't enough to make it matter anyways. All sizes are minified.

| Framework/Tool | Size   | GZipped Size |
| -------------- | ------ | ------------ |
| vanilla js/ts  | 1.2kb  | 539b         |
| preact         | 10.3kb | 4.4kb        |
| **stencil**    | 12.4kb | 5.95kb       |
| vue            | 73kb   | 27.1kb       |
| react          | 127kb  | 40.4kb       |
| angular        | 160kb  | 53.2kb       |

## React

React uses a virtual DOM to create a virtual representation of the DOM, then that diffs that with actual DOM. It updates the actual DOM with any changes. This offers a great developer experience, but it can be costly, performance-wise. React tends to focus on perceptive speed more than actual speed.

Pros

- React might just be most popular libary on NPM. Help is easy to find and the ecosystem is vast.

- Single file components. HTML, CSS, and JavaScript are used with few boundaries between them in React. React uses JSX, a custom extension of JavaScript that's now basically everywhere.

JSX Example

```javascript
const aDiv = <div>Some div content</div>;
```

- Great TypeScript support.

Draw

- Custom build process. React does not formally support web components, beyond the fact that you can attach React to any DOM node. This requires a custom build process, which I did with Rollup. The Angular library itself and many other popular packages are built with Rollup. Rollup is extremely easy to use and customize, as compared to Webpack. A custom build process offers infinite customizability, but must be maintained, so this can be seen as both a pro and a con. A custom build process is a project that can never die or go into maintenance since we maintain it, and it does exactly what we want.

- Supported by Facebook. This is a draw because large corporate support seems like a pro as first glance, until you realize that large companies can more readily make sweeping changes on a dime that can compromise a project's viability. For examples, see React's licensing crisis or the fallout from Angular 1 moving to TypeScript in Angular 2.

- No built-in testing support, but the React community has basically solved this problem.

Cons

- Unfamiliar. New syntax would have to be learned and new methodogies understood.

- Gzipped size is too large. File size in scripts is more costly than other file sizes on the web, as scripts must be downloaded, parsed, optimized, and executed. The minimium gzipped size would be required every time the component boots up on a new page.

CSS in JS Example

```javascript
const blue = {
  backgroundColor: 'blue',
  color: 'white'
};
```

- CSS in JS. React natively supports CSS via CSS in JS, as well as through traditional CSS files. Since we need to bundle and ship as a single JS file, traditional CSS isn't possible. CSS in JS has its perks, but it's not performant since it involves diffing a large string of styles and things that used to be simple in CSS, like hover states, all of the sudden get very complicated, requiring onmouseover event handlers. React's own website does not recommend useing plain CSS in JS/ The React community has created performant solutions with a great developer experience to these problems, but getting these solutions to work inside shadow DOM is verrrrrrrrry complicated. I spent about two days trying to get this to work consistently with a library called Emotion, but I could not.

## Preact

Preact's motto is basically, "React, but smaller," so it shares many of the same trade-offs as React.

Pros

- Just look for help with React and that usually applies to Preact.

- Single file components.

Preact Component Example

```tsx
import { h } from 'preact';
import { useState } from 'preact/hooks';

// with React/Preact and Hooks, we can create components with functions
function Counter({ initialCount = 0 }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const blueBtn = {
    backgroundColor: 'blue',
    color: 'white'
  };

  // jsx
  return (
    <div>
      <h2>Preact</h2>
      <button style={blueBtn} onClick={increment}>
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </div>
  );
}
```

- Great TypeScript support.

- Extremely small file size.

Draw

- Custom build process required.

- Not supported by a large company.

- No built-in testing support, but the community has basically solved this problem.

Cons

- Unfamiliar.

- CSS in JS.

## Vue

Vue uses a virtual DOM similar to React/Preact, but its implementation can be faster since it knows some DOM nodes will not change, whereas React has to consider the entire vdom as changeable.

Pros

- Popular. Vue is the most popular web components solution I looked at.

- Vue has native support for compiling an entire library to web components with a single command.

- Built-in testing support.

- Single file components.

Vue Component Example

```html
<template>
  <div>
    <h2>Vue</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style lang="scss" scoped>
  button {
    background-color: blueviolet;
    color: white;
  }
</style>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        count: 0
      };
    },
    methods: {
      increment() {
        this.count++;
      },
      decrement() {
        this.count--;
      }
    }
  });
</script>
```

- Easy to learn.

- Flexibile. Vue supports Angular-like templates, as well as React-like JSX components.

Draw

- Vue's file size isn't the smallest, but it also isn't the biggest.

- Not supported by a large company, but the people who make Vue are formal Googlers and make their entire living from Vue.

Cons

- Is @vue/web-components-wrapper dead? It hasn't seen any updates in 2 years, despite its popularity. Not a good sign.

- Unfamiliar.

- Vue 2 has bad TypeScript support. This is fixed in Vue 3 (currently in beta). There's a plugin, @vue/composition-api, that remedies this for Vue 2, but in my testing, this did not work with the vue web components wrapper.

## Vanilla TS/JS

I used Rollup to compile a simple vanilla JS web component from TypeScript and it was relatively easy.

Pros

- Extremely small file size.

- Uses native browser APIs. These APIs are well-supported these days and will not go into maintenance mode or something similar.

- Traditional DOM apis have been around for 20+ years. Help is easy to find, though sometimes answers are outdated.

- Single file components.

- Great TypeScript support.

Draw

- Custom build process.

Cons

- Traditional DOM methods require the developer to write alot of code. I don't mind them that much, but your mileage may vary. Even in writing this example, I had to start to define some helper methods so I didn't keep repeating myself. It should also be noted though that web components in general will require more familiarity with native DOM methods. Even Angular's examples rely on traditional DOM methods.

## Angular

Unlike the other frameworks on this list, Angular does not use a virtual DOM, but instead adds watchers to values in the DOM that may change and watches those values for changes.

Pros

- Familar. We already use it.

- Great TypeScript support.

Draw

- Backed by Google.

Cons

- Gzipped file size too large.

- Custom build process. This one is in the cons section this time because third-party libraries are required on top of the already rigid Angular build process. With Preact, React, and a Vanilla JS/TS at least we get the benefits of being able to change any part of the process. With Angular, we just sort of get what we get and we still have to rely on third-party libraries.

- No single file components. I think this is a con, but other people may not care.

## Stencil

Stencil is a compiler, rather than a runtime framework that compiles directly to standards-compliant web components. Stencil uses a virtual dom to diff and make changes to the dom itself. I'll just say in general that I think this is project we should use.

Pros

- Small file size. Stencil has a runtime that it is packaged with, but it's not very big.

- Native TypeScript support.

- Built-in docs solution. This is a cool one.

- Built-in testing infrastructure.

- Natively supports lazy-loading components.

- Natively compiles to web components.

Draw

- Familiarity. Stencil components tend to look a little bit like a mix of React, Angular, and Vue. Stencil uses JSX, similar to React, but it also heavily leaves into TypeScript decorators, similar to Angular.

Stencil Component Example

```tsx
import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-counter',
  styleUrl: 'stencil-counter.css',
  shadow: true
})
export class StencilCounter {
  @Prop() count = 0;

  private increment = () => this.count++;
  private decrement = () => this.count--;

  render() {
    // jsx
    return (
      <Host>
        <div>
          <h2>Stencil</h2>
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <p>Count: {this.count}</p>
        </div>
      </Host>
    );
  }
}
```

- Supported by Ionic.

- CSS is packaged in seperate files, so files can be singularly distributed as one JavaScript file, but css is written in different files. So not written as file, but distributed as single file.

Cons

- Not super popular.

## Some other solutions I looked at, but did not fully consider

Polymer

I've used Polymer in the past, but I didn't love it. In V3, they've since moved to LitElement to create web components. Google supports it heavily. Might be worth a second look, but this project is semi-dead.

Lightning Web Components

Web Components library created by Salesforce. Didn't seem to be super popular.

Skate JS

Also didn't seem to be super popular.
