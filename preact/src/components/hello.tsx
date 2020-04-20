import { h, Component } from 'preact';
import createWebComponent from '../bootstrap';

class HelloClass extends Component<{ title: string }> {
  render() {
    return <div>{this.props.title}</div>;
  }
}

const name = 'hello-class';
const component = createWebComponent(<HelloClass title="Hello Class!" />);

export { name, component };
