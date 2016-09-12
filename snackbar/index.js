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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlNuYWNrYmFyIiwiYWN0aW9uSGFuZGxlciIsImFjdGlvblRleHQiLCJtZXNzYWdlIiwiZGVsZXRlTWVzc2FnZSIsInR5cGUiLCJhY3RpdmUiLCJjbGFzc05hbWVzIiwib3RoZXJQcm9wcyIsImhhc0FjdGlvbiIsInQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImZ1bmMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLE9BQStEO0FBQUEsUUFBN0RDLGFBQTZELFFBQTdEQSxhQUE2RDtBQUFBLFFBQTlDQyxVQUE4QyxRQUE5Q0EsVUFBOEM7QUFBQSxRQUFsQ0MsT0FBa0MsUUFBbENBLE9BQWtDO0FBQUEsUUFBekJDLGFBQXlCLFFBQXpCQSxhQUF5QjtBQUFBLFFBQVZDLElBQVUsUUFBVkEsSUFBVTs7QUFDNUUsUUFBTUMsU0FBUyxDQUFDLENBQUNILE9BQWpCO0FBQ0EsUUFBTUksZ0NBQTZCRCxTQUFTLHNCQUFULEdBQW1DLEVBQWhFLENBQU47QUFDQSxRQUFNRSxhQUFhLEVBQUUsZUFBZUYsTUFBakIsRUFBeUIsYUFBWSxXQUFyQyxFQUFrRCxlQUFjLE1BQWhFLEVBQXdFLGlCQUFpQixNQUF6RixFQUFuQjtBQUNBLFFBQU1HLFlBQVlQLGNBQWNELGFBQWhDO0FBQ0EsV0FDSTtBQUFBO0FBQUEsbUJBQUssY0FBVyxVQUFoQixFQUEyQixxQkFBbUJJLElBQTlDLEVBQW9ELFdBQVdFLFVBQS9ELElBQStFQyxVQUEvRTtBQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsb0JBQWY7QUFBcUMsOEJBQVFFLENBQVIsQ0FBVVAsT0FBVjtBQUFyQyxTQURKO0FBRUtNLHFCQUNHO0FBQUE7QUFBQSxjQUFRLFdBQVUsc0JBQWxCLEVBQXlDLE1BQUssUUFBOUMsRUFBdUQsU0FBU1IsYUFBaEU7QUFBZ0YsOEJBQVFTLENBQVIsQ0FBVVIsVUFBVjtBQUFoRixTQUhSO0FBS0k7QUFBQTtBQUFBLGNBQVEsV0FBVSxxQkFBbEIsRUFBd0MsTUFBSyxRQUE3QyxFQUFzRCxTQUFTRSxhQUEvRDtBQUE4RTtBQUFBO0FBQUEsa0JBQUcsV0FBVSxnQkFBYjtBQUFBO0FBQUE7QUFBOUU7QUFMSixLQURKO0FBU0gsQ0FkRDtBQWVBSixTQUFTVyxXQUFULEdBQXVCLFVBQXZCO0FBQ0FYLFNBQVNZLFNBQVQsR0FBcUI7QUFDakJYLG1CQUFlLGlCQUFVWSxJQURSO0FBRWpCWCxnQkFBWSxpQkFBVVksTUFGTDtBQUdqQlgsYUFBUyxpQkFBVVcsTUFIRjtBQUlqQlYsbUJBQWUsaUJBQVVTLElBSlI7QUFLakJSLFVBQU0saUJBQVVTO0FBTEMsQ0FBckI7a0JBT2VkLFE7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XHJcblxyXG5jb25zdCBTbmFja2JhciA9ICh7YWN0aW9uSGFuZGxlciwgYWN0aW9uVGV4dCwgbWVzc2FnZSwgZGVsZXRlTWVzc2FnZSwgdHlwZX0pID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9ICEhbWVzc2FnZTtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBgbWRsLXNuYWNrYmFyICR7YWN0aXZlID8gJ21kbC1zbmFja2Jhci0tYWN0aXZlJyA6ICAnJ31gO1xyXG4gICAgY29uc3Qgb3RoZXJQcm9wcyA9IHsgJ2FyaWEtaGlkZGVuJzogYWN0aXZlLCAnYXJpYS1saXZlJzonYXNzZXJ0aXZlJywgJ2FyaWEtYXRvbWljJzondHJ1ZScsICdhcmlhLXJlbGV2YW50JzogJ3RleHQnIH07XHJcbiAgICBjb25zdCBoYXNBY3Rpb24gPSBhY3Rpb25UZXh0ICYmIGFjdGlvbkhhbmRsZXI7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc25hY2tiYXInIGRhdGEtbWVzc2FnZS10eXBlPXt0eXBlfSBjbGFzc05hbWU9e2NsYXNzTmFtZXN9IHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fdGV4dCc+e2kxOG5leHQudChtZXNzYWdlKX08L2Rpdj5cclxuICAgICAgICAgICAge2hhc0FjdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fYWN0aW9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9e2FjdGlvbkhhbmRsZXJ9PntpMThuZXh0LnQoYWN0aW9uVGV4dCl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fY2xvc2UnIHR5cGU9J2J1dHRvbicgb25DbGljaz17ZGVsZXRlTWVzc2FnZX0+PGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+Y2xlYXI8L2k+PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5TbmFja2Jhci5kaXNwbGF5TmFtZSA9ICdTbmFja2Jhcic7XHJcblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcclxuICAgIGFjdGlvbkhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBkZWxldGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXI7XHJcblxyXG4vLyBNZXNzYWdlQ2VudGVyLmRpc3BsYXlOYW1lID0gJ01lc3NhZ2VDZW50ZXInO1xyXG4vLyBNZXNzYWdlQ2VudGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuLy8gICAgIHR0bEVycm9yOiA4MDAwLFxyXG4vLyAgICAgdHRsSW5mbzogMzAwMCxcclxuLy8gICAgIHR0bFN1Y2Nlc3M6IDMwMDAsXHJcbi8vICAgICB0dGxXYXJuaW5nOiAzMDAwXHJcbi8vIH07XHJcbi8vIE1lc3NhZ2VDZW50ZXIucHJvcFR5cGVzID0ge1xyXG4vLyAgICAgdHRsRXJyb3I6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuLy8gICAgIHR0bEluZm86IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuLy8gICAgIHR0bFN1Y2Nlc3M6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuLy8gICAgIHR0bFdhcm5pbmc6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxyXG4vLyB9O1xyXG4iXX0=