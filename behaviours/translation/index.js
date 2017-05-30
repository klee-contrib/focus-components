'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _translation = require('focus-core/translation');

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Translation = function Translation(Component) {
    return function (_Component) {
        _inherits(TranslatedComponent, _Component);

        function TranslatedComponent(props) {
            _classCallCheck(this, TranslatedComponent);

            var _this = _possibleConstructorReturn(this, _Component.call(this, props));

            _this.i18n = _translation.translate;
            return _this;
        }

        return TranslatedComponent;
    }(Component);
};

exports.default = Translation;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUcmFuc2xhdGlvbiIsInByb3BzIiwiaTE4biIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWM7QUFBQTtBQUFBOztBQUNoQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHlEQUNmLHNCQUFNQSxLQUFOLENBRGU7O0FBRWYsa0JBQUtDLElBQUw7QUFGZTtBQUdsQjs7QUFKZTtBQUFBLE1BQStDQyxTQUEvQztBQUFBLENBQXBCOztrQkFRZUgsVyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcblxyXG5jb25zdCBUcmFuc2xhdGlvbiA9IENvbXBvbmVudCA9PiBjbGFzcyBUcmFuc2xhdGVkQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaTE4biA9IHRyYW5zbGF0ZTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUcmFuc2xhdGlvbjtcclxuIl19