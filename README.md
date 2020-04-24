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

### Counter Component Size Comparisons

These comparisons aren't perfect since the code isn't _exactly_ the same, but the difference aren't enough to make it matter anyways. All sizes are minified.

| Framework/Tool | Size   | GZipped Size |
| -------------- | ------ | ------------ |
| vanilla js     | 1.2kb  | 539b         |
| preact         | 10.3kb | 4.4kb        |
| **stencil**    | 12.4kb | 5.95kb       |
| vue            | 73kb   | 27.1kb       |
| react          | 127kb  | 40.4kb       |
| angular        | 160kb  | 53.2kb       |

## React

React uses a virtual DOM to create a virtual representation of the DOM, then that diffs that with actual DOM. It updates the actual DOM with any changes. This offers a great developer experience, but it can be costly, performance-wise.

Pros

- React might just be most popular libary on NPM. Help is easy to find and the ecosystem is vast.

- Single file components. HTML, CSS, and JavaScript are used with few boundaries between them in React.

- Great TypeScript support.

Draw

- Custom build process. React does not formally support web components, beyond the fact that you can attach React to any DOM node. This requires a custom build process, which I did with Rollup. The Angular library itself and many other popular packages are built with Rollup. Rollup is extremely easy to use compared to Webpack. A custom build process offers infinite customizability, but must be maintained, so this can be seen as both a pro and a con. A custom build process is a project that can never die or go into maintenance since we maintain it.

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

- CSS in JS. React natively supports CSS via CSS in JS, as well as through traditional CSS files. Since we need to bundle and ship as a single JS file, traditional CSS isn't possible. CSS in JS has its perks, but it's not performant since it involves diffing a large string of styles and things that used to be simple in CSS, like hover states, all of the sudden get very complicated, requiring onmouseover event handlers. The React community has created performant solutions with a great developer experience to these problems, but getting these solutions to work inside shadow DOM is verrrrrrrrry complicated. I spent about two days trying to get this to work consistently, but I could not.

## Preact

Preact's motto is basically, "React, but smaller," so it shares many of the same trade-offs as React.

Pros

- Just look for help with React and that usually applies to Preact.

- Single file components.

- Great TypeScript support.

- Extremely small file size.

Draw

- Custom build process required.

Cons

- Unfamiliar.

- CSS in JS.

## Vue

Vue uses a virtual DOM similar to React/Preact, but its implementation can be faster since it knows some DOM nodes will not change, whereas React has to consider the entire vdom as changeable.

Pros

- Popular. Vue is the most popular web components solution I looked at.

- Vue has native support for compiling an entire library to web components with a single command.

- Single file components.

- Easy to learn.

- Flexibile. Vue supports Angular-like templates, as well as React-like JSX components.

Draw

- Vue's file small isn't the smallest, but it also isn't the biggest.

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

Pros

- Familar. We already use it.

- Great TypeScript support.

Cons

- Gzipped file size too large.

- Custom build process. This one is in the cons section this time because third-party libraries are required on top of the already rigid Angular build process. With Preact, React, and a Vanilla JS/TS at least we get the benefits of being able to change any part of the process. With Angular, we just sort of get what we get and we still have to rely on third-party libraries.

- No single file components. I think this is a con, but other people may not care.
