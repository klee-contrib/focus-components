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
            otherProps = _objectWithoutProperties(_props, ['children', 'hasMenu', 'hasBackToTop', 'offset', 'scrollDelay']);

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
            hasBackToTop && _react2.default.createElement(BackToTopComponent, null)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCYWNrVG9Ub3BDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJoYXNNZW51IiwiaGFzQmFja1RvVG9wIiwib2Zmc2V0Iiwic2Nyb2xsRGVsYXkiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiU2Nyb2xsc3B5Q29udGFpbmVyIiwicHJvcHMiLCJfZXhlY3V0ZVJlZnJlc2hNZW51IiwiX3RpbWVvdXRzIiwiaSIsInRpbWUiLCJwdXNoIiwic2V0VGltZW91dCIsIl9yZWZyZXNoTWVudSIsImJpbmQiLCJfZGVib3VuY2VSZWZyZXNoTWVudSIsIl9kZWJvdW5jZWRSZWZyZXNoIiwic3RpY2t5TWVudSIsInJlZnMiLCJjbGlja2VkSWQiLCJzdGF0ZSIsIm1lbnVzIiwiX2J1aWxkTWVudUxpc3QiLCJhZmZpeCIsIl9pc01lbnVBZmZpeCIsImlzQXRDbGlja2VkSXRlbSIsInVuZGVmaW5lZCIsInNlbGVjdG9yIiwibm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5vZGVQb3NpdGlvbiIsInNjcm9sbFBvc2l0aW9uIiwicG9zaXRpb25Ub3AiLCJfZ2V0RWxlbWVudFJlYWxQb3NpdGlvbiIsInRvcCIsInNldFN0YXRlIiwibWVudUxpc3QiLCJkZXRlY3Rpb25PZmZzZXQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJoZWlnaHQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJsZWZ0IiwiaXNBdFBhZ2VCb3R0b20iLCJ0aGlzQ29tcG9uZW50Tm9kZSIsImZpbmRET01Ob2RlIiwiYWxsRGF0YVNweSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3BpbkRhdGFTcHkiLCJzZWxlY3Rpb25MaXN0IiwibGVuZ3RoIiwibWFwIiwic2VsZWN0aW9uIiwiaW5kZXgiLCJ0aXRsZSIsIm5vZGVJZCIsImdldEF0dHJpYnV0ZSIsImxhYmVsIiwiaW5uZXJIVE1MIiwic2Nyb2xsVG9wIiwiaXNBY3RpdmUiLCJvbkNsaWNrIiwiX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyIiwibmV4dFRpdGxlcyIsIm4iLCJjdXJyZW50SW5kZXgiLCJmaXJzdE5vZGUiLCJpdGVtIiwicG9zaXRpb24iLCJzc2NEb21Ob2RlIiwic3NjUG9zaXRpb24iLCJjdXJyZW50Vmlld1Bvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyUGFkZGluZ1RvcCIsIl9nZXRQYWRkaW5nVG9wVmFsdWUiLCJjb21wdXRlZFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInBhcnNlSW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJfc2Nyb2xsQ2FycmllciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW5jZWwiLCJtZW51SWQiLCJfb25NZW51SXRlbUNsaWNrIiwic2Nyb2xsVG8iLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm90aGVyUHJvcHMiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLDhDQUFOOztBQUVBO0FBQ0EsSUFBTUMsZUFBZTtBQUNqQkMsYUFBUyxJQURRLEVBQ0Y7QUFDZkMsa0JBQWMsSUFGRyxFQUVHO0FBQ3BCQyxZQUFRLEdBSFMsRUFHSjtBQUNiQyxpQkFBYSxFQUpJLENBSUQ7QUFKQyxDQUFyQjs7QUFPQTtBQUNBLElBQU1DLFlBQVk7QUFDZEosYUFBUyxpQkFBVUssSUFETDtBQUVkSixrQkFBYyxpQkFBVUksSUFGVjtBQUdkSCxZQUFRLGlCQUFVSSxNQUhKO0FBSWRILGlCQUFhLGlCQUFVRztBQUpULENBQWxCOztBQU9B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IiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQmFja1RvVG9wIGZyb20gJy4uL2J1dHRvbi1iYWNrLXRvLXRvcCdcclxuaW1wb3J0IFN0aWNreU1lbnUgZnJvbSAnLi9zdGlja3ktbWVudSc7XHJcbmltcG9ydCBTY3JvbGwgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9zY3JvbGwnO1xyXG5pbXBvcnQgR3JpZCBmcm9tICcuLi9ncmlkJztcclxuaW1wb3J0IENvbHVtbiBmcm9tICcuLi9jb2x1bW4nO1xyXG5cclxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC9mdW5jdGlvbi9kZWJvdW5jZSc7XHJcbmltcG9ydCBmaWx0ZXIgZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24vZmlsdGVyJztcclxuaW1wb3J0IGZpcnN0IGZyb20gJ2xvZGFzaC9hcnJheS9maXJzdCc7XHJcbmltcG9ydCBsYXN0IGZyb20gJ2xvZGFzaC9hcnJheS9sYXN0JztcclxuaW1wb3J0IHhvciBmcm9tICdsb2Rhc2gvYXJyYXkveG9yJztcclxuXHJcbmNvbnN0IEJhY2tUb1RvcENvbXBvbmVudCA9IEJhY2tUb1RvcDtcclxuXHJcbi8vIGNvbXBvbmVudCBkZWZhdWx0IHByb3BzLlxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBoYXNNZW51OiB0cnVlLCAvL0FjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiB0aGUgc3RpY2t5IG5hdmlnYXRpb24gY29tcG9uZW50LlxyXG4gICAgaGFzQmFja1RvVG9wOiB0cnVlLCAvL0FjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiBCYWNrVG9Ub3AgYnV0dG9uXHJcbiAgICBvZmZzZXQ6IDEwMCwgLy9vZmZzZXQgcG9zaXRpb24gd2hlbiBhZmZpeFxyXG4gICAgc2Nyb2xsRGVsYXk6IDEwIC8vZGVmYXV0IGRlYm91bmNlIGRlbGF5IGZvciBzY3JvbGwgc3B5IGNhbGxcclxufTtcclxuXHJcbi8vIGNvbXBvbmVudCBwcm9wcyBkZWZpbml0aW9uLlxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBoYXNNZW51OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGhhc0JhY2tUb1RvcDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBzY3JvbGxEZWxheTogUHJvcFR5cGVzLm51bWJlclxyXG59O1xyXG5cclxuLyoqXHJcbiogU2Nyb2xsc3B5Q29udGFpbmVyIGNvbXBvbmVudC5cclxuKi9cclxuQFNjcm9sbFxyXG5jbGFzcyBTY3JvbGxzcHlDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1lbnVMaXN0OiBbXSxcclxuICAgICAgICAgICAgYWZmaXg6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyID0gd2luZG93O1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFJlZnJlc2ggPSBkZWJvdW5jZSh0aGlzLl9yZWZyZXNoTWVudSwgdGhpcy5wcm9wcy5zY3JvbGxEZWxheSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9kZWJvdW5jZVJlZnJlc2hNZW51KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVSZWZyZXNoTWVudSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLl90aW1lb3V0cy5tYXAoY2xlYXJUaW1lb3V0KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaC5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVmcmVzaCBzY3JlZW4gWCB0aW1lcy5cclxuICAgICogQHBhcmFtICB7bnVtYmVyfSB0aW1lIG51bWJlciBvZiBleGVjdXRpb25cclxuICAgICovXHJcbiAgICBfZXhlY3V0ZVJlZnJlc2hNZW51ID0gdGltZSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdGltZW91dHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0cy5wdXNoKHNldFRpbWVvdXQodGhpcy5fcmVmcmVzaE1lbnUuYmluZCh0aGlzKSwgaSAqIDEwMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9kZWJvdW5jZVJlZnJlc2hNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFJlZnJlc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRoZSBzY3JvbGwgZXZlbnQgaGFuZGxlclxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9yZWZyZXNoTWVudSA9ICgpID0+IHtcclxuICAgICAgICBpZighdGhpcy5wcm9wcy5oYXNNZW51KSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHtzdGlja3lNZW51fSA9IHRoaXMucmVmcztcclxuICAgICAgICBjb25zdCB7Y2xpY2tlZElkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgbWVudXMgPSB0aGlzLl9idWlsZE1lbnVMaXN0KCk7IC8vYnVpbGQgdGhlIG1lbnUgbGlzdFxyXG4gICAgICAgIC8vVE9ETyByZW1vdmUgdGhpcyBjaGVja1xyXG4gICAgICAgIGNvbnN0IGFmZml4ID0gc3RpY2t5TWVudSA/IHRoaXMuX2lzTWVudUFmZml4KCkgOiB0aGlzLnN0YXRlLmFmZml4OyAvL0NhbGN1bGF0ZSBtZW51IHBvc2l0aW9uIChhZmZpeCBvciBub3QpXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2Nyb2xsIGlzIGF0IGNsaWtlZCBpdGVtIGxldmVsXHJcbiAgICAgICAgbGV0IGlzQXRDbGlja2VkSXRlbTtcclxuICAgICAgICBpZiAoY2xpY2tlZElkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgW2RhdGEtc3B5PScke2NsaWNrZWRJZH0nXWA7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZVBvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbihub2RlKTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25Ub3AgPSB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG5vZGVQb3NpdGlvbi50b3ApO1xyXG4gICAgICAgICAgICBpc0F0Q2xpY2tlZEl0ZW0gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKCkudG9wID09PSBwb3NpdGlvblRvcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIG1lbnVMaXN0OiBtZW51cyxcclxuICAgICAgICAgICAgY2xpY2tlZElkOiBpc0F0Q2xpY2tlZEl0ZW0gPyB1bmRlZmluZWQgOiBjbGlja2VkSWQsXHJcbiAgICAgICAgICAgIGFmZml4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBCdWlsZCB0aGUgbGlzdCBvZiBtZW51cy5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHJldHVybiB7YXJyYXl9IHRoZSBsaXN0IG9mIG1lbnVzLlxyXG4gICAgKi9cclxuICAgIF9idWlsZE1lbnVMaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtoYXNNZW51fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYoIWhhc01lbnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXRlY3Rpb25PZmZzZXQgPSB3aW5kb3cuc2NyZWVuLmhlaWdodCAvIDU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHt0b3A6IHRoaXMuc2Nyb2xsUG9zaXRpb24oKS50b3AsIGxlZnQ6IHRoaXMuc2Nyb2xsUG9zaXRpb24oKS5sZWZ0fTtcclxuICAgICAgICBsZXQgaXNBdFBhZ2VCb3R0b20gPSB0aGlzLmlzQXRQYWdlQm90dG9tKCk7XHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBtZW51IGxpc3QgKHdpdGhvdXQgYmxvY2tzIGluIHBvcGluKVxyXG4gICAgICAgIGNvbnN0IHRoaXNDb21wb25lbnROb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3QgYWxsRGF0YVNweSA9IHRoaXNDb21wb25lbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNweV0nKTtcclxuICAgICAgICBjb25zdCBwb3BpbkRhdGFTcHkgPSB0aGlzQ29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1mb2N1cz0ncG9waW4td2luZG93J10gW2RhdGEtc3B5XWApO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkxpc3QgPSB4b3IoYWxsRGF0YVNweSwgcG9waW5EYXRhU3B5KTtcclxuXHJcbiAgICAgICAgaWYoc2VsZWN0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWVudUxpc3QgPSBzZWxlY3Rpb25MaXN0Lm1hcCgoc2VsZWN0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcHktdGl0bGVdJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJZCA9IHNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3B5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogdGl0bGUuaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICAgICAgbm9kZUlkOiBub2RlSWQsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXMuc2Nyb2xsUG9zaXRpb24oc2VsZWN0aW9uKS50b3AsIC8vIG9mZnNldCBvZiAxMCB0byBiZSBzYWZlXHJcbiAgICAgICAgICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLl9nZXRNZW51SXRlbUNsaWNrSGFuZGxlcihub2RlSWQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRUaXRsZXMgPSBmaWx0ZXIobWVudUxpc3QsIG4gPT4gKGN1cnJlbnRTY3JvbGxQb3NpdGlvbi50b3AgKyBkZXRlY3Rpb25PZmZzZXQgPCB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG4uc2Nyb2xsVG9wKSkpO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0ZSBjdXJyZW50IG5vZGVcclxuICAgICAgICAvL2J5IGRlZmF1bHQsIGZpcnN0IG5vZGUgaXMgaW5kZXhlZFxyXG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSBtZW51TGlzdFswXS5pbmRleDtcclxuICAgICAgICBpZigwIDwgbmV4dFRpdGxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgZmlyc3Qgbm9kZVxyXG4gICAgICAgICAgICBjb25zdCBmaXJzdE5vZGUgPSBmaXJzdChuZXh0VGl0bGVzKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBmaXJzdE5vZGUuaW5kZXg7XHJcbiAgICAgICAgICAgIGlmKDAgPCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbWVudUxpc3RbaW5kZXggLSAxXS5pbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgdGhhdCB0aGUgcG9zaXRpb24gaXMgdGhlIGxhc3QgdGl0bGVcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbGFzdChtZW51TGlzdCkuaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbGlja2VkSWQgPSB0aGlzLnN0YXRlLmNsaWNrZWRJZDtcclxuICAgICAgICBpZihpc0F0UGFnZUJvdHRvbSAmJiB1bmRlZmluZWQgIT09IGNsaWNrZWRJZCkge1xyXG4gICAgICAgICAgICBtZW51TGlzdCA9IG1lbnVMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5vZGVJZCA9PT0gY2xpY2tlZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NsaWNrZWRJZDogdW5kZWZpbmVkfSk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBtZW51TGlzdFtjdXJyZW50SW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lbnVMaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2FsY3VsYXRlIHRoZSByZWFsIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQsIGRlcGVuZGluZyBvbiBkZWNsYXJlZCBvZmZzZXQgaW4gcHJvcHMuXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge251bWJlcn0gcG9zaXRpb24gcG9zaXRpb25cclxuICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVhbCBwb3NpdGlvblxyXG4gICAgKi9cclxuICAgIF9nZXRFbGVtZW50UmVhbFBvc2l0aW9uID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3NjRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHNzY1Bvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbihzc2NEb21Ob2RlKTtcclxuICAgICAgICByZXR1cm4gcG9zaXRpb24gLSBzc2NQb3NpdGlvbi50b3A7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxjdWxhdGUgbWVudSBwb3NpdGlvbiAoYWZmaXggb3Igbm90KVxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG1lbnUgbXVzdCBiZSBhZmZpeCwgZWxzZSBmYWxzZVxyXG4gICAgKi9cclxuICAgIF9pc01lbnVBZmZpeCA9ICgpID0+IHtcclxuICAgICAgICBsZXQge29mZnNldH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtoYXNNZW51fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYoIWhhc01lbnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzc2NEb21Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFZpZXdQb3NpdGlvbiA9IHNzY0RvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUGFkZGluZ1RvcCA9IHRoaXMuX2dldFBhZGRpbmdUb3BWYWx1ZSgpO1xyXG4gICAgICAgIG9mZnNldCAtPSBjb250YWluZXJQYWRkaW5nVG9wO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50Vmlld1Bvc2l0aW9uLnRvcCA8PSBvZmZzZXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIF9nZXRQYWRkaW5nVG9wVmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3NjRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3NjRG9tTm9kZSwgbnVsbCk7XHJcbiAgICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICAgICAgcmV0dXJuIHBhZGRpbmdUb3AgPyBwYXJzZUludChwYWRkaW5nVG9wLCAwKSA6IDA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgY2xpY2sgb24gaXRlbSBtZW51IGZ1bmN0aW9uLlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9IG1lbnVJZCAgbm9kZSBzcHlJZCBpbiBET00gdG8gc2Nyb2xsIHRvXHJcbiAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgICAgICAgZnVuY3Rpb24gdG8gY2FsbFxyXG4gICAgKi9cclxuICAgIF9nZXRNZW51SXRlbUNsaWNrSGFuZGxlcihtZW51SWQpIHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGNsaWNrZWRJZDogbWVudUlkXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hNZW51KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbk1lbnVJdGVtQ2xpY2sobWVudUlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNZW51IGNsaWNrIGZ1bmN0aW9uLiBTY3JvbGwgdG8gdGhlIG5vZGUgcG9zaXRpb24uXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gbWVudUlkICBub2RlIHNweUlkIGluIERPTSB0byBzY3JvbGwgdG9cclxuICAgICovXHJcbiAgICBfb25NZW51SXRlbUNsaWNrKG1lbnVJZCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYFtkYXRhLXNweT0nJHttZW51SWR9J11gO1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBub2RlUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKG5vZGUpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uVG9wID0gdGhpcy5fZ2V0RWxlbWVudFJlYWxQb3NpdGlvbihub2RlUG9zaXRpb24udG9wKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvKHVuZGVmaW5lZCwgcG9zaXRpb25Ub3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2NoaWxkcmVuLCBoYXNNZW51LCBoYXNCYWNrVG9Ub3AsIG9mZnNldCwgc2Nyb2xsRGVsYXksIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7YWZmaXgsIG1lbnVMaXN0fSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzY3JvbGxzcHktY29udGFpbmVyJyB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICAgICB7aGFzTWVudSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxTdGlja3lNZW51IGFmZml4PXthZmZpeH0gYWZmaXhPZmZzZXQ9e29mZnNldH0gbWVudUxpc3Q9e21lbnVMaXN0fSByZWY9J3N0aWNreU1lbnUnIC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3Njcm9sbHNweS1jb250YWluZXItY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7aGFzQmFja1RvVG9wICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPEJhY2tUb1RvcENvbXBvbmVudCAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuU2Nyb2xsc3B5Q29udGFpbmVyLmRpc3BsYXlOYW1lID0gJ1Njcm9sbHNweUNvbnRhaW5lcic7XHJcblNjcm9sbHNweUNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcblNjcm9sbHNweUNvbnRhaW5lci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxzcHlDb250YWluZXI7XHJcbiJdfQ==