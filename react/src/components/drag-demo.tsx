import React from 'react';
import createWebComponent from '../createWebComponent';

class DragDemo extends React.Component<{ title?: string }> {
  render() {
    return <div>{this.props.title ?? 'Drag Demo'}</div>;
  }
}

const name = 'drag-demo';
const component = createWebComponent(<DragDemo />);

export { name, component };
