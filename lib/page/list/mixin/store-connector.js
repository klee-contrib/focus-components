'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var isEqual = require('lodash/lang/isEqual');
module.exports = function connectToStores(Component, stores, pickProps, getState) {
  return (function (_React$Component) {
    _inherits(StoreConnector, _React$Component);

    function StoreConnector(props) {
      _classCallCheck(this, StoreConnector);

      _React$Component.call(this, props);
      this.state = this.getStateFromStores(props);
      this.handleStoresChanged = this.handleStoresChanged.bind(this);
    }

    StoreConnector.prototype.getStateFromStores = function getStateFromStores(props) {
      return getState(pickProps(props));
    };

    StoreConnector.prototype.componentDidMount = function componentDidMount() {
      var _this = this;

      stores.forEach(function (store) {
        return store.addChangeListener(_this.handleStoresChanged);
      });
    };

    StoreConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (!isEqual(pickProps(nextProps), pickProps(this.props))) {
        //isEqual
        this.setState(this.getStateFromStores(nextProps));
      }
    };

    StoreConnector.prototype.componentWillUnmount = function componentWillUnmount() {
      var _this2 = this;

      stores.forEach(function (store) {
        return store.removeChangeListener(_this2.handleStoresChanged);
      });
    };

    StoreConnector.prototype.handleStoresChanged = function handleStoresChanged() {
      this.setState(this.getStateFromStores(this.props));
    };

    StoreConnector.prototype.render = function render() {
      return React.createElement(Component, _extends({}, this.props, this.state));
    };

    return StoreConnector;
  })(React.Component);
};