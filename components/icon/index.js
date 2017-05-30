'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filterHtmlAttributes = require('../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

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
                _extends({ className: 'material-icons', onClick: onClick, 'aria-hidden': ariaHidden }, (0, _filterHtmlAttributes2.default)(style)),
                name
            );
        case 'font-awesome':
            var faCss = 'fa fa-' + name;
            return _react2.default.createElement('i', _extends({ className: faCss, onClick: onClick }, (0, _filterHtmlAttributes2.default)(style)));
        case 'font-custom':
            return _react2.default.createElement('span', _extends({ className: 'icon-' + name }, (0, _filterHtmlAttributes2.default)(style)));
        default:
            return null;
    }
}

Icon.displayName = 'Icon';
Icon.defaultProps = {
    name: '',
    library: 'material',
    ariaHidden: false
};
Icon.propTypes = {
    onClick: _react.PropTypes.func,
    library: _react.PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    name: _react.PropTypes.string
};

module.exports = Icon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJJY29uIiwibmFtZSIsImxpYnJhcnkiLCJvbkNsaWNrIiwic3R5bGUiLCJhcmlhSGlkZGVuIiwiZmFDc3MiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsImZ1bmMiLCJvbmVPZiIsInN0cmluZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxJQUFULE9BQTJEO0FBQUEsUUFBNUNDLElBQTRDLFFBQTVDQSxJQUE0QztBQUFBLFFBQXRDQyxPQUFzQyxRQUF0Q0EsT0FBc0M7QUFBQSxRQUE3QkMsT0FBNkIsUUFBN0JBLE9BQTZCO0FBQUEsUUFBcEJDLEtBQW9CLFFBQXBCQSxLQUFvQjtBQUFBLFFBQWJDLFVBQWEsUUFBYkEsVUFBYTs7QUFDdkQsWUFBUUgsT0FBUjtBQUNJLGFBQUssVUFBTDtBQUNJLG1CQUFPO0FBQUE7QUFBQSwyQkFBRyxXQUFVLGdCQUFiLEVBQThCLFNBQVNDLE9BQXZDLEVBQWdELGVBQWFFLFVBQTdELElBQTZFLG9DQUFZRCxLQUFaLENBQTdFO0FBQWtHSDtBQUFsRyxhQUFQO0FBQ0osYUFBSyxjQUFMO0FBQ0ksZ0JBQU1LLG1CQUFpQkwsSUFBdkI7QUFDQSxtQkFBTyw4Q0FBRyxXQUFXSyxLQUFkLEVBQXFCLFNBQVNILE9BQTlCLElBQTJDLG9DQUFZQyxLQUFaLENBQTNDLEVBQVA7QUFDSixhQUFLLGFBQUw7QUFDSSxtQkFBTyxpREFBTSxxQkFBbUJILElBQXpCLElBQXFDLG9DQUFZRyxLQUFaLENBQXJDLEVBQVA7QUFDSjtBQUNJLG1CQUFPLElBQVA7QUFUUjtBQVdIOztBQUVESixLQUFLTyxXQUFMLEdBQW1CLE1BQW5CO0FBQ0FQLEtBQUtRLFlBQUwsR0FBb0I7QUFDaEJQLFVBQU0sRUFEVTtBQUVoQkMsYUFBUyxVQUZPO0FBR25CRyxnQkFBWTtBQUhPLENBQXBCO0FBS0FMLEtBQUtTLFNBQUwsR0FBaUI7QUFDYk4sYUFBUyxpQkFBVU8sSUFETjtBQUViUixhQUFTLGlCQUFVUyxLQUFWLENBQWdCLENBQUMsVUFBRCxFQUFhLGNBQWIsRUFBNkIsYUFBN0IsQ0FBaEIsQ0FGSTtBQUdiVixVQUFNLGlCQUFVVztBQUhILENBQWpCOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCZCxJQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcblxyXG5mdW5jdGlvbiBJY29uKHtuYW1lLCBsaWJyYXJ5LCBvbkNsaWNrLCBzdHlsZSwgYXJpYUhpZGRlbn0pIHtcclxuICAgIHN3aXRjaCAobGlicmFyeSkge1xyXG4gICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgcmV0dXJuIDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnIG9uQ2xpY2s9e29uQ2xpY2t9IGFyaWEtaGlkZGVuPXthcmlhSGlkZGVufSB7Li4uZmlsdGVyUHJvcHMoc3R5bGUpfT57bmFtZX08L2k+O1xyXG4gICAgICAgIGNhc2UgJ2ZvbnQtYXdlc29tZSc6XHJcbiAgICAgICAgICAgIGNvbnN0IGZhQ3NzID0gYGZhIGZhLSR7bmFtZX1gO1xyXG4gICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtmYUNzc30gb25DbGljaz17b25DbGlja30gey4uLmZpbHRlclByb3BzKHN0eWxlKX0gLz47XHJcbiAgICAgICAgY2FzZSAnZm9udC1jdXN0b20nOlxyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgaWNvbi0ke25hbWV9YH0gey4uLmZpbHRlclByb3BzKHN0eWxlKX0vPjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSBcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSAnSWNvbic7XHJcbkljb24uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgbmFtZTogJycsXHJcbiAgICBsaWJyYXJ5OiAnbWF0ZXJpYWwnLFxyXG5cdGFyaWFIaWRkZW46IGZhbHNlXHJcbn07XHJcbkljb24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBsaWJyYXJ5OiBQcm9wVHlwZXMub25lT2YoWydtYXRlcmlhbCcsICdmb250LWF3ZXNvbWUnLCAnZm9udC1jdXN0b20nXSksXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEljb247XHJcbiJdfQ==