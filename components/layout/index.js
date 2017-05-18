'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _confirm = require('../confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _errorCenter = require('../../application/error-center');

var _errorCenter2 = _interopRequireDefault(_errorCenter);

var _headerDefaultTemplate = require('./header-default-template');

var _headerDefaultTemplate2 = _interopRequireDefault(_headerDefaultTemplate);

var _loadingBar = require('../../application/loading-bar');

var _loadingBar2 = _interopRequireDefault(_loadingBar);

var _loadingStatusBar = require('../../dev-tools/loading-status-bar');

var _loadingStatusBar2 = _interopRequireDefault(_loadingStatusBar);

var _messageCenter = require('../message-center');

var _messageCenter2 = _interopRequireDefault(_messageCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ErrorCenterDefault = _errorCenter2.default.component;
var LoadingBarDefault = _loadingBar2.default.component;

// component default props.
var defaultProps = {
    AppHeader: _headerDefaultTemplate2.default, //default app header.
    ErrorCenter: ErrorCenterDefault, // default error center
    LoadingBar: LoadingBarDefault, // default loading bar
    LoadingStatusBar: _loadingStatusBar2.default,
    MessageCenter: _messageCenter2.default, // default message center
    ConfirmWrapper: _confirm2.default // default confirm wrapper,
};

// component props definition.
var propTypes = {
    AppHeader: _react.PropTypes.func,
    ConfirmWrapper: _react.PropTypes.func,
    ErrorCenter: _react.PropTypes.func,
    Footer: _react.PropTypes.func,
    LoadingBar: _react.PropTypes.func,
    LoadingStatusBar: _react.PropTypes.func,
    MenuLeft: _react.PropTypes.func,
    MessageCenter: _react.PropTypes.func
};

/**
* Layout component.
*/
var Layout = function Layout(_ref) {
    var AppHeader = _ref.AppHeader,
        children = _ref.children,
        ConfirmWrapper = _ref.ConfirmWrapper,
        ErrorCenter = _ref.ErrorCenter,
        Footer = _ref.Footer,
        LoadingBar = _ref.LoadingBar,
        MenuLeft = _ref.MenuLeft,
        MessageCenter = _ref.MessageCenter,
        LoadingStatusBar = _ref.LoadingStatusBar,
        DevTools = _ref.DevTools,
        OtherRootComponent = _ref.OtherRootComponent,
        otherProps = _objectWithoutProperties(_ref, ['AppHeader', 'children', 'ConfirmWrapper', 'ErrorCenter', 'Footer', 'LoadingBar', 'MenuLeft', 'MessageCenter', 'LoadingStatusBar', 'DevTools', 'OtherRootComponent']);

    var menuType = MenuLeft ? 'left' : 'other';
    return _react2.default.createElement(
        'div',
        _extends({ 'data-focus': 'layout', 'data-menu': menuType }, otherProps),
        _react2.default.createElement(LoadingBar, null),
        _react2.default.createElement(MessageCenter, null),
        ErrorCenter && _react2.default.createElement(ErrorCenter, null),
        _react2.default.createElement(ConfirmWrapper, null),
        _react2.default.createElement(AppHeader, null),
        MenuLeft && _react2.default.createElement(MenuLeft, null),
        _react2.default.createElement(
            'div',
            { 'data-focus': 'page-content' },
            children
        ),
        Footer && _react2.default.createElement(
            'footer',
            { 'data-focus': 'footer' },
            _react2.default.createElement(Footer, null)
        ),
        DevTools && _react2.default.createElement(DevTools, null),
        OtherRootComponent && _react2.default.createElement(OtherRootComponent, null)
    );
};

//Static props.
Layout.displayName = 'Layout';
Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;

exports.default = Layout;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJFcnJvckNlbnRlckRlZmF1bHQiLCJjb21wb25lbnQiLCJMb2FkaW5nQmFyRGVmYXVsdCIsImRlZmF1bHRQcm9wcyIsIkFwcEhlYWRlciIsIkVycm9yQ2VudGVyIiwiTG9hZGluZ0JhciIsIkxvYWRpbmdTdGF0dXNCYXIiLCJNZXNzYWdlQ2VudGVyIiwiQ29uZmlybVdyYXBwZXIiLCJwcm9wVHlwZXMiLCJmdW5jIiwiRm9vdGVyIiwiTWVudUxlZnQiLCJMYXlvdXQiLCJjaGlsZHJlbiIsIkRldlRvb2xzIiwiT3RoZXJSb290Q29tcG9uZW50Iiwib3RoZXJQcm9wcyIsIm1lbnVUeXBlIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEscUJBQXFCLHNCQUFZQyxTQUF2QztBQUNBLElBQU1DLG9CQUFvQixxQkFBV0QsU0FBckM7O0FBRUE7QUFDQSxJQUFNRSxlQUFlO0FBQ2pCQyw4Q0FEaUIsRUFDaUI7QUFDbENDLGlCQUFhTCxrQkFGSSxFQUVnQjtBQUNqQ00sZ0JBQVlKLGlCQUhLLEVBR2M7QUFDL0JLLGdEQUppQjtBQUtqQkMsMENBTGlCLEVBS29CO0FBQ3JDQyxxQ0FOaUIsQ0FNcUI7QUFOckIsQ0FBckI7O0FBU0E7QUFDQSxJQUFNQyxZQUFZO0FBQ2ROLGVBQVcsaUJBQVVPLElBRFA7QUFFZEYsb0JBQWdCLGlCQUFVRSxJQUZaO0FBR2ROLGlCQUFhLGlCQUFVTSxJQUhUO0FBSWRDLFlBQVEsaUJBQVVELElBSko7QUFLZEwsZ0JBQVksaUJBQVVLLElBTFI7QUFNZEosc0JBQWtCLGlCQUFVSSxJQU5kO0FBT2RFLGNBQVUsaUJBQVVGLElBUE47QUFRZEgsbUJBQWUsaUJBQVVHO0FBUlgsQ0FBbEI7O0FBV0E7OztBQUdBLElBQU1HLFNBQVcsU0FBWEEsTUFBVyxPQUFvSztBQUFBLFFBQWxLVixTQUFrSyxRQUFsS0EsU0FBa0s7QUFBQSxRQUF2SlcsUUFBdUosUUFBdkpBLFFBQXVKO0FBQUEsUUFBN0lOLGNBQTZJLFFBQTdJQSxjQUE2STtBQUFBLFFBQTdISixXQUE2SCxRQUE3SEEsV0FBNkg7QUFBQSxRQUFoSE8sTUFBZ0gsUUFBaEhBLE1BQWdIO0FBQUEsUUFBeEdOLFVBQXdHLFFBQXhHQSxVQUF3RztBQUFBLFFBQTVGTyxRQUE0RixRQUE1RkEsUUFBNEY7QUFBQSxRQUFsRkwsYUFBa0YsUUFBbEZBLGFBQWtGO0FBQUEsUUFBbkVELGdCQUFtRSxRQUFuRUEsZ0JBQW1FO0FBQUEsUUFBakRTLFFBQWlELFFBQWpEQSxRQUFpRDtBQUFBLFFBQXZDQyxrQkFBdUMsUUFBdkNBLGtCQUF1QztBQUFBLFFBQWhCQyxVQUFnQjs7QUFDakwsUUFBTUMsV0FBV04sV0FBVyxNQUFYLEdBQW9CLE9BQXJDO0FBQ0EsV0FDSTtBQUFBO0FBQUEsbUJBQUssY0FBVyxRQUFoQixFQUF5QixhQUFXTSxRQUFwQyxJQUFrREQsVUFBbEQ7QUFDSSxzQ0FBQyxVQUFELE9BREo7QUFFSSxzQ0FBQyxhQUFELE9BRko7QUFHS2IsdUJBQ0csOEJBQUMsV0FBRCxPQUpSO0FBTUksc0NBQUMsY0FBRCxPQU5KO0FBT0ksc0NBQUMsU0FBRCxPQVBKO0FBUUtRLG9CQUNHLDhCQUFDLFFBQUQsT0FUUjtBQVdJO0FBQUE7QUFBQSxjQUFLLGNBQVcsY0FBaEI7QUFDS0U7QUFETCxTQVhKO0FBY0tILGtCQUNHO0FBQUE7QUFBQSxjQUFRLGNBQVcsUUFBbkI7QUFDSSwwQ0FBQyxNQUFEO0FBREosU0FmUjtBQW1CTUksb0JBQVksOEJBQUMsUUFBRCxPQW5CbEI7QUFvQk1DLDhCQUFzQiw4QkFBQyxrQkFBRDtBQXBCNUIsS0FESjtBQXdCSCxDQTFCRDs7QUE2QkE7QUFDQUgsT0FBT00sV0FBUCxHQUFxQixRQUFyQjtBQUNBTixPQUFPWCxZQUFQLEdBQXNCQSxZQUF0QjtBQUNBVyxPQUFPSixTQUFQLEdBQW1CQSxTQUFuQjs7a0JBRWVJLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBDb25maXJtV3JhcHBlckRlZmF1bHQgZnJvbSAnLi4vY29uZmlybSc7XHJcbmltcG9ydCBFcnJvckNlbnRlciBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9lcnJvci1jZW50ZXInO1xyXG5pbXBvcnQgSGVhZGVyRGVmYXVsdFRlbXBsYXRlIGZyb20gJy4vaGVhZGVyLWRlZmF1bHQtdGVtcGxhdGUnO1xyXG5pbXBvcnQgTG9hZGluZ0JhciBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9sb2FkaW5nLWJhcic7XHJcbmltcG9ydCBMb2FkaW5nU3RhdHVzQmFyRGVmYXVsdCBmcm9tICcuLi8uLi9kZXYtdG9vbHMvbG9hZGluZy1zdGF0dXMtYmFyJztcclxuaW1wb3J0IE1lc3NhZ2VDZW50ZXJEZWZhdWx0IGZyb20gJy4uL21lc3NhZ2UtY2VudGVyJztcclxuXHJcbmNvbnN0IEVycm9yQ2VudGVyRGVmYXVsdCA9IEVycm9yQ2VudGVyLmNvbXBvbmVudDtcclxuY29uc3QgTG9hZGluZ0JhckRlZmF1bHQgPSBMb2FkaW5nQmFyLmNvbXBvbmVudDtcclxuXHJcbi8vIGNvbXBvbmVudCBkZWZhdWx0IHByb3BzLlxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBBcHBIZWFkZXI6IEhlYWRlckRlZmF1bHRUZW1wbGF0ZSwgLy9kZWZhdWx0IGFwcCBoZWFkZXIuXHJcbiAgICBFcnJvckNlbnRlcjogRXJyb3JDZW50ZXJEZWZhdWx0LCAvLyBkZWZhdWx0IGVycm9yIGNlbnRlclxyXG4gICAgTG9hZGluZ0JhcjogTG9hZGluZ0JhckRlZmF1bHQsIC8vIGRlZmF1bHQgbG9hZGluZyBiYXJcclxuICAgIExvYWRpbmdTdGF0dXNCYXI6IExvYWRpbmdTdGF0dXNCYXJEZWZhdWx0LFxyXG4gICAgTWVzc2FnZUNlbnRlcjogTWVzc2FnZUNlbnRlckRlZmF1bHQsIC8vIGRlZmF1bHQgbWVzc2FnZSBjZW50ZXJcclxuICAgIENvbmZpcm1XcmFwcGVyOiBDb25maXJtV3JhcHBlckRlZmF1bHQgLy8gZGVmYXVsdCBjb25maXJtIHdyYXBwZXIsXHJcbn07XHJcblxyXG4vLyBjb21wb25lbnQgcHJvcHMgZGVmaW5pdGlvbi5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgQXBwSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIENvbmZpcm1XcmFwcGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIEVycm9yQ2VudGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIEZvb3RlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBMb2FkaW5nQmFyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIExvYWRpbmdTdGF0dXNCYXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgTWVudUxlZnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgTWVzc2FnZUNlbnRlcjogUHJvcFR5cGVzLmZ1bmNcclxufTtcclxuXHJcbi8qKlxyXG4qIExheW91dCBjb21wb25lbnQuXHJcbiovXHJcbmNvbnN0IExheW91dCAgPSAgKHtBcHBIZWFkZXIsIGNoaWxkcmVuLCBDb25maXJtV3JhcHBlciwgRXJyb3JDZW50ZXIsIEZvb3RlciwgTG9hZGluZ0JhciwgTWVudUxlZnQsIE1lc3NhZ2VDZW50ZXIsIExvYWRpbmdTdGF0dXNCYXIsIERldlRvb2xzLCBPdGhlclJvb3RDb21wb25lbnQsIC4uLm90aGVyUHJvcHN9KSA9PiB7XHJcbiAgICBjb25zdCBtZW51VHlwZSA9IE1lbnVMZWZ0ID8gJ2xlZnQnIDogJ290aGVyJztcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsYXlvdXQnIGRhdGEtbWVudT17bWVudVR5cGV9IHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgICAgICAgPExvYWRpbmdCYXIgLz5cclxuICAgICAgICAgICAgPE1lc3NhZ2VDZW50ZXIgLz5cclxuICAgICAgICAgICAge0Vycm9yQ2VudGVyICYmXHJcbiAgICAgICAgICAgICAgICA8RXJyb3JDZW50ZXIgLz5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8Q29uZmlybVdyYXBwZXIgLz5cclxuICAgICAgICAgICAgPEFwcEhlYWRlciAvPlxyXG4gICAgICAgICAgICB7TWVudUxlZnQgJiZcclxuICAgICAgICAgICAgICAgIDxNZW51TGVmdCAvPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncGFnZS1jb250ZW50Jz5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHtGb290ZXIgJiZcclxuICAgICAgICAgICAgICAgIDxmb290ZXIgZGF0YS1mb2N1cz0nZm9vdGVyJz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9vdGVyIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB7IERldlRvb2xzICYmIDxEZXZUb29scyAvPn1cclxuICAgICAgICAgICAgeyBPdGhlclJvb3RDb21wb25lbnQgJiYgPE90aGVyUm9vdENvbXBvbmVudCAvPiB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbkxheW91dC5kaXNwbGF5TmFtZSA9ICdMYXlvdXQnO1xyXG5MYXlvdXQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5MYXlvdXQucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0O1xyXG4iXX0=