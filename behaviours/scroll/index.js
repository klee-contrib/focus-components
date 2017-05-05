'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lang = require('lodash/lang');

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Scroll = function Scroll(Component) {
    return function (_Component) {
        _inherits(ScrollComponent, _Component);

        function ScrollComponent(props) {
            _classCallCheck(this, ScrollComponent);

            return _possibleConstructorReturn(this, _Component.call(this, props));
        }

        /**
        * Get the scroll position from the top of the screen.
        *
        * https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
        *
        * @param {object} domNode domNoe to get the position from
        * @returns {int} - The position in pixel from the top of the scroll container.
        */


        ScrollComponent.prototype.scrollPosition = function scrollPosition(domNode) {
            var y = window.pageYOffset || document.documentElement.scrollTop;
            var x = window.pageXOffset || document.documentElement.scrollLeft;
            if ((0, _lang.isUndefined)(domNode) || (0, _lang.isNull)(domNode)) {
                return { top: y, left: x };
            }
            var nodeRect = domNode.getBoundingClientRect();
            return { left: nodeRect.left + x, top: nodeRect.top + y };
        };

        ScrollComponent.prototype.isAtPageBottom = function isAtPageBottom(domNode) {
            return this.scrollPosition().top >= this._getScrollingElement().scrollHeight - window.innerHeight;
        };

        ScrollComponent.prototype._getScrollingElement = function _getScrollingElement() {
            if (document.scrollingElement) {
                return document.scrollingElement;
            } else if (document.documentElement) {
                return document.documentElement;
            }
            return document.querySelector('body');
        };

        /**
        * Set scrollbar position with smooth animation.
        * http://www.w3schools.com/jsref/prop_win_pagexoffset.asp
        *
        * @param {object} element  element parent for the scroll
        * @param {number} to       position of the scroll
        * @param {number} duration duration of animation
        */


        ScrollComponent.prototype.scrollTo = function scrollTo(element, to) {
            var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

            if ((0, _lang.isUndefined)(element)) {
                window.scrollTo(0, to);
                return;
            }
            element.scrollTop = to;
        };

        return ScrollComponent;
    }(Component);
};

