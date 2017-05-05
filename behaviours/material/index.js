'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('material-design-lite/material');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Material = function Material(ref, jsClass, watchedProp) {
    return function (Component) {
        return function (_Component) {
            _inherits(MaterialComponent, _Component);

            function MaterialComponent() {
                _classCallCheck(this, MaterialComponent);

                return _possibleConstructorReturn(this, _Component.apply(this, arguments));
            }

            MaterialComponent.prototype.componentDidMount = function componentDidMount() {
                var refNode = _reactDom2.default.findDOMNode(this.refs[ref]);
                if (refNode) {
                    componentHandler.upgradeElement(refNode, jsClass);
                }
                if (Component.prototype.componentDidMount) {
                    Component.prototype.componentDidMount.call(this);
                }
            };

            MaterialComponent.prototype.componentWillUnmount = function componentWillUnmount() {
                var refNode = _reactDom2.default.findDOMNode(this.refs[ref]);
                if (refNode) {
                    componentHandler.downgradeElements(refNode, jsClass);
                }
                if (Component.prototype.componentWillUnmount) {
                    Component.prototype.componentWillUnmount.call(this);
                }
            };

            MaterialComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                watchedProp = watchedProp || 'error';
                var newWatchedProp = nextProps[watchedProp];
                if (newWatchedProp !== this.props[watchedProp]) {
                    var refNode = _reactDom2.default.findDOMNode(this.refs[ref]);
                    componentHandler.upgradeElement(refNode, jsClass);
                }
                if (Component.prototype.componentWillReceiveProps) {
                    Component.prototype.componentWillReceiveProps.call(this, nextProps);
                }
            };

            return MaterialComponent;
        }(Component);
    };
};

Material.componentHandler = componentHandler;

exports.default = Material;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNYXRlcmlhbCIsInJlZiIsImpzQ2xhc3MiLCJ3YXRjaGVkUHJvcCIsImNvbXBvbmVudERpZE1vdW50IiwicmVmTm9kZSIsImZpbmRET01Ob2RlIiwicmVmcyIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsIkNvbXBvbmVudCIsInByb3RvdHlwZSIsImNhbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvd25ncmFkZUVsZW1lbnRzIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsIm5ld1dhdGNoZWRQcm9wIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBZUMsV0FBZjtBQUFBLFdBQStCO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUEsd0NBQzVDQyxpQkFENEMsZ0NBQ3hCO0FBQ2hCLG9CQUFNQyxVQUFVLG1CQUFTQyxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVU4sR0FBVixDQUFyQixDQUFoQjtBQUNBLG9CQUFJSSxPQUFKLEVBQWE7QUFDVEcscUNBQWlCQyxjQUFqQixDQUFnQ0osT0FBaEMsRUFBeUNILE9BQXpDO0FBQ0g7QUFDRCxvQkFBSVEsVUFBVUMsU0FBVixDQUFvQlAsaUJBQXhCLEVBQTJDO0FBQ3ZDTSw4QkFBVUMsU0FBVixDQUFvQlAsaUJBQXBCLENBQXNDUSxJQUF0QyxDQUEyQyxJQUEzQztBQUNIO0FBQ0osYUFUMkM7O0FBQUEsd0NBVzVDQyxvQkFYNEMsbUNBV3JCO0FBQ25CLG9CQUFNUixVQUFVLG1CQUFTQyxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVU4sR0FBVixDQUFyQixDQUFoQjtBQUNBLG9CQUFJSSxPQUFKLEVBQWE7QUFDVEcscUNBQWlCTSxpQkFBakIsQ0FBbUNULE9BQW5DLEVBQTRDSCxPQUE1QztBQUNIO0FBQ0Qsb0JBQUlRLFVBQVVDLFNBQVYsQ0FBb0JFLG9CQUF4QixFQUE4QztBQUMxQ0gsOEJBQVVDLFNBQVYsQ0FBb0JFLG9CQUFwQixDQUF5Q0QsSUFBekMsQ0FBOEMsSUFBOUM7QUFDSDtBQUNKLGFBbkIyQzs7QUFBQSx3Q0FxQjVDRyx5QkFyQjRDLHNDQXFCbEJDLFNBckJrQixFQXFCUDtBQUNqQ2IsOEJBQWNBLGVBQWUsT0FBN0I7QUFDQSxvQkFBTWMsaUJBQWlCRCxVQUFVYixXQUFWLENBQXZCO0FBQ0Esb0JBQUljLG1CQUFtQixLQUFLQyxLQUFMLENBQVdmLFdBQVgsQ0FBdkIsRUFBZ0Q7QUFDNUMsd0JBQU1FLFVBQVUsbUJBQVNDLFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVTixHQUFWLENBQXJCLENBQWhCO0FBQ0FPLHFDQUFpQkMsY0FBakIsQ0FBZ0NKLE9BQWhDLEVBQXlDSCxPQUF6QztBQUNIO0FBQ0Qsb0JBQUlRLFVBQVVDLFNBQVYsQ0FBb0JJLHlCQUF4QixFQUFtRDtBQUMvQ0wsOEJBQVVDLFNBQVYsQ0FBb0JJLHlCQUFwQixDQUE4Q0gsSUFBOUMsQ0FBbUQsSUFBbkQsRUFBeURJLFNBQXpEO0FBQ0g7QUFDSixhQS9CMkM7O0FBQUE7QUFBQSxVQUE2Q04sU0FBN0M7QUFBQSxLQUEvQjtBQUFBLENBQWpCOztBQWtDQVYsU0FBU1EsZ0JBQVQsR0FBNEJBLGdCQUE1Qjs7a0JBRWVSLFEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCAnbWF0ZXJpYWwtZGVzaWduLWxpdGUvbWF0ZXJpYWwnO1xyXG5cclxuY29uc3QgTWF0ZXJpYWwgPSAocmVmLCBqc0NsYXNzLCB3YXRjaGVkUHJvcCkgPT4gQ29tcG9uZW50ID0+IGNsYXNzIE1hdGVyaWFsQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHJlZk5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbcmVmXSk7XHJcbiAgICAgICAgaWYgKHJlZk5vZGUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChyZWZOb2RlLCBqc0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQpIHtcclxuICAgICAgICAgICAgQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjb25zdCByZWZOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzW3JlZl0pO1xyXG4gICAgICAgIGlmIChyZWZOb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEhhbmRsZXIuZG93bmdyYWRlRWxlbWVudHMocmVmTm9kZSwganNDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDb21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50KSB7XHJcbiAgICAgICAgICAgIENvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQuY2FsbCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICB3YXRjaGVkUHJvcCA9IHdhdGNoZWRQcm9wIHx8ICdlcnJvcic7XHJcbiAgICAgICAgY29uc3QgbmV3V2F0Y2hlZFByb3AgPSBuZXh0UHJvcHNbd2F0Y2hlZFByb3BdO1xyXG4gICAgICAgIGlmIChuZXdXYXRjaGVkUHJvcCAhPT0gdGhpcy5wcm9wc1t3YXRjaGVkUHJvcF0pIHtcclxuICAgICAgICAgICAgY29uc3QgcmVmTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1tyZWZdKTtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChyZWZOb2RlLCBqc0NsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykge1xyXG4gICAgICAgICAgICBDb21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMuY2FsbCh0aGlzLCBuZXh0UHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbk1hdGVyaWFsLmNvbXBvbmVudEhhbmRsZXIgPSBjb21wb25lbnRIYW5kbGVyO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWF0ZXJpYWw7XHJcbiJdfQ==