'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _buttonBackToTop = require('../button-back-to-top');

var _buttonBackToTop2 = _interopRequireDefault(_buttonBackToTop);

var _stickyMenu = require('./sticky-menu');

var _stickyMenu2 = _interopRequireDefault(_stickyMenu);

var _scroll = require('../../behaviours/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _grid = require('../grid');

var _grid2 = _interopRequireDefault(_grid);

var _column = require('../column');

var _column2 = _interopRequireDefault(_column);

var _debounce = require('lodash/function/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _filter = require('lodash/collection/filter');

var _filter2 = _interopRequireDefault(_filter);

var _first = require('lodash/array/first');

var _first2 = _interopRequireDefault(_first);

var _last = require('lodash/array/last');

var _last2 = _interopRequireDefault(_last);

var _xor = require('lodash/array/xor');

var _xor2 = _interopRequireDefault(_xor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var BackToTopComponent = _buttonBackToTop2.default;

// component default props.
var defaultProps = {
    hasMenu: true, //Activate the presence of the sticky navigation component.
    hasBackToTop: true, //Activate the presence of BackToTop button
    offset: 100, //offset position when affix
    scrollDelay: 10 //defaut debounce delay for scroll spy call
};

// component props definition.
var propTypes = {
    hasMenu: _react.PropTypes.bool,
    hasBackToTop: _react.PropTypes.bool,
    offset: _react.PropTypes.number,
    scrollDelay: _react.PropTypes.number
};

/**
* ScrollspyContainer component.
*/

var ScrollspyContainer = (0, _scroll2.default)(_class = function (_Component) {
    _inherits(ScrollspyContainer, _Component);

    function ScrollspyContainer(props) {
        _classCallCheck(this, ScrollspyContainer);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._executeRefreshMenu = function (time) {
            _this._timeouts = [];
            for (var i = 0; i < time; i++) {
                _this._timeouts.push(setTimeout(_this._refreshMenu.bind(_this), i * 1000));
            }
        };

        _this._debounceRefreshMenu = function () {
            _this._debouncedRefresh();
        };

        _this._refreshMenu = function () {
            if (!_this.props.hasMenu) {
                return;
            }
            var stickyMenu = _this.refs.stickyMenu;
            var clickedId = _this.state.clickedId;

            var menus = _this._buildMenuList(); //build the menu list
            //TODO remove this check
            var affix = stickyMenu ? _this._isMenuAffix() : _this.state.affix; //Calculate menu position (affix or not)
            // Check if scroll is at cliked item level
            var isAtClickedItem = void 0;
            if (clickedId !== undefined) {
                var selector = '[data-spy=\'' + clickedId + '\']';
                var node = document.querySelector(selector);
                var nodePosition = _this.scrollPosition(node);
                var positionTop = _this._getElementRealPosition(nodePosition.top);
                isAtClickedItem = _this.scrollPosition().top === positionTop;
            }
            _this.setState({
                menuList: menus,
                clickedId: isAtClickedItem ? undefined : clickedId,
                affix: affix
            });
        };

        _this._buildMenuList = function () {
            var hasMenu = _this.props.hasMenu;

            if (!hasMenu) {
                return [];
            }
            var detectionOffset = window.screen.height / 5;
            var currentScrollPosition = { top: _this.scrollPosition().top, left: _this.scrollPosition().left };
            var isAtPageBottom = _this.isAtPageBottom();

            //get the menu list (without blocks in popin)
            var thisComponentNode = _reactDom2.default.findDOMNode(_this);
            var allDataSpy = thisComponentNode.querySelectorAll('[data-spy]');
            var popinDataSpy = thisComponentNode.querySelectorAll('[data-focus=\'popin-window\'] [data-spy]');
            var selectionList = (0, _xor2.default)(allDataSpy, popinDataSpy);

            if (selectionList.length === 0) {
                return;
            }
            var menuList = selectionList.map(function (selection, index) {
                var title = selection.querySelector('[data-spy-title]');
                var nodeId = selection.getAttribute('data-spy');
                return {
                    index: index,
                    label: title.innerHTML,
                    nodeId: nodeId,
                    scrollTop: _this.scrollPosition(selection).top, // offset of 10 to be safe
                    isActive: false,
                    onClick: _this._getMenuItemClickHandler(nodeId)
                };
            });

            var nextTitles = (0, _filter2.default)(menuList, function (n) {
                return currentScrollPosition.top + detectionOffset < _this._getElementRealPosition(n.scrollTop);
            });

            //Calculate current node
            //by default, first node is indexed
            var currentIndex = menuList[0].index;
            if (0 < nextTitles.length) {
                //check the first node
                var firstNode = (0, _first2.default)(nextTitles);
                var index = firstNode.index;
                if (0 < index) {
                    currentIndex = menuList[index - 1].index;
                }
            } else {
                //means that the position is the last title
                currentIndex = (0, _last2.default)(menuList).index;
            }
            var clickedId = _this.state.clickedId;
            if (isAtPageBottom && undefined !== clickedId) {
                menuList = menuList.map(function (item) {
                    if (item.nodeId === clickedId) {
                        item.isActive = true;
                    }
                    return item;
                });
                _this.setState({ clickedId: undefined });
            } else {
                menuList[currentIndex].isActive = true;
            }
            return menuList;
        };

        _this._getElementRealPosition = function (position) {
            var sscDomNode = _reactDom2.default.findDOMNode(_this);
            var sscPosition = _this.scrollPosition(sscDomNode);
            return position - sscPosition.top;
        };

        _this._isMenuAffix = function () {
            var offset = _this.props.offset;
            var hasMenu = _this.props.hasMenu;

            if (!hasMenu) {
                return false;
            }
            var sscDomNode = _reactDom2.default.findDOMNode(_this);
            var currentViewPosition = sscDomNode.getBoundingClientRect();
            var containerPaddingTop = _this._getPaddingTopValue();
            offset -= containerPaddingTop;
            return currentViewPosition.top <= offset;
        };

        _this._getPaddingTopValue = function () {
            var sscDomNode = _reactDom2.default.findDOMNode(_this);
            var computedStyles = window.getComputedStyle(sscDomNode, null);
            var paddingTop = computedStyles.getPropertyValue('padding-top');
            return paddingTop ? parseInt(paddingTop, 0) : 0;
        };

        var state = {
            menuList: [],
            affix: false
        };
        _this.state = state;
        return _this;
    }

    /** @inheritDoc */


    ScrollspyContainer.prototype.componentDidMount = function componentDidMount() {
        this._scrollCarrier = window;
        this._debouncedRefresh = (0, _debounce2.default)(this._refreshMenu, this.props.scrollDelay);
        this._scrollCarrier.addEventListener('scroll', this._debounceRefreshMenu);
        this._scrollCarrier.addEventListener('resize', this._debounceRefreshMenu);
        this._executeRefreshMenu(10);
    };

    /** @inheritDoc */


    ScrollspyContainer.prototype.componentWillUnmount = function componentWillUnmount() {
        this._timeouts.map(clearTimeout);
        this._scrollCarrier.removeEventListener('scroll', this._debounceRefreshMenu);
        this._scrollCarrier.removeEventListener('resize', this._debounceRefreshMenu);
        this._debouncedRefresh.cancel();
    };

    /**
    * Refresh screen X times.
    * @param  {number} time number of execution
    */


    /**
    * The scroll event handler
    * @private
    */


    /**
    * Build the list of menus.
    * @private
    * @return {array} the list of menus.
    */


    /**
    * Calculate the real position of an element, depending on declared offset in props.
    * @private
    * @param  {number} position position
    * @return {number} the real position
    */


    /**
    * Calculate menu position (affix or not)
    * @private
    * @return {Boolean} true is menu must be affix, else false
    */


    /**
    * Handle click on item menu function.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    * @return {function}        function to call
    */
    ScrollspyContainer.prototype._getMenuItemClickHandler = function _getMenuItemClickHandler(menuId) {
        var _this2 = this;

        return function () {
            _this2.setState({
                clickedId: menuId
            }, function () {
                _this2._refreshMenu();
                _this2._onMenuItemClick(menuId);
            });
        };
    };

    /**
    * Menu click function. Scroll to the node position.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    */


    ScrollspyContainer.prototype._onMenuItemClick = function _onMenuItemClick(menuId) {
        var selector = '[data-spy=\'' + menuId + '\']';
        var node = document.querySelector(selector);
        var nodePosition = this.scrollPosition(node);
        var positionTop = this._getElementRealPosition(nodePosition.top);
        this.scrollTo(undefined, positionTop);
    };

    /** @inheritedDoc */


    ScrollspyContainer.prototype.render = function render() {
        var _props = this.props,
            children = _props.children,
            hasMenu = _props.hasMenu,
            hasBackToTop = _props.hasBackToTop,
            offset = _props.offset,
            scrollDelay = _props.scrollDelay,
            labelIcon = _props.labelIcon,
            classNameIcon = _props.classNameIcon,
            otherProps = _objectWithoutProperties(_props, ['children', 'hasMenu', 'hasBackToTop', 'offset', 'scrollDelay', 'labelIcon', 'classNameIcon']);

        var _state = this.state,
            affix = _state.affix,
            menuList = _state.menuList;

        return _react2.default.createElement(
            'div',
            _extends({ 'data-focus': 'scrollspy-container' }, otherProps),
            hasMenu && _react2.default.createElement(_stickyMenu2.default, { affix: affix, affixOffset: offset, menuList: menuList, ref: 'stickyMenu' }),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'scrollspy-container-content' },
                children
            ),
            hasBackToTop && _react2.default.createElement(BackToTopComponent, { labelIcon: labelIcon, classNameIcon: classNameIcon })
        );
    };

    return ScrollspyContainer;
}(_react.Component)) || _class;

//Static props.


ScrollspyContainer.displayName = 'ScrollspyContainer';
ScrollspyContainer.defaultProps = defaultProps;
ScrollspyContainer.propTypes = propTypes;

exports.default = ScrollspyContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCYWNrVG9Ub3BDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJoYXNNZW51IiwiaGFzQmFja1RvVG9wIiwib2Zmc2V0Iiwic2Nyb2xsRGVsYXkiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiU2Nyb2xsc3B5Q29udGFpbmVyIiwicHJvcHMiLCJfZXhlY3V0ZVJlZnJlc2hNZW51IiwiX3RpbWVvdXRzIiwiaSIsInRpbWUiLCJwdXNoIiwic2V0VGltZW91dCIsIl9yZWZyZXNoTWVudSIsImJpbmQiLCJfZGVib3VuY2VSZWZyZXNoTWVudSIsIl9kZWJvdW5jZWRSZWZyZXNoIiwic3RpY2t5TWVudSIsInJlZnMiLCJjbGlja2VkSWQiLCJzdGF0ZSIsIm1lbnVzIiwiX2J1aWxkTWVudUxpc3QiLCJhZmZpeCIsIl9pc01lbnVBZmZpeCIsImlzQXRDbGlja2VkSXRlbSIsInVuZGVmaW5lZCIsInNlbGVjdG9yIiwibm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5vZGVQb3NpdGlvbiIsInNjcm9sbFBvc2l0aW9uIiwicG9zaXRpb25Ub3AiLCJfZ2V0RWxlbWVudFJlYWxQb3NpdGlvbiIsInRvcCIsInNldFN0YXRlIiwibWVudUxpc3QiLCJkZXRlY3Rpb25PZmZzZXQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJoZWlnaHQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJsZWZ0IiwiaXNBdFBhZ2VCb3R0b20iLCJ0aGlzQ29tcG9uZW50Tm9kZSIsImZpbmRET01Ob2RlIiwiYWxsRGF0YVNweSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3BpbkRhdGFTcHkiLCJzZWxlY3Rpb25MaXN0IiwibGVuZ3RoIiwibWFwIiwic2VsZWN0aW9uIiwiaW5kZXgiLCJ0aXRsZSIsIm5vZGVJZCIsImdldEF0dHJpYnV0ZSIsImxhYmVsIiwiaW5uZXJIVE1MIiwic2Nyb2xsVG9wIiwiaXNBY3RpdmUiLCJvbkNsaWNrIiwiX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyIiwibmV4dFRpdGxlcyIsIm4iLCJjdXJyZW50SW5kZXgiLCJmaXJzdE5vZGUiLCJpdGVtIiwicG9zaXRpb24iLCJzc2NEb21Ob2RlIiwic3NjUG9zaXRpb24iLCJjdXJyZW50Vmlld1Bvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyUGFkZGluZ1RvcCIsIl9nZXRQYWRkaW5nVG9wVmFsdWUiLCJjb21wdXRlZFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInBhcnNlSW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJfc2Nyb2xsQ2FycmllciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW5jZWwiLCJtZW51SWQiLCJfb25NZW51SXRlbUNsaWNrIiwic2Nyb2xsVG8iLCJyZW5kZXIiLCJjaGlsZHJlbiIsImxhYmVsSWNvbiIsImNsYXNzTmFtZUljb24iLCJvdGhlclByb3BzIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSw4Q0FBTjs7QUFFQTtBQUNBLElBQU1DLGVBQWU7QUFDakJDLGFBQVMsSUFEUSxFQUNGO0FBQ2ZDLGtCQUFjLElBRkcsRUFFRztBQUNwQkMsWUFBUSxHQUhTLEVBR0o7QUFDYkMsaUJBQWEsRUFKSSxDQUlEO0FBSkMsQ0FBckI7O0FBT0E7QUFDQSxJQUFNQyxZQUFZO0FBQ2RKLGFBQVMsaUJBQVVLLElBREw7QUFFZEosa0JBQWMsaUJBQVVJLElBRlY7QUFHZEgsWUFBUSxpQkFBVUksTUFISjtBQUlkSCxp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QWFILEs7Ozs7O0FBR0w7OztBQUNBekYsbUJBQW1CMkYsV0FBbkIsR0FBaUMsb0JBQWpDO0FBQ0EzRixtQkFBbUJSLFlBQW5CLEdBQWtDQSxZQUFsQztBQUNBUSxtQkFBbUJILFNBQW5CLEdBQStCQSxTQUEvQjs7a0JBRWVHLGtCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBCYWNrVG9Ub3AgZnJvbSAnLi4vYnV0dG9uLWJhY2stdG8tdG9wJ1xyXG5pbXBvcnQgU3RpY2t5TWVudSBmcm9tICcuL3N0aWNreS1tZW51JztcclxuaW1wb3J0IFNjcm9sbCBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL3Njcm9sbCc7XHJcbmltcG9ydCBHcmlkIGZyb20gJy4uL2dyaWQnO1xyXG5pbXBvcnQgQ29sdW1uIGZyb20gJy4uL2NvbHVtbic7XHJcblxyXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoL2Z1bmN0aW9uL2RlYm91bmNlJztcclxuaW1wb3J0IGZpbHRlciBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbi9maWx0ZXInO1xyXG5pbXBvcnQgZmlyc3QgZnJvbSAnbG9kYXNoL2FycmF5L2ZpcnN0JztcclxuaW1wb3J0IGxhc3QgZnJvbSAnbG9kYXNoL2FycmF5L2xhc3QnO1xyXG5pbXBvcnQgeG9yIGZyb20gJ2xvZGFzaC9hcnJheS94b3InO1xyXG5cclxuY29uc3QgQmFja1RvVG9wQ29tcG9uZW50ID0gQmFja1RvVG9wO1xyXG5cclxuLy8gY29tcG9uZW50IGRlZmF1bHQgcHJvcHMuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGhhc01lbnU6IHRydWUsIC8vQWN0aXZhdGUgdGhlIHByZXNlbmNlIG9mIHRoZSBzdGlja3kgbmF2aWdhdGlvbiBjb21wb25lbnQuXHJcbiAgICBoYXNCYWNrVG9Ub3A6IHRydWUsIC8vQWN0aXZhdGUgdGhlIHByZXNlbmNlIG9mIEJhY2tUb1RvcCBidXR0b25cclxuICAgIG9mZnNldDogMTAwLCAvL29mZnNldCBwb3NpdGlvbiB3aGVuIGFmZml4XHJcbiAgICBzY3JvbGxEZWxheTogMTAgLy9kZWZhdXQgZGVib3VuY2UgZGVsYXkgZm9yIHNjcm9sbCBzcHkgY2FsbFxyXG59O1xyXG5cclxuLy8gY29tcG9uZW50IHByb3BzIGRlZmluaXRpb24uXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGhhc01lbnU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaGFzQmFja1RvVG9wOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9mZnNldDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHNjcm9sbERlbGF5OiBQcm9wVHlwZXMubnVtYmVyXHJcbn07XHJcblxyXG4vKipcclxuKiBTY3JvbGxzcHlDb250YWluZXIgY29tcG9uZW50LlxyXG4qL1xyXG5AU2Nyb2xsXHJcbmNsYXNzIFNjcm9sbHNweUNvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWVudUxpc3Q6IFtdLFxyXG4gICAgICAgICAgICBhZmZpeDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIgPSB3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaCA9IGRlYm91bmNlKHRoaXMuX3JlZnJlc2hNZW51LCB0aGlzLnByb3BzLnNjcm9sbERlbGF5KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fZXhlY3V0ZVJlZnJlc2hNZW51KDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3RpbWVvdXRzLm1hcChjbGVhclRpbWVvdXQpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9kZWJvdW5jZVJlZnJlc2hNZW51KTtcclxuICAgICAgICB0aGlzLl9kZWJvdW5jZWRSZWZyZXNoLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZWZyZXNoIHNjcmVlbiBYIHRpbWVzLlxyXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHRpbWUgbnVtYmVyIG9mIGV4ZWN1dGlvblxyXG4gICAgKi9cclxuICAgIF9leGVjdXRlUmVmcmVzaE1lbnUgPSB0aW1lID0+IHtcclxuICAgICAgICB0aGlzLl90aW1lb3V0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRzLnB1c2goc2V0VGltZW91dCh0aGlzLl9yZWZyZXNoTWVudS5iaW5kKHRoaXMpLCBpICogMTAwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2RlYm91bmNlUmVmcmVzaE1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogVGhlIHNjcm9sbCBldmVudCBoYW5kbGVyXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3JlZnJlc2hNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5oYXNNZW51KSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHtzdGlja3lNZW51fSA9IHRoaXMucmVmcztcclxuICAgICAgICBjb25zdCB7Y2xpY2tlZElkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgbWVudXMgPSB0aGlzLl9idWlsZE1lbnVMaXN0KCk7IC8vYnVpbGQgdGhlIG1lbnUgbGlzdFxyXG4gICAgICAgIC8vVE9ETyByZW1vdmUgdGhpcyBjaGVja1xyXG4gICAgICAgIGNvbnN0IGFmZml4ID0gc3RpY2t5TWVudSA/IHRoaXMuX2lzTWVudUFmZml4KCkgOiB0aGlzLnN0YXRlLmFmZml4OyAvL0NhbGN1bGF0ZSBtZW51IHBvc2l0aW9uIChhZmZpeCBvciBub3QpXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2Nyb2xsIGlzIGF0IGNsaWtlZCBpdGVtIGxldmVsXHJcbiAgICAgICAgbGV0IGlzQXRDbGlja2VkSXRlbTtcclxuICAgICAgICBpZiAoY2xpY2tlZElkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgW2RhdGEtc3B5PScke2NsaWNrZWRJZH0nXWA7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZVBvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbihub2RlKTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25Ub3AgPSB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG5vZGVQb3NpdGlvbi50b3ApO1xyXG4gICAgICAgICAgICBpc0F0Q2xpY2tlZEl0ZW0gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKCkudG9wID09PSBwb3NpdGlvblRvcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIG1lbnVMaXN0OiBtZW51cyxcclxuICAgICAgICAgICAgY2xpY2tlZElkOiBpc0F0Q2xpY2tlZEl0ZW0gPyB1bmRlZmluZWQgOiBjbGlja2VkSWQsXHJcbiAgICAgICAgICAgIGFmZml4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBCdWlsZCB0aGUgbGlzdCBvZiBtZW51cy5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHJldHVybiB7YXJyYXl9IHRoZSBsaXN0IG9mIG1lbnVzLlxyXG4gICAgKi9cclxuICAgIF9idWlsZE1lbnVMaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtoYXNNZW51fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFoYXNNZW51KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGV0ZWN0aW9uT2Zmc2V0ID0gd2luZG93LnNjcmVlbi5oZWlnaHQgLyA1O1xyXG4gICAgICAgIGxldCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSB7IHRvcDogdGhpcy5zY3JvbGxQb3NpdGlvbigpLnRvcCwgbGVmdDogdGhpcy5zY3JvbGxQb3NpdGlvbigpLmxlZnQgfTtcclxuICAgICAgICBsZXQgaXNBdFBhZ2VCb3R0b20gPSB0aGlzLmlzQXRQYWdlQm90dG9tKCk7XHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBtZW51IGxpc3QgKHdpdGhvdXQgYmxvY2tzIGluIHBvcGluKVxyXG4gICAgICAgIGNvbnN0IHRoaXNDb21wb25lbnROb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3QgYWxsRGF0YVNweSA9IHRoaXNDb21wb25lbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNweV0nKTtcclxuICAgICAgICBjb25zdCBwb3BpbkRhdGFTcHkgPSB0aGlzQ29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1mb2N1cz0ncG9waW4td2luZG93J10gW2RhdGEtc3B5XWApO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkxpc3QgPSB4b3IoYWxsRGF0YVNweSwgcG9waW5EYXRhU3B5KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1lbnVMaXN0ID0gc2VsZWN0aW9uTGlzdC5tYXAoKHNlbGVjdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBzZWxlY3Rpb24ucXVlcnlTZWxlY3RvcignW2RhdGEtc3B5LXRpdGxlXScpO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlSWQgPSBzZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXNweScpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRpdGxlLmlubmVySFRNTCxcclxuICAgICAgICAgICAgICAgIG5vZGVJZDogbm9kZUlkLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0aGlzLnNjcm9sbFBvc2l0aW9uKHNlbGVjdGlvbikudG9wLCAvLyBvZmZzZXQgb2YgMTAgdG8gYmUgc2FmZVxyXG4gICAgICAgICAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5fZ2V0TWVudUl0ZW1DbGlja0hhbmRsZXIobm9kZUlkKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBuZXh0VGl0bGVzID0gZmlsdGVyKG1lbnVMaXN0LCBuID0+IChjdXJyZW50U2Nyb2xsUG9zaXRpb24udG9wICsgZGV0ZWN0aW9uT2Zmc2V0IDwgdGhpcy5fZ2V0RWxlbWVudFJlYWxQb3NpdGlvbihuLnNjcm9sbFRvcCkpKTtcclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGUgY3VycmVudCBub2RlXHJcbiAgICAgICAgLy9ieSBkZWZhdWx0LCBmaXJzdCBub2RlIGlzIGluZGV4ZWRcclxuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gbWVudUxpc3RbMF0uaW5kZXg7XHJcbiAgICAgICAgaWYgKDAgPCBuZXh0VGl0bGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBmaXJzdCBub2RlXHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGZpcnN0KG5leHRUaXRsZXMpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGZpcnN0Tm9kZS5pbmRleDtcclxuICAgICAgICAgICAgaWYgKDAgPCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbWVudUxpc3RbaW5kZXggLSAxXS5pbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgdGhhdCB0aGUgcG9zaXRpb24gaXMgdGhlIGxhc3QgdGl0bGVcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbGFzdChtZW51TGlzdCkuaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbGlja2VkSWQgPSB0aGlzLnN0YXRlLmNsaWNrZWRJZDtcclxuICAgICAgICBpZiAoaXNBdFBhZ2VCb3R0b20gJiYgdW5kZWZpbmVkICE9PSBjbGlja2VkSWQpIHtcclxuICAgICAgICAgICAgbWVudUxpc3QgPSBtZW51TGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5ub2RlSWQgPT09IGNsaWNrZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2xpY2tlZElkOiB1bmRlZmluZWQgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWVudUxpc3RbY3VycmVudEluZGV4XS5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZW51TGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENhbGN1bGF0ZSB0aGUgcmVhbCBwb3NpdGlvbiBvZiBhbiBlbGVtZW50LCBkZXBlbmRpbmcgb24gZGVjbGFyZWQgb2Zmc2V0IGluIHByb3BzLlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHBvc2l0aW9uIHBvc2l0aW9uXHJcbiAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlYWwgcG9zaXRpb25cclxuICAgICovXHJcbiAgICBfZ2V0RWxlbWVudFJlYWxQb3NpdGlvbiA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNzY0RvbU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICBjb25zdCBzc2NQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb24oc3NjRG9tTm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uIC0gc3NjUG9zaXRpb24udG9wO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2FsY3VsYXRlIG1lbnUgcG9zaXRpb24gKGFmZml4IG9yIG5vdClcclxuICAgICogQHByaXZhdGVcclxuICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBtZW51IG11c3QgYmUgYWZmaXgsIGVsc2UgZmFsc2VcclxuICAgICovXHJcbiAgICBfaXNNZW51QWZmaXggPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHtvZmZzZXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7aGFzTWVudX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghaGFzTWVudSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNzY0RvbU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50Vmlld1Bvc2l0aW9uID0gc3NjRG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJQYWRkaW5nVG9wID0gdGhpcy5fZ2V0UGFkZGluZ1RvcFZhbHVlKCk7XHJcbiAgICAgICAgb2Zmc2V0IC09IGNvbnRhaW5lclBhZGRpbmdUb3A7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWaWV3UG9zaXRpb24udG9wIDw9IG9mZnNldDtcclxuICAgIH07XHJcblxyXG4gICAgX2dldFBhZGRpbmdUb3BWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzc2NEb21Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzc2NEb21Ob2RlLCBudWxsKTtcclxuICAgICAgICBjb25zdCBwYWRkaW5nVG9wID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKTtcclxuICAgICAgICByZXR1cm4gcGFkZGluZ1RvcCA/IHBhcnNlSW50KHBhZGRpbmdUb3AsIDApIDogMDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSBjbGljayBvbiBpdGVtIG1lbnUgZnVuY3Rpb24uXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gbWVudUlkICBub2RlIHNweUlkIGluIERPTSB0byBzY3JvbGwgdG9cclxuICAgICogQHJldHVybiB7ZnVuY3Rpb259ICAgICAgICBmdW5jdGlvbiB0byBjYWxsXHJcbiAgICAqL1xyXG4gICAgX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyKG1lbnVJZCkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tlZElkOiBtZW51SWRcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE1lbnUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uTWVudUl0ZW1DbGljayhtZW51SWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIE1lbnUgY2xpY2sgZnVuY3Rpb24uIFNjcm9sbCB0byB0aGUgbm9kZSBwb3NpdGlvbi5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBtZW51SWQgIG5vZGUgc3B5SWQgaW4gRE9NIHRvIHNjcm9sbCB0b1xyXG4gICAgKi9cclxuICAgIF9vbk1lbnVJdGVtQ2xpY2sobWVudUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgW2RhdGEtc3B5PScke21lbnVJZH0nXWA7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IG5vZGVQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb24obm9kZSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25Ub3AgPSB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG5vZGVQb3NpdGlvbi50b3ApO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG8odW5kZWZpbmVkLCBwb3NpdGlvblRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y2hpbGRyZW4sIGhhc01lbnUsIGhhc0JhY2tUb1RvcCwgb2Zmc2V0LCBzY3JvbGxEZWxheSwgbGFiZWxJY29uLCBjbGFzc05hbWVJY29uLCAuLi5vdGhlclByb3BzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2FmZml4LCBtZW51TGlzdH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2Nyb2xsc3B5LWNvbnRhaW5lcicgey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAge2hhc01lbnUgJiZcclxuICAgICAgICAgICAgICAgICAgICA8U3RpY2t5TWVudSBhZmZpeD17YWZmaXh9IGFmZml4T2Zmc2V0PXtvZmZzZXR9IG1lbnVMaXN0PXttZW51TGlzdH0gcmVmPSdzdGlja3lNZW51JyAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzY3JvbGxzcHktY29udGFpbmVyLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2hhc0JhY2tUb1RvcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxCYWNrVG9Ub3BDb21wb25lbnQgbGFiZWxJY29uPXtsYWJlbEljb259IGNsYXNzTmFtZUljb249e2NsYXNzTmFtZUljb259IC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5TY3JvbGxzcHlDb250YWluZXIuZGlzcGxheU5hbWUgPSAnU2Nyb2xsc3B5Q29udGFpbmVyJztcclxuU2Nyb2xsc3B5Q29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuU2Nyb2xsc3B5Q29udGFpbmVyLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbHNweUNvbnRhaW5lcjtcclxuIl19