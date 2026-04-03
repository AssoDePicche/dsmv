class ReactNode {
  constructor(type, props) {
    this.type = type;

    this.props = props;

    if (type === 'TEXT_ELEMENT' && !props.nodeValue) {
      throw new Error('Missing Node Value in Text Element');
    }

    if (type === 'TEXT_ELEMENT' && props.children) {
      throw new Error('Text Element Cannot Have Children');
    }
  }

  createDOMNode() {
    if (this.type === 'TEXT_ELEMENT') {
      return document.createTextNode(this.props.nodeValue);
    }

    const node = document.createElement(this.type);

    for (const [key, value] of Object.entries(this.props)) {
      if (key === 'children') {
        continue;
      }

      node.setAttribute(key, value);
    }

    return node;
  }

  static createTextElement(text) {
    if (typeof text !== 'string') {
      throw new Error(`${JSON.stringify(text)} is not a string`);
    }

    return new ReactNode('TEXT_ELEMENT', {
      nodeValue: text,
    });
  }
}

export class React {
  static createNode(type, props, ...children) {
    return new ReactNode(type, {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : ReactNode.createTextElement(child)),
    });
  }

  static render(element, container) {
    const node = element.createDOMNode();

    if (element.props.children) {
      element.props.children.forEach((child) => React.render(child, node));
    }

    container.append(node);
  }
}
