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

var _lodash = require('lodash');

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
                if (node) {
                    var nodePosition = _this.scrollPosition(node);
                    var positionTop = _this._getElementRealPosition(nodePosition.top);
                    isAtClickedItem = _this.scrollPosition().top === positionTop;
                }
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
            var selectionList = (0, _lodash.xor)(allDataSpy, popinDataSpy);

            if (selectionList.length === 0) {
                return;
            }
            var menuList = selectionList.map(function (selection) {
                return {
                    title: selection.querySelector('[data-spy-title]'),
                    nodeId: selection.getAttribute('data-spy'),
                    selection: selection
                };
            }).filter(function (_ref) {
                var title = _ref.title,
                    nodeId = _ref.nodeId,
                    selection = _ref.selection;
                return title && nodeId && selection;
            }).map(function (_ref2, index) {
                var title = _ref2.title,
                    nodeId = _ref2.nodeId,
                    selection = _ref2.selection;

                return {
                    index: index,
                    label: title.innerHTML,
                    nodeId: nodeId,
                    scrollTop: _this.scrollPosition(selection).top, // offset of 10 to be safe
                    isActive: false,
                    onClick: _this._getMenuItemClickHandler(nodeId)
                };
            });

            var nextTitles = (0, _lodash.filter)(menuList, function (n) {
                return currentScrollPosition.top + detectionOffset < _this._getElementRealPosition(n.scrollTop);
            });

            //Calculate current node
            //by default, first node is indexed
            var currentIndex = menuList[0].index;
            if (0 < nextTitles.length) {
                //check the first node
                var firstNode = (0, _lodash.first)(nextTitles);
                var index = firstNode.index;
                if (0 < index) {
                    currentIndex = menuList[index - 1].index;
                }
            } else {
                //means that the position is the last title
                currentIndex = (0, _lodash.last)(menuList).index;
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
        this._debouncedRefresh = (0, _lodash.debounce)(this._refreshMenu, this.props.scrollDelay);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCYWNrVG9Ub3BDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJoYXNNZW51IiwiaGFzQmFja1RvVG9wIiwib2Zmc2V0Iiwic2Nyb2xsRGVsYXkiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiU2Nyb2xsc3B5Q29udGFpbmVyIiwicHJvcHMiLCJfZXhlY3V0ZVJlZnJlc2hNZW51IiwidGltZSIsIl90aW1lb3V0cyIsImkiLCJwdXNoIiwic2V0VGltZW91dCIsIl9yZWZyZXNoTWVudSIsImJpbmQiLCJfZGVib3VuY2VSZWZyZXNoTWVudSIsIl9kZWJvdW5jZWRSZWZyZXNoIiwic3RpY2t5TWVudSIsInJlZnMiLCJjbGlja2VkSWQiLCJzdGF0ZSIsIm1lbnVzIiwiX2J1aWxkTWVudUxpc3QiLCJhZmZpeCIsIl9pc01lbnVBZmZpeCIsImlzQXRDbGlja2VkSXRlbSIsInVuZGVmaW5lZCIsInNlbGVjdG9yIiwibm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5vZGVQb3NpdGlvbiIsInNjcm9sbFBvc2l0aW9uIiwicG9zaXRpb25Ub3AiLCJfZ2V0RWxlbWVudFJlYWxQb3NpdGlvbiIsInRvcCIsInNldFN0YXRlIiwibWVudUxpc3QiLCJkZXRlY3Rpb25PZmZzZXQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJoZWlnaHQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJsZWZ0IiwiaXNBdFBhZ2VCb3R0b20iLCJ0aGlzQ29tcG9uZW50Tm9kZSIsImZpbmRET01Ob2RlIiwiYWxsRGF0YVNweSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3BpbkRhdGFTcHkiLCJzZWxlY3Rpb25MaXN0IiwibGVuZ3RoIiwibWFwIiwic2VsZWN0aW9uIiwidGl0bGUiLCJub2RlSWQiLCJnZXRBdHRyaWJ1dGUiLCJmaWx0ZXIiLCJpbmRleCIsImxhYmVsIiwiaW5uZXJIVE1MIiwic2Nyb2xsVG9wIiwiaXNBY3RpdmUiLCJvbkNsaWNrIiwiX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyIiwibmV4dFRpdGxlcyIsIm4iLCJjdXJyZW50SW5kZXgiLCJmaXJzdE5vZGUiLCJpdGVtIiwicG9zaXRpb24iLCJzc2NEb21Ob2RlIiwic3NjUG9zaXRpb24iLCJjdXJyZW50Vmlld1Bvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyUGFkZGluZ1RvcCIsIl9nZXRQYWRkaW5nVG9wVmFsdWUiLCJjb21wdXRlZFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInBhcnNlSW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJfc2Nyb2xsQ2FycmllciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW5jZWwiLCJtZW51SWQiLCJfb25NZW51SXRlbUNsaWNrIiwic2Nyb2xsVG8iLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm90aGVyUHJvcHMiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsOENBQU47O0FBRUE7QUFDQSxJQUFNQyxlQUFlO0FBQ2pCQyxhQUFTLElBRFEsRUFDRjtBQUNmQyxrQkFBYyxJQUZHLEVBRUc7QUFDcEJDLFlBQVEsR0FIUyxFQUdKO0FBQ2JDLGlCQUFhLEVBSkksQ0FJRDtBQUpDLENBQXJCOztBQU9BO0FBQ0EsSUFBTUMsWUFBWTtBQUNkSixhQUFTLGlCQUFVSyxJQURMO0FBRWRKLGtCQUFjLGlCQUFVSSxJQUZWO0FBR2RILFlBQVEsaUJBQVVJLE1BSEo7QUFJZEgsaUJBQWEsaUJBQVVHO0FBSlQsQ0FBbEI7O0FBT0E7Ozs7SUFJTUMsa0I7OztBQUNGLGdDQUFZ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QUFBLHVCQUFLLGNBQVcscUJBQWhCLElBQTBDeUQsVUFBMUM7QUFDS2hHLHVCQUNHLHNEQUFZLE9BQU95QixLQUFuQixFQUEwQixhQUFhdkIsTUFBdkMsRUFBK0MsVUFBVXFDLFFBQXpELEVBQW1FLEtBQUksWUFBdkUsR0FGUjtBQUlJO0FBQUE7QUFBQSxrQkFBSyxjQUFXLDZCQUFoQjtBQUNLd0Q7QUFETCxhQUpKO0FBT0s5Riw0QkFDRyw4QkFBQyxrQkFBRDtBQVJSLFNBREo7QUFhSCxLOzs7OztBQUdMOzs7QUFDQU0sbUJBQW1CMEYsV0FBbkIsR0FBaUMsb0JBQWpDO0FBQ0ExRixtQkFBbUJSLFlBQW5CLEdBQWtDQSxZQUFsQztBQUNBUSxtQkFBbUJILFNBQW5CLEdBQStCQSxTQUEvQjs7a0JBRWVHLGtCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBCYWNrVG9Ub3AgZnJvbSAnLi4vYnV0dG9uLWJhY2stdG8tdG9wJ1xyXG5pbXBvcnQgU3RpY2t5TWVudSBmcm9tICcuL3N0aWNreS1tZW51JztcclxuaW1wb3J0IFNjcm9sbCBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL3Njcm9sbCc7XHJcbmltcG9ydCBHcmlkIGZyb20gJy4uL2dyaWQnO1xyXG5pbXBvcnQgQ29sdW1uIGZyb20gJy4uL2NvbHVtbic7XHJcblxyXG5pbXBvcnQgeyBkZWJvdW5jZSwgZmlsdGVyLCBmaXJzdCwgbGFzdCwgeG9yIH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbmNvbnN0IEJhY2tUb1RvcENvbXBvbmVudCA9IEJhY2tUb1RvcDtcclxuXHJcbi8vIGNvbXBvbmVudCBkZWZhdWx0IHByb3BzLlxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBoYXNNZW51OiB0cnVlLCAvL0FjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiB0aGUgc3RpY2t5IG5hdmlnYXRpb24gY29tcG9uZW50LlxyXG4gICAgaGFzQmFja1RvVG9wOiB0cnVlLCAvL0FjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiBCYWNrVG9Ub3AgYnV0dG9uXHJcbiAgICBvZmZzZXQ6IDEwMCwgLy9vZmZzZXQgcG9zaXRpb24gd2hlbiBhZmZpeFxyXG4gICAgc2Nyb2xsRGVsYXk6IDEwIC8vZGVmYXV0IGRlYm91bmNlIGRlbGF5IGZvciBzY3JvbGwgc3B5IGNhbGxcclxufTtcclxuXHJcbi8vIGNvbXBvbmVudCBwcm9wcyBkZWZpbml0aW9uLlxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBoYXNNZW51OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGhhc0JhY2tUb1RvcDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBzY3JvbGxEZWxheTogUHJvcFR5cGVzLm51bWJlclxyXG59O1xyXG5cclxuLyoqXHJcbiogU2Nyb2xsc3B5Q29udGFpbmVyIGNvbXBvbmVudC5cclxuKi9cclxuQFNjcm9sbFxyXG5jbGFzcyBTY3JvbGxzcHlDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1lbnVMaXN0OiBbXSxcclxuICAgICAgICAgICAgYWZmaXg6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyID0gd2luZG93O1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFJlZnJlc2ggPSBkZWJvdW5jZSh0aGlzLl9yZWZyZXNoTWVudSwgdGhpcy5wcm9wcy5zY3JvbGxEZWxheSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9kZWJvdW5jZVJlZnJlc2hNZW51KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVSZWZyZXNoTWVudSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLl90aW1lb3V0cy5tYXAoY2xlYXJUaW1lb3V0KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaC5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVmcmVzaCBzY3JlZW4gWCB0aW1lcy5cclxuICAgICogQHBhcmFtICB7bnVtYmVyfSB0aW1lIG51bWJlciBvZiBleGVjdXRpb25cclxuICAgICovXHJcbiAgICBfZXhlY3V0ZVJlZnJlc2hNZW51ID0gKHRpbWUpID0+IHtcclxuICAgICAgICB0aGlzLl90aW1lb3V0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRzLnB1c2goc2V0VGltZW91dCh0aGlzLl9yZWZyZXNoTWVudS5iaW5kKHRoaXMpLCBpICogMTAwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2RlYm91bmNlUmVmcmVzaE1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogVGhlIHNjcm9sbCBldmVudCBoYW5kbGVyXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3JlZnJlc2hNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5oYXNNZW51KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgeyBzdGlja3lNZW51IH0gPSB0aGlzLnJlZnM7XHJcbiAgICAgICAgY29uc3QgeyBjbGlja2VkSWQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgbWVudXMgPSB0aGlzLl9idWlsZE1lbnVMaXN0KCk7IC8vYnVpbGQgdGhlIG1lbnUgbGlzdFxyXG4gICAgICAgIC8vVE9ETyByZW1vdmUgdGhpcyBjaGVja1xyXG4gICAgICAgIGNvbnN0IGFmZml4ID0gc3RpY2t5TWVudSA/IHRoaXMuX2lzTWVudUFmZml4KCkgOiB0aGlzLnN0YXRlLmFmZml4OyAvL0NhbGN1bGF0ZSBtZW51IHBvc2l0aW9uIChhZmZpeCBvciBub3QpXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2Nyb2xsIGlzIGF0IGNsaWtlZCBpdGVtIGxldmVsXHJcbiAgICAgICAgbGV0IGlzQXRDbGlja2VkSXRlbTtcclxuICAgICAgICBpZiAoY2xpY2tlZElkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgW2RhdGEtc3B5PScke2NsaWNrZWRJZH0nXWA7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb24obm9kZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvblRvcCA9IHRoaXMuX2dldEVsZW1lbnRSZWFsUG9zaXRpb24obm9kZVBvc2l0aW9uLnRvcCk7XHJcbiAgICAgICAgICAgICAgICBpc0F0Q2xpY2tlZEl0ZW0gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKCkudG9wID09PSBwb3NpdGlvblRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbWVudUxpc3Q6IG1lbnVzLFxyXG4gICAgICAgICAgICBjbGlja2VkSWQ6IGlzQXRDbGlja2VkSXRlbSA/IHVuZGVmaW5lZCA6IGNsaWNrZWRJZCxcclxuICAgICAgICAgICAgYWZmaXhcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHRoZSBsaXN0IG9mIG1lbnVzLlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcmV0dXJuIHthcnJheX0gdGhlIGxpc3Qgb2YgbWVudXMuXHJcbiAgICAqL1xyXG4gICAgX2J1aWxkTWVudUxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBoYXNNZW51IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghaGFzTWVudSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRldGVjdGlvbk9mZnNldCA9IHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC8gNTtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSB7IHRvcDogdGhpcy5zY3JvbGxQb3NpdGlvbigpLnRvcCwgbGVmdDogdGhpcy5zY3JvbGxQb3NpdGlvbigpLmxlZnQgfTtcclxuICAgICAgICBjb25zdCBpc0F0UGFnZUJvdHRvbSA9IHRoaXMuaXNBdFBhZ2VCb3R0b20oKTtcclxuXHJcbiAgICAgICAgLy9nZXQgdGhlIG1lbnUgbGlzdCAod2l0aG91dCBibG9ja3MgaW4gcG9waW4pXHJcbiAgICAgICAgY29uc3QgdGhpc0NvbXBvbmVudE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICBjb25zdCBhbGxEYXRhU3B5ID0gdGhpc0NvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3B5XScpO1xyXG4gICAgICAgIGNvbnN0IHBvcGluRGF0YVNweSA9IHRoaXNDb21wb25lbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZvY3VzPVxcJ3BvcGluLXdpbmRvd1xcJ10gW2RhdGEtc3B5XScpO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkxpc3QgPSB4b3IoYWxsRGF0YVNweSwgcG9waW5EYXRhU3B5KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1lbnVMaXN0ID0gc2VsZWN0aW9uTGlzdC5tYXAoKHNlbGVjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcHktdGl0bGVdJyksXHJcbiAgICAgICAgICAgICAgICBub2RlSWQ6IHNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3B5JyksXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KS5maWx0ZXIoKHsgdGl0bGUsIG5vZGVJZCwgc2VsZWN0aW9uIH0pID0+IHRpdGxlICYmIG5vZGVJZCAmJiBzZWxlY3Rpb24pLm1hcCgoeyB0aXRsZSwgbm9kZUlkLCBzZWxlY3Rpb24gfSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRpdGxlLmlubmVySFRNTCxcclxuICAgICAgICAgICAgICAgIG5vZGVJZCxcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGhpcy5zY3JvbGxQb3NpdGlvbihzZWxlY3Rpb24pLnRvcCwgLy8gb2Zmc2V0IG9mIDEwIHRvIGJlIHNhZmVcclxuICAgICAgICAgICAgICAgIGlzQWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyKG5vZGVJZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFRpdGxlcyA9IGZpbHRlcihtZW51TGlzdCwgKG4pID0+IGN1cnJlbnRTY3JvbGxQb3NpdGlvbi50b3AgKyBkZXRlY3Rpb25PZmZzZXQgPCB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG4uc2Nyb2xsVG9wKSk7XHJcblxyXG4gICAgICAgIC8vQ2FsY3VsYXRlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgIC8vYnkgZGVmYXVsdCwgZmlyc3Qgbm9kZSBpcyBpbmRleGVkXHJcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IG1lbnVMaXN0WzBdLmluZGV4O1xyXG4gICAgICAgIGlmICgwIDwgbmV4dFRpdGxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgZmlyc3Qgbm9kZVxyXG4gICAgICAgICAgICBjb25zdCBmaXJzdE5vZGUgPSBmaXJzdChuZXh0VGl0bGVzKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBmaXJzdE5vZGUuaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICgwIDwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IG1lbnVMaXN0W2luZGV4IC0gMV0uaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL21lYW5zIHRoYXQgdGhlIHBvc2l0aW9uIGlzIHRoZSBsYXN0IHRpdGxlXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGxhc3QobWVudUxpc3QpLmluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbGlja2VkSWQgPSB0aGlzLnN0YXRlLmNsaWNrZWRJZDtcclxuICAgICAgICBpZiAoaXNBdFBhZ2VCb3R0b20gJiYgdW5kZWZpbmVkICE9PSBjbGlja2VkSWQpIHtcclxuICAgICAgICAgICAgbWVudUxpc3QgPSBtZW51TGlzdC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5vZGVJZCA9PT0gY2xpY2tlZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjbGlja2VkSWQ6IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZW51TGlzdFtjdXJyZW50SW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lbnVMaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2FsY3VsYXRlIHRoZSByZWFsIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQsIGRlcGVuZGluZyBvbiBkZWNsYXJlZCBvZmZzZXQgaW4gcHJvcHMuXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge251bWJlcn0gcG9zaXRpb24gcG9zaXRpb25cclxuICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVhbCBwb3NpdGlvblxyXG4gICAgKi9cclxuICAgIF9nZXRFbGVtZW50UmVhbFBvc2l0aW9uID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3NjRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHNzY1Bvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbihzc2NEb21Ob2RlKTtcclxuICAgICAgICByZXR1cm4gcG9zaXRpb24gLSBzc2NQb3NpdGlvbi50b3A7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxjdWxhdGUgbWVudSBwb3NpdGlvbiAoYWZmaXggb3Igbm90KVxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG1lbnUgbXVzdCBiZSBhZmZpeCwgZWxzZSBmYWxzZVxyXG4gICAgKi9cclxuICAgIF9pc01lbnVBZmZpeCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgeyBvZmZzZXQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBoYXNNZW51IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghaGFzTWVudSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNzY0RvbU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50Vmlld1Bvc2l0aW9uID0gc3NjRG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJQYWRkaW5nVG9wID0gdGhpcy5fZ2V0UGFkZGluZ1RvcFZhbHVlKCk7XHJcbiAgICAgICAgb2Zmc2V0IC09IGNvbnRhaW5lclBhZGRpbmdUb3A7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWaWV3UG9zaXRpb24udG9wIDw9IG9mZnNldDtcclxuICAgIH07XHJcblxyXG4gICAgX2dldFBhZGRpbmdUb3BWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzc2NEb21Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzc2NEb21Ob2RlLCBudWxsKTtcclxuICAgICAgICBjb25zdCBwYWRkaW5nVG9wID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKTtcclxuICAgICAgICByZXR1cm4gcGFkZGluZ1RvcCA/IHBhcnNlSW50KHBhZGRpbmdUb3AsIDApIDogMDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSBjbGljayBvbiBpdGVtIG1lbnUgZnVuY3Rpb24uXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gbWVudUlkICBub2RlIHNweUlkIGluIERPTSB0byBzY3JvbGwgdG9cclxuICAgICogQHJldHVybiB7ZnVuY3Rpb259ICAgICAgICBmdW5jdGlvbiB0byBjYWxsXHJcbiAgICAqL1xyXG4gICAgX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyKG1lbnVJZCkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tlZElkOiBtZW51SWRcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE1lbnUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uTWVudUl0ZW1DbGljayhtZW51SWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNZW51IGNsaWNrIGZ1bmN0aW9uLiBTY3JvbGwgdG8gdGhlIG5vZGUgcG9zaXRpb24uXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gbWVudUlkICBub2RlIHNweUlkIGluIERPTSB0byBzY3JvbGwgdG9cclxuICAgICovXHJcbiAgICBfb25NZW51SXRlbUNsaWNrKG1lbnVJZCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYFtkYXRhLXNweT0nJHttZW51SWR9J11gO1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBub2RlUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKG5vZGUpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uVG9wID0gdGhpcy5fZ2V0RWxlbWVudFJlYWxQb3NpdGlvbihub2RlUG9zaXRpb24udG9wKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvKHVuZGVmaW5lZCwgcG9zaXRpb25Ub3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgaGFzTWVudSwgaGFzQmFja1RvVG9wLCBvZmZzZXQsIHNjcm9sbERlbGF5LCAuLi5vdGhlclByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgYWZmaXgsIG1lbnVMaXN0IH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2Nyb2xsc3B5LWNvbnRhaW5lcicgey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAge2hhc01lbnUgJiZcclxuICAgICAgICAgICAgICAgICAgICA8U3RpY2t5TWVudSBhZmZpeD17YWZmaXh9IGFmZml4T2Zmc2V0PXtvZmZzZXR9IG1lbnVMaXN0PXttZW51TGlzdH0gcmVmPSdzdGlja3lNZW51JyAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzY3JvbGxzcHktY29udGFpbmVyLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2hhc0JhY2tUb1RvcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxCYWNrVG9Ub3BDb21wb25lbnQgLz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcblNjcm9sbHNweUNvbnRhaW5lci5kaXNwbGF5TmFtZSA9ICdTY3JvbGxzcHlDb250YWluZXInO1xyXG5TY3JvbGxzcHlDb250YWluZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5TY3JvbGxzcHlDb250YWluZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsc3B5Q29udGFpbmVyOyJdfQ==