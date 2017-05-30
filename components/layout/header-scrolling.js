'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _scroll = require('../../behaviours/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _connect = require('../../behaviours/store/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// Component default props.
var defaultProps = {
    canDeploy: true, // Determines if the header can be deployed (revealing the cartridge component) or not.
    notifySizeChange: undefined, // A handler to notify other elements that the header has added/removed the cartridge.
    scrollTargetSelector: undefined // Selector for the domNode on which the scroll is attached.
};

// Component props definition.
var propTypes = {
    canDeploy: _react.PropTypes.bool,
    notifySizeChange: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
    scrollTargetSelector: _react.PropTypes.string
};

// getState function.
function getState() {
    var processMode = _builtInStore2.default.getMode();
    var mode = 'consult';

    if (processMode && processMode.edit && processMode.edit > 0) {
        mode = 'edit';
    }

    return {
        mode: mode,
        route: _builtInStore2.default.getRoute(),
        canDeploy: _builtInStore2.default.getCanDeploy()
    };
}

/**
* HeaderScrolling component.
*/
var HeaderScrolling = (_dec = (0, _connect2.default)([{ store: _builtInStore2.default, properties: ['mode', 'route', 'canDeploy'] }], getState), _dec(_class = (0, _scroll2.default)(_class = function (_Component) {
    _inherits(HeaderScrolling, _Component);

    function HeaderScrolling(props) {
        _classCallCheck(this, HeaderScrolling);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._notifySizeChange = function () {
            var notifySizeChange = _this.props.notifySizeChange;
            var isDeployed = _this.state.isDeployed;

            if (notifySizeChange) {
                notifySizeChange(isDeployed);
            }
        };

        _this.handleScroll = function (event, canDeploy) {
            var _this$state = _this.state,
                deployThreshold = _this$state.deployThreshold,
                placeholderHeight = _this$state.placeholderHeight;


            if (_this.state.isDeployed) {
                var content = _this.refs ? _this.refs.header : undefined;
                deployThreshold = content ? content.clientHeight - 60 : 1000; // 1000 is arbitrary, but a value high enough is required by default.
                placeholderHeight = content ? content.clientHeight : 1000;
                _this.setState({ deployThreshold: deployThreshold, placeholderHeight: placeholderHeight });
            }

            var _this$scrollPosition = _this.scrollPosition(),
                top = _this$scrollPosition.top;

            var isDeployed = (canDeploy !== undefined ? canDeploy : _this.props.canDeploy) ? top <= deployThreshold : false;

            if (isDeployed !== _this.state.isDeployed) {
                _this.setState({ isDeployed: isDeployed }, _this._notifySizeChange);
            }
        };

        _this.state = _extends({}, getState(), { isDeployed: true });
        return _this;
    }

    /** @inheriteddoc */


    HeaderScrolling.prototype.componentWillMount = function componentWillMount() {
        this.handleScroll();
        var scrollTargetSelector = this.props.scrollTargetSelector;

        this.scrollTargetNode = scrollTargetSelector && scrollTargetSelector !== '' ? document.querySelector(scrollTargetSelector) : window;
    };

    /** @inheriteddoc */


    HeaderScrolling.prototype.componentDidMount = function componentDidMount() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    };

    /** @inheriteddoc */


    HeaderScrolling.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var _this2 = this;

        var canDeploy = _ref.canDeploy;

        this.setState({ isDeployed: true }, function () {
            return _this2.handleScroll(null, canDeploy);
        });
    };

    /** @inheriteddoc */


    HeaderScrolling.prototype.componentWillUnmount = function componentWillUnmount() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
    };

    /**
     * Notify other elements that the header has added/removed the cartridge.
     */


    /**
     * Handle the scroll event in order to show/hide the cartridge.
     * @param {object} event [description]
     */


    /** @inheriteddoc */
    HeaderScrolling.prototype.render = function render() {
        var _state = this.state,
            isDeployed = _state.isDeployed,
            placeholderHeight = _state.placeholderHeight;
        var _props = this.props,
            children = _props.children,
            canDeploy = _props.canDeploy,
            mode = _props.mode,
            route = _props.route;

        return _react2.default.createElement(
            'header',
            { ref: 'header', 'data-focus': 'header-scrolling', 'data-mode': mode, 'data-route': route, 'data-deployed': isDeployed },
            children,
            !isDeployed ? _react2.default.createElement('div', { style: { height: canDeploy ? placeholderHeight : 60, width: '100%' } }) : ''
        );
    };

    return HeaderScrolling;
}(_react.Component)) || _class) || _class);

