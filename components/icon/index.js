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
        style = _ref.style;

    switch (library) {
        case 'material':
            return _react2.default.createElement(
                'i',
                _extends({ className: 'material-icons', onClick: onClick }, (0, _filterHtmlAttributes2.default)(style)),
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
    library: 'material'
};
Icon.propTypes = {
    onClick: _react.PropTypes.func,
    library: _react.PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    name: _react.PropTypes.string
};

module.exports = Icon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJJY29uIiwibmFtZSIsImxpYnJhcnkiLCJvbkNsaWNrIiwic3R5bGUiLCJmYUNzcyIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiZnVuYyIsIm9uZU9mIiwic3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLElBQVQsT0FBK0M7QUFBQSxRQUFoQ0MsSUFBZ0MsUUFBaENBLElBQWdDO0FBQUEsUUFBMUJDLE9BQTBCLFFBQTFCQSxPQUEwQjtBQUFBLFFBQWpCQyxPQUFpQixRQUFqQkEsT0FBaUI7QUFBQSxRQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQzNDLFlBQVFGLE9BQVI7QUFDSSxhQUFLLFVBQUw7QUFDSSxtQkFBTztBQUFBO0FBQUEsMkJBQUcsV0FBVSxnQkFBYixFQUE4QixTQUFTQyxPQUF2QyxJQUFvRCxvQ0FBWUMsS0FBWixDQUFwRDtBQUF5RUg7QUFBekUsYUFBUDtBQUNKLGFBQUssY0FBTDtBQUNJLGdCQUFNSSxtQkFBaUJKLElBQXZCO0FBQ0EsbUJBQU8sOENBQUcsV0FBV0ksS0FBZCxFQUFxQixTQUFTRixPQUE5QixJQUEyQyxvQ0FBWUMsS0FBWixDQUEzQyxFQUFQO0FBQ0osYUFBSyxhQUFMO0FBQ0ksbUJBQU8saURBQU0scUJBQW1CSCxJQUF6QixJQUFxQyxvQ0FBWUcsS0FBWixDQUFyQyxFQUFQO0FBQ0o7QUFDSSxtQkFBTyxJQUFQO0FBVFI7QUFXSDs7QUFFREosS0FBS00sV0FBTCxHQUFtQixNQUFuQjtBQUNBTixLQUFLTyxZQUFMLEdBQW9CO0FBQ2hCTixVQUFNLEVBRFU7QUFFaEJDLGFBQVM7QUFGTyxDQUFwQjtBQUlBRixLQUFLUSxTQUFMLEdBQWlCO0FBQ2JMLGFBQVMsaUJBQVVNLElBRE47QUFFYlAsYUFBUyxpQkFBVVEsS0FBVixDQUFnQixDQUFDLFVBQUQsRUFBYSxjQUFiLEVBQTZCLGFBQTdCLENBQWhCLENBRkk7QUFHYlQsVUFBTSxpQkFBVVU7QUFISCxDQUFqQjs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQmIsSUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5cclxuZnVuY3Rpb24gSWNvbih7bmFtZSwgbGlicmFyeSwgb25DbGljaywgc3R5bGV9KSB7XHJcbiAgICBzd2l0Y2ggKGxpYnJhcnkpIHtcclxuICAgICAgICBjYXNlICdtYXRlcmlhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBvbkNsaWNrPXtvbkNsaWNrfSB7Li4uZmlsdGVyUHJvcHMoc3R5bGUpfT57bmFtZX08L2k+O1xyXG4gICAgICAgIGNhc2UgJ2ZvbnQtYXdlc29tZSc6XHJcbiAgICAgICAgICAgIGNvbnN0IGZhQ3NzID0gYGZhIGZhLSR7bmFtZX1gO1xyXG4gICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtmYUNzc30gb25DbGljaz17b25DbGlja30gey4uLmZpbHRlclByb3BzKHN0eWxlKX0gLz47XHJcbiAgICAgICAgY2FzZSAnZm9udC1jdXN0b20nOlxyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgaWNvbi0ke25hbWV9YH0gey4uLmZpbHRlclByb3BzKHN0eWxlKX0vPjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSBcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSAnSWNvbic7XHJcbkljb24uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgbmFtZTogJycsXHJcbiAgICBsaWJyYXJ5OiAnbWF0ZXJpYWwnXHJcbn07XHJcbkljb24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBsaWJyYXJ5OiBQcm9wVHlwZXMub25lT2YoWydtYXRlcmlhbCcsICdmb250LWF3ZXNvbWUnLCAnZm9udC1jdXN0b20nXSksXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEljb247XHJcbiJdfQ==