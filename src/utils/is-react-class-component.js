//This function aims to test if a component is a

// is a component a react class.
export const isReactClassComponent = ComponentToTest => {
    const prototype = ComponentToTest.prototype;
    if (!prototype) {
        return false;
    }
    return typeof prototype.render === 'function';
};

export const addRefToPropsIfNotPure = (Component, props, ref) => (isReactClassComponent(Component) ? {...props, ref} : props);


export const LIST = 'list';
export const LINE = 'line';
export const INPUT = 'input';
export const DISPLAY = 'display';
