
export default function deprecated(message) {
    // Return a wrapper function around the component
    return function deprecatedDecorator(Component, methodName, propertyDescriptor) {
        const originalFunction = propertyDescriptor.value;
        propertyDescriptor.value = function redefinedFunction(args) {
            console.warn(`[DEPRECATED] Method ${methodName} on component ${Component.constructor.name} is deprecated - ${message}`);
            return originalFunction.call(this,args);
        }
    };
}
