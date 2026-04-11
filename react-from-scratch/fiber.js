class Fiber {
  constructor(type, props, parentFiber, sibling) {
    this.type = type;

    this.props = props;

    if (parentFiber) {
      this.parentFiber = parentFiber;

      parentFiber.child = this;
    }

    this.sibling = sibling;
  }

  static createRoot(type, props) {
    return new Fiber(type, props, null, null);
  }
}

class FiberScheduler {
  execute(fiberTreeRoot) {
    const originalUpdateHost = updateHostComponent;

    updateHostComponent = (fiber) => console.log('Visiting node:', fiber.type); 

    console.log('--- Starting Fiber Traversal Test ---');

    let nextUnit = fiberTreeRoot;

    while (nextUnit) {
      nextUnit = performUnitOfWork(nextUnit);
    }

    console.log('--- Traversal Finished ---');

    updateHostComponent = originalUpdateHost;
  }
}

let nextUnitOfWork = null

let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type)

  updateDom(dom, {}, fiber.props)

  return dom
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child;
  }

  for (let currentFiber = fiber; currentFiber; currentFiber = currentFiber.parentFiber) {
    if (currentFiber.sibling) {
      return currentFiber.sibling;
    }
  } 
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  reconcileChildren(fiber, fiber.props.children)
}

const fiberA = Fiber.createRoot('A', {});

const fiberD = new Fiber('D', {}, fiberA, null);

const fiberB = new Fiber('B', {}, fiberA, fiberD);

const fiberC = new Fiber('C', {}, fiberB, null);

const scheduler = new FiberScheduler();

scheduler.execute(fiberA);
