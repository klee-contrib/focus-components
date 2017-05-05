'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DraggableIframe = function (_React$Component) {
    _inherits(DraggableIframe, _React$Component);

    function DraggableIframe(props) {
        _classCallCheck(this, DraggableIframe);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            isShown: false,
            params: [],
            xPos: 0,
            yPos: 0,
            xElem: 0,
            yElem: 0,
            selected: null
        };

        _this.dragInit = function (e) {
            e.preventDefault();
            document.onmousemove = _this.moveElem;
            document.onmouseup = _this.destroy;
            _this.setState({
                xPos: e.pageX,
                yPos: e.pageY,
                selected: _this.refs.helpFrame,
                xElem: e.pageX - _this.refs.helpFrame.offsetLeft,
                yElem: e.pageY - _this.refs.helpFrame.offsetTop
            });
        };

        _this.moveElem = function (e) {
            var _this$state = _this.state,
                xPos = _this$state.xPos,
                yPos = _this$state.yPos,
                xElem = _this$state.xElem,
                yElem = _this$state.yElem,
                selected = _this$state.selected;

            _this.setState({
                xPos: e.pageX,
                yPos: e.pageY
            });
            if (selected !== null) {
                selected.style.left = xPos - xElem + 'px';
                selected.style.top = yPos - yElem + 'px';
            }
        };

        _this.destroy = function (e) {
            e.preventDefault();
            document.onmousemove = null;
            document.onmouseup = null;
            _this.setState({ selected: null });
        };

        _this.toggle = function () {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            var _this$state2 = _this.state,
                oldPos = _this$state2.yPos,
                isShown = _this$state2.isShown,
                yElem = _this$state2.yElem;
            var _window = window,
                pageYOffset = _window.pageYOffset,
                outerHeight = _window.outerHeight;

            var yPos = isShown ? oldPos : pageYOffset > oldPos ? pageYOffset + 50 : pageYOffset + outerHeight < oldPos ? pageYOffset + outerHeight - _this.props.height - 100 : oldPos;
            _this.setState({ isShown: !_this.state.isShown, params: params, yPos: yPos });
            _this.refs.helpFrame.style.top = yPos - yElem + 'px';
        };

        if (props.toggleFunctionName) {
            window[props.toggleFunctionName] = _this.toggle;
        }
        return _this;
    }

    DraggableIframe.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            iframeUrl = _props.iframeUrl,
            width = _props.width,
            height = _props.height,
            queryUrl = _props.queryUrl;
        var _state = this.state,
            selected = _state.selected,
            isShown = _state.isShown,
            params = _state.params;

        var url = iframeUrl + params.map(function (param, i) {
            return typeof queryUrl[i] === 'string' ? queryUrl[i] + param : '';
        }).join('');
        return _react2.default.createElement(
            'div',
            { className: 'help-frame ' + (selected ? 'is-dragging' : ''), onMouseDown: this.dragInit, ref: 'helpFrame', style: { width: width, display: isShown ? 'block' : 'none' } },
            _react2.default.createElement(
                'span',
                { className: 'help-center-title' },
                (0, _translation.translate)(title)
            ),
            _react2.default.createElement(
                'div',
                { className: 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect close-icon', onClick: this.toggle },
                _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'close'
                )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(IFrame, { height: height, src: url, width: width })
        );
    };

    return DraggableIframe;
}(_react2.default.Component);

DraggableIframe.propTypes = {
    iframeUrl: _react.PropTypes.string.isRequired,
    width: _react.PropTypes.number.isRequired,
    height: _react.PropTypes.number.isRequired,
    title: _react.PropTypes.string.isRequired,
    toggleFunctionName: _react.PropTypes.string,
    queryUrl: _react.PropTypes.array
};
exports.default = DraggableIframe;

