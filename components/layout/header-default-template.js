'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerScrolling = require('./header-scrolling');

var _headerScrolling2 = _interopRequireDefault(_headerScrolling);

var _headerTopRow = require('./header-top-row');

var _headerTopRow2 = _interopRequireDefault(_headerTopRow);

var _headerContent = require('./header-content');

var _headerContent2 = _interopRequireDefault(_headerContent);

var _headerActions = require('./header-actions');

var _headerActions2 = _interopRequireDefault(_headerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } //Needed components


/**
 * Application header
 */
var AppHeader = function (_Component) {
    _inherits(AppHeader, _Component);

    function AppHeader() {
        _classCallCheck(this, AppHeader);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    AppHeader.prototype.render = function render() {
        return _react2.default.createElement(
            _headerScrolling2.default,
            null,
            _react2.default.createElement(_headerTopRow2.default, null),
            _react2.default.createElement(_headerContent2.default, null),
            _react2.default.createElement(_headerActions2.default, null)
        );
    };

    return AppHeader;
}(_react.Component);
// static props


AppHeader.displayName = 'AppHeader';

module.exports = AppHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBcHBIZWFkZXIiLCJyZW5kZXIiLCJkaXNwbGF5TmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OytlQUxBOzs7QUFNQTs7O0lBR01BLFM7Ozs7Ozs7Ozt3QkFDRkMsTSxxQkFBUztBQUNMLGVBQ0k7QUFBQTtBQUFBO0FBQ0ksdUVBREo7QUFFSSx3RUFGSjtBQUdJO0FBSEosU0FESjtBQU9ILEs7Ozs7QUFFTDs7O0FBQ0FELFVBQVVFLFdBQVYsR0FBd0IsV0FBeEI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJKLFNBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vTmVlZGVkIGNvbXBvbmVudHNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBIZWFkZXJTY3JvbGxpbmcgZnJvbSAnLi9oZWFkZXItc2Nyb2xsaW5nJztcclxuaW1wb3J0IEhlYWRlclRvcFJvdyBmcm9tICcuL2hlYWRlci10b3Atcm93JztcclxuaW1wb3J0IEhlYWRlckNvbnRlbnQgZnJvbSAnLi9oZWFkZXItY29udGVudCc7XHJcbmltcG9ydCBIZWFkZXJBY3Rpb25zIGZyb20gJy4vaGVhZGVyLWFjdGlvbnMnO1xyXG4vKipcclxuICogQXBwbGljYXRpb24gaGVhZGVyXHJcbiAqL1xyXG5jbGFzcyBBcHBIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxIZWFkZXJTY3JvbGxpbmc+XHJcbiAgICAgICAgICAgICAgICA8SGVhZGVyVG9wUm93IC8+XHJcbiAgICAgICAgICAgICAgICA8SGVhZGVyQ29udGVudCAvPlxyXG4gICAgICAgICAgICAgICAgPEhlYWRlckFjdGlvbnMgLz5cclxuICAgICAgICAgICAgPC9IZWFkZXJTY3JvbGxpbmc+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4vLyBzdGF0aWMgcHJvcHNcclxuQXBwSGVhZGVyLmRpc3BsYXlOYW1lID0gJ0FwcEhlYWRlcic7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFwcEhlYWRlcjtcclxuIl19