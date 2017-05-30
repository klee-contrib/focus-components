'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _require = require('../../common/mixin/scroll'),
    scrollTo = _require.scrollTo,
    scrollPosition = _require.scrollPosition;

var ButtonBackToTop = function (_Component) {
    _inherits(ButtonBackToTop, _Component);

    function ButtonBackToTop() {
        var _temp, _this, _ret;

        _classCallCheck(this, ButtonBackToTop);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            isVisible: false
        }, _this._scrollSpy = function () {
            var currentScrollPosition = scrollPosition();
            if (currentScrollPosition.top > _this.props.scrollStart) {
                if (!_this.state.isVisible) {
                    _this.setState({ isVisible: true });
                }
            } else {
                if (_this.state.isVisible) {
                    _this.setState({ isVisible: false });
                }
            }
        }, _this.goBackToTop = function () {
            //TODO: Add animation
            scrollTo(undefined, 0);
        }, _this.render = function () {
            var isVisible = _this.state.isVisible;
            var _this$props = _this.props,
                labelIcon = _this$props.labelIcon,
                classNameIcon = _this$props.classNameIcon;

            if (labelIcon && classNameIcon) {
                return isVisible ? _react2.default.createElement(
                    'div',
                    { 'data-focus': 'back-to-top' },
                    _react2.default.createElement(_button2.default, { color: 'colored', handleOnClick: _this.goBackToTop, icon: 'expand_less',
                        labelIcon: labelIcon, classNameIcon: classNameIcon, shape: 'fab', type: 'button' })
                ) : null;
            }
            return isVisible ? _react2.default.createElement(
                'div',
                { 'data-focus': 'back-to-top' },
                _react2.default.createElement(_button2.default, { color: 'colored', handleOnClick: _this.goBackToTop, icon: 'expand_less', shape: 'fab', type: 'button' })
            ) : null;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
    * Component did mount, attach the scroll spy
    */
    ButtonBackToTop.prototype.componentDidMount = function componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    };

    ButtonBackToTop.prototype.componentWillUnmount = function componentWillUnmount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    };

    /**
    * The scroll event handler
    * @private
    */


    /**
    * Go back to the top of the page.
    */


    return ButtonBackToTop;
}(_react.Component);

ButtonBackToTop.defaultProps = {
    iconPrefix: 'fa fa-',
    iconName: 'arrow-circle-up',
    duration: 100,
    scrollStart: 100
};
ButtonBackToTop.propTypes = {
    iconPrefix: _react.PropTypes.string,
    iconName: _react.PropTypes.string,
    duration: _react.PropTypes.number,
    scrollStart: _react.PropTypes.number
};


