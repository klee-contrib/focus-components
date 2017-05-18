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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic2Nyb2xsVG8iLCJzY3JvbGxQb3NpdGlvbiIsIkJ1dHRvbkJhY2tUb1RvcCIsInN0YXRlIiwiaXNWaXNpYmxlIiwiX3Njcm9sbFNweSIsImN1cnJlbnRTY3JvbGxQb3NpdGlvbiIsInRvcCIsInByb3BzIiwic2Nyb2xsU3RhcnQiLCJzZXRTdGF0ZSIsImdvQmFja1RvVG9wIiwidW5kZWZpbmVkIiwicmVuZGVyIiwiY29tcG9uZW50RGlkTW91bnQiLCJfc2Nyb2xsQ2FycmllciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZWZhdWx0UHJvcHMiLCJpY29uUHJlZml4IiwiaWNvbk5hbWUiLCJkdXJhdGlvbiIsInByb3BUeXBlcyIsInN0cmluZyIsIm51bWJlciIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7ZUFDbUNBLFFBQVEsMkJBQVIsQztJQUE1QkMsUSxZQUFBQSxRO0lBQVVDLGMsWUFBQUEsYzs7SUFHWEMsZTs7Ozs7Ozs7Ozs7O2dKQWdCRkMsSyxHQUFRO0FBQ0pDLHVCQUFXO0FBRFAsUyxRQXVCUkMsVSxHQUFhLFlBQU07QUFDZixnQkFBTUMsd0JBQXdCTCxnQkFBOUI7QUFDQSxnQkFBSUssc0JBQXNCQyxHQUF0QixHQUE0QixNQUFLQyxLQUFMLENBQVdDLFdBQTNDLEVBQXdEO0FBQ3BELG9CQUFJLENBQUMsTUFBS04sS0FBTCxDQUFXQyxTQUFoQixFQUEyQjtBQUN2QiwwQkFBS00sUUFBTCxDQUFjLEVBQUNOLFdBQVcsSUFBWixFQUFkO0FBQ0g7QUFDSixhQUpELE1BSU87QUFDSCxvQkFBSSxNQUFLRCxLQUFMLENBQVdDLFNBQWYsRUFBMEI7QUFDdEIsMEJBQUtNLFFBQUwsQ0FBYyxFQUFDTixXQUFXLEtBQVosRUFBZDtBQUNIO0FBQ0o7QUFDSixTLFFBS0RPLFcsR0FBYyxZQUFNO0FBQ2hCO0FBQ0FYLHFCQUFTWSxTQUFULEVBQW9CLENBQXBCO0FBQ0gsUyxRQUVEQyxNLEdBQVMsWUFBTTtBQUFBLGdCQUNKVCxTQURJLEdBQ1MsTUFBS0QsS0FEZCxDQUNKQyxTQURJOztBQUVYLG1CQUFPQSxZQUFZO0FBQUE7QUFBQSxrQkFBSyxjQUFXLGFBQWhCO0FBQThCLGtFQUFRLE9BQU0sU0FBZCxFQUF3QixlQUFlLE1BQUtPLFdBQTVDLEVBQXlELE1BQUssYUFBOUQsRUFBNEUsT0FBTSxLQUFsRixFQUF3RixNQUFLLFFBQTdGO0FBQTlCLGFBQVosR0FBMkosSUFBbEs7QUFDSCxTOzs7QUEzQ0Q7Ozs4QkFHQUcsaUIsZ0NBQW9CO0FBQ2hCLGFBQUtDLGNBQUwsR0FBc0JDLE1BQXRCO0FBQ0EsYUFBS0QsY0FBTCxDQUFvQkUsZ0JBQXBCLENBQXFDLFFBQXJDLEVBQStDLEtBQUtaLFVBQXBEO0FBQ0EsYUFBS1UsY0FBTCxDQUFvQkUsZ0JBQXBCLENBQXFDLFFBQXJDLEVBQStDLEtBQUtaLFVBQXBEO0FBQ0EsYUFBS0EsVUFBTDtBQUNILEs7OzhCQUVEYSxvQixtQ0FBdUI7QUFDbkIsYUFBS0gsY0FBTCxDQUFvQkksbUJBQXBCLENBQXdDLFFBQXhDLEVBQWtELEtBQUtkLFVBQXZEO0FBQ0EsYUFBS1UsY0FBTCxDQUFvQkksbUJBQXBCLENBQXdDLFFBQXhDLEVBQWtELEtBQUtkLFVBQXZEO0FBQ0gsSzs7QUFFRDs7Ozs7O0FBaUJBOzs7Ozs7OztBQXBERUgsZSxDQUVLa0IsWSxHQUFlO0FBQ2xCQyxnQkFBWSxRQURNO0FBRWxCQyxjQUFVLGlCQUZRO0FBR2xCQyxjQUFVLEdBSFE7QUFJbEJkLGlCQUFhO0FBSkssQztBQUZwQlAsZSxDQVNLc0IsUyxHQUFZO0FBQ2ZILGdCQUFZLGlCQUFVSSxNQURQO0FBRWZILGNBQVUsaUJBQVVHLE1BRkw7QUFHZkYsY0FBVSxpQkFBVUcsTUFITDtBQUlmakIsaUJBQWEsaUJBQVVpQjtBQUpSLEM7OztBQXlEdkJ4QixnQkFBZ0J5QixXQUFoQixHQUE4QixpQkFBOUI7a0JBQ2V6QixlIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL2J1dHRvbic7XHJcbmNvbnN0IHtzY3JvbGxUbywgc2Nyb2xsUG9zaXRpb259ID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL21peGluL3Njcm9sbCcpO1xyXG5cclxuXHJcbmNsYXNzIEJ1dHRvbkJhY2tUb1RvcCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBpY29uUHJlZml4OiAnZmEgZmEtJyxcclxuICAgICAgICBpY29uTmFtZTogJ2Fycm93LWNpcmNsZS11cCcsXHJcbiAgICAgICAgZHVyYXRpb246IDEwMCxcclxuICAgICAgICBzY3JvbGxTdGFydDogMTAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgaWNvblByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBpY29uTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBzY3JvbGxTdGFydDogUHJvcFR5cGVzLm51bWJlclxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBpc1Zpc2libGU6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQgZGlkIG1vdW50LCBhdHRhY2ggdGhlIHNjcm9sbCBzcHlcclxuICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyID0gd2luZG93O1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsU3B5KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Njcm9sbFNweSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsU3B5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxTcHkpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fc2Nyb2xsU3B5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogVGhlIHNjcm9sbCBldmVudCBoYW5kbGVyXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3Njcm9sbFNweSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBzY3JvbGxQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24udG9wID4gdGhpcy5wcm9wcy5zY3JvbGxTdGFydCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1Zpc2libGU6IHRydWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNWaXNpYmxlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogR28gYmFjayB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLlxyXG4gICAgKi9cclxuICAgIGdvQmFja1RvVG9wID0gKCkgPT4ge1xyXG4gICAgICAgIC8vVE9ETzogQWRkIGFuaW1hdGlvblxyXG4gICAgICAgIHNjcm9sbFRvKHVuZGVmaW5lZCwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aXNWaXNpYmxlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIGlzVmlzaWJsZSA/IDxkaXYgZGF0YS1mb2N1cz0nYmFjay10by10b3AnPjxCdXR0b24gY29sb3I9J2NvbG9yZWQnIGhhbmRsZU9uQ2xpY2s9e3RoaXMuZ29CYWNrVG9Ub3B9IGljb249J2V4cGFuZF9sZXNzJyBzaGFwZT0nZmFiJyB0eXBlPSdidXR0b24nIC8+PC9kaXY+IDogbnVsbDtcclxuICAgIH07XHJcbn1cclxuXHJcbkJ1dHRvbkJhY2tUb1RvcC5kaXNwbGF5TmFtZSA9ICdCdXR0b25CYWNrVG9Ub3AnO1xyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25CYWNrVG9Ub3A7XHJcbiJdfQ==