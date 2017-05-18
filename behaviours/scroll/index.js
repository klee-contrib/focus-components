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
            if ((0, _lang.isUndefined)(domNode)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJTY3JvbGwiLCJwcm9wcyIsInNjcm9sbFBvc2l0aW9uIiwiZG9tTm9kZSIsInkiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwieCIsInBhZ2VYT2Zmc2V0Iiwic2Nyb2xsTGVmdCIsInRvcCIsImxlZnQiLCJub2RlUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImlzQXRQYWdlQm90dG9tIiwiX2dldFNjcm9sbGluZ0VsZW1lbnQiLCJzY3JvbGxIZWlnaHQiLCJpbm5lckhlaWdodCIsInNjcm9sbGluZ0VsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2Nyb2xsVG8iLCJlbGVtZW50IiwidG8iLCJkdXJhdGlvbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVM7QUFBQTtBQUFBOztBQUNYLGlDQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsb0RBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTtBQUVsQjs7QUFFRDs7Ozs7Ozs7OztBQUxXLGtDQWFYQyxjQWJXLDJCQWFJQyxPQWJKLEVBYWE7QUFDcEIsZ0JBQU1DLElBQUlDLE9BQU9DLFdBQVAsSUFBc0JDLFNBQVNDLGVBQVQsQ0FBeUJDLFNBQXpEO0FBQ0EsZ0JBQU1DLElBQUlMLE9BQU9NLFdBQVAsSUFBc0JKLFNBQVNDLGVBQVQsQ0FBeUJJLFVBQXpEO0FBQ0EsZ0JBQUcsdUJBQVlULE9BQVosQ0FBSCxFQUF5QjtBQUNyQix1QkFBTyxFQUFFVSxLQUFLVCxDQUFQLEVBQVVVLE1BQU1KLENBQWhCLEVBQVA7QUFDSDtBQUNELGdCQUFNSyxXQUFXWixRQUFRYSxxQkFBUixFQUFqQjtBQUNBLG1CQUFPLEVBQUVGLE1BQU1DLFNBQVNELElBQVQsR0FBZ0JKLENBQXhCLEVBQTJCRyxLQUFLRSxTQUFTRixHQUFULEdBQWVULENBQS9DLEVBQVA7QUFDSCxTQXJCVTs7QUFBQSxrQ0F1QlhhLGNBdkJXLDJCQXVCSWQsT0F2QkosRUF1QmE7QUFDcEIsbUJBQU8sS0FBS0QsY0FBTCxHQUFzQlcsR0FBdEIsSUFBNkIsS0FBS0ssb0JBQUwsR0FBNEJDLFlBQTVCLEdBQTJDZCxPQUFPZSxXQUF0RjtBQUNILFNBekJVOztBQUFBLGtDQTJCWEYsb0JBM0JXLG1DQTJCWTtBQUNuQixnQkFBR1gsU0FBU2MsZ0JBQVosRUFBOEI7QUFDMUIsdUJBQU9kLFNBQVNjLGdCQUFoQjtBQUNILGFBRkQsTUFFTyxJQUFHZCxTQUFTQyxlQUFaLEVBQTZCO0FBQ2hDLHVCQUFPRCxTQUFTQyxlQUFoQjtBQUNIO0FBQ0QsbUJBQU9ELFNBQVNlLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUDtBQUNILFNBbENVOztBQW9DWDs7Ozs7Ozs7OztBQXBDVyxrQ0E0Q1hDLFFBNUNXLHFCQTRDRkMsT0E1Q0UsRUE0Q09DLEVBNUNQLEVBNEMyQjtBQUFBLGdCQUFoQkMsUUFBZ0IsdUVBQUwsR0FBSzs7QUFDbEMsZ0JBQUcsdUJBQVlGLE9BQVosQ0FBSCxFQUF5QjtBQUNyQm5CLHVCQUFPa0IsUUFBUCxDQUFnQixDQUFoQixFQUFtQkUsRUFBbkI7QUFDQTtBQUNIO0FBQ0RELG9CQUFRZixTQUFSLEdBQW9CZ0IsRUFBcEI7QUFDSCxTQWxEVTs7QUFBQTtBQUFBLE1BQTJDRSxTQUEzQztBQUFBLENBQWY7O2tCQXNEZTNCLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5cclxuY29uc3QgU2Nyb2xsID0gQ29tcG9uZW50ID0+IGNsYXNzIFNjcm9sbENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBzY3JvbGwgcG9zaXRpb24gZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JlZW4uXHJcbiAgICAqXHJcbiAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEJvdW5kaW5nQ2xpZW50UmVjdFxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZG9tTm9kZSBkb21Ob2UgdG8gZ2V0IHRoZSBwb3NpdGlvbiBmcm9tXHJcbiAgICAqIEByZXR1cm5zIHtpbnR9IC0gVGhlIHBvc2l0aW9uIGluIHBpeGVsIGZyb20gdGhlIHRvcCBvZiB0aGUgc2Nyb2xsIGNvbnRhaW5lci5cclxuICAgICovXHJcbiAgICBzY3JvbGxQb3NpdGlvbihkb21Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgeSA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHggPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcbiAgICAgICAgaWYoaXNVbmRlZmluZWQoZG9tTm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdG9wOiB5LCBsZWZ0OiB4IH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5vZGVSZWN0ID0gZG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4geyBsZWZ0OiBub2RlUmVjdC5sZWZ0ICsgeCwgdG9wOiBub2RlUmVjdC50b3AgKyB5IH07XHJcbiAgICB9XHJcblxyXG4gICAgaXNBdFBhZ2VCb3R0b20oZG9tTm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbFBvc2l0aW9uKCkudG9wID49IHRoaXMuX2dldFNjcm9sbGluZ0VsZW1lbnQoKS5zY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNjcm9sbGluZ0VsZW1lbnQoKSB7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudDtcclxuICAgICAgICB9IGVsc2UgaWYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFNldCBzY3JvbGxiYXIgcG9zaXRpb24gd2l0aCBzbW9vdGggYW5pbWF0aW9uLlxyXG4gICAgKiBodHRwOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvcHJvcF93aW5fcGFnZXhvZmZzZXQuYXNwXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50ICBlbGVtZW50IHBhcmVudCBmb3IgdGhlIHNjcm9sbFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdG8gICAgICAgcG9zaXRpb24gb2YgdGhlIHNjcm9sbFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gb2YgYW5pbWF0aW9uXHJcbiAgICAqL1xyXG4gICAgc2Nyb2xsVG8oZWxlbWVudCwgdG8sIGR1cmF0aW9uID0gNTAwKSB7XHJcbiAgICAgICAgaWYoaXNVbmRlZmluZWQoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRvKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHRvO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbDtcclxuIl19