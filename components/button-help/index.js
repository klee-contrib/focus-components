'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ButtonHelp(_ref) {
    var blockName = _ref.blockName;
    var _window$location = window.location,
        hash = _window$location.hash,
        pathname = _window$location.pathname;

    var url = hash && hash.replace('#', '') || pathname;
    var _window = window,
        openHelpCenter = _window.openHelpCenter;


    if (typeof openHelpCenter !== 'function') {
        console.warn('You forgot to set the function "window.openHelpCenter". Please mount somewhere in your application a "DraggableIframe" with "openHelpCenter" as the "toggleFunctionName" prop');
    }

    return _react2.default.createElement(_button2.default, {
        className: 'help-button',
        handleOnClick: function handleOnClick() {
            return openHelpCenter(url, blockName);
        },
        icon: 'help_outline',
        label: (0, _translation.translate)('help.alt') + ' : ' + blockName,
        shape: 'icon',
        type: 'button'
    });
}

ButtonHelp.propTypes = {
    blockName: _react.PropTypes.string
};

exports.default = ButtonHelp;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCdXR0b25IZWxwIiwiYmxvY2tOYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIiwicGF0aG5hbWUiLCJ1cmwiLCJyZXBsYWNlIiwib3BlbkhlbHBDZW50ZXIiLCJjb25zb2xlIiwid2FybiIsInByb3BUeXBlcyIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsU0FBU0EsVUFBVCxPQUFpQztBQUFBLFFBQVpDLFNBQVksUUFBWkEsU0FBWTtBQUFBLDJCQUNKQyxPQUFPQyxRQURIO0FBQUEsUUFDdEJDLElBRHNCLG9CQUN0QkEsSUFEc0I7QUFBQSxRQUNoQkMsUUFEZ0Isb0JBQ2hCQSxRQURnQjs7QUFFN0IsUUFBTUMsTUFBTUYsUUFBUUEsS0FBS0csT0FBTCxDQUFhLEdBQWIsRUFBa0IsRUFBbEIsQ0FBUixJQUFpQ0YsUUFBN0M7QUFGNkIsa0JBR0pILE1BSEk7QUFBQSxRQUd0Qk0sY0FIc0IsV0FHdEJBLGNBSHNCOzs7QUFLN0IsUUFBSSxPQUFPQSxjQUFQLEtBQTBCLFVBQTlCLEVBQTBDO0FBQ3RDQyxnQkFBUUMsSUFBUixDQUFhLCtLQUFiO0FBQ0g7O0FBRUQsV0FDSTtBQUNJLG1CQUFVLGFBRGQ7QUFFSSx1QkFBZTtBQUFBLG1CQUFNRixlQUFlRixHQUFmLEVBQW9CTCxTQUFwQixDQUFOO0FBQUEsU0FGbkI7QUFHSSxjQUFLLGNBSFQ7QUFJSSxlQUFVLDRCQUFVLFVBQVYsQ0FBVixXQUFxQ0EsU0FKekM7QUFLSSxlQUFNLE1BTFY7QUFNSSxjQUFLO0FBTlQsTUFESjtBQVVIOztBQUVERCxXQUFXVyxTQUFYLEdBQXVCO0FBQ25CVixlQUFXLGlCQUFVVztBQURGLENBQXZCOztrQkFJZVosVSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9idXR0b24nO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcblxyXG5mdW5jdGlvbiBCdXR0b25IZWxwKHtibG9ja05hbWV9KSB7XHJcbiAgICBjb25zdCB7aGFzaCwgcGF0aG5hbWV9ID0gd2luZG93LmxvY2F0aW9uO1xyXG4gICAgY29uc3QgdXJsID0gaGFzaCAmJiBoYXNoLnJlcGxhY2UoJyMnLCAnJykgfHwgcGF0aG5hbWU7XHJcbiAgICBjb25zdCB7b3BlbkhlbHBDZW50ZXJ9ID0gd2luZG93O1xyXG5cclxuICAgIGlmICh0eXBlb2Ygb3BlbkhlbHBDZW50ZXIgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1lvdSBmb3Jnb3QgdG8gc2V0IHRoZSBmdW5jdGlvbiBcIndpbmRvdy5vcGVuSGVscENlbnRlclwiLiBQbGVhc2UgbW91bnQgc29tZXdoZXJlIGluIHlvdXIgYXBwbGljYXRpb24gYSBcIkRyYWdnYWJsZUlmcmFtZVwiIHdpdGggXCJvcGVuSGVscENlbnRlclwiIGFzIHRoZSBcInRvZ2dsZUZ1bmN0aW9uTmFtZVwiIHByb3AnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgY2xhc3NOYW1lPSdoZWxwLWJ1dHRvbicgICAgICAgICBcclxuICAgICAgICAgICAgaGFuZGxlT25DbGljaz17KCkgPT4gb3BlbkhlbHBDZW50ZXIodXJsLCBibG9ja05hbWUpfVxyXG4gICAgICAgICAgICBpY29uPSdoZWxwX291dGxpbmUnXHJcbiAgICAgICAgICAgIGxhYmVsPXtgJHt0cmFuc2xhdGUoJ2hlbHAuYWx0Jyl9IDogJHtibG9ja05hbWV9YH1cclxuICAgICAgICAgICAgc2hhcGU9J2ljb24nXHJcbiAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcclxuICAgICAgICAvPlxyXG4gICAgKTtcclxufVxyXG5cclxuQnV0dG9uSGVscC5wcm9wVHlwZXMgPSB7XHJcbiAgICBibG9ja05hbWU6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkhlbHA7XHJcbiJdfQ==