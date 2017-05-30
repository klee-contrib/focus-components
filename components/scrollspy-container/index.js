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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCYWNrVG9Ub3BDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJoYXNNZW51IiwiaGFzQmFja1RvVG9wIiwib2Zmc2V0Iiwic2Nyb2xsRGVsYXkiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiU2Nyb2xsc3B5Q29udGFpbmVyIiwicHJvcHMiLCJfZXhlY3V0ZVJlZnJlc2hNZW51IiwidGltZSIsIl90aW1lb3V0cyIsImkiLCJwdXNoIiwic2V0VGltZW91dCIsIl9yZWZyZXNoTWVudSIsImJpbmQiLCJfZGVib3VuY2VSZWZyZXNoTWVudSIsIl9kZWJvdW5jZWRSZWZyZXNoIiwic3RpY2t5TWVudSIsInJlZnMiLCJjbGlja2VkSWQiLCJzdGF0ZSIsIm1lbnVzIiwiX2J1aWxkTWVudUxpc3QiLCJhZmZpeCIsIl9pc01lbnVBZmZpeCIsImlzQXRDbGlja2VkSXRlbSIsInVuZGVmaW5lZCIsInNlbGVjdG9yIiwibm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5vZGVQb3NpdGlvbiIsInNjcm9sbFBvc2l0aW9uIiwicG9zaXRpb25Ub3AiLCJfZ2V0RWxlbWVudFJlYWxQb3NpdGlvbiIsInRvcCIsInNldFN0YXRlIiwibWVudUxpc3QiLCJkZXRlY3Rpb25PZmZzZXQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJoZWlnaHQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJsZWZ0IiwiaXNBdFBhZ2VCb3R0b20iLCJ0aGlzQ29tcG9uZW50Tm9kZSIsImZpbmRET01Ob2RlIiwiYWxsRGF0YVNweSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwb3BpbkRhdGFTcHkiLCJzZWxlY3Rpb25MaXN0IiwibGVuZ3RoIiwibWFwIiwic2VsZWN0aW9uIiwidGl0bGUiLCJub2RlSWQiLCJnZXRBdHRyaWJ1dGUiLCJmaWx0ZXIiLCJpbmRleCIsImxhYmVsIiwiaW5uZXJIVE1MIiwic2Nyb2xsVG9wIiwiaXNBY3RpdmUiLCJvbkNsaWNrIiwiX2dldE1lbnVJdGVtQ2xpY2tIYW5kbGVyIiwibmV4dFRpdGxlcyIsIm4iLCJjdXJyZW50SW5kZXgiLCJmaXJzdE5vZGUiLCJpdGVtIiwicG9zaXRpb24iLCJzc2NEb21Ob2RlIiwic3NjUG9zaXRpb24iLCJjdXJyZW50Vmlld1Bvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyUGFkZGluZ1RvcCIsIl9nZXRQYWRkaW5nVG9wVmFsdWUiLCJjb21wdXRlZFN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInBhcnNlSW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJfc2Nyb2xsQ2FycmllciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW5jZWwiLCJtZW51SWQiLCJfb25NZW51SXRlbUNsaWNrIiwic2Nyb2xsVG8iLCJyZW5kZXIiLCJjaGlsZHJlbiIsImxhYmVsSWNvbiIsImNsYXNzTmFtZUljb24iLCJvdGhlclByb3BzIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLDhDQUFOOztBQUVBO0FBQ0EsSUFBTUMsZUFBZTtBQUNqQkMsYUFBUyxJQURRLEVBQ0Y7QUFDZkMsa0JBQWMsSUFGRyxFQUVHO0FBQ3BCQyxZQUFRLEdBSFMsRUFHSjtBQUNiQyxpQkFBYSxFQUpJLENBSUQ7QUFKQyxDQUFyQjs7QUFPQTtBQUNBLElBQU1DLFlBQVk7QUFDZEosYUFBUyxpQkFBVUssSUFETDtBQUVkSixrQkFBYyxpQkFBVUksSUFGVjtBQUdkSCxZQUFRLGlCQUFVSSxNQUhKO0FBSWRILGlCQUFhLGlCQUFVRztBQUpULENBQWxCOztB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QkFFdUIsS0FBSzVFLEtBRjVCO0FBQUEsWUFFR0csS0FGSCxVQUVHQSxLQUZIO0FBQUEsWUFFVWMsUUFGVixVQUVVQSxRQUZWOztBQUdMLGVBQ0k7QUFBQTtBQUFBLHVCQUFLLGNBQVcscUJBQWhCLElBQTBDMkQsVUFBMUM7QUFDS2xHLHVCQUNHLHNEQUFZLE9BQU95QixLQUFuQixFQUEwQixhQUFhdkIsTUFBdkMsRUFBK0MsVUFBVXFDLFFBQXpELEVBQW1FLEtBQUksWUFBdkUsR0FGUjtBQUlJO0FBQUE7QUFBQSxrQkFBSyxjQUFXLDZCQUFoQjtBQUNLd0Q7QUFETCxhQUpKO0FBT0s5Riw0QkFDRyw4QkFBQyxrQkFBRCxJQUFvQixXQUFXK0YsU0FBL0IsRUFBMEMsZUFBZUMsYUFBekQ7QUFSUixTQURKO0FBYUgsSzs7Ozs7QUFHTDs7O0FBQ0ExRixtQkFBbUI0RixXQUFuQixHQUFpQyxvQkFBakM7QUFDQTVGLG1CQUFtQlIsWUFBbkIsR0FBa0NBLFlBQWxDO0FBQ0FRLG1CQUFtQkgsU0FBbkIsR0FBK0JBLFNBQS9COztrQkFFZUcsa0IiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEJhY2tUb1RvcCBmcm9tICcuLi9idXR0b24tYmFjay10by10b3AnXHJcbmltcG9ydCBTdGlja3lNZW51IGZyb20gJy4vc3RpY2t5LW1lbnUnO1xyXG5pbXBvcnQgU2Nyb2xsIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvc2Nyb2xsJztcclxuaW1wb3J0IEdyaWQgZnJvbSAnLi4vZ3JpZCc7XHJcbmltcG9ydCBDb2x1bW4gZnJvbSAnLi4vY29sdW1uJztcclxuXHJcbmltcG9ydCB7IGRlYm91bmNlLCBmaWx0ZXIsIGZpcnN0LCBsYXN0LCB4b3IgfSBmcm9tICdsb2Rhc2gnO1xyXG5cclxuY29uc3QgQmFja1RvVG9wQ29tcG9uZW50ID0gQmFja1RvVG9wO1xyXG5cclxuLy8gY29tcG9uZW50IGRlZmF1bHQgcHJvcHMuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGhhc01lbnU6IHRydWUsIC8vQWN0aXZhdGUgdGhlIHByZXNlbmNlIG9mIHRoZSBzdGlja3kgbmF2aWdhdGlvbiBjb21wb25lbnQuXHJcbiAgICBoYXNCYWNrVG9Ub3A6IHRydWUsIC8vQWN0aXZhdGUgdGhlIHByZXNlbmNlIG9mIEJhY2tUb1RvcCBidXR0b25cclxuICAgIG9mZnNldDogMTAwLCAvL29mZnNldCBwb3NpdGlvbiB3aGVuIGFmZml4XHJcbiAgICBzY3JvbGxEZWxheTogMTAgLy9kZWZhdXQgZGVib3VuY2UgZGVsYXkgZm9yIHNjcm9sbCBzcHkgY2FsbFxyXG59O1xyXG5cclxuLy8gY29tcG9uZW50IHByb3BzIGRlZmluaXRpb24uXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGhhc01lbnU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaGFzQmFja1RvVG9wOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9mZnNldDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHNjcm9sbERlbGF5OiBQcm9wVHlwZXMubnVtYmVyXHJcbn07XHJcblxyXG4vKipcclxuKiBTY3JvbGxzcHlDb250YWluZXIgY29tcG9uZW50LlxyXG4qL1xyXG5AU2Nyb2xsXHJcbmNsYXNzIFNjcm9sbHNweUNvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWVudUxpc3Q6IFtdLFxyXG4gICAgICAgICAgICBhZmZpeDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIgPSB3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUmVmcmVzaCA9IGRlYm91bmNlKHRoaXMuX3JlZnJlc2hNZW51LCB0aGlzLnByb3BzLnNjcm9sbERlbGF5KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2RlYm91bmNlUmVmcmVzaE1lbnUpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fZXhlY3V0ZVJlZnJlc2hNZW51KDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3RpbWVvdXRzLm1hcChjbGVhclRpbWVvdXQpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fZGVib3VuY2VSZWZyZXNoTWVudSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9kZWJvdW5jZVJlZnJlc2hNZW51KTtcclxuICAgICAgICB0aGlzLl9kZWJvdW5jZWRSZWZyZXNoLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZWZyZXNoIHNjcmVlbiBYIHRpbWVzLlxyXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHRpbWUgbnVtYmVyIG9mIGV4ZWN1dGlvblxyXG4gICAgKi9cclxuICAgIF9leGVjdXRlUmVmcmVzaE1lbnUgPSAodGltZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3RpbWVvdXRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZW91dHMucHVzaChzZXRUaW1lb3V0KHRoaXMuX3JlZnJlc2hNZW51LmJpbmQodGhpcyksIGkgKiAxMDAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfZGVib3VuY2VSZWZyZXNoTWVudSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLl9kZWJvdW5jZWRSZWZyZXNoKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgc2Nyb2xsIGV2ZW50IGhhbmRsZXJcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfcmVmcmVzaE1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhhc01lbnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB7IHN0aWNreU1lbnUgfSA9IHRoaXMucmVmcztcclxuICAgICAgICBjb25zdCB7IGNsaWNrZWRJZCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBtZW51cyA9IHRoaXMuX2J1aWxkTWVudUxpc3QoKTsgLy9idWlsZCB0aGUgbWVudSBsaXN0XHJcbiAgICAgICAgLy9UT0RPIHJlbW92ZSB0aGlzIGNoZWNrXHJcbiAgICAgICAgY29uc3QgYWZmaXggPSBzdGlja3lNZW51ID8gdGhpcy5faXNNZW51QWZmaXgoKSA6IHRoaXMuc3RhdGUuYWZmaXg7IC8vQ2FsY3VsYXRlIG1lbnUgcG9zaXRpb24gKGFmZml4IG9yIG5vdClcclxuICAgICAgICAvLyBDaGVjayBpZiBzY3JvbGwgaXMgYXQgY2xpa2VkIGl0ZW0gbGV2ZWxcclxuICAgICAgICBsZXQgaXNBdENsaWNrZWRJdGVtO1xyXG4gICAgICAgIGlmIChjbGlja2VkSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IGBbZGF0YS1zcHk9JyR7Y2xpY2tlZElkfSddYDtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZVBvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbihub2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uVG9wID0gdGhpcy5fZ2V0RWxlbWVudFJlYWxQb3NpdGlvbihub2RlUG9zaXRpb24udG9wKTtcclxuICAgICAgICAgICAgICAgIGlzQXRDbGlja2VkSXRlbSA9IHRoaXMuc2Nyb2xsUG9zaXRpb24oKS50b3AgPT09IHBvc2l0aW9uVG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBtZW51TGlzdDogbWVudXMsXHJcbiAgICAgICAgICAgIGNsaWNrZWRJZDogaXNBdENsaWNrZWRJdGVtID8gdW5kZWZpbmVkIDogY2xpY2tlZElkLFxyXG4gICAgICAgICAgICBhZmZpeFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQnVpbGQgdGhlIGxpc3Qgb2YgbWVudXMuXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEByZXR1cm4ge2FycmF5fSB0aGUgbGlzdCBvZiBtZW51cy5cclxuICAgICovXHJcbiAgICBfYnVpbGRNZW51TGlzdCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGhhc01lbnUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFoYXNNZW51KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGV0ZWN0aW9uT2Zmc2V0ID0gd2luZG93LnNjcmVlbi5oZWlnaHQgLyA1O1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHsgdG9wOiB0aGlzLnNjcm9sbFBvc2l0aW9uKCkudG9wLCBsZWZ0OiB0aGlzLnNjcm9sbFBvc2l0aW9uKCkubGVmdCB9O1xyXG4gICAgICAgIGNvbnN0IGlzQXRQYWdlQm90dG9tID0gdGhpcy5pc0F0UGFnZUJvdHRvbSgpO1xyXG5cclxuICAgICAgICAvL2dldCB0aGUgbWVudSBsaXN0ICh3aXRob3V0IGJsb2NrcyBpbiBwb3BpbilcclxuICAgICAgICBjb25zdCB0aGlzQ29tcG9uZW50Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGFsbERhdGFTcHkgPSB0aGlzQ29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcHldJyk7XHJcbiAgICAgICAgY29uc3QgcG9waW5EYXRhU3B5ID0gdGhpc0NvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZm9jdXM9XFwncG9waW4td2luZG93XFwnXSBbZGF0YS1zcHldJyk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uTGlzdCA9IHhvcihhbGxEYXRhU3B5LCBwb3BpbkRhdGFTcHkpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWVudUxpc3QgPSBzZWxlY3Rpb25MaXN0Lm1hcCgoc2VsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogc2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNweS10aXRsZV0nKSxcclxuICAgICAgICAgICAgICAgIG5vZGVJZDogc2VsZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zcHknKSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pLmZpbHRlcigoeyB0aXRsZSwgbm9kZUlkLCBzZWxlY3Rpb24gfSkgPT4gdGl0bGUgJiYgbm9kZUlkICYmIHNlbGVjdGlvbikubWFwKCh7IHRpdGxlLCBub2RlSWQsIHNlbGVjdGlvbiB9LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogdGl0bGUuaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICAgICAgbm9kZUlkLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0aGlzLnNjcm9sbFBvc2l0aW9uKHNlbGVjdGlvbikudG9wLCAvLyBvZmZzZXQgb2YgMTAgdG8gYmUgc2FmZVxyXG4gICAgICAgICAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5fZ2V0TWVudUl0ZW1DbGlja0hhbmRsZXIobm9kZUlkKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBuZXh0VGl0bGVzID0gZmlsdGVyKG1lbnVMaXN0LCAobikgPT4gY3VycmVudFNjcm9sbFBvc2l0aW9uLnRvcCArIGRldGVjdGlvbk9mZnNldCA8IHRoaXMuX2dldEVsZW1lbnRSZWFsUG9zaXRpb24obi5zY3JvbGxUb3ApKTtcclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGUgY3VycmVudCBub2RlXHJcbiAgICAgICAgLy9ieSBkZWZhdWx0LCBmaXJzdCBub2RlIGlzIGluZGV4ZWRcclxuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gbWVudUxpc3RbMF0uaW5kZXg7XHJcbiAgICAgICAgaWYgKDAgPCBuZXh0VGl0bGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBmaXJzdCBub2RlXHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGZpcnN0KG5leHRUaXRsZXMpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGZpcnN0Tm9kZS5pbmRleDtcclxuICAgICAgICAgICAgaWYgKDAgPCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbWVudUxpc3RbaW5kZXggLSAxXS5pbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgdGhhdCB0aGUgcG9zaXRpb24gaXMgdGhlIGxhc3QgdGl0bGVcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbGFzdChtZW51TGlzdCkuaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsaWNrZWRJZCA9IHRoaXMuc3RhdGUuY2xpY2tlZElkO1xyXG4gICAgICAgIGlmIChpc0F0UGFnZUJvdHRvbSAmJiB1bmRlZmluZWQgIT09IGNsaWNrZWRJZCkge1xyXG4gICAgICAgICAgICBtZW51TGlzdCA9IG1lbnVMaXN0Lm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubm9kZUlkID09PSBjbGlja2VkSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNsaWNrZWRJZDogdW5kZWZpbmVkIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lbnVMaXN0W2N1cnJlbnRJbmRleF0uaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVudUxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxjdWxhdGUgdGhlIHJlYWwgcG9zaXRpb24gb2YgYW4gZWxlbWVudCwgZGVwZW5kaW5nIG9uIGRlY2xhcmVkIG9mZnNldCBpbiBwcm9wcy5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHBhcmFtICB7bnVtYmVyfSBwb3NpdGlvbiBwb3NpdGlvblxyXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZWFsIHBvc2l0aW9uXHJcbiAgICAqL1xyXG4gICAgX2dldEVsZW1lbnRSZWFsUG9zaXRpb24gPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBjb25zdCBzc2NEb21Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgY29uc3Qgc3NjUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uKHNzY0RvbU5vZGUpO1xyXG4gICAgICAgIHJldHVybiBwb3NpdGlvbiAtIHNzY1Bvc2l0aW9uLnRvcDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENhbGN1bGF0ZSBtZW51IHBvc2l0aW9uIChhZmZpeCBvciBub3QpXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaXMgbWVudSBtdXN0IGJlIGFmZml4LCBlbHNlIGZhbHNlXHJcbiAgICAqL1xyXG4gICAgX2lzTWVudUFmZml4ID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB7IG9mZnNldCB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IGhhc01lbnUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFoYXNNZW51KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3NjRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3UG9zaXRpb24gPSBzc2NEb21Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclBhZGRpbmdUb3AgPSB0aGlzLl9nZXRQYWRkaW5nVG9wVmFsdWUoKTtcclxuICAgICAgICBvZmZzZXQgLT0gY29udGFpbmVyUGFkZGluZ1RvcDtcclxuICAgICAgICByZXR1cm4gY3VycmVudFZpZXdQb3NpdGlvbi50b3AgPD0gb2Zmc2V0O1xyXG4gICAgfTtcclxuXHJcbiAgICBfZ2V0UGFkZGluZ1RvcFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNzY0RvbU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNzY0RvbU5vZGUsIG51bGwpO1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmdUb3AgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXRvcCcpO1xyXG4gICAgICAgIHJldHVybiBwYWRkaW5nVG9wID8gcGFyc2VJbnQocGFkZGluZ1RvcCwgMCkgOiAwO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIGNsaWNrIG9uIGl0ZW0gbWVudSBmdW5jdGlvbi5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBtZW51SWQgIG5vZGUgc3B5SWQgaW4gRE9NIHRvIHNjcm9sbCB0b1xyXG4gICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gICAgICAgIGZ1bmN0aW9uIHRvIGNhbGxcclxuICAgICovXHJcbiAgICBfZ2V0TWVudUl0ZW1DbGlja0hhbmRsZXIobWVudUlkKSB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjbGlja2VkSWQ6IG1lbnVJZFxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoTWVudSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25NZW51SXRlbUNsaWNrKG1lbnVJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIE1lbnUgY2xpY2sgZnVuY3Rpb24uIFNjcm9sbCB0byB0aGUgbm9kZSBwb3NpdGlvbi5cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBtZW51SWQgIG5vZGUgc3B5SWQgaW4gRE9NIHRvIHNjcm9sbCB0b1xyXG4gICAgKi9cclxuICAgIF9vbk1lbnVJdGVtQ2xpY2sobWVudUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgW2RhdGEtc3B5PScke21lbnVJZH0nXWA7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IG5vZGVQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb24obm9kZSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25Ub3AgPSB0aGlzLl9nZXRFbGVtZW50UmVhbFBvc2l0aW9uKG5vZGVQb3NpdGlvbi50b3ApO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG8odW5kZWZpbmVkLCBwb3NpdGlvblRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y2hpbGRyZW4sIGhhc01lbnUsIGhhc0JhY2tUb1RvcCwgb2Zmc2V0LCBzY3JvbGxEZWxheSwgbGFiZWxJY29uLCBjbGFzc05hbWVJY29uLCAuLi5vdGhlclByb3BzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBhZmZpeCwgbWVudUxpc3QgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzY3JvbGxzcHktY29udGFpbmVyJyB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICAgICB7aGFzTWVudSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxTdGlja3lNZW51IGFmZml4PXthZmZpeH0gYWZmaXhPZmZzZXQ9e29mZnNldH0gbWVudUxpc3Q9e21lbnVMaXN0fSByZWY9J3N0aWNreU1lbnUnIC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3Njcm9sbHNweS1jb250YWluZXItY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7aGFzQmFja1RvVG9wICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPEJhY2tUb1RvcENvbXBvbmVudCBsYWJlbEljb249e2xhYmVsSWNvbn0gY2xhc3NOYW1lSWNvbj17Y2xhc3NOYW1lSWNvbn0gLz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcblNjcm9sbHNweUNvbnRhaW5lci5kaXNwbGF5TmFtZSA9ICdTY3JvbGxzcHlDb250YWluZXInO1xyXG5TY3JvbGxzcHlDb250YWluZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5TY3JvbGxzcHlDb250YWluZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsc3B5Q29udGFpbmVyOyJdfQ==