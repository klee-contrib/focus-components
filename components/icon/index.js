'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Icon(_ref) {
    var name = _ref.name,
        library = _ref.library,
        onClick = _ref.onClick,
        style = _ref.style;

    switch (library) {
        case 'material':
            return _react2.default.createElement(
                'i',
                _extends({ className: 'material-icons', onClick: onClick }, style),
                name
            );
        case 'font-awesome':
            var faCss = 'fa fa-' + name;
            return _react2.default.createElement('i', _extends({ className: faCss, onClick: onClick }, style));
        case 'font-custom':
            return _react2.default.createElement('span', { className: 'icon-' + name });
        default:
            return null;
    }
}

Icon.displayName = 'Icon';
Icon.defaultProps = {
    name: '',
    library: 'material'
};
Icon.propTypes = {
    handleOnClick: _react.PropTypes.func,
    library: _react.PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    name: _react.PropTypes.string
};

module.exports = Icon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJJY29uIiwibmFtZSIsImxpYnJhcnkiLCJvbkNsaWNrIiwic3R5bGUiLCJmYUNzcyIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiaGFuZGxlT25DbGljayIsImZ1bmMiLCJvbmVPZiIsInN0cmluZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxPQUErQztBQUFBLFFBQWhDQyxJQUFnQyxRQUFoQ0EsSUFBZ0M7QUFBQSxRQUExQkMsT0FBMEIsUUFBMUJBLE9BQTBCO0FBQUEsUUFBakJDLE9BQWlCLFFBQWpCQSxPQUFpQjtBQUFBLFFBQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFDM0MsWUFBUUYsT0FBUjtBQUNJLGFBQUssVUFBTDtBQUNJLG1CQUFPO0FBQUE7QUFBQSwyQkFBRyxXQUFVLGdCQUFiLEVBQThCLFNBQVNDLE9BQXZDLElBQW9EQyxLQUFwRDtBQUE0REg7QUFBNUQsYUFBUDtBQUNKLGFBQUssY0FBTDtBQUNJLGdCQUFNSSxtQkFBaUJKLElBQXZCO0FBQ0EsbUJBQU8sOENBQUcsV0FBV0ksS0FBZCxFQUFxQixTQUFTRixPQUE5QixJQUEyQ0MsS0FBM0MsRUFBUDtBQUNKLGFBQUssYUFBTDtBQUNJLG1CQUFPLHdDQUFNLHFCQUFtQkgsSUFBekIsR0FBUDtBQUNKO0FBQ0ksbUJBQU8sSUFBUDtBQVRSO0FBV0g7O0FBRURELEtBQUtNLFdBQUwsR0FBbUIsTUFBbkI7QUFDQU4sS0FBS08sWUFBTCxHQUFvQjtBQUNoQk4sVUFBTSxFQURVO0FBRWhCQyxhQUFTO0FBRk8sQ0FBcEI7QUFJQUYsS0FBS1EsU0FBTCxHQUFpQjtBQUNiQyxtQkFBZSxpQkFBVUMsSUFEWjtBQUViUixhQUFTLGlCQUFVUyxLQUFWLENBQWdCLENBQUMsVUFBRCxFQUFhLGNBQWIsRUFBNkIsYUFBN0IsQ0FBaEIsQ0FGSTtBQUdiVixVQUFNLGlCQUFVVztBQUhILENBQWpCOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCZCxJQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5cclxuZnVuY3Rpb24gSWNvbih7bmFtZSwgbGlicmFyeSwgb25DbGljaywgc3R5bGV9KSB7XHJcbiAgICBzd2l0Y2ggKGxpYnJhcnkpIHtcclxuICAgICAgICBjYXNlICdtYXRlcmlhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBvbkNsaWNrPXtvbkNsaWNrfSB7Li4uc3R5bGV9PntuYW1lfTwvaT47XHJcbiAgICAgICAgY2FzZSAnZm9udC1hd2Vzb21lJzpcclxuICAgICAgICAgICAgY29uc3QgZmFDc3MgPSBgZmEgZmEtJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9e2ZhQ3NzfSBvbkNsaWNrPXtvbkNsaWNrfSB7Li4uc3R5bGV9PjwvaT47XHJcbiAgICAgICAgY2FzZSAnZm9udC1jdXN0b20nOlxyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgaWNvbi0ke25hbWV9YH0+PC9zcGFuPjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuSWNvbi5kaXNwbGF5TmFtZSA9ICdJY29uJztcclxuSWNvbi5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGxpYnJhcnk6ICdtYXRlcmlhbCdcclxufTtcclxuSWNvbi5wcm9wVHlwZXMgPSB7XHJcbiAgICBoYW5kbGVPbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGxpYnJhcnk6IFByb3BUeXBlcy5vbmVPZihbJ21hdGVyaWFsJywgJ2ZvbnQtYXdlc29tZScsICdmb250LWN1c3RvbSddKSxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSWNvbjtcclxuIl19