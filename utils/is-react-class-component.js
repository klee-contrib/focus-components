'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//This function aims to test if a component is a

// is a component a react class.
var isReactClassComponent = exports.isReactClassComponent = function isReactClassComponent(ComponentToTest) {
  var prototype = ComponentToTest.prototype;
  if (!prototype) {
    return false;
  }
  return typeof prototype.render === 'function';
};

var addRefToPropsIfNotPure = exports.addRefToPropsIfNotPure = function addRefToPropsIfNotPure(Component, props, ref) {
  return isReactClassComponent(Component) ? _extends({}, props, { ref: ref }) : props;
};

var LIST = exports.LIST = 'list';
var LINE = exports.LINE = 'line';
var INPUT = exports.INPUT = 'input';
var DISPLAY = exports.DISPLAY = 'display';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc1JlYWN0Q2xhc3NDb21wb25lbnQiLCJwcm90b3R5cGUiLCJDb21wb25lbnRUb1Rlc3QiLCJyZW5kZXIiLCJhZGRSZWZUb1Byb3BzSWZOb3RQdXJlIiwiQ29tcG9uZW50IiwicHJvcHMiLCJyZWYiLCJMSVNUIiwiTElORSIsIklOUFVUIiwiRElTUExBWSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNPLElBQU1BLHdEQUF3QixTQUF4QkEscUJBQXdCLGtCQUFtQjtBQUN2RCxNQUFNQyxZQUFZQyxnQkFBZ0JELFNBQWxDO0FBQ0MsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPLE9BQU9BLFVBQVVFLE1BQWpCLEtBQTRCLFVBQW5DO0FBQ0QsQ0FOTTs7QUFRQSxJQUFNQywwREFBeUIsU0FBekJBLHNCQUF5QixDQUFDQyxTQUFELEVBQVlDLEtBQVosRUFBbUJDLEdBQW5CO0FBQUEsU0FBNEJQLHNCQUFzQkssU0FBdEIsaUJBQXVDQyxLQUF2QyxJQUE4Q0MsUUFBOUMsTUFBcURELEtBQWpGO0FBQUEsQ0FBL0I7O0FBR0EsSUFBTUUsc0JBQU8sTUFBYjtBQUNBLElBQU1DLHNCQUFPLE1BQWI7QUFDQSxJQUFNQyx3QkFBUSxPQUFkO0FBQ0EsSUFBTUMsNEJBQVUsU0FBaEIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9UaGlzIGZ1bmN0aW9uIGFpbXMgdG8gdGVzdCBpZiBhIGNvbXBvbmVudCBpcyBhXG5cbi8vIGlzIGEgY29tcG9uZW50IGEgcmVhY3QgY2xhc3MuXG5leHBvcnQgY29uc3QgaXNSZWFjdENsYXNzQ29tcG9uZW50ID0gQ29tcG9uZW50VG9UZXN0ID0+IHtcbiBjb25zdCBwcm90b3R5cGUgPSBDb21wb25lbnRUb1Rlc3QucHJvdG90eXBlO1xuICBpZiAoIXByb3RvdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIHByb3RvdHlwZS5yZW5kZXIgPT09ICdmdW5jdGlvbic7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSA9IChDb21wb25lbnQsIHByb3BzLCByZWYpID0+IChpc1JlYWN0Q2xhc3NDb21wb25lbnQoQ29tcG9uZW50KSA/IHsuLi5wcm9wcywgcmVmfSA6IHByb3BzKTtcblxuXG5leHBvcnQgY29uc3QgTElTVCA9ICdsaXN0JztcbmV4cG9ydCBjb25zdCBMSU5FID0gJ2xpbmUnO1xuZXhwb3J0IGNvbnN0IElOUFVUID0gJ2lucHV0JztcbmV4cG9ydCBjb25zdCBESVNQTEFZID0gJ2Rpc3BsYXknO1xuIl19