'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//Needed components
var React = require('react');
var Component = React.Component;

var Header = require('../header').component;
var Cartridge = require('../cartridge').component;
var ContentBar = require('../content-bar').component;
var Bar = require('../bar').component;
var ContentActions = require('../content-actions').component;
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
        return React.createElement(
            Header,
            null,
            React.createElement(
                ContentBar,
                null,
                React.createElement(Bar, null),
                React.createElement(Cartridge, null)
            ),
            React.createElement(ContentActions, null)
        );
    };

    return AppHeader;
}(Component);
// static props


AppHeader.displayName = 'AppHeader';

module.exports = AppHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJDb21wb25lbnQiLCJIZWFkZXIiLCJjb21wb25lbnQiLCJDYXJ0cmlkZ2UiLCJDb250ZW50QmFyIiwiQmFyIiwiQ29udGVudEFjdGlvbnMiLCJBcHBIZWFkZXIiLCJyZW5kZXIiLCJkaXNwbGF5TmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0lBQ09DLFMsR0FBYUYsSyxDQUFiRSxTOztBQUNQLElBQU1DLFNBQVNGLFFBQVEsV0FBUixFQUFxQkcsU0FBcEM7QUFDQSxJQUFNQyxZQUFZSixRQUFRLGNBQVIsRUFBd0JHLFNBQTFDO0FBQ0EsSUFBTUUsYUFBYUwsUUFBUSxnQkFBUixFQUEwQkcsU0FBN0M7QUFDQSxJQUFNRyxNQUFNTixRQUFRLFFBQVIsRUFBa0JHLFNBQTlCO0FBQ0EsSUFBTUksaUJBQWlCUCxRQUFRLG9CQUFSLEVBQThCRyxTQUFyRDtBQUNBOzs7O0lBR01LLFM7Ozs7Ozs7Ozt3QkFDRkMsTSxxQkFBUztBQUNMLGVBQ0k7QUFBQyxrQkFBRDtBQUFBO0FBQ0k7QUFBQywwQkFBRDtBQUFBO0FBQ0ksb0NBQUMsR0FBRCxPQURKO0FBRUksb0NBQUMsU0FBRDtBQUZKLGFBREo7QUFLSSxnQ0FBQyxjQUFEO0FBTEosU0FESjtBQVNILEs7OztFQVhtQlIsUztBQWF4Qjs7O0FBQ0FPLFVBQVVFLFdBQVYsR0FBd0IsV0FBeEI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJKLFNBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vTmVlZGVkIGNvbXBvbmVudHNcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCB7Q29tcG9uZW50fSA9IFJlYWN0O1xyXG5jb25zdCBIZWFkZXIgPSByZXF1aXJlKCcuLi9oZWFkZXInKS5jb21wb25lbnQ7XHJcbmNvbnN0IENhcnRyaWRnZSA9IHJlcXVpcmUoJy4uL2NhcnRyaWRnZScpLmNvbXBvbmVudDtcclxuY29uc3QgQ29udGVudEJhciA9IHJlcXVpcmUoJy4uL2NvbnRlbnQtYmFyJykuY29tcG9uZW50O1xyXG5jb25zdCBCYXIgPSByZXF1aXJlKCcuLi9iYXInKS5jb21wb25lbnQ7XHJcbmNvbnN0IENvbnRlbnRBY3Rpb25zID0gcmVxdWlyZSgnLi4vY29udGVudC1hY3Rpb25zJykuY29tcG9uZW50O1xyXG4vKipcclxuICogQXBwbGljYXRpb24gaGVhZGVyXHJcbiAqL1xyXG5jbGFzcyBBcHBIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8Q29udGVudEJhcj5cclxuICAgICAgICAgICAgICAgICAgICA8QmFyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPENhcnRyaWRnZSAvPlxyXG4gICAgICAgICAgICAgICAgPC9Db250ZW50QmFyPlxyXG4gICAgICAgICAgICAgICAgPENvbnRlbnRBY3Rpb25zIC8+XHJcbiAgICAgICAgICAgIDwvSGVhZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuLy8gc3RhdGljIHByb3BzXHJcbkFwcEhlYWRlci5kaXNwbGF5TmFtZSA9ICdBcHBIZWFkZXInO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcHBIZWFkZXI7XHJcbiJdfQ==