// Static props.

HeaderScrolling.displayName = 'HeaderScrolling';
HeaderScrolling.defaultProps = defaultProps;
HeaderScrolling.propTypes = propTypes;

exports.default = HeaderScrolling;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJjYW5EZXBsb3kiLCJub3RpZnlTaXplQ2hhbmdlIiwidW5kZWZpbmVkIiwic2Nyb2xsVGFyZ2V0U2VsZWN0b3IiLCJwcm9wVHlwZXMiLCJib29sIiwib25lT2ZUeXBlIiwiZnVuYyIsIm9iamVjdCIsInN0cmluZyIsImdldFN0YXRlIiwicHJvY2Vzc01vZGUiLCJnZXRNb2RlIiwibW9kZSIsImVkaXQiLCJyb3V0ZSIsImdldFJvdXRlIiwiZ2V0Q2FuRGVwbG95IiwiSGVhZGVyU2Nyb2xsaW5nIiwic3RvcmUiLCJwcm9wZXJ0aWVzIiwicHJvcHMiLCJfbm90aWZ5U2l6ZUNoYW5nZSIsImlzRGVwbG95ZWQiLCJzdGF0ZSIsImhhbmRsZVNjcm9sbCIsImV2ZW50IiwiZGVwbG95VGhyZXNob2xkIiwicGxhY2Vob2xkZXJIZWlnaHQiLCJjb250ZW50IiwicmVmcyIsImhlYWRlciIsImNsaWVudEhlaWdodCIsInNldFN0YXRlIiwic2Nyb2xsUG9zaXRpb24iLCJ0b3AiLCJjb21wb25lbnRXaWxsTW91bnQiLCJzY3JvbGxUYXJnZXROb2RlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwid2luZG93IiwiY29tcG9uZW50RGlkTW91bnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImNoaWxkcmVuIiwiaGVpZ2h0Iiwid2lkdGgiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsZUFBZTtBQUNqQkMsZUFBVyxJQURNLEVBQ0E7QUFDakJDLHNCQUFrQkMsU0FGRCxFQUVZO0FBQzdCQywwQkFBc0JELFNBSEws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VUFBRCxHQUFjLHVDQUFLLE9BQU8sRUFBQ3lCLFFBQVFoRCxZQUFZNEIsaUJBQVosR0FBZ0MsRUFBekMsRUFBNkNxQixPQUFPLE1BQXBELEVBQVosR0FBZCxHQUE0RjtBQUZqRyxTQURKO0FBTUgsSzs7Ozs7QUFHTDs7QUFDQS9CLGdCQUFnQmdDLFdBQWhCLEdBQThCLGlCQUE5QjtBQUNBaEMsZ0JBQWdCbkIsWUFBaEIsR0FBK0JBLFlBQS9CO0FBQ0FtQixnQkFBZ0JkLFNBQWhCLEdBQTRCQSxTQUE1Qjs7a0JBRWVjLGUiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGFwcGxpY2F0aW9uU3RvcmUgZnJvbSAnZm9jdXMtY29yZS9hcHBsaWNhdGlvbi9idWlsdC1pbi1zdG9yZSc7XHJcbmltcG9ydCBTY3JvbGwgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9zY3JvbGwnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL3N0b3JlL2Nvbm5lY3QnO1xyXG5cclxuLy8gQ29tcG9uZW50IGRlZmF1bHQgcHJvcHMuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGNhbkRlcGxveTogdHJ1ZSwgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgaGVhZGVyIGNhbiBiZSBkZXBsb3llZCAocmV2ZWFsaW5nIHRoZSBjYXJ0cmlkZ2UgY29tcG9uZW50KSBvciBub3QuXHJcbiAgICBub3RpZnlTaXplQ2hhbmdlOiB1bmRlZmluZWQsIC8vIEEgaGFuZGxlciB0byBub3RpZnkgb3RoZXIgZWxlbWVudHMgdGhhdCB0aGUgaGVhZGVyIGhhcyBhZGRlZC9yZW1vdmVkIHRoZSBjYXJ0cmlkZ2UuXHJcbiAgICBzY3JvbGxUYXJnZXRTZWxlY3RvcjogdW5kZWZpbmVkIC8vIFNlbGVjdG9yIGZvciB0aGUgZG9tTm9kZSBvbiB3aGljaCB0aGUgc2Nyb2xsIGlzIGF0dGFjaGVkLlxyXG59O1xyXG5cclxuLy8gQ29tcG9uZW50IHByb3BzIGRlZmluaXRpb24uXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGNhbkRlcGxveTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBub3RpZnlTaXplQ2hhbmdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pLFxyXG4gICAgc2Nyb2xsVGFyZ2V0U2VsZWN0b3I6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbi8vIGdldFN0YXRlIGZ1bmN0aW9uLlxyXG5mdW5jdGlvbiBnZXRTdGF0ZSgpIHtcclxuICAgIGNvbnN0IHByb2Nlc3NNb2RlID0gYXBwbGljYXRpb25TdG9yZS5nZXRNb2RlKCk7XHJcbiAgICBsZXQgbW9kZSA9ICdjb25zdWx0JztcclxuXHJcbiAgICBpZiAocHJvY2Vzc01vZGUgJiYgcHJvY2Vzc01vZGUuZWRpdCAmJiBwcm9jZXNzTW9kZS5lZGl0ID4gMCkge1xyXG4gICAgICAgIG1vZGUgPSAnZWRpdCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RlOiBtb2RlLFxyXG4gICAgICAgIHJvdXRlOiBhcHBsaWNhdGlvblN0b3JlLmdldFJvdXRlKCksXHJcbiAgICAgICAgY2FuRGVwbG95OiBhcHBsaWNhdGlvblN0b3JlLmdldENhbkRlcGxveSgpXHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuKiBIZWFkZXJTY3JvbGxpbmcgY29tcG9uZW50LlxyXG4qL1xyXG5AY29ubmVjdChbe3N0b3JlOiBhcHBsaWNhdGlvblN0b3JlLCBwcm9wZXJ0aWVzOiBbJ21vZGUnLCAncm91dGUnLCAnY2FuRGVwbG95J119XSwgZ2V0U3RhdGUpXHJcbkBTY3JvbGxcclxuY2xhc3MgSGVhZGVyU2Nyb2xsaW5nIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Li4uZ2V0U3RhdGUoKSwgaXNEZXBsb3llZDogdHJ1ZX07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbCgpO1xyXG4gICAgICAgIGNvbnN0IHtzY3JvbGxUYXJnZXRTZWxlY3Rvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0Tm9kZSA9IChzY3JvbGxUYXJnZXRTZWxlY3RvciAmJiBzY3JvbGxUYXJnZXRTZWxlY3RvciAhPT0gJycpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzY3JvbGxUYXJnZXRTZWxlY3RvcikgOiB3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbCk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUYXJnZXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7Y2FuRGVwbG95fSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRGVwbG95ZWQ6IHRydWV9LCAoKSA9PiB0aGlzLmhhbmRsZVNjcm9sbChudWxsLCBjYW5EZXBsb3kpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUYXJnZXROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVTY3JvbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZ5IG90aGVyIGVsZW1lbnRzIHRoYXQgdGhlIGhlYWRlciBoYXMgYWRkZWQvcmVtb3ZlZCB0aGUgY2FydHJpZGdlLlxyXG4gICAgICovXHJcbiAgICBfbm90aWZ5U2l6ZUNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7bm90aWZ5U2l6ZUNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtpc0RlcGxveWVkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKG5vdGlmeVNpemVDaGFuZ2UpIHtcclxuICAgICAgICAgICAgbm90aWZ5U2l6ZUNoYW5nZShpc0RlcGxveWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIHRoZSBzY3JvbGwgZXZlbnQgaW4gb3JkZXIgdG8gc2hvdy9oaWRlIHRoZSBjYXJ0cmlkZ2UuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVTY3JvbGwgPSAoZXZlbnQsIGNhbkRlcGxveSkgPT4ge1xyXG4gICAgICAgIGxldCB7ZGVwbG95VGhyZXNob2xkLCBwbGFjZWhvbGRlckhlaWdodH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0RlcGxveWVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnJlZnMgPyB0aGlzLnJlZnMuaGVhZGVyIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkZXBsb3lUaHJlc2hvbGQgPSBjb250ZW50ID8gY29udGVudC5jbGllbnRIZWlnaHQgLSA2MCA6IDEwMDA7IC8vIDEwMDAgaXMgYXJiaXRyYXJ5LCBidXQgYSB2YWx1ZSBoaWdoIGVub3VnaCBpcyByZXF1aXJlZCBieSBkZWZhdWx0LlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlckhlaWdodCA9IGNvbnRlbnQgPyBjb250ZW50LmNsaWVudEhlaWdodCA6IDEwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RlcGxveVRocmVzaG9sZCwgcGxhY2Vob2xkZXJIZWlnaHR9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHt0b3B9ID0gdGhpcy5zY3JvbGxQb3NpdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IGlzRGVwbG95ZWQgPSAoY2FuRGVwbG95ICE9PSB1bmRlZmluZWQgPyBjYW5EZXBsb3kgOiB0aGlzLnByb3BzLmNhbkRlcGxveSkgPyB0b3AgPD0gZGVwbG95VGhyZXNob2xkIDogZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChpc0RlcGxveWVkICE9PSB0aGlzLnN0YXRlLmlzRGVwbG95ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNEZXBsb3llZH0sIHRoaXMuX25vdGlmeVNpemVDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aXNEZXBsb3llZCwgcGxhY2Vob2xkZXJIZWlnaHR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7Y2hpbGRyZW4sIGNhbkRlcGxveSwgbW9kZSwgcm91dGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aGVhZGVyIHJlZj0naGVhZGVyJyBkYXRhLWZvY3VzPSdoZWFkZXItc2Nyb2xsaW5nJyBkYXRhLW1vZGU9e21vZGV9IGRhdGEtcm91dGU9e3JvdXRlfSBkYXRhLWRlcGxveWVkPXtpc0RlcGxveWVkfT5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIHshaXNEZXBsb3llZCA/IDxkaXYgc3R5bGU9e3toZWlnaHQ6IGNhbkRlcGxveSA/IHBsYWNlaG9sZGVySGVpZ2h0IDogNjAsIHdpZHRoOiAnMTAwJSd9fSAvPiA6ICcnfVxyXG4gICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBTdGF0aWMgcHJvcHMuXHJcbkhlYWRlclNjcm9sbGluZy5kaXNwbGF5TmFtZSA9ICdIZWFkZXJTY3JvbGxpbmcnO1xyXG5IZWFkZXJTY3JvbGxpbmcuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5IZWFkZXJTY3JvbGxpbmcucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyU2Nyb2xsaW5nO1xyXG4iXX0=