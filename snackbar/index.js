'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Snackbar = function Snackbar(_ref) {
    var actionHandler = _ref.actionHandler;
    var actionText = _ref.actionText;
    var message = _ref.message;
    var deleteMessage = _ref.deleteMessage;
    var type = _ref.type;

    var active = !!message;
    var classNames = 'mdl-snackbar ' + (active ? 'mdl-snackbar--active' : '');
    var otherProps = { 'aria-hidden': active, 'aria-live': 'assertive', 'aria-atomic': 'true', 'aria-relevant': 'text' };
    return _react2.default.createElement(
        'div',
        { 'data-focus': 'snackbar-message-center', 'data-message-type': type, className: classNames },
        _react2.default.createElement(
            'div',
            { className: 'mdl-snackbar__text' },
            _i18next2.default.t(message)
        ),
        actionText && _react2.default.createElement(
            'button',
            { className: 'mdl-snackbar__action', type: 'button', onClick: actionHandler },
            _i18next2.default.t(actionText)
        ),
        _react2.default.createElement(
            'button',
            { className: 'mdl-snackbar__close', type: 'button', onClick: undefined._forceCleanup },
            _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'clear'
            )
        )
    );
};
Snackbar.displayName = 'Snackbar';
Snackbar.propTypes = {
    actionHandler: _react.PropTypes.func,
    actionText: _react.PropTypes.string,
    message: _react.PropTypes.string,
    deleteMessage: _react.PropTypes.func,
    type: _react.PropTypes.string
};
exports.default = Snackbar;

