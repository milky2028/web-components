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
