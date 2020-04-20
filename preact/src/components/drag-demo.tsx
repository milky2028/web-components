import { h } from 'preact';
import createWebComponent from '../bootstrap';

function DragDemo() {
  return <div>Hello from drag demo</div>;
}

const { name, component } = createWebComponent('drag-demo', DragDemo());

export { name, component };
