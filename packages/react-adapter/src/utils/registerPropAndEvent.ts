const listenedEvents = new WeakMap<Element, Map<string, EventListenerObject>>();
type THandleEvent = (e?: Event) => void;

type TRegisterEvent<E> = {
  node: E;
  nameProp: string;
  valueProp: unknown;
  prevValueProp: unknown;
  event: string;
};

const ensureEventMapForNode = (
  node: Element,
): Map<string, EventListenerObject> => {
  let events = listenedEvents.get(node);
  if (events === undefined) {
    events = new Map();
    listenedEvents.set(node, events);
  }
  return events;
};

export const registerPropAndEvent = <E extends Element>({
  node,
  nameProp,
  valueProp,
  prevValueProp,
  event,
}: TRegisterEvent<E>) => {
  // Subscribe to the event if it is defined
  if (event !== undefined) {
    if (valueProp !== prevValueProp) {
      const events = ensureEventMapForNode(node);
      const handlerExists = events.has(event);
      let handler = events.get(event) as EventListenerObject;

      if (valueProp !== undefined) {
        if (!handlerExists) {
          handler = { handleEvent: valueProp as THandleEvent };
          events.set(event, handler);
          // @ts-expect-error
          node.addEventListener(event, (event: CustomEvent) =>
            handler.handleEvent(event.detail),
          );
        } else {
          handler.handleEvent = valueProp as THandleEvent;
        }
      } else if (handlerExists) {
        events.delete(event);
        node.removeEventListener(event, handler);
      }
    }
    return;
  }

  node[nameProp as keyof E] = valueProp as E[keyof E];

  if (
    (valueProp === undefined || valueProp === null) &&
    nameProp in HTMLElement.prototype
  ) {
    node.removeAttribute(nameProp);
  }
};
