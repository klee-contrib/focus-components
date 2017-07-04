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

var _uuid = require('uuid');

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
            'main',
            { id: 'main-content-app', role: 'main' },
            _react2.default.createElement(
                'div',
                { 'data-focus': 'page-content' },
                children
            )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJFcnJvckNlbnRlckRlZmF1bHQiLCJjb21wb25lbnQiLCJMb2FkaW5nQmFyRGVmYXVsdCIsImRlZmF1bHRQcm9wcyIsIkFwcEhlYWRlciIsIkVycm9yQ2VudGVyIiwiTG9hZGluZ0JhciIsIkxvYWRpbmdTdGF0dXNCYXIiLCJNZXNzYWdlQ2VudGVyIiwiQ29uZmlybVdyYXBwZXIiLCJwcm9wVHlwZXMiLCJmdW5jIiwiRm9vdGVyIiwiTWVudUxlZnQiLCJMYXlvdXQiLCJjaGlsZHJlbiIsIkRldlRvb2xzIiwiT3RoZXJSb290Q29tcG9uZW50Iiwib3RoZXJQcm9wcyIsIm1lbnVUeXBlIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0EsSUFBTUEscUJBQXFCLHNCQUFZQyxTQUF2QztBQUNBLElBQU1DLG9CQUFvQixxQkFBV0QsU0FBckM7O0FBRUE7QUFDQSxJQUFNRSxlQUFlO0FBQ2pCQyw4Q0FEaUIsRUFDaUI7QUFDbENDLGlCQUFhTCxrQkFGSSxFQUVnQjtBQUNqQ00sZ0JBQVlKLGlCQUhLLEVBR2M7QUFDL0JLLGdEQUppQjtBQUtqQkMsMENBTGlCLEVBS29CO0FBQ3JDQyxxQ0FOaUIsQ0FNcUI7QUFOckIsQ0FBckI7O0FBU0E7QUFDQSxJQUFNQyxZQUFZO0FBQ2ROLGVBQVcsaUJBQVVPLElBRFA7QUFFZEYsb0JBQWdCLGlCQUFVRSxJQUZaO0FBR2ROLGlCQUFhLGlCQUFVTSxJQUhUO0FBSWRDLFlBQVEsaUJBQVVELElBSko7QUFLZEwsZ0JBQVksaUJBQVVLLElBTFI7QUFNZEosc0JBQWtCLGlCQUFVSSxJQU5kO0FBT2RFLGNBQVUsaUJBQVVGLElBUE47QUFRZEgsbUJBQWUsaUJBQVVHO0FBUlgsQ0FBbEI7O0FBV0E7OztBQUdBLElBQU1HLFNBQVMsU0FBVEEsTUFBUyxPQUFvSztBQUFBLFFBQWxLVixTQUFrSyxRQUFsS0EsU0FBa0s7QUFBQSxRQUF2SlcsUUFBdUosUUFBdkpBLFFBQXVKO0FBQUEsUUFBN0lOLGNBQTZJLFFBQTdJQSxjQUE2STtBQUFBLFFBQTdISixXQUE2SCxRQUE3SEEsV0FBNkg7QUFBQSxRQUFoSE8sTUFBZ0gsUUFBaEhBLE1BQWdIO0FBQUEsUUFBeEdOLFVBQXdHLFFBQXhHQSxVQUF3RztBQUFBLFFBQTVGTyxRQUE0RixRQUE1RkEsUUFBNEY7QUFBQSxRQUFsRkwsYUFBa0YsUUFBbEZBLGFBQWtGO0FBQUEsUUFBbkVELGdCQUFtRSxRQUFuRUEsZ0JBQW1FO0FBQUEsUUFBakRTLFFBQWlELFFBQWpEQSxRQUFpRDtBQUFBLFFBQXZDQyxrQkFBdUMsUUFBdkNBLGtCQUF1QztBQUFBLFFBQWhCQyxVQUFnQjs7QUFDL0ssUUFBTUMsV0FBV04sV0FBVyxNQUFYLEdBQW9CLE9BQXJDO0FBQ0EsV0FDSTtBQUFBO0FBQUEsbUJBQUssY0FBVyxRQUFoQixFQUF5QixhQUFXTSxRQUFwQyxJQUFrREQsVUFBbEQ7QUFDSSxzQ0FBQyxVQUFELE9BREo7QUFFSSxzQ0FBQyxhQUFELE9BRko7QUFHS2IsdUJBQ0csOEJBQUMsV0FBRCxPQUpSO0FBTUksc0NBQUMsY0FBRCxPQU5KO0FBT0ksc0NBQUMsU0FBRCxPQVBKO0FBUUtRLG9CQUNHLDhCQUFDLFFBQUQsT0FUUjtBQVdJO0FBQUE7QUFBQSxjQUFNLElBQUcsa0JBQVQsRUFBNEIsTUFBSyxNQUFqQztBQUNJO0FBQUE7QUFBQSxrQkFBSyxjQUFXLGNBQWhCO0FBQ0tFO0FBREw7QUFESixTQVhKO0FBZ0JLSCxrQkFDRztBQUFBO0FBQUEsY0FBUSxjQUFXLFFBQW5CO0FBQ0ksMENBQUMsTUFBRDtBQURKLFNBakJSO0FBcUJLSSxvQkFBWSw4QkFBQyxRQUFELE9BckJqQjtBQXNCS0MsOEJBQXNCLDhCQUFDLGtCQUFEO0FBdEIzQixLQURKO0FBMEJILENBNUJEOztBQStCQTtBQUNBSCxPQUFPTSxXQUFQLEdBQXFCLFFBQXJCO0FBQ0FOLE9BQU9YLFlBQVAsR0FBc0JBLFlBQXRCO0FBQ0FXLE9BQU9KLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZUksTSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgQ29uZmlybVdyYXBwZXJEZWZhdWx0IGZyb20gJy4uL2NvbmZpcm0nO1xyXG5pbXBvcnQgRXJyb3JDZW50ZXIgZnJvbSAnLi4vLi4vYXBwbGljYXRpb24vZXJyb3ItY2VudGVyJztcclxuaW1wb3J0IEhlYWRlckRlZmF1bHRUZW1wbGF0ZSBmcm9tICcuL2hlYWRlci1kZWZhdWx0LXRlbXBsYXRlJztcclxuaW1wb3J0IExvYWRpbmdCYXIgZnJvbSAnLi4vLi4vYXBwbGljYXRpb24vbG9hZGluZy1iYXInO1xyXG5pbXBvcnQgTG9hZGluZ1N0YXR1c0JhckRlZmF1bHQgZnJvbSAnLi4vLi4vZGV2LXRvb2xzL2xvYWRpbmctc3RhdHVzLWJhcic7XHJcbmltcG9ydCBNZXNzYWdlQ2VudGVyRGVmYXVsdCBmcm9tICcuLi9tZXNzYWdlLWNlbnRlcic7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcclxuY29uc3QgRXJyb3JDZW50ZXJEZWZhdWx0ID0gRXJyb3JDZW50ZXIuY29tcG9uZW50O1xyXG5jb25zdCBMb2FkaW5nQmFyRGVmYXVsdCA9IExvYWRpbmdCYXIuY29tcG9uZW50O1xyXG5cclxuLy8gY29tcG9uZW50IGRlZmF1bHQgcHJvcHMuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIEFwcEhlYWRlcjogSGVhZGVyRGVmYXVsdFRlbXBsYXRlLCAvL2RlZmF1bHQgYXBwIGhlYWRlci5cclxuICAgIEVycm9yQ2VudGVyOiBFcnJvckNlbnRlckRlZmF1bHQsIC8vIGRlZmF1bHQgZXJyb3IgY2VudGVyXHJcbiAgICBMb2FkaW5nQmFyOiBMb2FkaW5nQmFyRGVmYXVsdCwgLy8gZGVmYXVsdCBsb2FkaW5nIGJhclxyXG4gICAgTG9hZGluZ1N0YXR1c0JhcjogTG9hZGluZ1N0YXR1c0JhckRlZmF1bHQsXHJcbiAgICBNZXNzYWdlQ2VudGVyOiBNZXNzYWdlQ2VudGVyRGVmYXVsdCwgLy8gZGVmYXVsdCBtZXNzYWdlIGNlbnRlclxyXG4gICAgQ29uZmlybVdyYXBwZXI6IENvbmZpcm1XcmFwcGVyRGVmYXVsdCAvLyBkZWZhdWx0IGNvbmZpcm0gd3JhcHBlcixcclxufTtcclxuXHJcbi8vIGNvbXBvbmVudCBwcm9wcyBkZWZpbml0aW9uLlxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBBcHBIZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgQ29uZmlybVdyYXBwZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgRXJyb3JDZW50ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgRm9vdGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIExvYWRpbmdCYXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgTG9hZGluZ1N0YXR1c0JhcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBNZW51TGVmdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBNZXNzYWdlQ2VudGVyOiBQcm9wVHlwZXMuZnVuY1xyXG59O1xyXG5cclxuLyoqXHJcbiogTGF5b3V0IGNvbXBvbmVudC5cclxuKi9cclxuY29uc3QgTGF5b3V0ID0gKHtBcHBIZWFkZXIsIGNoaWxkcmVuLCBDb25maXJtV3JhcHBlciwgRXJyb3JDZW50ZXIsIEZvb3RlciwgTG9hZGluZ0JhciwgTWVudUxlZnQsIE1lc3NhZ2VDZW50ZXIsIExvYWRpbmdTdGF0dXNCYXIsIERldlRvb2xzLCBPdGhlclJvb3RDb21wb25lbnQsIC4uLm90aGVyUHJvcHN9KSA9PiB7XHJcbiAgICBjb25zdCBtZW51VHlwZSA9IE1lbnVMZWZ0ID8gJ2xlZnQnIDogJ290aGVyJztcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsYXlvdXQnIGRhdGEtbWVudT17bWVudVR5cGV9IHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgICAgICAgPExvYWRpbmdCYXIgLz5cclxuICAgICAgICAgICAgPE1lc3NhZ2VDZW50ZXIgLz5cclxuICAgICAgICAgICAge0Vycm9yQ2VudGVyICYmXHJcbiAgICAgICAgICAgICAgICA8RXJyb3JDZW50ZXIgLz5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8Q29uZmlybVdyYXBwZXIgLz5cclxuICAgICAgICAgICAgPEFwcEhlYWRlciAvPlxyXG4gICAgICAgICAgICB7TWVudUxlZnQgJiZcclxuICAgICAgICAgICAgICAgIDxNZW51TGVmdCAvPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDxtYWluIGlkPSdtYWluLWNvbnRlbnQtYXBwJyByb2xlPSdtYWluJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncGFnZS1jb250ZW50Jz5cclxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9tYWluPlxyXG4gICAgICAgICAgICB7Rm9vdGVyICYmXHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGRhdGEtZm9jdXM9J2Zvb3Rlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvb3RlciAvPlxyXG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAge0RldlRvb2xzICYmIDxEZXZUb29scyAvPn1cclxuICAgICAgICAgICAge090aGVyUm9vdENvbXBvbmVudCAmJiA8T3RoZXJSb290Q29tcG9uZW50IC8+fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5MYXlvdXQuZGlzcGxheU5hbWUgPSAnTGF5b3V0JztcclxuTGF5b3V0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuTGF5b3V0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcclxuIl19