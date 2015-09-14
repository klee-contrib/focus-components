# Checklist for a clean component
- Identify whether your component is **dumb** (does not have state) or **smart** (uses store to manage its state)
- Write the component as a `class` extending `React.Component`.
```javascript
class MyComponent extends React.Component {
    render() {
        //my render
    }
}
```
- Validate all props staticaly with `Focus.component.types`.
```javascript
class MyComponent extends React.Component {
    render() {
        //my render
    }
}
MyComponent.propTypes = {
    prop1: types('string'),
    //...
}
```
- Set default props staticaly.
```javascript
class MyComponent extends React.Component {
    render() {
        //my render
    }
}
MyComponent.propTypes = {
    prop1: types('string'),
    //...
}
MyComponent.defaultProps = {
    prop1: 'default prop 1',
    //...
}
```
- If you need to use a mixin, migrate to the decorator pattern :
```javascript
const MyDecorator = Component => class extends React.Component {
    // Any logic you want
    render() {
        return <Component {'whatever you want to pass as a prop'}/>;
    }
}
@MyDecorator
class MyComponent extends React.Component {
    render() {
        //my render
    }
}
export default MyComponent;
```
- **Unit test everything**. Use Mocha and Chai for this.
- Add a `package.json` in your component's root folder, with `npm init`.
- Write a test in `test/index.js`, as follows :
```javascript
const MyComponent = FocusComponents.path.to.my.component;
// Any logic you want
return <MyComponent {'any props you want'}/>;
```
