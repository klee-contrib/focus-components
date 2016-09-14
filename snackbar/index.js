'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    var hasAction = actionText && actionHandler;
    return _react2.default.createElement(
        'div',
        _extends({ 'data-focus': 'snackbar', 'data-message-type': type, className: classNames }, otherProps),
        _react2.default.createElement(
            'div',
            { className: 'mdl-snackbar__text' },
            _i18next2.default.t(message)
        ),
        hasAction && _react2.default.createElement(
            'button',
            { className: 'mdl-snackbar__action', type: 'button', onClick: actionHandler },
            _i18next2.default.t(actionText)
        ),
        _react2.default.createElement(
            'button',
            { className: 'mdl-snackbar__close', type: 'button', onClick: deleteMessage },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlNuYWNrYmFyIiwiYWN0aW9uSGFuZGxlciIsImFjdGlvblRleHQiLCJtZXNzYWdlIiwiZGVsZXRlTWVzc2FnZSIsInR5cGUiLCJhY3RpdmUiLCJjbGFzc05hbWVzIiwib3RoZXJQcm9wcyIsImhhc0FjdGlvbiIsInQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImZ1bmMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLE9BQStEO0FBQUEsUUFBN0RDLGFBQTZELFFBQTdEQSxhQUE2RDtBQUFBLFFBQTlDQyxVQUE4QyxRQUE5Q0EsVUFBOEM7QUFBQSxRQUFsQ0MsT0FBa0MsUUFBbENBLE9BQWtDO0FBQUEsUUFBekJDLGFBQXlCLFFBQXpCQSxhQUF5QjtBQUFBLFFBQVZDLElBQVUsUUFBVkEsSUFBVTs7QUFDNUUsUUFBTUMsU0FBUyxDQUFDLENBQUNILE9BQWpCO0FBQ0EsUUFBTUksZ0NBQTZCRCxTQUFTLHNCQUFULEdBQW1DLEVBQWhFLENBQU47QUFDQSxRQUFNRSxhQUFhLEVBQUUsZUFBZUYsTUFBakIsRUFBeUIsYUFBWSxXQUFyQyxFQUFrRCxlQUFjLE1BQWhFLEVBQXdFLGlCQUFpQixNQUF6RixFQUFuQjtBQUNBLFFBQU1HLFlBQVlQLGNBQWNELGFBQWhDO0FBQ0EsV0FDSTtBQUFBO0FBQUEsbUJBQUssY0FBVyxVQUFoQixFQUEyQixxQkFBbUJJLElBQTlDLEVBQW9ELFdBQVdFLFVBQS9ELElBQStFQyxVQUEvRTtBQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsb0JBQWY7QUFBcUMsOEJBQVFFLENBQVIsQ0FBVVAsT0FBVjtBQUFyQyxTQURKO0FBRUtNLHFCQUNHO0FBQUE7QUFBQSxjQUFRLFdBQVUsc0JBQWxCLEVBQXlDLE1BQUssUUFBOUMsRUFBdUQsU0FBU1IsYUFBaEU7QUFBZ0YsOEJBQVFTLENBQVIsQ0FBVVIsVUFBVjtBQUFoRixTQUhSO0FBS0k7QUFBQTtBQUFBLGNBQVEsV0FBVSxxQkFBbEIsRUFBd0MsTUFBSyxRQUE3QyxFQUFzRCxTQUFTRSxhQUEvRDtBQUE4RTtBQUFBO0FBQUEsa0JBQUcsV0FBVSxnQkFBYjtBQUFBO0FBQUE7QUFBOUU7QUFMSixLQURKO0FBU0gsQ0FkRDtBQWVBSixTQUFTVyxXQUFULEdBQXVCLFVBQXZCO0FBQ0FYLFNBQVNZLFNBQVQsR0FBcUI7QUFDakJYLG1CQUFlLGlCQUFVWSxJQURSO0FBRWpCWCxnQkFBWSxpQkFBVVksTUFGTDtBQUdqQlgsYUFBUyxpQkFBVVcsTUFIRjtBQUlqQlYsbUJBQWUsaUJBQVVTLElBSlI7QUFLakJSLFVBQU0saUJBQVVTO0FBTEMsQ0FBckI7a0JBT2VkLFE7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuXG5jb25zdCBTbmFja2JhciA9ICh7YWN0aW9uSGFuZGxlciwgYWN0aW9uVGV4dCwgbWVzc2FnZSwgZGVsZXRlTWVzc2FnZSwgdHlwZX0pID0+IHtcbiAgICBjb25zdCBhY3RpdmUgPSAhIW1lc3NhZ2U7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGBtZGwtc25hY2tiYXIgJHthY3RpdmUgPyAnbWRsLXNuYWNrYmFyLS1hY3RpdmUnIDogICcnfWA7XG4gICAgY29uc3Qgb3RoZXJQcm9wcyA9IHsgJ2FyaWEtaGlkZGVuJzogYWN0aXZlLCAnYXJpYS1saXZlJzonYXNzZXJ0aXZlJywgJ2FyaWEtYXRvbWljJzondHJ1ZScsICdhcmlhLXJlbGV2YW50JzogJ3RleHQnIH07XG4gICAgY29uc3QgaGFzQWN0aW9uID0gYWN0aW9uVGV4dCAmJiBhY3Rpb25IYW5kbGVyO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc25hY2tiYXInIGRhdGEtbWVzc2FnZS10eXBlPXt0eXBlfSBjbGFzc05hbWU9e2NsYXNzTmFtZXN9IHsuLi5vdGhlclByb3BzfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtc25hY2tiYXJfX3RleHQnPntpMThuZXh0LnQobWVzc2FnZSl9PC9kaXY+XG4gICAgICAgICAgICB7aGFzQWN0aW9uICYmXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fYWN0aW9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9e2FjdGlvbkhhbmRsZXJ9PntpMThuZXh0LnQoYWN0aW9uVGV4dCl9PC9idXR0b24+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbWRsLXNuYWNrYmFyX19jbG9zZScgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPXtkZWxldGVNZXNzYWdlfT48aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5jbGVhcjwvaT48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5TbmFja2Jhci5kaXNwbGF5TmFtZSA9ICdTbmFja2Jhcic7XG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gICAgYWN0aW9uSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlbGV0ZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcblxuLy8gTWVzc2FnZUNlbnRlci5kaXNwbGF5TmFtZSA9ICdNZXNzYWdlQ2VudGVyJztcbi8vIE1lc3NhZ2VDZW50ZXIuZGVmYXVsdFByb3BzID0ge1xuLy8gICAgIHR0bEVycm9yOiA4MDAwLFxuLy8gICAgIHR0bEluZm86IDMwMDAsXG4vLyAgICAgdHRsU3VjY2VzczogMzAwMCxcbi8vICAgICB0dGxXYXJuaW5nOiAzMDAwXG4vLyB9O1xuLy8gTWVzc2FnZUNlbnRlci5wcm9wVHlwZXMgPSB7XG4vLyAgICAgdHRsRXJyb3I6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbi8vICAgICB0dGxJbmZvOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4vLyAgICAgdHRsU3VjY2VzczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuLy8gICAgIHR0bFdhcm5pbmc6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuLy8gfTtcbiJdfQ==