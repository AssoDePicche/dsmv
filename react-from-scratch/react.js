export class React {
  static createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => typeof child === 'object' ? child : React.createTextElement(child))
      },
    };
  }

  static createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: [],
      },
    };
  }

  static render(element, container) {
    const node = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);

    if (element.type === 'TEXT_ELEMENT') {
      node.textContent = element.props.nodeValue;
    }

    if (element.type !== 'TEXT_ELEMENT') {
      for (const [key, value] of Object.entries(element.props)) {
        if (key === 'children') {
          continue;
        }

        node.setAttribute(key, value);
      }
    }

    if (element.props.children) {
      element.props.children.forEach((child) => React.render(child, node));
    }

    container.append(node);
  }
}
