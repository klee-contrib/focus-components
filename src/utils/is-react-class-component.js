//This function aims to test if a component is a
const isReactClassComponent = ComponentToTest => {
 const prototype = ComponentToTest.prototype;
  if (!prototype) {
    return false;
  }
  return typeof prototype.render === 'function';
}
export default isReactClassComponent;