ButtonBackToTop.displayName = 'ButtonBackToTop';
exports.default = ButtonBackToTop;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic2Nyb2xsVG8iLCJzY3JvbGxQb3NpdGlvbiIsIkJ1dHRvbkJhY2tUb1RvcCIsInN0YXRlIiwiaXNWaXNpYmxlIiwiX3Njcm9sbFNweSIsImN1cnJlbnRTY3JvbGxQb3NpdGlvbiIsInRvcCIsInByb3BzIiwic2Nyb2xsU3RhcnQiLCJzZXRTdGF0ZSIsImdvQmFja1RvVG9wIiwidW5kZWZpbmVkIiwicmVuZGVyIiwibGFiZWxJY29uIiwiY2xhc3NOYW1lSWNvbiIsImNvbXBvbmVudERpZE1vdW50IiwiX3Njcm9sbENhcnJpZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGVmYXVsdFByb3BzIiwiaWNvblByZWZpeCIsImljb25OYW1lIiwiZHVyYXRpb24iLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJudW1iZXIiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O2VBQ21DQSxRQUFRLDJCQUFSLEM7SUFBNUJDLFEsWUFBQUEsUTtJQUFVQyxjLFlBQUFBLGM7O0lBR1hDLGU7Ozs7Ozs7Ozs7OztnSkFnQkZDLEssR0FBUTtBQUNKQyx1QkFBVztBQURQLFMsUUF1QlJDLFUsR0FBYSxZQUFNO0FBQ2YsZ0JBQU1DLHdCQUF3QkwsZ0JBQTlCO0FBQ0EsZ0JBQUlLLHNCQUFzQkMsR0FBdEIsR0FBNEIsTUFBS0MsS0FBTCxDQUFXQyxXQUEzQyxFQUF3RDtBQUNwRCxvQkFBSSxDQUFDLE1BQUtOLEtBQUwsQ0FBV0MsU0FBaEIsRUFBMkI7QUFDdkIsMEJBQUtNLFFBQUwsQ0FBYyxFQUFFTixXQUFXLElBQWIsRUFBZDtBQUNIO0FBQ0osYUFKRCxNQUlPO0FBQ0gsb0JBQUksTUFBS0QsS0FBTCxDQUFXQyxTQUFmLEVBQTBCO0FBQ3RCLDBCQUFLTSxRQUFMLENBQWMsRUFBRU4sV0FBVyxLQUFiLEVBQWQ7QUFDSDtBQUNKO0FBQ0osUyxRQUtETyxXLEdBQWMsWUFBTTtBQUNoQjtBQUNBWCxxQkFBU1ksU0FBVCxFQUFvQixDQUFwQjtBQUNILFMsUUFFREMsTSxHQUFTLFlBQU07QUFBQSxnQkFDSlQsU0FESSxHQUNTLE1BQUtELEtBRGQsQ0FDSkMsU0FESTtBQUFBLDhCQUV3QixNQUFLSSxLQUY3QjtBQUFBLGdCQUVKTSxTQUZJLGVBRUpBLFNBRkk7QUFBQSxnQkFFT0MsYUFGUCxlQUVPQSxhQUZQOztBQUdYLGdCQUFJRCxhQUFhQyxhQUFqQixFQUFnQztBQUM1Qix1QkFBT1gsWUFBWTtBQUFBO0FBQUEsc0JBQUssY0FBVyxhQUFoQjtBQUE4QixzRUFBUSxPQUFNLFNBQWQsRUFBd0IsZUFBZSxNQUFLTyxXQUE1QyxFQUF5RCxNQUFLLGFBQTlEO0FBQzdDLG1DQUFXRyxTQURrQyxFQUN2QixlQUFlQyxhQURRLEVBQ08sT0FBTSxLQURiLEVBQ21CLE1BQUssUUFEeEI7QUFBOUIsaUJBQVosR0FDc0YsSUFEN0Y7QUFFSDtBQUNELG1CQUFPWCxZQUFZO0FBQUE7QUFBQSxrQkFBSyxjQUFXLGFBQWhCO0FBQThCLGtFQUFRLE9BQU0sU0FBZCxFQUF3QixlQUFlLE1BQUtPLFdBQTVDLEVBQXlELE1BQUssYUFBOUQsRUFBNEUsT0FBTSxLQUFsRixFQUF3RixNQUFLLFFBQTdGO0FBQTlCLGFBQVosR0FBMkosSUFBbEs7QUFDSCxTOzs7QUFoREQ7Ozs4QkFHQUssaUIsZ0NBQW9CO0FBQ2hCLGFBQUtDLGNBQUwsR0FBc0JDLE1BQXRCO0FBQ0EsYUFBS0QsY0FBTCxDQUFvQkUsZ0JBQXBCLENBQXFDLFFBQXJDLEVBQStDLEtBQUtkLFVBQXBEO0FBQ0EsYUFBS1ksY0FBTCxDQUFvQkUsZ0JBQXBCLENBQXFDLFFBQXJDLEVBQStDLEtBQUtkLFVBQXBEO0FBQ0EsYUFBS0EsVUFBTDtBQUNILEs7OzhCQUVEZSxvQixtQ0FBdUI7QUFDbkIsYUFBS0gsY0FBTCxDQUFvQkksbUJBQXBCLENBQXdDLFFBQXhDLEVBQWtELEtBQUtoQixVQUF2RDtBQUNBLGFBQUtZLGNBQUwsQ0FBb0JJLG1CQUFwQixDQUF3QyxRQUF4QyxFQUFrRCxLQUFLaEIsVUFBdkQ7QUFDSCxLOztBQUVEOzs7Ozs7QUFpQkE7Ozs7Ozs7O0FBcERFSCxlLENBRUtvQixZLEdBQWU7QUFDbEJDLGdCQUFZLFFBRE07QUFFbEJDLGNBQVUsaUJBRlE7QUFHbEJDLGNBQVUsR0FIUTtBQUlsQmhCLGlCQUFhO0FBSkssQztBQUZwQlAsZSxDQVNLd0IsUyxHQUFZO0FBQ2ZILGdCQUFZLGlCQUFVSSxNQURQO0FBRWZILGNBQVUsaUJBQVVHLE1BRkw7QUFHZkYsY0FBVSxpQkFBVUcsTUFITDtBQUlmbkIsaUJBQWEsaUJBQVVtQjtBQUpSLEM7OztBQThEdkIxQixnQkFBZ0IyQixXQUFoQixHQUE4QixpQkFBOUI7a0JBQ2UzQixlIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vYnV0dG9uJztcclxuY29uc3Qge3Njcm9sbFRvLCBzY3JvbGxQb3NpdGlvbn0gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vbWl4aW4vc2Nyb2xsJyk7XHJcblxyXG5cclxuY2xhc3MgQnV0dG9uQmFja1RvVG9wIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIGljb25QcmVmaXg6ICdmYSBmYS0nLFxyXG4gICAgICAgIGljb25OYW1lOiAnYXJyb3ctY2lyY2xlLXVwJyxcclxuICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgIHNjcm9sbFN0YXJ0OiAxMDBcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBpY29uUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGljb25OYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIHNjcm9sbFN0YXJ0OiBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGlzVmlzaWJsZTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBkaWQgbW91bnQsIGF0dGFjaCB0aGUgc2Nyb2xsIHNweVxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIgPSB3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxTcHkpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fc2Nyb2xsU3B5KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxTcHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbFNweSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9zY3JvbGxTcHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgc2Nyb2xsIGV2ZW50IGhhbmRsZXJcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfc2Nyb2xsU3B5ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHNjcm9sbFBvc2l0aW9uKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbi50b3AgPiB0aGlzLnByb3BzLnNjcm9sbFN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1Zpc2libGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1Zpc2libGU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogR28gYmFjayB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLlxyXG4gICAgKi9cclxuICAgIGdvQmFja1RvVG9wID0gKCkgPT4ge1xyXG4gICAgICAgIC8vVE9ETzogQWRkIGFuaW1hdGlvblxyXG4gICAgICAgIHNjcm9sbFRvKHVuZGVmaW5lZCwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aXNWaXNpYmxlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsSWNvbiwgY2xhc3NOYW1lSWNvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChsYWJlbEljb24gJiYgY2xhc3NOYW1lSWNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNWaXNpYmxlID8gPGRpdiBkYXRhLWZvY3VzPSdiYWNrLXRvLXRvcCc+PEJ1dHRvbiBjb2xvcj0nY29sb3JlZCcgaGFuZGxlT25DbGljaz17dGhpcy5nb0JhY2tUb1RvcH0gaWNvbj0nZXhwYW5kX2xlc3MnXHJcbiAgICAgICAgICAgICAgICBsYWJlbEljb249e2xhYmVsSWNvbn0gY2xhc3NOYW1lSWNvbj17Y2xhc3NOYW1lSWNvbn0gc2hhcGU9J2ZhYicgdHlwZT0nYnV0dG9uJyAvPjwvZGl2PiA6IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1Zpc2libGUgPyA8ZGl2IGRhdGEtZm9jdXM9J2JhY2stdG8tdG9wJz48QnV0dG9uIGNvbG9yPSdjb2xvcmVkJyBoYW5kbGVPbkNsaWNrPXt0aGlzLmdvQmFja1RvVG9wfSBpY29uPSdleHBhbmRfbGVzcycgc2hhcGU9J2ZhYicgdHlwZT0nYnV0dG9uJyAvPjwvZGl2PiA6IG51bGw7XHJcbiAgICB9O1xyXG59XHJcblxyXG5CdXR0b25CYWNrVG9Ub3AuZGlzcGxheU5hbWUgPSAnQnV0dG9uQmFja1RvVG9wJztcclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uQmFja1RvVG9wO1xyXG4iXX0=