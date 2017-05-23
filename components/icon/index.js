'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Icon(_ref) {
    var name = _ref.name,
        library = _ref.library,
        onClick = _ref.onClick,
        style = _ref.style,
        ariaHidden = _ref.ariaHidden;

    switch (library) {
        case 'material':
            return _react2.default.createElement(
                'i',
                _extends({ className: 'material-icons', onClick: onClick, 'aria-hidden': ariaHidden }, style),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJJY29uIiwibmFtZSIsImxpYnJhcnkiLCJvbkNsaWNrIiwic3R5bGUiLCJhcmlhSGlkZGVuIiwiZmFDc3MiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsImhhbmRsZU9uQ2xpY2siLCJmdW5jIiwib25lT2YiLCJzdHJpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7OztBQUVBLFNBQVNBLElBQVQsT0FBMkQ7QUFBQSxRQUE1Q0MsSUFBNEMsUUFBNUNBLElBQTRDO0FBQUEsUUFBdENDLE9BQXNDLFFBQXRDQSxPQUFzQztBQUFBLFFBQTdCQyxPQUE2QixRQUE3QkEsT0FBNkI7QUFBQSxRQUFwQkMsS0FBb0IsUUFBcEJBLEtBQW9CO0FBQUEsUUFBYkMsVUFBYSxRQUFiQSxVQUFhOztBQUN2RCxZQUFRSCxPQUFSO0FBQ0ksYUFBSyxVQUFMO0FBQ0ksbUJBQU87QUFBQTtBQUFBLDJCQUFHLFdBQVUsZ0JBQWIsRUFBOEIsU0FBU0MsT0FBdkMsRUFBZ0QsZUFBYUUsVUFBN0QsSUFBNkVELEtBQTdFO0FBQXFGSDtBQUFyRixhQUFQO0FBQ0osYUFBSyxjQUFMO0FBQ0ksZ0JBQU1LLG1CQUFpQkwsSUFBdkI7QUFDQSxtQkFBTyw4Q0FBRyxXQUFXSyxLQUFkLEVBQXFCLFNBQVNILE9BQTlCLElBQTJDQyxLQUEzQyxFQUFQO0FBQ0osYUFBSyxhQUFMO0FBQ0ksbUJBQU8sd0NBQU0scUJBQW1CSCxJQUF6QixHQUFQO0FBQ0o7QUFDSSxtQkFBTyxJQUFQO0FBVFI7QUFXSDs7QUFFREQsS0FBS08sV0FBTCxHQUFtQixNQUFuQjtBQUNBUCxLQUFLUSxZQUFMLEdBQW9CO0FBQ2hCUCxVQUFNLEVBRFU7QUFFaEJDLGFBQVM7QUFGTyxDQUFwQjtBQUlBRixLQUFLUyxTQUFMLEdBQWlCO0FBQ2JDLG1CQUFlLGlCQUFVQyxJQURaO0FBRWJULGFBQVMsaUJBQVVVLEtBQVYsQ0FBZ0IsQ0FBQyxVQUFELEVBQWEsY0FBYixFQUE2QixhQUE3QixDQUFoQixDQUZJO0FBR2JYLFVBQU0saUJBQVVZO0FBSEgsQ0FBakI7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUJmLElBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmZ1bmN0aW9uIEljb24oe25hbWUsIGxpYnJhcnksIG9uQ2xpY2ssIHN0eWxlLCBhcmlhSGlkZGVufSkge1xyXG4gICAgc3dpdGNoIChsaWJyYXJ5KSB7XHJcbiAgICAgICAgY2FzZSAnbWF0ZXJpYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgb25DbGljaz17b25DbGlja30gYXJpYS1oaWRkZW49e2FyaWFIaWRkZW59IHsuLi5zdHlsZX0+e25hbWV9PC9pPjtcclxuICAgICAgICBjYXNlICdmb250LWF3ZXNvbWUnOlxyXG4gICAgICAgICAgICBjb25zdCBmYUNzcyA9IGBmYSBmYS0ke25hbWV9YDtcclxuICAgICAgICAgICAgcmV0dXJuIDxpIGNsYXNzTmFtZT17ZmFDc3N9IG9uQ2xpY2s9e29uQ2xpY2t9IHsuLi5zdHlsZX0+PC9pPjtcclxuICAgICAgICBjYXNlICdmb250LWN1c3RvbSc6XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2BpY29uLSR7bmFtZX1gfT48L3NwYW4+O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5JY29uLmRpc3BsYXlOYW1lID0gJ0ljb24nO1xyXG5JY29uLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIG5hbWU6ICcnLFxyXG4gICAgbGlicmFyeTogJ21hdGVyaWFsJ1xyXG59O1xyXG5JY29uLnByb3BUeXBlcyA9IHtcclxuICAgIGhhbmRsZU9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgbGlicmFyeTogUHJvcFR5cGVzLm9uZU9mKFsnbWF0ZXJpYWwnLCAnZm9udC1hd2Vzb21lJywgJ2ZvbnQtY3VzdG9tJ10pLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJY29uO1xyXG4iXX0=