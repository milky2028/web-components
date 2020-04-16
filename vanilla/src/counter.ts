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

const component = class VanillaCounter extends HTMLElement {
  private count = 0;

  constructor() {
    // super instantiates the parent class
    super();
  }

  // web component methods akin to ngOnInit
  public connectedCallback() {
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
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(parentDiv);
  };

  private createListeners() {
    const inc = this.shadowRoot?.querySelector('#inc');
    inc?.addEventListener('click', () => this.increment());

    const dec = this.shadowRoot?.querySelector('#dec');
    dec?.addEventListener('click', () => this.decrement());
  }

  private updateCount = () => {
    const countEl = this.shadowRoot?.querySelector('#count');
    countEl!.textContent = `Count: ${this.getCount()}`;
  };
};

const name = 'vanilla-counter';

export { component, name };