var IFrame = function (_React$Component2) {
    _inherits(IFrame, _React$Component2);

    function IFrame() {
        _classCallCheck(this, IFrame);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    IFrame.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
        var src = _ref.src;

        return src !== this.props.src;
    };

    IFrame.prototype.render = function render() {
        var _props2 = this.props,
            height = _props2.height,
            src = _props2.src,
            width = _props2.width;

        return _react2.default.createElement('iframe', { frameBorder: 0, height: height, src: src, width: width });
    };

    return IFrame;
}(_react2.default.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJEcmFnZ2FibGVJZnJhbWUiLCJwcm9wcyIsInN0YXRlIiwiaXNTaG93biIsInBhcmFtcyIsInhQb3MiLCJ5UG9zIiwieEVsZW0iLCJ5RWxlbSIsInNlbGVjdGVkIiwiZHJhZ0luaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJkb2N1bWVudCIsIm9ubW91c2Vtb3ZlIiwibW92ZUVsZW0iLCJvbm1vdXNldXAiLCJkZXN0cm95Iiwic2V0U3RhdGUiLCJwYWdlWCIsInBhZ2VZIiwicmVmcyIsImhlbHBGcmFtZSIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJzdHlsZSIsImxlZnQiLCJ0b3AiLCJ0b2dnbGUiLCJvbGRQb3MiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsIm91dGVySGVpZ2h0IiwiaGVpZ2h0IiwidG9nZ2xlRnVuY3Rpb25OYW1lIiwicmVuZGVyIiwidGl0bGUiLCJpZnJhbWVVcmwiLCJ3aWR0aCIsInF1ZXJ5VXJsIiwidXJsIiwibWFwIiwicGFyYW0iLCJpIiwiam9pbiIsImRpc3BsYXkiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwibnVtYmVyIiwiYXJyYXkiLCJJRnJhbWUiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJzcmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGU7OztBQVdqQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHFEQUNmLDRCQUFNQSxLQUFOLENBRGU7O0FBQUEsY0FPbkJDLEtBUG1CLEdBT1g7QUFDSkMscUJBQVMsS0FETDtBQUVKQyxvQkFBUSxFQUZKO0FBR0pDLGtCQUFNLENBSEY7QUFJSkMsa0JBQU0sQ0FKRjtBQUtKQyxtQkFBTyxDQUxIO0FBTUpDLG1CQUFPLENBTkg7QUFPSkMsc0JBQVU7QUFQTixTQVBXOztBQUFBLGNBaUJuQkMsUUFqQm1CLEdB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QURiO0FBRWZYLFdBQU8saUJBQVVZLE1BQVYsQ0FBaUJELFVBRlQ7QUFHZmhCLFlBQVEsaUJBQVVpQixNQUFWLENBQWlCRCxVQUhWO0FBSWZiLFdBQU8saUJBQVVZLE1BQVYsQ0FBaUJDLFVBSlQ7QUFLZmYsd0JBQW9CLGlCQUFVYyxNQUxmO0FBTWZULGNBQVUsaUJBQVVZO0FBTkwsQztrQkFGRm5ELGU7O0lBcUZmb0QsTTs7Ozs7Ozs7O3FCQUNGQyxxQix3Q0FBNkI7QUFBQSxZQUFOQyxHQUFNLFFBQU5BLEdBQU07O0FBQ3pCLGVBQU9BLFFBQVEsS0FBS3JELEtBQUwsQ0FBV3FELEdBQTFCO0FBQ0gsSzs7cUJBRURuQixNLHFCQUFTO0FBQUEsc0JBQ3dCLEtBQUtsQyxLQUQ3QjtBQUFBLFlBQ0VnQyxNQURGLFdBQ0VBLE1BREY7QUFBQSxZQUNVcUIsR0FEVixXQUNVQSxHQURWO0FBQUEsWUFDZWhCLEtBRGYsV0FDZUEsS0FEZjs7QUFFTCxlQUFPLDBDQUFRLGFBQWEsQ0FBckIsRUFBd0IsUUFBUUwsTUFBaEMsRUFBd0MsS0FBS3FCLEdBQTdDLEVBQWtELE9BQU9oQixLQUF6RCxHQUFQO0FBQ0gsSzs7O0VBUmdCLGdCQUFNUSxTIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVJZnJhbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgXHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIGlmcmFtZVVybDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICB0b2dnbGVGdW5jdGlvbk5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgcXVlcnlVcmw6IFByb3BUeXBlcy5hcnJheVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgaWYgKHByb3BzLnRvZ2dsZUZ1bmN0aW9uTmFtZSkge1xyXG4gICAgICAgICAgICB3aW5kb3dbcHJvcHMudG9nZ2xlRnVuY3Rpb25OYW1lXSA9IHRoaXMudG9nZ2xlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBpc1Nob3duOiBmYWxzZSxcclxuICAgICAgICBwYXJhbXM6IFtdLFxyXG4gICAgICAgIHhQb3M6IDAsXHJcbiAgICAgICAgeVBvczogMCxcclxuICAgICAgICB4RWxlbTogMCxcclxuICAgICAgICB5RWxlbTogMCxcclxuICAgICAgICBzZWxlY3RlZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBkcmFnSW5pdCA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gdGhpcy5tb3ZlRWxlbTtcclxuICAgICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSB0aGlzLmRlc3Ryb3k7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHhQb3M6IGUucGFnZVgsXHJcbiAgICAgICAgICAgIHlQb3M6IGUucGFnZVksXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnJlZnMuaGVscEZyYW1lLFxyXG4gICAgICAgICAgICB4RWxlbTogZS5wYWdlWCAtIHRoaXMucmVmcy5oZWxwRnJhbWUub2Zmc2V0TGVmdCxcclxuICAgICAgICAgICAgeUVsZW06IGUucGFnZVkgLSB0aGlzLnJlZnMuaGVscEZyYW1lLm9mZnNldFRvcFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb3ZlRWxlbSA9IChlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3hQb3MsIHlQb3MsIHhFbGVtLCB5RWxlbSwgc2VsZWN0ZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgeFBvczogZS5wYWdlWCxcclxuICAgICAgICAgICAgeVBvczogZS5wYWdlWVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5zdHlsZS5sZWZ0ID0gKHhQb3MgLSB4RWxlbSkgKyAncHgnO1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5zdHlsZS50b3AgPSAoeVBvcyAtIHlFbGVtKSArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkZXN0cm95ID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xyXG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IG51bGx9KTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlID0gKC4uLnBhcmFtcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt5UG9zOiBvbGRQb3MsIGlzU2hvd24sIHlFbGVtfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge3BhZ2VZT2Zmc2V0LCBvdXRlckhlaWdodH0gPSB3aW5kb3c7XHJcbiAgICAgICAgY29uc3QgeVBvcyA9IGlzU2hvd24gPyBvbGRQb3MgOiBwYWdlWU9mZnNldCA+IG9sZFBvcyA/IHBhZ2VZT2Zmc2V0ICsgNTAgOiBwYWdlWU9mZnNldCArIG91dGVySGVpZ2h0IDwgb2xkUG9zID8gcGFnZVlPZmZzZXQgKyBvdXRlckhlaWdodCAtIHRoaXMucHJvcHMuaGVpZ2h0IC0gMTAwIDogb2xkUG9zO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzU2hvd246ICF0aGlzLnN0YXRlLmlzU2hvd24sIHBhcmFtcywgeVBvc30pO1xyXG4gICAgICAgIHRoaXMucmVmcy5oZWxwRnJhbWUuc3R5bGUudG9wID0gKHlQb3MgLSB5RWxlbSkgKyAncHgnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3RpdGxlLCBpZnJhbWVVcmwsIHdpZHRoLCBoZWlnaHQsIHF1ZXJ5VXJsfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3NlbGVjdGVkLCBpc1Nob3duLCBwYXJhbXN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB1cmwgPSBpZnJhbWVVcmwgKyBwYXJhbXMubWFwKChwYXJhbSwgaSkgPT4gdHlwZW9mIHF1ZXJ5VXJsW2ldID09PSAnc3RyaW5nJyA/IHF1ZXJ5VXJsW2ldICsgcGFyYW0gOiAnJykuam9pbignJyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BoZWxwLWZyYW1lICR7c2VsZWN0ZWQgPyAnaXMtZHJhZ2dpbmcnIDogJyd9YH0gb25Nb3VzZURvd249e3RoaXMuZHJhZ0luaXR9IHJlZj0naGVscEZyYW1lJyBzdHlsZT17e3dpZHRoLCBkaXNwbGF5OiBpc1Nob3duID8gJ2Jsb2NrJyA6ICdub25lJ319PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdoZWxwLWNlbnRlci10aXRsZSc+e3RyYW5zbGF0ZSh0aXRsZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1pY29uIG1kbC1qcy1yaXBwbGUtZWZmZWN0IGNsb3NlLWljb24nIG9uQ2xpY2s9e3RoaXMudG9nZ2xlfT5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5jbG9zZTwvaT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8SUZyYW1lIGhlaWdodD17aGVpZ2h0fSBzcmM9e3VybH0gd2lkdGg9e3dpZHRofSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBJRnJhbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKHtzcmN9KSB7XHJcbiAgICAgICAgcmV0dXJuIHNyYyAhPT0gdGhpcy5wcm9wcy5zcmM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtoZWlnaHQsIHNyYywgd2lkdGh9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gPGlmcmFtZSBmcmFtZUJvcmRlcj17MH0gaGVpZ2h0PXtoZWlnaHR9IHNyYz17c3JjfSB3aWR0aD17d2lkdGh9IC8+O1xyXG4gICAgfVxyXG59Il19