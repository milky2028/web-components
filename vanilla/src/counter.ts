// a representation of a DOM element
interface VirtualNode {
  type: string; // HTML element type, 'div', 'p', etc.
  attributes?: Record<string, any>; // native HTML attributes
  children?: VirtualNode[];
}

// creating elements with innerHTML leaves you vulnerable to XSS attacks, so we must use appendChild
// this is essentially React's render function
// eventually you're going to need a function like this to make DOM manipulation simpler
// there are also some third party libraries that can do this, but this works fine
function createElement({ type, attributes, children = [] }: VirtualNode) {
  const el = document.createElement(type);
  Object.assign(el, attributes);
  for (const child of children) {
    el.appendChild(createElement(child));
  }

  return el;
}

export default class VanillaCounter extends HTMLElement {
  private count = 0;

  constructor() {
    // super instantiates the parent class
    super();

    // create DOM stuff on init
    this.createTemplate();
    this.createListeners();
  }

  // the component's public api
  public getCount = () => this.count;

  // the component's private api
  private increment = () => {
    this.count++;
    this.updateCount();
  };

  private decrement = () => {
    this.count--;
    this.updateCount();
  };

  private createTemplate = () => {
    // create child elements as VirtualNodes
    const incBtn = {
      type: 'button',
      attributes: { id: 'inc', textContent: 'Increment' }
    };
    const decBtn = {
      type: 'button',
      attributes: { id: 'dec', textContent: 'Decrement' }
    };
    const count = {
      type: 'p',
      attributes: { id: 'count', textContent: `Count: ${this.getCount()}` }
    };

    // create and append root element
    const parentDiv = createElement({
      type: 'div',
      children: [incBtn, decBtn, count]
    });

    // append root div to custom element itself
    this.appendChild(parentDiv);
  };

  private createListeners = () => {
    const inc = document.querySelector('#inc');
    inc?.addEventListener('click', () => this.increment());

    const dec = document.querySelector('#dec');
    dec?.addEventListener('click', () => this.decrement());
  };

  private updateCount = () => {
    const countEl = document.querySelector('#count');
    countEl!.textContent = `Count: ${this.getCount()}`;
  };
}

window.customElements.define('vanilla-counter', VanillaCounter);