// MessageCenter.displayName = 'MessageCenter';
// MessageCenter.defaultProps = {
//     ttlError: 8000,
//     ttlInfo: 3000,
//     ttlSuccess: 3000,
//     ttlWarning: 3000
// };
// MessageCenter.propTypes = {
//     ttlError: PropTypes.number.isRequired,
//     ttlInfo: PropTypes.number.isRequired,
//     ttlSuccess: PropTypes.number.isRequired,
//     ttlWarning: PropTypes.number.isRequired
// };

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlNuYWNrYmFyIiwiYWN0aW9uSGFuZGxlciIsImFjdGlvblRleHQiLCJtZXNzYWdlIiwiZGVsZXRlTWVzc2FnZSIsInR5cGUiLCJhY3RpdmUiLCJjbGFzc05hbWVzIiwib3RoZXJQcm9wcyIsInQiLCJfZm9yY2VDbGVhbnVwIiwiZGlzcGxheU5hbWUiLCJwcm9wVHlwZXMiLCJmdW5jIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsT0FBK0Q7QUFBQSxRQUE3REMsYUFBNkQsUUFBN0RBLGFBQTZEO0FBQUEsUUFBOUNDLFVBQThDLFFBQTlDQSxVQUE4QztBQUFBLFFBQWxDQyxPQUFrQyxRQUFsQ0EsT0FBa0M7QUFBQSxRQUF6QkMsYUFBeUIsUUFBekJBLGFBQXlCO0FBQUEsUUFBVkMsSUFBVSxRQUFWQSxJQUFVOztBQUM1RSxRQUFNQyxTQUFTLENBQUMsQ0FBQ0gsT0FBakI7QUFDQSxRQUFNSSxnQ0FBNkJELFNBQVMsc0JBQVQsR0FBbUMsRUFBaEUsQ0FBTjtBQUNBLFFBQU1FLGFBQWEsRUFBRSxlQUFlRixNQUFqQixFQUF5QixhQUFZLFdBQXJDLEVBQWtELGVBQWMsTUFBaEUsRUFBd0UsaUJBQWlCLE1BQXpGLEVBQW5CO0FBQ0EsV0FDSTtBQUFBO0FBQUEsVUFBSyxjQUFXLHlCQUFoQixFQUEwQyxxQkFBbUJELElBQTdELEVBQW1FLFdBQVdFLFVBQTlFO0FBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxvQkFBZjtBQUFxQyw4QkFBUUUsQ0FBUixDQUFVTixPQUFWO0FBQXJDLFNBREo7QUFFS0Qsc0JBQ0c7QUFBQTtBQUFBLGNBQVEsV0FBVSxzQkFBbEIsRUFBeUMsTUFBSyxRQUE5QyxFQUF1RCxTQUFTRCxhQUFoRTtBQUFnRiw4QkFBUVEsQ0FBUixDQUFVUCxVQUFWO0FBQWhGLFNBSFI7QUFLSTtBQUFBO0FBQUEsY0FBUSxXQUFVLHFCQUFsQixFQUF3QyxNQUFLLFFBQTdDLEVBQXNELFNBQVMsVUFBS1EsYUFBcEU7QUFBbUY7QUFBQTtBQUFBLGtCQUFHLFdBQVUsZ0JBQWI7QUFBQTtBQUFBO0FBQW5GO0FBTEosS0FESjtBQVNILENBYkQ7QUFjQVYsU0FBU1csV0FBVCxHQUF1QixVQUF2QjtBQUNBWCxTQUFTWSxTQUFULEdBQXFCO0FBQ2pCWCxtQkFBZSxpQkFBVVksSUFEUjtBQUVqQlgsZ0JBQVksaUJBQVVZLE1BRkw7QUFHakJYLGFBQVMsaUJBQVVXLE1BSEY7QUFJakJWLG1CQUFlLGlCQUFVUyxJQUpSO0FBS2pCUixVQUFNLGlCQUFVUztBQUxDLENBQXJCO2tCQU9lZCxROztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcblxuY29uc3QgU25hY2tiYXIgPSAoe2FjdGlvbkhhbmRsZXIsIGFjdGlvblRleHQsIG1lc3NhZ2UsIGRlbGV0ZU1lc3NhZ2UsIHR5cGV9KSA9PiB7XG4gICAgY29uc3QgYWN0aXZlID0gISFtZXNzYWdlO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBgbWRsLXNuYWNrYmFyICR7YWN0aXZlID8gJ21kbC1zbmFja2Jhci0tYWN0aXZlJyA6ICAnJ31gO1xuICAgIGNvbnN0IG90aGVyUHJvcHMgPSB7ICdhcmlhLWhpZGRlbic6IGFjdGl2ZSwgJ2FyaWEtbGl2ZSc6J2Fzc2VydGl2ZScsICdhcmlhLWF0b21pYyc6J3RydWUnLCAnYXJpYS1yZWxldmFudCc6ICd0ZXh0JyB9O1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc25hY2tiYXItbWVzc2FnZS1jZW50ZXInIGRhdGEtbWVzc2FnZS10eXBlPXt0eXBlfSBjbGFzc05hbWU9e2NsYXNzTmFtZXN9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fdGV4dCc+e2kxOG5leHQudChtZXNzYWdlKX08L2Rpdj5cbiAgICAgICAgICAgIHthY3Rpb25UZXh0ICYmXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fYWN0aW9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9e2FjdGlvbkhhbmRsZXJ9PntpMThuZXh0LnQoYWN0aW9uVGV4dCl9PC9idXR0b24+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbWRsLXNuYWNrYmFyX19jbG9zZScgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPXt0aGlzLl9mb3JjZUNsZWFudXB9PjxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnPmNsZWFyPC9pPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblNuYWNrYmFyLmRpc3BsYXlOYW1lID0gJ1NuYWNrYmFyJztcblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgICBhY3Rpb25IYW5kbGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVsZXRlTWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuXG4vLyBNZXNzYWdlQ2VudGVyLmRpc3BsYXlOYW1lID0gJ01lc3NhZ2VDZW50ZXInO1xuLy8gTWVzc2FnZUNlbnRlci5kZWZhdWx0UHJvcHMgPSB7XG4vLyAgICAgdHRsRXJyb3I6IDgwMDAsXG4vLyAgICAgdHRsSW5mbzogMzAwMCxcbi8vICAgICB0dGxTdWNjZXNzOiAzMDAwLFxuLy8gICAgIHR0bFdhcm5pbmc6IDMwMDBcbi8vIH07XG4vLyBNZXNzYWdlQ2VudGVyLnByb3BUeXBlcyA9IHtcbi8vICAgICB0dGxFcnJvcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuLy8gICAgIHR0bEluZm86IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbi8vICAgICB0dGxTdWNjZXNzOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4vLyAgICAgdHRsV2FybmluZzogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4vLyB9O1xuIl19