exports.default = Scroll;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJTY3JvbGwiLCJwcm9wcyIsInNjcm9sbFBvc2l0aW9uIiwiZG9tTm9kZSIsInkiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwieCIsInBhZ2VYT2Zmc2V0Iiwic2Nyb2xsTGVmdCIsInRvcCIsImxlZnQiLCJub2RlUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImlzQXRQYWdlQm90dG9tIiwiX2dldFNjcm9sbGluZ0VsZW1lbnQiLCJzY3JvbGxIZWlnaHQiLCJpbm5lckhlaWdodCIsInNjcm9sbGluZ0VsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2Nyb2xsVG8iLCJlbGVtZW50IiwidG8iLCJkdXJhdGlvbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVM7QUFBQTtBQUFBOztBQUNYLGlDQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsb0RBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTtBQUVsQjs7QUFFRDs7Ozs7Ozs7OztBQUxXLGtDQWFYQyxjQWJXLDJCQWFJQyxPQWJKLEVBYWE7QUFDcEIsZ0JBQU1DLElBQUlDLE9BQU9DLFdBQVAsSUFBc0JDLFNBQVNDLGVBQVQsQ0FBeUJDLFNBQXpEO0FBQ0EsZ0JBQU1DLElBQUlMLE9BQU9NLFdBQVAsSUFBc0JKLFNBQVNDLGVBQVQsQ0FBeUJJLFVBQXpEO0FBQ0EsZ0JBQUcsdUJBQVlULE9BQVosS0FBd0Isa0JBQU9BLE9BQVAsQ0FBM0IsRUFBNEM7QUFDeEMsdUJBQU8sRUFBRVUsS0FBS1QsQ0FBUCxFQUFVVSxNQUFNSixDQUFoQixFQUFQO0FBQ0g7QUFDRCxnQkFBTUssV0FBV1osUUFBUWEscUJBQVIsRUFBakI7QUFDQSxtQkFBTyxFQUFFRixNQUFNQyxTQUFTRCxJQUFULEdBQWdCSixDQUF4QixFQUEyQkcsS0FBS0UsU0FBU0YsR0FBVCxHQUFlVCxDQUEvQyxFQUFQO0FBQ0gsU0FyQlU7O0FBQUEsa0NBdUJYYSxjQXZCVywyQkF1QklkLE9BdkJKLEVBdUJhO0FBQ3BCLG1CQUFPLEtBQUtELGNBQUwsR0FBc0JXLEdBQXRCLElBQTZCLEtBQUtLLG9CQUFMLEdBQTRCQyxZQUE1QixHQUEyQ2QsT0FBT2UsV0FBdEY7QUFDSCxTQXpCVTs7QUFBQSxrQ0EyQlhGLG9CQTNCVyxtQ0EyQlk7QUFDbkIsZ0JBQUdYLFNBQVNjLGdCQUFaLEVBQThCO0FBQzFCLHVCQUFPZCxTQUFTYyxnQkFBaEI7QUFDSCxhQUZELE1BRU8sSUFBR2QsU0FBU0MsZUFBWixFQUE2QjtBQUNoQyx1QkFBT0QsU0FBU0MsZUFBaEI7QUFDSDtBQUNELG1CQUFPRCxTQUFTZSxhQUFULENBQXVCLE1BQXZCLENBQVA7QUFDSCxTQWxDVTs7QUFvQ1g7Ozs7Ozs7Ozs7QUFwQ1csa0NBNENYQyxRQTVDVyxxQkE0Q0ZDLE9BNUNFLEVBNENPQyxFQTVDUCxFQTRDMkI7QUFBQSxnQkFBaEJDLFFBQWdCLHVFQUFMLEdBQUs7O0FBQ2xDLGdCQUFHLHVCQUFZRixPQUFaLENBQUgsRUFBeUI7QUFDckJuQix1QkFBT2tCLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJFLEVBQW5CO0FBQ0E7QUFDSDtBQUNERCxvQkFBUWYsU0FBUixHQUFvQmdCLEVBQXBCO0FBQ0gsU0FsRFU7O0FBQUE7QUFBQSxNQUEyQ0UsU0FBM0M7QUFBQSxDQUFmOztrQkFzRGUzQixNIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNVbmRlZmluZWQsIGlzTnVsbH0gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5cclxuY29uc3QgU2Nyb2xsID0gQ29tcG9uZW50ID0+IGNsYXNzIFNjcm9sbENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBzY3JvbGwgcG9zaXRpb24gZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JlZW4uXHJcbiAgICAqXHJcbiAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEJvdW5kaW5nQ2xpZW50UmVjdFxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZG9tTm9kZSBkb21Ob2UgdG8gZ2V0IHRoZSBwb3NpdGlvbiBmcm9tXHJcbiAgICAqIEByZXR1cm5zIHtpbnR9IC0gVGhlIHBvc2l0aW9uIGluIHBpeGVsIGZyb20gdGhlIHRvcCBvZiB0aGUgc2Nyb2xsIGNvbnRhaW5lci5cclxuICAgICovXHJcbiAgICBzY3JvbGxQb3NpdGlvbihkb21Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgeSA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHggPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcbiAgICAgICAgaWYoaXNVbmRlZmluZWQoZG9tTm9kZSkgfHwgaXNOdWxsKGRvbU5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHRvcDogeSwgbGVmdDogeCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBub2RlUmVjdCA9IGRvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHsgbGVmdDogbm9kZVJlY3QubGVmdCArIHgsIHRvcDogbm9kZVJlY3QudG9wICsgeSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlzQXRQYWdlQm90dG9tKGRvbU5vZGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxQb3NpdGlvbigpLnRvcCA+PSB0aGlzLl9nZXRTY3JvbGxpbmdFbGVtZW50KCkuc2Nyb2xsSGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTY3JvbGxpbmdFbGVtZW50KCkge1xyXG4gICAgICAgIGlmKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQ7XHJcbiAgICAgICAgfSBlbHNlIGlmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBTZXQgc2Nyb2xsYmFyIHBvc2l0aW9uIHdpdGggc21vb3RoIGFuaW1hdGlvbi5cclxuICAgICogaHR0cDovL3d3dy53M3NjaG9vbHMuY29tL2pzcmVmL3Byb3Bfd2luX3BhZ2V4b2Zmc2V0LmFzcFxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCAgZWxlbWVudCBwYXJlbnQgZm9yIHRoZSBzY3JvbGxcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRvICAgICAgIHBvc2l0aW9uIG9mIHRoZSBzY3JvbGxcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIG9mIGFuaW1hdGlvblxyXG4gICAgKi9cclxuICAgIHNjcm9sbFRvKGVsZW1lbnQsIHRvLCBkdXJhdGlvbiA9IDUwMCkge1xyXG4gICAgICAgIGlmKGlzVW5kZWZpbmVkKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0byk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSB0bztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY3JvbGw7XHJcbiJdfQ==