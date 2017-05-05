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
            var menuList = selectionList.map(function (selection) {
                return {
                    title: selection.querySelector('[data-spy-title]'),
                    nodeId: selection.getAttribute('data-spy'),
                    selection: selection
                };
            }).filter(function (_ref) {
                var title = _ref.title;
                return title;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCYWNrVG9Ub3BDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJoYXNNZW51IiwiaGFzQmFja1RvVG9wIiwib2Zmc2V0Iiwic2Nyb2xsRGVsYXkiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiU2Nyb2xsc3B5Q29udGFpbmVyIiwicHJvcHMiLCJfZXhlY3V0ZVJlZnJlc2hNZW51IiwiX3RpbWVvdXRzIiwiaSIsInRpbWUiLCJwdXNoIiwic2V0VGltZW91dCIsIl9yZWZyZXNoTWVudSIsImJpbmQiLCJfZGVib3VuY2VSZWZyZXNoTWVudSIsIl9kZWJvdW5jZWRSZWZyZXNoIiwic3RpY2t5TWVudSIsInJlZnMiLCJjbGlja2VkSWQiLCJzdGF0ZSIsIm1lbnVzIiwiX2J1aWxkTWVudUxpc3QiLCJhZmZpeCIsIl9pc01lbnVBZmZpeCIsImlzQXRDbGlja2VkSXRlbSIsInVuZGVmaW5lZCIsInNlbGVjdG9yIiwibm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5vZGVQb3NpdGlvbiIsInNjcm9sbFBvc2l0aW9uIiwicG9zaXRpb25Ub3AiLCJfZ2V0RWxlbWVudFJlYWxQb3NpdGlvbiIsInRvcCIsInNldFN0YXRlIiwibWVudUxpc3QiLCJkZXRlY3Rpb25PZmZzZXQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJoZWlnaHQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJsZWZ0IiwiaXNBdFBhZ2VCb3R0b20iLCJ0aGlzQ29tcG9uZW50Tm9kZSIsImZpbmRET01Ob2RlIiwiYWxsRGF0YVNweSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3BpbkRhdGFTcHkiLCJzZWxlY3Rpb25MaXN0IiwibGVuZ3RoIiwibWFwIiwic2VsZWN0aW9uIiwidGl0bGUiLCJub2RlSWQiLCJnZXRBdHRyaWJ1dGUiLCJmaWx0ZXIiLCJpbmRleCIsImxhYmVsIiwiaW5uZXJIVE1MIiwic2Nyb2xsVG9wIiwiaXNBY3RpdmUiLCJvbkNsaWNrIiwiX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyIiwibmV4dFRpdGxlcyIsIm4iLCJjdXJyZW50SW5kZXgiLCJmaXJzdE5vZGUiLCJpdGVtIiwicG9zaXRpb24iLCJzc2NEb21Ob2RlIiwic3NjUG9zaXRpb24iLCJjdXJyZW50Vmlld1Bvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyUGFkZGluZ1RvcCIsIl9nZXRQYWRkaW5nVG9wVmFsdWUiLCJjb21wdXRlZFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInBhcnNlSW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJfc2Nyb2xsQ2FycmllciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW5jZWwiLCJtZW51SWQiLCJfb25NZW51SXRlbUNsaWNrIiwic2Nyb2xsVG8iLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm90aGVyUHJvcHMiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLDhDQUFOOztBQUVBO0FBQ0EsSUFBTUMsZUFBZTtBQUNqQkMsYUFBUyxJQURRLEVBQ0Y7QUFDZkMsa0JBQWMsSUFGRyxFQUVHO0FBQ3BCQyxZQUFRLEdBSFMsRUFHSjtBQUNiQyxpQkFBYSxFQUpJLENBSUQ7QUFKQyxDQUFyQjs7QUFPQTtBQUNBLElBQU1DLFlBQVk7QUFDZEosYUFBUyxpQkFBVUssSUFETDtBQUVkSixrQkFBYyxpQkFBVUksSUFGVjtBQUdkSCxZQUFRLGlCQUFVSSxNQUhKO0FBSWRILGlCQUFhLGlCQUFVRztBQUpULENB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QXZFLEdBRlI7QUFJSTtBQUFBO0FBQUEsa0JBQUssY0FBVyw2QkFBaEI7QUFDS3dEO0FBREwsYUFKSjtBQU9LOUYsNEJBQ0csOEJBQUMsa0JBQUQ7QUFSUixTQURKO0FBYUgsSzs7Ozs7QUFHTDs7O0FBQ0FNLG1CQUFtQjBGLFdBQW5CLEdBQWlDLG9CQUFqQztBQUNBMUYsbUJBQW1CUixZQUFuQixHQUFrQ0EsWUFBbEM7QUFDQVEsbUJBQW1CSCxTQUFuQixHQUErQkEsU0FBL0I7O2tCQUVlRyxrQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQmFja1RvVG9wIGZyb20gJy4uL2J1dHRvbi1iYWNrLXRvLXRvcCdcclxuaW1wb3J0IFN0aWNreU1lbnUgZnJvbSAnLi9zdGlja3ktbWVudSc7XHJcbmltcG9ydCBTY3JvbGwgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9zY3JvbGwnO1xyXG5pbXBvcnQgR3JpZCBmcm9tICcuLi9ncmlkJztcclxuaW1wb3J0IENvbHVtbiBmcm9tICcuLi9jb2x1bW4nO1xyXG5cclxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC9mdW5jdGlvbi9kZWJvdW5jZSc7XHJcbmltcG9ydCBmaWx0ZXIgZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24vZmlsdGVyJztcclxuaW1wb3J0IGZpcnN0IGZyb20gJ2xvZGFzaC9hcnJheS9maXJzdCc7XHJcbmltcG9ydCBsYXN0IGZyb20gJ2xvZGFzaC9hcnJheS9sYXN0JztcclxuaW1wb3J0IHhvciBmcm9tICdsb2Rhc2gvYXJyYXkveG9yJztcclxuXHJcbmNvbnN0IEJhY2tUb1RvcENvbXBvbmVudCA9IEJhY2tUb1RvcDtcclxuXHJcbi8vIGNvbXBvbmVudCBkZWZhdWx0IHByb3BzLlxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBoYXNNZW51OiB0cnVlLCAvL0FjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiB0aGUgc3RpY2t5IG5hdmlnYXRpb24gY29tcG9uZW50LlxyXG4gICAgaGFzQmFja1RvVG9wOiB0cnVlLCAvL0FjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiBCYWNrVG9Ub3AgYnV0dG9uXHJcbiAgICBvZmZzZXQ6IDEwMCwgLy9vZmZzZXQgcG9zaXRpb24gd2hlbiBhZmZpeFxyXG4gICAgc2Nyb2xsRGVsYXk6IDEwIC8vZGVmYXV0IGRlYm91bmNlIGRlbGF5IGZvciBzY3JvbGwgc3B5IGNhbGxcclxufTtcclxuXHJcbi8vIGNvbXBvbmVudCBwcm9wcyBkZWZpbml0aW9uLlxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBoYXNNZW51OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGhhc0JhY2tUb1RvcDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBzY3JvbGxEZWxheTogUHJvcFR5cGVzLm51bWJlclxyXG59O1xyXG5cclxuLyoqXHJcbiogU2Nyb2xsc3B5Q29udGFpbmVyIGNvbXBvbmVudC5cclxuKi9cclxuQFNjcm9sbFxyXG5jbGFzcyBTY3JvbGxzcHlDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1lbnVMaXN0OiBbXSxcclxuICAgICAgICAgICAgYWZmaXg6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyID0gd2luZG93O1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFJlZnJlc2ggPSBkZWJvdW5jZSh0aGlzLl9yZWZyZXNoTWVudSwgdGhpcy5wcm9wcy5zY3JvbGxEZWxheSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9kZWJvdW5jZVJlZnJlc2hNZW51KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVSZWZyZXNoTWVudSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLl90aW1lb3V0cy5tYXAoY2xlYXJUaW1lb3V0KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaC5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVmcmVzaCBzY3JlZW4gWCB0aW1lcy5cclxuICAgICogQHBhcmFtICB7bnVtYmVyfSB0aW1lIG51bWJlciBvZiBleGVjdXRpb25cclxuICAgICovXHJcbiAgICBfZXhlY3V0ZVJlZnJlc2hNZW51ID0gdGltZSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdGltZW91dHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0cy5wdXNoKHNldFRpbWVvdXQodGhpcy5fcmVmcmVzaE1lbnUuYmluZCh0aGlzKSwgaSAqIDEwMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9kZWJvdW5jZVJlZnJlc2hNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFJlZnJlc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRoZSBzY3JvbGwgZXZlbnQgaGFuZGxlclxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9yZWZyZXNoTWVudSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGFzTWVudSkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCB7IHN0aWNreU1lbnUgfSA9IHRoaXMucmVmcztcclxuICAgICAgICBjb25zdCB7IGNsaWNrZWRJZCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBtZW51cyA9IHRoaXMuX2J1aWxkTWVudUxpc3QoKTsgLy9idWlsZCB0aGUgbWVudSBsaXN0XHJcbiAgICAgICAgLy9UT0RPIHJlbW92ZSB0aGlzIGNoZWNrXHJcbiAgICAgICAgY29uc3QgYWZmaXggPSBzdGlja3lNZW51ID8gdGhpcy5faXNNZW51QWZmaXgoKSA6IHRoaXMuc3RhdGUuYWZmaXg7IC8vQ2FsY3VsYXRlIG1lbnUgcG9zaXRpb24gKGFmZml4IG9yIG5vdClcclxuICAgICAgICAvLyBDaGVjayBpZiBzY3JvbGwgaXMgYXQgY2xpa2VkIGl0ZW0gbGV2ZWxcclxuICAgICAgICBsZXQgaXNBdENsaWNrZWRJdGVtO1xyXG4gICAgICAgIGlmIChjbGlja2VkSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IGBbZGF0YS1zcHk9JyR7Y2xpY2tlZElkfSddYDtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKG5vZGUpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvblRvcCA9IHRoaXMuX2dldEVsZW1lbnRSZWFsUG9zaXRpb24obm9kZVBvc2l0aW9uLnRvcCk7XHJcbiAgICAgICAgICAgIGlzQXRDbGlja2VkSXRlbSA9IHRoaXMuc2Nyb2xsUG9zaXRpb24oKS50b3AgPT09IHBvc2l0aW9uVG9wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbWVudUxpc3Q6IG1lbnVzLFxyXG4gICAgICAgICAgICBjbGlja2VkSWQ6IGlzQXRDbGlja2VkSXRlbSA/IHVuZGVmaW5lZCA6IGNsaWNrZWRJZCxcclxuICAgICAgICAgICAgYWZmaXhcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHRoZSBsaXN0IG9mIG1lbnVzLlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcmV0dXJuIHthcnJheX0gdGhlIGxpc3Qgb2YgbWVudXMuXHJcbiAgICAqL1xyXG4gICAgX2J1aWxkTWVudUxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBoYXNNZW51IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghaGFzTWVudSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRldGVjdGlvbk9mZnNldCA9IHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC8gNTtcclxuICAgICAgICBsZXQgY3VycmVudFNjcm9sbFBvc2l0aW9uID0geyB0b3A6IHRoaXMuc2Nyb2xsUG9zaXRpb24oKS50b3AsIGxlZnQ6IHRoaXMuc2Nyb2xsUG9zaXRpb24oKS5sZWZ0IH07XHJcbiAgICAgICAgbGV0IGlzQXRQYWdlQm90dG9tID0gdGhpcy5pc0F0UGFnZUJvdHRvbSgpO1xyXG5cclxuICAgICAgICAvL2dldCB0aGUgbWVudSBsaXN0ICh3aXRob3V0IGJsb2NrcyBpbiBwb3BpbilcclxuICAgICAgICBjb25zdCB0aGlzQ29tcG9uZW50Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGFsbERhdGFTcHkgPSB0aGlzQ29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcHldJyk7XHJcbiAgICAgICAgY29uc3QgcG9waW5EYXRhU3B5ID0gdGhpc0NvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtZm9jdXM9J3BvcGluLXdpbmRvdyddIFtkYXRhLXNweV1gKTtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25MaXN0ID0geG9yKGFsbERhdGFTcHksIHBvcGluRGF0YVNweSk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3Rpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZW51TGlzdCA9IHNlbGVjdGlvbkxpc3QubWFwKChzZWxlY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBzZWxlY3Rpb24ucXVlcnlTZWxlY3RvcignW2RhdGEtc3B5LXRpdGxlXScpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUlkOiBzZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXNweScpLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkuZmlsdGVyKCh7IHRpdGxlIH0pID0+IHRpdGxlKS5tYXAoKHsgdGl0bGUsIG5vZGVJZCwgc2VsZWN0aW9uIH0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aXRsZS5pbm5lckhUTUwsXHJcbiAgICAgICAgICAgICAgICBub2RlSWQsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXMuc2Nyb2xsUG9zaXRpb24oc2VsZWN0aW9uKS50b3AsIC8vIG9mZnNldCBvZiAxMCB0byBiZSBzYWZlXHJcbiAgICAgICAgICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLl9nZXRNZW51SXRlbUNsaWNrSGFuZGxlcihub2RlSWQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRUaXRsZXMgPSBmaWx0ZXIobWVudUxpc3QsIG4gPT4gKGN1cnJlbnRTY3JvbGxQb3NpdGlvbi50b3AgKyBkZXRlY3Rpb25PZmZzZXQgPCB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG4uc2Nyb2xsVG9wKSkpO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0ZSBjdXJyZW50IG5vZGVcclxuICAgICAgICAvL2J5IGRlZmF1bHQsIGZpcnN0IG5vZGUgaXMgaW5kZXhlZFxyXG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSBtZW51TGlzdFswXS5pbmRleDtcclxuICAgICAgICBpZiAoMCA8IG5leHRUaXRsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIGZpcnN0IG5vZGVcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROb2RlID0gZmlyc3QobmV4dFRpdGxlcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZmlyc3ROb2RlLmluZGV4O1xyXG4gICAgICAgICAgICBpZiAoMCA8IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSBtZW51TGlzdFtpbmRleCAtIDFdLmluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9tZWFucyB0aGF0IHRoZSBwb3NpdGlvbiBpcyB0aGUgbGFzdCB0aXRsZVxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBsYXN0KG1lbnVMaXN0KS5pbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNsaWNrZWRJZCA9IHRoaXMuc3RhdGUuY2xpY2tlZElkO1xyXG4gICAgICAgIGlmIChpc0F0UGFnZUJvdHRvbSAmJiB1bmRlZmluZWQgIT09IGNsaWNrZWRJZCkge1xyXG4gICAgICAgICAgICBtZW51TGlzdCA9IG1lbnVMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5vZGVJZCA9PT0gY2xpY2tlZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjbGlja2VkSWQ6IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZW51TGlzdFtjdXJyZW50SW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lbnVMaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2FsY3VsYXRlIHRoZSByZWFsIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQsIGRlcGVuZGluZyBvbiBkZWNsYXJlZCBvZmZzZXQgaW4gcHJvcHMuXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge251bWJlcn0gcG9zaXRpb24gcG9zaXRpb25cclxuICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVhbCBwb3NpdGlvblxyXG4gICAgKi9cclxuICAgIF9nZXRFbGVtZW50UmVhbFBvc2l0aW9uID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3NjRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHNzY1Bvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbihzc2NEb21Ob2RlKTtcclxuICAgICAgICByZXR1cm4gcG9zaXRpb24gLSBzc2NQb3NpdGlvbi50b3A7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxjdWxhdGUgbWVudSBwb3NpdGlvbiAoYWZmaXggb3Igbm90KVxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG1lbnUgbXVzdCBiZSBhZmZpeCwgZWxzZSBmYWxzZVxyXG4gICAgKi9cclxuICAgIF9pc01lbnVBZmZpeCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgeyBvZmZzZXQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBoYXNNZW51IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghaGFzTWVudSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNzY0RvbU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50Vmlld1Bvc2l0aW9uID0gc3NjRG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJQYWRkaW5nVG9wID0gdGhpcy5fZ2V0UGFkZGluZ1RvcFZhbHVlKCk7XHJcbiAgICAgICAgb2Zmc2V0IC09IGNvbnRhaW5lclBhZGRpbmdUb3A7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWaWV3UG9zaXRpb24udG9wIDw9IG9mZnNldDtcclxuICAgIH07XHJcblxyXG4gICAgX2dldFBhZGRpbmdUb3BWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzc2NEb21Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzc2NEb21Ob2RlLCBudWxsKTtcclxuICAgICAgICBjb25zdCBwYWRkaW5nVG9wID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKTtcclxuICAgICAgICByZXR1cm4gcGFkZGluZ1RvcCA/IHBhcnNlSW50KHBhZGRpbmdUb3AsIDApIDogMDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSBjbGljayBvbiBpdGVtIG1lbnUgZnVuY3Rpb24uXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gbWVudUlkICBub2RlIHNweUlkIGluIERPTSB0byBzY3JvbGwgdG9cclxuICAgICogQHJldHVybiB7ZnVuY3Rpb259ICAgICAgICBmdW5jdGlvbiB0byBjYWxsXHJcbiAgICAqL1xyXG4gICAgX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyKG1lbnVJZCkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tlZElkOiBtZW51SWRcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaE1lbnUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uTWVudUl0ZW1DbGljayhtZW51SWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIE1lbnUgY2xpY2sgZnVuY3Rpb24uIFNjcm9sbCB0byB0aGUgbm9kZSBwb3NpdGlvbi5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBtZW51SWQgIG5vZGUgc3B5SWQgaW4gRE9NIHRvIHNjcm9sbCB0b1xyXG4gICAgKi9cclxuICAgIF9vbk1lbnVJdGVtQ2xpY2sobWVudUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgW2RhdGEtc3B5PScke21lbnVJZH0nXWA7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IG5vZGVQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb24obm9kZSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25Ub3AgPSB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG5vZGVQb3NpdGlvbi50b3ApO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG8odW5kZWZpbmVkLCBwb3NpdGlvblRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCBoYXNNZW51LCBoYXNCYWNrVG9Ub3AsIG9mZnNldCwgc2Nyb2xsRGVsYXksIC4uLm90aGVyUHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBhZmZpeCwgbWVudUxpc3QgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzY3JvbGxzcHktY29udGFpbmVyJyB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICAgICB7aGFzTWVudSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxTdGlja3lNZW51IGFmZml4PXthZmZpeH0gYWZmaXhPZmZzZXQ9e29mZnNldH0gbWVudUxpc3Q9e21lbnVMaXN0fSByZWY9J3N0aWNreU1lbnUnIC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3Njcm9sbHNweS1jb250YWluZXItY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7aGFzQmFja1RvVG9wICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPEJhY2tUb1RvcENvbXBvbmVudCAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuU2Nyb2xsc3B5Q29udGFpbmVyLmRpc3BsYXlOYW1lID0gJ1Njcm9sbHNweUNvbnRhaW5lcic7XHJcblNjcm9sbHNweUNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcblNjcm9sbHNweUNvbnRhaW5lci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxzcHlDb250YWluZXI7XHJcbiJdfQ==