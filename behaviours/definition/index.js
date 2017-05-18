'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //Dependencies


// Import from focus-core
// We need to investigate why import {getEntityInformations} from 'focus-core/entity/builder' didn't work, maybe an ES2015 related issue with babel.
// Maybe because the node modules reads from the builded lib  instead of src.


exports.default = definitionBehaviour;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lang = require('lodash/lang');

var _definition = require('focus-core/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var getEntityInformations = _definition2.default.entity.builder.getEntityInformations;

/**
 * This function is a behaviour. It aims to comment a component to a definition.
 *  - A definition is related to the data model
 *  - Each field of the domain have a definition which contains its domain and the fact that it is required ot not.
 *  - The definitions of your application should have been set using `focus-core/definition/entity/container/setEntityConfiguration`
 * @param  {string | array} definitionPath - A string or an array of the definition path to the configuration.
 * @param  {object} additionalDefinition - If you need to override a definition for a specific component, you can use this object.
 * @return {function} - A function to commect a component to a definition.
 * @example please read the end of the file.
 */
function definitionBehaviour(definitionPath, additionalDefinition) {

    // Arguments validation
    if ((0, _lang.isUndefined)(definitionPath) || (0, _lang.isNull)(definitionPath) || !(0, _lang.isString)(definitionPath) && !(0, _lang.isArray)(definitionPath)) {
        throw new Error('the definition path should be givent in order to to know the domain of your entity property.');
    }
    if (!(0, _lang.isUndefined)(additionalDefinition) && !(0, _lang.isNull)(additionalDefinition) && !isObject(additionalDefinition)) {
        throw new Error('The additional definition if is defined should be an object');
    }

    // Definition Construction
    var definitionConf = (0, _lang.isArray)(definitionPath) ? definitionPath : [definitionPath];
    var definition = definitionConf.reduce(function (valeurPrecedente, valeurCourante) {
        return _extends({}, valeurPrecedente, getEntityInformations(definitionPath, additionalDefinition));
    }, {});

    // annotation
    // The wrapped component should have a props containing the definition object.
    return function wrapComponentWithDefinition(ComponentToWrap) {

        // Save the display name for later
        var displayName = ComponentToWrap.displayName || 'Component';

        // TODO: @reviewer
        // It could have been nice to have a pure function for this.
        // Except for the tests, do we need a React.Component class and a ref.
        // I think it is safer to have it instead of a pure function.
        // Maybe we should have a look on `ownPropertyDescriptor` instead of wrapping class aruoud component for this case.
        // But having everything as props is really clean.

        // # Wrapped component
        //        function DefinitionWrappedComponent(props) {
        //            return <ComponentToWrap definition={definition} {...props}/>;
        //        }

        /**
         * This class stands for the wrapped component with its props plus the definition object as props.
         * It has a reference to the wrapped component in `this.refs.wrappedComponent`
         */

        var DefinitionWrappedComponent = function (_Component) {
            _inherits(DefinitionWrappedComponent, _Component);

            function DefinitionWrappedComponent() {
                _classCallCheck(this, DefinitionWrappedComponent);

                return _possibleConstructorReturn(this, _Component.apply(this, arguments));
            }

            DefinitionWrappedComponent.prototype.render = function render() {
                return _react2.default.createElement(ComponentToWrap, _extends({ ref: 'wrappedComponent', definition: definition }, this.props));
            };

            return DefinitionWrappedComponent;
        }(_react.Component);

        // Add with definition to the name of the component.


        DefinitionWrappedComponent.displayName = displayName + 'WithDefinition';

        return DefinitionWrappedComponent;
    };
}

/*
 Example
// ES6

class MyComponent{
    render(){
      return <div>{JSON.stringify(this.props)}</div>;

    }
}
// The annotation is just a function, you compose your component with a definition builder.
const MyComponentWithDefinition = definition('path.to.my.awesome.entity')(MyComponent);

 // ES7

@definition('path.to.my.awesome.entity')
class MyComponent{
    render(){
      return <div>{JSON.stringify(this.props)}</div>;

    }
}

*/

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZpbml0aW9uQmVoYXZpb3VyIiwiZ2V0RW50aXR5SW5mb3JtYXRpb25zIiwiZW50aXR5IiwiYnVpbGRlciIsImRlZmluaXRpb25QYXRoIiwiYWRkaXRpb25hbERlZmluaXRpb24iLCJFcnJvciIsImlzT2JqZWN0IiwiZGVmaW5pdGlvbkNvbmYiLCJkZWZpbml0aW9uIiwicmVkdWNlIiwidmFsZXVyUHJlY2VkZW50ZSIsInZhbGV1ckNvdXJhbnRlIiwid3JhcENvbXBvbmVudFdpdGhEZWZpbml0aW9uIiwiQ29tcG9uZW50VG9XcmFwIiwiZGlzcGxheU5hbWUiLCJEZWZpbml0aW9uV3JhcHBlZENvbXBvbmVudCIsInJlbmRlciIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a1FBQUE7OztBQUlBO0FBQ0E7QUFDQTs7O2tCQWV3QkEsbUI7O0FBcEJ4Qjs7OztBQUNBOztBQUtBOzs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1DLHdCQUF3QixxQkFBV0MsTUFBWCxDQUFrQkMsT0FBbEIsQ0FBMEJGLHFCQUF4RDs7QUFHQTs7Ozs7Ozs7OztBQVVlLFNBQVNELG1CQUFULENBQTZCSSxjQUE3QixFQUE2Q0Msb0JBQTdDLEVBQW1FOztBQUU5RTtBQUNBLFFBQUcsdUJBQVlELGNBQVosS0FBK0Isa0JBQU9BLGNBQVAsQ0FBL0IsSUFBeUQsQ0FBQyxvQkFBU0EsY0FBVCxDQUFELElBQTZCLENBQUMsbUJBQVFBLGNBQVIsQ0FBMUYsRUFBb0g7QUFDaEgsY0FBTSxJQUFJRSxLQUFKLENBQVUsOEZBQVYsQ0FBTjtBQUNIO0FBQ0QsUUFBRyxDQUFDLHVCQUFZRCxvQkFBWixDQUFELElBQXNDLENBQUMsa0JBQU9BLG9CQUFQLENBQXZDLElBQXVFLENBQUNFLFNBQVNGLG9CQUFULENBQTNFLEVBQTJHO0FBQ3ZHLGNBQU0sSUFBSUMsS0FBSixDQUFVLDZEQUFWLENBQU47QUFDSDs7QUFFRDtBQUNBLFFBQU1FLGlCQUFpQixtQkFBUUosY0FBUixJQUEwQkEsY0FBMUIsR0FBMkMsQ0FBQ0EsY0FBRCxDQUFsRTtBQUNBLFFBQU1LLGFBQWFELGVBQWVFLE1BQWYsQ0FBc0IsVUFBQ0MsZ0JBQUQsRUFBbUJDLGNBQW5CO0FBQUEsNEJBQTJDRCxnQkFBM0MsRUFBZ0VWLHNCQUFzQkcsY0FBdEIsRUFBc0NDLG9CQUF0QyxDQUFoRTtBQUFBLEtBQXRCLEVBQXFKLEVBQXJKLENBQW5COztBQUVBO0FBQ0E7QUFDQSxXQUFPLFNBQVNRLDJCQUFULENBQXFDQyxlQUFyQyxFQUFzRDs7QUFFekQ7QUFDQSxZQUFNQyxjQUFjRCxnQkFBZ0JDLFdBQWhCLElBQStCLFdBQW5EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7QUFqQnlELFlBcUJuREMsMEJBckJtRDtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQSxpREFzQnJEQyxNQXRCcUQscUJBc0I1QztBQUNMLHVCQUFPLDhCQUFDLGVBQUQsYUFBaUIsS0FBSSxrQkFBckIsRUFBd0MsWUFBWVIsVUFBcEQsSUFBb0UsS0FBS1MsS0FBekUsRUFBUDtBQUNILGFBeEJvRDs7QUFBQTtBQUFBOztBQTJCekQ7OztBQUNBRixtQ0FBMkJELFdBQTNCLEdBQTRDQSxXQUE1Qzs7QUFFQSxlQUFPQywwQkFBUDtBQUNILEtBL0JEO0FBZ0NIOztBQUVEIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7aXNOdWxsLCBpc1VuZGVmaW5lZCwgaXNBcnJheSwgaXNTdHJpbmd9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuXHJcbi8vIEltcG9ydCBmcm9tIGZvY3VzLWNvcmVcclxuLy8gV2UgbmVlZCB0byBpbnZlc3RpZ2F0ZSB3aHkgaW1wb3J0IHtnZXRFbnRpdHlJbmZvcm1hdGlvbnN9IGZyb20gJ2ZvY3VzLWNvcmUvZW50aXR5L2J1aWxkZXInIGRpZG4ndCB3b3JrLCBtYXliZSBhbiBFUzIwMTUgcmVsYXRlZCBpc3N1ZSB3aXRoIGJhYmVsLlxyXG4vLyBNYXliZSBiZWNhdXNlIHRoZSBub2RlIG1vZHVsZXMgcmVhZHMgZnJvbSB0aGUgYnVpbGRlZCBsaWIgIGluc3RlYWQgb2Ygc3JjLlxyXG5pbXBvcnQgZGVmaW5pdGlvbiBmcm9tICdmb2N1cy1jb3JlL2RlZmluaXRpb24nO1xyXG5jb25zdCBnZXRFbnRpdHlJbmZvcm1hdGlvbnMgPSBkZWZpbml0aW9uLmVudGl0eS5idWlsZGVyLmdldEVudGl0eUluZm9ybWF0aW9ucztcclxuXHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiBpcyBhIGJlaGF2aW91ci4gSXQgYWltcyB0byBjb21tZW50IGEgY29tcG9uZW50IHRvIGEgZGVmaW5pdGlvbi5cclxuICogIC0gQSBkZWZpbml0aW9uIGlzIHJlbGF0ZWQgdG8gdGhlIGRhdGEgbW9kZWxcclxuICogIC0gRWFjaCBmaWVsZCBvZiB0aGUgZG9tYWluIGhhdmUgYSBkZWZpbml0aW9uIHdoaWNoIGNvbnRhaW5zIGl0cyBkb21haW4gYW5kIHRoZSBmYWN0IHRoYXQgaXQgaXMgcmVxdWlyZWQgb3Qgbm90LlxyXG4gKiAgLSBUaGUgZGVmaW5pdGlvbnMgb2YgeW91ciBhcHBsaWNhdGlvbiBzaG91bGQgaGF2ZSBiZWVuIHNldCB1c2luZyBgZm9jdXMtY29yZS9kZWZpbml0aW9uL2VudGl0eS9jb250YWluZXIvc2V0RW50aXR5Q29uZmlndXJhdGlvbmBcclxuICogQHBhcmFtICB7c3RyaW5nIHwgYXJyYXl9IGRlZmluaXRpb25QYXRoIC0gQSBzdHJpbmcgb3IgYW4gYXJyYXkgb2YgdGhlIGRlZmluaXRpb24gcGF0aCB0byB0aGUgY29uZmlndXJhdGlvbi5cclxuICogQHBhcmFtICB7b2JqZWN0fSBhZGRpdGlvbmFsRGVmaW5pdGlvbiAtIElmIHlvdSBuZWVkIHRvIG92ZXJyaWRlIGEgZGVmaW5pdGlvbiBmb3IgYSBzcGVjaWZpYyBjb21wb25lbnQsIHlvdSBjYW4gdXNlIHRoaXMgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBBIGZ1bmN0aW9uIHRvIGNvbW1lY3QgYSBjb21wb25lbnQgdG8gYSBkZWZpbml0aW9uLlxyXG4gKiBAZXhhbXBsZSBwbGVhc2UgcmVhZCB0aGUgZW5kIG9mIHRoZSBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5pdGlvbkJlaGF2aW91cihkZWZpbml0aW9uUGF0aCwgYWRkaXRpb25hbERlZmluaXRpb24pIHtcclxuXHJcbiAgICAvLyBBcmd1bWVudHMgdmFsaWRhdGlvblxyXG4gICAgaWYoaXNVbmRlZmluZWQoZGVmaW5pdGlvblBhdGgpIHx8IGlzTnVsbChkZWZpbml0aW9uUGF0aCl8fCAoIWlzU3RyaW5nKGRlZmluaXRpb25QYXRoKSAmJiAhaXNBcnJheShkZWZpbml0aW9uUGF0aCkpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgZGVmaW5pdGlvbiBwYXRoIHNob3VsZCBiZSBnaXZlbnQgaW4gb3JkZXIgdG8gdG8ga25vdyB0aGUgZG9tYWluIG9mIHlvdXIgZW50aXR5IHByb3BlcnR5LicpO1xyXG4gICAgfVxyXG4gICAgaWYoIWlzVW5kZWZpbmVkKGFkZGl0aW9uYWxEZWZpbml0aW9uKSAmJiAhaXNOdWxsKGFkZGl0aW9uYWxEZWZpbml0aW9uKSAmJiAhaXNPYmplY3QoYWRkaXRpb25hbERlZmluaXRpb24pKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYWRkaXRpb25hbCBkZWZpbml0aW9uIGlmIGlzIGRlZmluZWQgc2hvdWxkIGJlIGFuIG9iamVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluaXRpb24gQ29uc3RydWN0aW9uXHJcbiAgICBjb25zdCBkZWZpbml0aW9uQ29uZiA9IGlzQXJyYXkoZGVmaW5pdGlvblBhdGgpID8gZGVmaW5pdGlvblBhdGggOiBbZGVmaW5pdGlvblBhdGhdO1xyXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGRlZmluaXRpb25Db25mLnJlZHVjZSgodmFsZXVyUHJlY2VkZW50ZSwgdmFsZXVyQ291cmFudGUpID0+ICh7Li4udmFsZXVyUHJlY2VkZW50ZSwgLi4uZ2V0RW50aXR5SW5mb3JtYXRpb25zKGRlZmluaXRpb25QYXRoLCBhZGRpdGlvbmFsRGVmaW5pdGlvbil9KSwge30pO1xyXG5cclxuICAgIC8vIGFubm90YXRpb25cclxuICAgIC8vIFRoZSB3cmFwcGVkIGNvbXBvbmVudCBzaG91bGQgaGF2ZSBhIHByb3BzIGNvbnRhaW5pbmcgdGhlIGRlZmluaXRpb24gb2JqZWN0LlxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBDb21wb25lbnRXaXRoRGVmaW5pdGlvbihDb21wb25lbnRUb1dyYXApIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgZGlzcGxheSBuYW1lIGZvciBsYXRlclxyXG4gICAgICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gQ29tcG9uZW50VG9XcmFwLmRpc3BsYXlOYW1lIHx8ICdDb21wb25lbnQnO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBAcmV2aWV3ZXJcclxuICAgICAgICAvLyBJdCBjb3VsZCBoYXZlIGJlZW4gbmljZSB0byBoYXZlIGEgcHVyZSBmdW5jdGlvbiBmb3IgdGhpcy5cclxuICAgICAgICAvLyBFeGNlcHQgZm9yIHRoZSB0ZXN0cywgZG8gd2UgbmVlZCBhIFJlYWN0LkNvbXBvbmVudCBjbGFzcyBhbmQgYSByZWYuXHJcbiAgICAgICAgLy8gSSB0aGluayBpdCBpcyBzYWZlciB0byBoYXZlIGl0IGluc3RlYWQgb2YgYSBwdXJlIGZ1bmN0aW9uLlxyXG4gICAgICAgIC8vIE1heWJlIHdlIHNob3VsZCBoYXZlIGEgbG9vayBvbiBgb3duUHJvcGVydHlEZXNjcmlwdG9yYCBpbnN0ZWFkIG9mIHdyYXBwaW5nIGNsYXNzIGFydW91ZCBjb21wb25lbnQgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAvLyBCdXQgaGF2aW5nIGV2ZXJ5dGhpbmcgYXMgcHJvcHMgaXMgcmVhbGx5IGNsZWFuLlxyXG5cclxuICAgICAgICAvLyAjIFdyYXBwZWQgY29tcG9uZW50XHJcbiAgICAgICAgLy8gICAgICAgIGZ1bmN0aW9uIERlZmluaXRpb25XcmFwcGVkQ29tcG9uZW50KHByb3BzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gPENvbXBvbmVudFRvV3JhcCBkZWZpbml0aW9uPXtkZWZpbml0aW9ufSB7Li4ucHJvcHN9Lz47XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBjbGFzcyBzdGFuZHMgZm9yIHRoZSB3cmFwcGVkIGNvbXBvbmVudCB3aXRoIGl0cyBwcm9wcyBwbHVzIHRoZSBkZWZpbml0aW9uIG9iamVjdCBhcyBwcm9wcy5cclxuICAgICAgICAgKiBJdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIHdyYXBwZWQgY29tcG9uZW50IGluIGB0aGlzLnJlZnMud3JhcHBlZENvbXBvbmVudGBcclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzcyBEZWZpbml0aW9uV3JhcHBlZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAgICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8Q29tcG9uZW50VG9XcmFwIHJlZj0nd3JhcHBlZENvbXBvbmVudCcgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn0gey4uLnRoaXMucHJvcHN9Lz47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCB3aXRoIGRlZmluaXRpb24gdG8gdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICAgICBEZWZpbml0aW9uV3JhcHBlZENvbXBvbmVudC5kaXNwbGF5TmFtZSA9IGAke2Rpc3BsYXlOYW1lfVdpdGhEZWZpbml0aW9uYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIERlZmluaXRpb25XcmFwcGVkQ29tcG9uZW50O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKlxyXG4gRXhhbXBsZVxyXG4vLyBFUzZcclxuXHJcbmNsYXNzIE15Q29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgIHJldHVybiA8ZGl2PntKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKX08L2Rpdj47XHJcblxyXG4gICAgfVxyXG59XHJcbi8vIFRoZSBhbm5vdGF0aW9uIGlzIGp1c3QgYSBmdW5jdGlvbiwgeW91IGNvbXBvc2UgeW91ciBjb21wb25lbnQgd2l0aCBhIGRlZmluaXRpb24gYnVpbGRlci5cclxuY29uc3QgTXlDb21wb25lbnRXaXRoRGVmaW5pdGlvbiA9IGRlZmluaXRpb24oJ3BhdGgudG8ubXkuYXdlc29tZS5lbnRpdHknKShNeUNvbXBvbmVudCk7XHJcblxyXG4gLy8gRVM3XHJcblxyXG5AZGVmaW5pdGlvbigncGF0aC50by5teS5hd2Vzb21lLmVudGl0eScpXHJcbmNsYXNzIE15Q29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgIHJldHVybiA8ZGl2PntKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKX08L2Rpdj47XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4qL1xyXG4iXX0=