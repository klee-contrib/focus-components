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
            'main',
            null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJFcnJvckNlbnRlckRlZmF1bHQiLCJjb21wb25lbnQiLCJMb2FkaW5nQmFyRGVmYXVsdCIsImRlZmF1bHRQcm9wcyIsIkFwcEhlYWRlciIsIkVycm9yQ2VudGVyIiwiTG9hZGluZ0JhciIsIkxvYWRpbmdTdGF0dXNCYXIiLCJNZXNzYWdlQ2VudGVyIiwiQ29uZmlybVdyYXBwZXIiLCJwcm9wVHlwZXMiLCJmdW5jIiwiRm9vdGVyIiwiTWVudUxlZnQiLCJMYXlvdXQiLCJjaGlsZHJlbiIsIkRldlRvb2xzIiwiT3RoZXJSb290Q29tcG9uZW50Iiwib3RoZXJQcm9wcyIsIm1lbnVUeXBlIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEscUJBQXFCLHNCQUFZQyxTQUF2QztBQUNBLElBQU1DLG9CQUFvQixxQkFBV0QsU0FBckM7O0FBRUE7QUFDQSxJQUFNRSxlQUFlO0FBQ2pCQyw4Q0FEaUIsRUFDaUI7QUFDbENDLGlCQUFhTCxrQkFGSSxFQUVnQjtBQUNqQ00sZ0JBQVlKLGlCQUhLLEVBR2M7QUFDL0JLLGdEQUppQjtBQUtqQkMsMENBTGlCLEVBS29CO0FBQ3JDQyxxQ0FOaUIsQ0FNcUI7QUFOckIsQ0FBckI7O0FBU0E7QUFDQSxJQUFNQyxZQUFZO0FBQ2ROLGVBQVcsaUJBQVVPLElBRFA7QUFFZEYsb0JBQWdCLGlCQUFVRSxJQUZaO0FBR2ROLGlCQUFhLGlCQUFVTSxJQUhUO0FBSWRDLFlBQVEsaUJBQVVELElBSko7QUFLZEwsZ0JBQVksaUJBQVVLLElBTFI7QUFNZEosc0JBQWtCLGlCQUFVSSxJQU5kO0FBT2RFLGNBQVUsaUJBQVVGLElBUE47QUFRZEgsbUJBQWUsaUJBQVVHO0FBUlgsQ0FBbEI7O0FBV0E7OztBQUdBLElBQU1HLFNBQVMsU0FBVEEsTUFBUyxPQUFvSztBQUFBLFFBQWxLVixTQUFrSyxRQUFsS0EsU0FBa0s7QUFBQSxRQUF2SlcsUUFBdUosUUFBdkpBLFFBQXVKO0FBQUEsUUFBN0lOLGNBQTZJLFFBQTdJQSxjQUE2STtBQUFBLFFBQTdISixXQUE2SCxRQUE3SEEsV0FBNkg7QUFBQSxRQUFoSE8sTUFBZ0gsUUFBaEhBLE1BQWdIO0FBQUEsUUFBeEdOLFVBQXdHLFFBQXhHQSxVQUF3RztBQUFBLFFBQTVGTyxRQUE0RixRQUE1RkEsUUFBNEY7QUFBQSxRQUFsRkwsYUFBa0YsUUFBbEZBLGFBQWtGO0FBQUEsUUFBbkVELGdCQUFtRSxRQUFuRUEsZ0JBQW1FO0FBQUEsUUFBakRTLFFBQWlELFFBQWpEQSxRQUFpRDtBQUFBLFFBQXZDQyxrQkFBdUMsUUFBdkNBLGtCQUF1QztBQUFBLFFBQWhCQyxVQUFnQjs7QUFDL0ssUUFBTUMsV0FBV04sV0FBVyxNQUFYLEdBQW9CLE9BQXJDO0FBQ0EsV0FDSTtBQUFBO0FBQUEsbUJBQUssY0FBVyxRQUFoQixFQUF5QixhQUFXTSxRQUFwQyxJQUFrREQsVUFBbEQ7QUFDSSxzQ0FBQyxVQUFELE9BREo7QUFFSSxzQ0FBQyxhQUFELE9BRko7QUFHS2IsdUJBQ0csOEJBQUMsV0FBRCxPQUpSO0FBTUksc0NBQUMsY0FBRCxPQU5KO0FBT0ksc0NBQUMsU0FBRCxPQVBKO0FBUUtRLG9CQUNHLDhCQUFDLFFBQUQsT0FUUjtBQVdJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxrQkFBSyxjQUFXLGNBQWhCO0FBQ0tFO0FBREw7QUFESixTQVhKO0FBZ0JLSCxrQkFDRztBQUFBO0FBQUEsY0FBUSxjQUFXLFFBQW5CO0FBQ0ksMENBQUMsTUFBRDtBQURKLFNBakJSO0FBcUJLSSxvQkFBWSw4QkFBQyxRQUFELE9BckJqQjtBQXNCS0MsOEJBQXNCLDhCQUFDLGtCQUFEO0FBdEIzQixLQURKO0FBMEJILENBNUJEOztBQStCQTtBQUNBSCxPQUFPTSxXQUFQLEdBQXFCLFFBQXJCO0FBQ0FOLE9BQU9YLFlBQVAsR0FBc0JBLFlBQXRCO0FBQ0FXLE9BQU9KLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZUksTSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgQ29uZmlybVdyYXBwZXJEZWZhdWx0IGZyb20gJy4uL2NvbmZpcm0nO1xyXG5pbXBvcnQgRXJyb3JDZW50ZXIgZnJvbSAnLi4vLi4vYXBwbGljYXRpb24vZXJyb3ItY2VudGVyJztcclxuaW1wb3J0IEhlYWRlckRlZmF1bHRUZW1wbGF0ZSBmcm9tICcuL2hlYWRlci1kZWZhdWx0LXRlbXBsYXRlJztcclxuaW1wb3J0IExvYWRpbmdCYXIgZnJvbSAnLi4vLi4vYXBwbGljYXRpb24vbG9hZGluZy1iYXInO1xyXG5pbXBvcnQgTG9hZGluZ1N0YXR1c0JhckRlZmF1bHQgZnJvbSAnLi4vLi4vZGV2LXRvb2xzL2xvYWRpbmctc3RhdHVzLWJhcic7XHJcbmltcG9ydCBNZXNzYWdlQ2VudGVyRGVmYXVsdCBmcm9tICcuLi9tZXNzYWdlLWNlbnRlcic7XHJcblxyXG5jb25zdCBFcnJvckNlbnRlckRlZmF1bHQgPSBFcnJvckNlbnRlci5jb21wb25lbnQ7XHJcbmNvbnN0IExvYWRpbmdCYXJEZWZhdWx0ID0gTG9hZGluZ0Jhci5jb21wb25lbnQ7XHJcblxyXG4vLyBjb21wb25lbnQgZGVmYXVsdCBwcm9wcy5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgQXBwSGVhZGVyOiBIZWFkZXJEZWZhdWx0VGVtcGxhdGUsIC8vZGVmYXVsdCBhcHAgaGVhZGVyLlxyXG4gICAgRXJyb3JDZW50ZXI6IEVycm9yQ2VudGVyRGVmYXVsdCwgLy8gZGVmYXVsdCBlcnJvciBjZW50ZXJcclxuICAgIExvYWRpbmdCYXI6IExvYWRpbmdCYXJEZWZhdWx0LCAvLyBkZWZhdWx0IGxvYWRpbmcgYmFyXHJcbiAgICBMb2FkaW5nU3RhdHVzQmFyOiBMb2FkaW5nU3RhdHVzQmFyRGVmYXVsdCxcclxuICAgIE1lc3NhZ2VDZW50ZXI6IE1lc3NhZ2VDZW50ZXJEZWZhdWx0LCAvLyBkZWZhdWx0IG1lc3NhZ2UgY2VudGVyXHJcbiAgICBDb25maXJtV3JhcHBlcjogQ29uZmlybVdyYXBwZXJEZWZhdWx0IC8vIGRlZmF1bHQgY29uZmlybSB3cmFwcGVyLFxyXG59O1xyXG5cclxuLy8gY29tcG9uZW50IHByb3BzIGRlZmluaXRpb24uXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIEFwcEhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBDb25maXJtV3JhcHBlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBFcnJvckNlbnRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBGb290ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgTG9hZGluZ0JhcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBMb2FkaW5nU3RhdHVzQmFyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIE1lbnVMZWZ0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIE1lc3NhZ2VDZW50ZXI6IFByb3BUeXBlcy5mdW5jXHJcbn07XHJcblxyXG4vKipcclxuKiBMYXlvdXQgY29tcG9uZW50LlxyXG4qL1xyXG5jb25zdCBMYXlvdXQgPSAoe0FwcEhlYWRlciwgY2hpbGRyZW4sIENvbmZpcm1XcmFwcGVyLCBFcnJvckNlbnRlciwgRm9vdGVyLCBMb2FkaW5nQmFyLCBNZW51TGVmdCwgTWVzc2FnZUNlbnRlciwgTG9hZGluZ1N0YXR1c0JhciwgRGV2VG9vbHMsIE90aGVyUm9vdENvbXBvbmVudCwgLi4ub3RoZXJQcm9wc30pID0+IHtcclxuICAgIGNvbnN0IG1lbnVUeXBlID0gTWVudUxlZnQgPyAnbGVmdCcgOiAnb3RoZXInO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xheW91dCcgZGF0YS1tZW51PXttZW51VHlwZX0gey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICA8TG9hZGluZ0JhciAvPlxyXG4gICAgICAgICAgICA8TWVzc2FnZUNlbnRlciAvPlxyXG4gICAgICAgICAgICB7RXJyb3JDZW50ZXIgJiZcclxuICAgICAgICAgICAgICAgIDxFcnJvckNlbnRlciAvPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDxDb25maXJtV3JhcHBlciAvPlxyXG4gICAgICAgICAgICA8QXBwSGVhZGVyIC8+XHJcbiAgICAgICAgICAgIHtNZW51TGVmdCAmJlxyXG4gICAgICAgICAgICAgICAgPE1lbnVMZWZ0IC8+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPG1haW4+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3BhZ2UtY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbWFpbj5cclxuICAgICAgICAgICAge0Zvb3RlciAmJlxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciBkYXRhLWZvY3VzPSdmb290ZXInPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb290ZXIgLz5cclxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtEZXZUb29scyAmJiA8RGV2VG9vbHMgLz59XHJcbiAgICAgICAgICAgIHtPdGhlclJvb3RDb21wb25lbnQgJiYgPE90aGVyUm9vdENvbXBvbmVudCAvPn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuTGF5b3V0LmRpc3BsYXlOYW1lID0gJ0xheW91dCc7XHJcbkxheW91dC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkxheW91dC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7XHJcbiJdfQ==