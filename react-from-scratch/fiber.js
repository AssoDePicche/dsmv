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

function lookForSibling(fiber) {
  if (!fiber) {
    return;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  return lookForSibling(fiber.parent);
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

  return lookForSibling(fiber);
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  reconcileChildren(fiber, fiber.props.children)
}

const fiberC = { type: 'C', props: {} };

const fiberB = { type: 'B', props: {}, child: fiberC };

const fiberD = { type: 'D', props: {} };

const fiberA = { type: 'A', props: {}, child: fiberB };

fiberC.parent = fiberB;

fiberB.parent = fiberA;

fiberD.parent = fiberA;

fiberB.sibling = fiberD;

const originalUpdateHost = updateHostComponent;

updateHostComponent = (fiber) => console.log('Visiting node:', fiber.type); 

console.log('--- Starting Fiber Traversal Test ---');

let nextUnit = fiberA;

while (nextUnit) {
  nextUnit = performUnitOfWork(nextUnit);
}
console.log('--- Traversal Finished ---');

updateHostComponent = originalUpdateHost;
