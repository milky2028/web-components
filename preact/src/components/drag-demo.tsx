import { h, Component } from 'preact';
import createWebComponent from '../bootstrap';

class DragDemo extends Component<{ title?: string }> {
  render() {
    return <div>{this.props.title ?? 'Drag Demo'}</div>;
  }
}

const name = 'drag-demo';
const component = createWebComponent(<DragDemo />);

export { name, component };
