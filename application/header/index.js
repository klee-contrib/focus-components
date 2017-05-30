'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('lodash/collection'),
    pluck = _require.pluck,
    sortBy = _require.sortBy;

var applicationStateBehaviour = require('./mixin/application-state');
var headerMixin = {
    mixins: [applicationStateBehaviour],
    /** @inheriteddoc */
    getDefaultProps: function getMenuDefaultProps() {
        return {
            /**
            * Selector for the domNode on which the scroll is attached.
            * @type {string}
            */
            scrollTargetSelector: undefined,
            /**
            * Default style of the component.s
            * @type {Object}
            */
            style: {},
            /**
            * Default size of the bar. Should be present in sizeMap.
            * @type {String}
            */
            size: 'medium',
            /**
            * Map which defines sizes exists for the components and their border.
            * @type {Object}
            */
            sizeMap: {
                'small': {
                    'sizeBorder': 5
                },
                'medium': {
                    'sizeBorder': 0
                }
            },
            /**
            * A way to redefine the process size of the element.
            * @type {function}
            */
            processSize: undefined,
            /**
            * A handler to notify other elements that the size has changed.
            * @type {[type]}
            */
            notifySizeChange: undefined
        };
    },
    /** @inheritdoc */
    propTypes: {
        size: (0, _types2.default)('string'),
        scrollTargetSelector: (0, _types2.default)('string'),
        style: (0, _types2.default)('object'),
        sizeMap: (0, _types2.default)('object'),
        notifySizeChange: (0, _types2.default)(['func', 'object']),
        processSize: (0, _types2.default)(['func', 'object'])
    },
    /** @inheritdoc */
    getInitialState: function getMenuDefaultState() {
        /** @inheriteddoc */
        return {
            open: this.props.open,
            size: this.props.size
        };
    },

    /** @inheriteddoc */
    componentWillMount: function barWillMount() {
        this._processSizes();
        this.scrollTargetNode = this.props.scrollTargetSelector && this.props.scrollTargetSelector !== '' ? document.querySelector(this.props.scrollTargetSelector) : window;
    },
    /** @inheriteddoc */
    componentDidMount: function barDidMount() {
        this.attachScrollListener();
    },
    /** @inheriteddoc */
    componentWillUnmount: function barWillUnMount() {
        this.detachScrollListener();
        this.appStateWillUnmount();
    },
    /**
    * Process the sizeMap in order to sort them by border size and create a sizes array.
    */
    _processSizes: function processSizes() {
        var sizes = [];
        for (var sz in this.props.sizeMap) {
            sizes.push({ name: sz, sizeBorder: this.props.sizeMap[sz].sizeBorder });
        }
        this.sizes = pluck(sortBy(sizes, 'sizeBorder'), 'name');
    },
    /**
    * Get the current element size.
    * @returns {int} - The size in pixel of the current element in the browser.
    */
    _processElementSize: function processElementSize() {
        return ReactDOM.findDOMNode(this).offsetHeight;
    },
    /**
    * Get the scroll position from the top of the screen.
    * @returns {int} - The position in pixel from the top of the scroll container.
    */
    _getScrollPosition: function getScrollPosition() {
        //The pageYOffset is done in order to deal with the window case. Another possibility would have been to use window.docment.body as a node for scrollTop.
        //But the scrollListener on the page is only on the window element.
        return this.scrollTargetNode.pageYOffset !== undefined ? this.scrollTargetNode.pageYOffset : this.scrollTargetNode.scrollTop;
    },
    /**
    * Notify other elements that the size has changed.
    */
    _notifySizeChange: function notifySizeChanged() {
        if (this.props.notifySizeChange) {
            this.props.notifySizeChange(this.state.size);
        }
    },
    /**
    * Change the size of the bar.
    * @param {string} newSize - The new size.
    * @returns {undefined} -  A way to stop the propagation.
    */
    _changeSize: function changeSize(newSize) {
        // Todo: see if the notification of the changed size can be called before.
        return this.setState({ size: newSize }, this._notifySizeChange);
    },
    /**
    * Process the size in order to know if the size should be changed depending on the scroll position and the border of each zone.
    * @returns {object} - The return is used to stop the treatement.
    */
    _processSize: function _processSize() {
        //Allow the user to redefine the process size function.
        if (this.props.processSize) {
            return this.props.processSize();
        }
        var currentIndex = this.sizes.indexOf(this.state.size);
        var currentScrollPosition = this._getScrollPosition();
        //Process increase treatement.
        if (currentIndex < this.sizes.length - 1) {
            var increaseBorder = this.props.sizeMap[this.sizes[currentIndex + 1]].sizeBorder;
            if (currentScrollPosition > increaseBorder) {
                return this._changeSize(this.sizes[currentIndex + 1]);
            }
        }
        //Process decrease treatement.
        if (currentIndex > 0) {
            var decreaseBorder = this.props.sizeMap[this.sizes[currentIndex - 1]].sizeBorder;
            if (currentScrollPosition <= decreaseBorder) {
                return this._changeSize(this.sizes[currentIndex - 1]);
            }
        }
    },
    /**
    * Handle the scroll event in order to resize the page.
    * @param {object} event [description]
    */
    handleScroll: function handleScrollEvent(event) {
        this._processSize();
    },

    /**
    * Attach scroll listener on the scroll target node.
    */
    attachScrollListener: function attachScrollListener() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    },

    /**
    * Detach scroll handler on the scroll target node.
    */
    detachScrollListener: function detachScrollListener() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
    },
    /** @inheriteddoc */
    render: function renderBar() {
        var className = 'header-' + this.state.size;
        return React.createElement(
            'header',
            { className: className, 'data-focus': 'header', 'data-route': this.state.route, 'data-mode': this.state.mode, 'data-size': this.state.size },
            this.props.children
        );
    }
};

module.exports = (0, _builder2.default)(headerMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsInBsdWNrIiwic29ydEJ5IiwiYXBwbGljYXRpb25TdGF0ZUJlaGF2aW91ciIsImhlYWRlck1peGluIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiZ2V0TWVudURlZmF1bHRQcm9wcyIsInNjcm9sbFRhcmdldFNlbGVjdG9yIiwidW5kZWZpbmVkIiwic3R5bGUiLCJzaXplIiwic2l6ZU1hcCIsInByb2Nlc3NTaXplIiwibm90aWZ5U2l6ZUNoYW5nZSIsInByb3BUeXBlcyIsImdldEluaXRpYWxTdGF0ZSIsImdldE1lbnVEZWZhdWx0U3RhdGUiLCJvcGVuIiwicHJvcHMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJiYXJXaWxsTW91bnQiLCJfcHJvY2Vzc1NpemVzIiwic2Nyb2xsVGFyZ2V0Tm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpbmRvdyIsImNvbXBvbmVudERpZE1vdW50IiwiYmFyRGlkTW91bnQiLCJhdHRhY2hTY3JvbGxMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiYmFyV2lsbFVuTW91bnQiLCJkZXRhY2hTY3JvbGxMaXN0ZW5lciIsImFwcFN0YXRlV2lsbFVubW91bnQiLCJwcm9jZXNzU2l6ZXMiLCJzaXplcyIsInN6IiwicHVzaCIsIm5hbWUiLCJzaXplQm9yZGVyIiwiX3Byb2Nlc3NFbGVtZW50U2l6ZSIsInByb2Nlc3NFbGVtZW50U2l6ZSIsImZpbmRET01Ob2RlIiwib2Zmc2V0SGVpZ2h0IiwiX2dldFNjcm9sbFBvc2l0aW9uIiwiZ2V0U2Nyb2xsUG9zaXRpb24iLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsIl9ub3RpZnlTaXplQ2hhbmdlIiwibm90aWZ5U2l6ZUNoYW5nZWQiLCJzdGF0ZSIsIl9jaGFuZ2VTaXplIiwiY2hhbmdlU2l6ZSIsIm5ld1NpemUiLCJzZXRTdGF0ZSIsIl9wcm9jZXNzU2l6ZSIsImN1cnJlbnRJbmRleCIsImluZGV4T2YiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJsZW5ndGgiLCJpbmNyZWFzZUJvcmRlciIsImRlY3JlYXNlQm9yZGVyIiwiaGFuZGxlU2Nyb2xsIiwiaGFuZGxlU2Nyb2xsRXZlbnQiLCJldmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwicmVuZGVyQmFyIiwiY2xhc3NOYW1lIiwicm91dGUiLCJtb2RlIiwiY2hpbGRyZW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBR0E7Ozs7OztBQUZBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTUMsV0FBV0QsUUFBUSxXQUFSLENBQWpCOztlQUV3QkEsUUFBUSxtQkFBUixDO0lBQWpCRSxLLFlBQUFBLEs7SUFBT0MsTSxZQUFBQSxNOztBQUNkLElBQU1DLDRCQUE0QkosUUFBUSwyQkFBUixDQUFsQztBQUNBLElBQU1LLGNBQWM7QUFDaEJDLFlBQVEsQ0FBQ0YseUJBQUQsQ0FEUTtBQUVoQjtBQUNBRyxxQkFBaUIsU0FBU0MsbUJBQVQsR0FBK0I7QUFDNUMsZUFBTztBQUNIOzs7O0FBSUFDLGtDQUFzQkMsU0FMbkI7QUFNSDs7OztBQUlBQyxtQkFBTyxFQVZKO0FBV0g7Ozs7QUFJQUMsa0JBQU0sUUFmSDtBQWdCSDs7OztBQUlBQyxxQkFBUztBQUNMLHlCQUFTO0FBQ0wsa0NBQWM7QUFEVCxpQkFESjtBQUlMLDBCQUFVO0FBQ04sa0NBQWM7QUFEUjtBQUpMLGFBcEJOO0FBNEJIOzs7O0FBSUFDLHlCQUFhSixTQWhDVjtBQWlDSDs7OztBQUlBSyw4QkFBa0JMO0FBckNmLFNBQVA7QUF1Q0gsS0EzQ2U7QUE0Q2hCO0FBQ0FNLGVBQVc7QUFDUEosY0FBTSxxQkFBSyxRQUFMLENBREM7QUFFUEgsOEJBQXNCLHFCQUFLLFFBQUwsQ0FGZjtBQUdQRSxlQUFPLHFCQUFLLFFBQUwsQ0FIQTtBQUlQ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QUF0QixDQUEwQyxRQUExQyxFQUFvRCxLQUFLSixZQUF6RDtBQUNILEtBdktlO0FBd0toQjtBQUNBSyxZQUFRLFNBQVNDLFNBQVQsR0FBcUI7QUFDekIsWUFBTUMsd0JBQXNCLEtBQUtuQixLQUFMLENBQVd2QyxJQUF2QztBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQVEsV0FBVzBELFNBQW5CLEVBQThCLGNBQVcsUUFBekMsRUFBa0QsY0FBWSxLQUFLbkIsS0FBTCxDQUFXb0IsS0FBekUsRUFBZ0YsYUFBVyxLQUFLcEIsS0FBTCxDQUFXcUIsSUFBdEcsRUFBNEcsYUFBVyxLQUFLckIsS0FBTCxDQUFXdkMsSUFBbEk7QUFDQyxpQkFBS1EsS0FBTCxDQUFXcUQ7QUFEWixTQURKO0FBS0g7QUFoTGUsQ0FBcEI7O0FBbUxBQyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRdEUsV0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IHtwbHVjaywgc29ydEJ5fSA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XHJcbmNvbnN0IGFwcGxpY2F0aW9uU3RhdGVCZWhhdmlvdXIgPSByZXF1aXJlKCcuL21peGluL2FwcGxpY2F0aW9uLXN0YXRlJyk7XHJcbmNvbnN0IGhlYWRlck1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbYXBwbGljYXRpb25TdGF0ZUJlaGF2aW91cl0sXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXRNZW51RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIFNlbGVjdG9yIGZvciB0aGUgZG9tTm9kZSBvbiB3aGljaCB0aGUgc2Nyb2xsIGlzIGF0dGFjaGVkLlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNjcm9sbFRhcmdldFNlbGVjdG9yOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIERlZmF1bHQgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5zXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3R5bGU6IHt9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBEZWZhdWx0IHNpemUgb2YgdGhlIGJhci4gU2hvdWxkIGJlIHByZXNlbnQgaW4gc2l6ZU1hcC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzaXplOiAnbWVkaXVtJyxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogTWFwIHdoaWNoIGRlZmluZXMgc2l6ZXMgZXhpc3RzIGZvciB0aGUgY29tcG9uZW50cyBhbmQgdGhlaXIgYm9yZGVyLlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNpemVNYXA6IHtcclxuICAgICAgICAgICAgICAgICdzbWFsbCc6IHtcclxuICAgICAgICAgICAgICAgICAgICAnc2l6ZUJvcmRlcic6IDVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnbWVkaXVtJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICdzaXplQm9yZGVyJzogMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBBIHdheSB0byByZWRlZmluZSB0aGUgcHJvY2VzcyBzaXplIG9mIHRoZSBlbGVtZW50LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcHJvY2Vzc1NpemU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogQSBoYW5kbGVyIHRvIG5vdGlmeSBvdGhlciBlbGVtZW50cyB0aGF0IHRoZSBzaXplIGhhcyBjaGFuZ2VkLlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG5vdGlmeVNpemVDaGFuZ2U6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBzaXplOiB0eXBlKCdzdHJpbmcnKSxcclxuICAgICAgICBzY3JvbGxUYXJnZXRTZWxlY3RvcjogdHlwZSgnc3RyaW5nJyksXHJcbiAgICAgICAgc3R5bGU6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgICAgIHNpemVNYXA6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgICAgIG5vdGlmeVNpemVDaGFuZ2U6IHR5cGUoWydmdW5jJywgJ29iamVjdCddKSxcclxuICAgICAgICBwcm9jZXNzU2l6ZTogdHlwZShbJ2Z1bmMnLCAnb2JqZWN0J10pXHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldE1lbnVEZWZhdWx0U3RhdGUoKSB7XHJcbiAgICAgICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvcGVuOiB0aGlzLnByb3BzLm9wZW4sXHJcbiAgICAgICAgICAgIHNpemU6IHRoaXMucHJvcHMuc2l6ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uIGJhcldpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9wcm9jZXNzU2l6ZXMoKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldE5vZGUgPSAodGhpcy5wcm9wcy5zY3JvbGxUYXJnZXRTZWxlY3RvciAmJiB0aGlzLnByb3BzLnNjcm9sbFRhcmdldFNlbGVjdG9yICE9PSAnJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucHJvcHMuc2Nyb2xsVGFyZ2V0U2VsZWN0b3IpIDogd2luZG93O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gYmFyRGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gYmFyV2lsbFVuTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5kZXRhY2hTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuYXBwU3RhdGVXaWxsVW5tb3VudCgpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBQcm9jZXNzIHRoZSBzaXplTWFwIGluIG9yZGVyIHRvIHNvcnQgdGhlbSBieSBib3JkZXIgc2l6ZSBhbmQgY3JlYXRlIGEgc2l6ZXMgYXJyYXkuXHJcbiAgICAqL1xyXG4gICAgX3Byb2Nlc3NTaXplczogZnVuY3Rpb24gcHJvY2Vzc1NpemVzKCkge1xyXG4gICAgICAgIHZhciBzaXplcyA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgc3ogaW4gdGhpcy5wcm9wcy5zaXplTWFwKSB7XHJcbiAgICAgICAgICAgIHNpemVzLnB1c2goe25hbWU6IHN6LCBzaXplQm9yZGVyOiB0aGlzLnByb3BzLnNpemVNYXBbc3pdLnNpemVCb3JkZXJ9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaXplcyA9IHBsdWNrKHNvcnRCeShzaXplcywgJ3NpemVCb3JkZXInKSwgJ25hbWUnKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBjdXJyZW50IGVsZW1lbnQgc2l6ZS5cclxuICAgICogQHJldHVybnMge2ludH0gLSBUaGUgc2l6ZSBpbiBwaXhlbCBvZiB0aGUgY3VycmVudCBlbGVtZW50IGluIHRoZSBicm93c2VyLlxyXG4gICAgKi9cclxuICAgIF9wcm9jZXNzRWxlbWVudFNpemU6IGZ1bmN0aW9uIHByb2Nlc3NFbGVtZW50U2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykub2Zmc2V0SGVpZ2h0O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHNjcm9sbCBwb3NpdGlvbiBmcm9tIHRoZSB0b3Agb2YgdGhlIHNjcmVlbi5cclxuICAgICogQHJldHVybnMge2ludH0gLSBUaGUgcG9zaXRpb24gaW4gcGl4ZWwgZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JvbGwgY29udGFpbmVyLlxyXG4gICAgKi9cclxuICAgIF9nZXRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XHJcbiAgICAgICAgLy9UaGUgcGFnZVlPZmZzZXQgaXMgZG9uZSBpbiBvcmRlciB0byBkZWFsIHdpdGggdGhlIHdpbmRvdyBjYXNlLiBBbm90aGVyIHBvc3NpYmlsaXR5IHdvdWxkIGhhdmUgYmVlbiB0byB1c2Ugd2luZG93LmRvY21lbnQuYm9keSBhcyBhIG5vZGUgZm9yIHNjcm9sbFRvcC5cclxuICAgICAgICAvL0J1dCB0aGUgc2Nyb2xsTGlzdGVuZXIgb24gdGhlIHBhZ2UgaXMgb25seSBvbiB0aGUgd2luZG93IGVsZW1lbnQuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsVGFyZ2V0Tm9kZS5wYWdlWU9mZnNldCAhPT0gdW5kZWZpbmVkID8gdGhpcy5zY3JvbGxUYXJnZXROb2RlLnBhZ2VZT2Zmc2V0IDogdGhpcy5zY3JvbGxUYXJnZXROb2RlLnNjcm9sbFRvcDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogTm90aWZ5IG90aGVyIGVsZW1lbnRzIHRoYXQgdGhlIHNpemUgaGFzIGNoYW5nZWQuXHJcbiAgICAqL1xyXG4gICAgX25vdGlmeVNpemVDaGFuZ2U6IGZ1bmN0aW9uIG5vdGlmeVNpemVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMubm90aWZ5U2l6ZUNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm5vdGlmeVNpemVDaGFuZ2UodGhpcy5zdGF0ZS5zaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENoYW5nZSB0aGUgc2l6ZSBvZiB0aGUgYmFyLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3U2l6ZSAtIFRoZSBuZXcgc2l6ZS5cclxuICAgICogQHJldHVybnMge3VuZGVmaW5lZH0gLSAgQSB3YXkgdG8gc3RvcCB0aGUgcHJvcGFnYXRpb24uXHJcbiAgICAqL1xyXG4gICAgX2NoYW5nZVNpemU6IGZ1bmN0aW9uIGNoYW5nZVNpemUobmV3U2l6ZSkge1xyXG4gICAgICAgIC8vIFRvZG86IHNlZSBpZiB0aGUgbm90aWZpY2F0aW9uIG9mIHRoZSBjaGFuZ2VkIHNpemUgY2FuIGJlIGNhbGxlZCBiZWZvcmUuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3NpemU6IG5ld1NpemV9LCB0aGlzLl9ub3RpZnlTaXplQ2hhbmdlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJvY2VzcyB0aGUgc2l6ZSBpbiBvcmRlciB0byBrbm93IGlmIHRoZSBzaXplIHNob3VsZCBiZSBjaGFuZ2VkIGRlcGVuZGluZyBvbiB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFuZCB0aGUgYm9yZGVyIG9mIGVhY2ggem9uZS5cclxuICAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUgcmV0dXJuIGlzIHVzZWQgdG8gc3RvcCB0aGUgdHJlYXRlbWVudC5cclxuICAgICovXHJcbiAgICBfcHJvY2Vzc1NpemU6IGZ1bmN0aW9uIF9wcm9jZXNzU2l6ZSgpIHtcclxuICAgICAgICAvL0FsbG93IHRoZSB1c2VyIHRvIHJlZGVmaW5lIHRoZSBwcm9jZXNzIHNpemUgZnVuY3Rpb24uXHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wcm9jZXNzU2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5wcm9jZXNzU2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5zaXplcy5pbmRleE9mKHRoaXMuc3RhdGUuc2l6ZSk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHRoaXMuX2dldFNjcm9sbFBvc2l0aW9uKCk7XHJcbiAgICAgICAgLy9Qcm9jZXNzIGluY3JlYXNlIHRyZWF0ZW1lbnQuXHJcbiAgICAgICAgaWYoY3VycmVudEluZGV4IDwgKHRoaXMuc2l6ZXMubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgdmFyIGluY3JlYXNlQm9yZGVyID0gdGhpcy5wcm9wcy5zaXplTWFwW3RoaXMuc2l6ZXNbY3VycmVudEluZGV4ICsgMV1dLnNpemVCb3JkZXI7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IGluY3JlYXNlQm9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlU2l6ZSh0aGlzLnNpemVzW2N1cnJlbnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Byb2Nlc3MgZGVjcmVhc2UgdHJlYXRlbWVudC5cclxuICAgICAgICBpZihjdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWNyZWFzZUJvcmRlciA9IHRoaXMucHJvcHMuc2l6ZU1hcFt0aGlzLnNpemVzW2N1cnJlbnRJbmRleCAtIDFdXS5zaXplQm9yZGVyO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50U2Nyb2xsUG9zaXRpb24gPD0gZGVjcmVhc2VCb3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VTaXplKHRoaXMuc2l6ZXNbY3VycmVudEluZGV4IC0gMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIHNjcm9sbCBldmVudCBpbiBvcmRlciB0byByZXNpemUgdGhlIHBhZ2UuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBbZGVzY3JpcHRpb25dXHJcbiAgICAqL1xyXG4gICAgaGFuZGxlU2Nyb2xsOiBmdW5jdGlvbiBoYW5kbGVTY3JvbGxFdmVudChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NTaXplKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBdHRhY2ggc2Nyb2xsIGxpc3RlbmVyIG9uIHRoZSBzY3JvbGwgdGFyZ2V0IG5vZGUuXHJcbiAgICAqL1xyXG4gICAgYXR0YWNoU2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uIGF0dGFjaFNjcm9sbExpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbCk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUYXJnZXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERldGFjaCBzY3JvbGwgaGFuZGxlciBvbiB0aGUgc2Nyb2xsIHRhcmdldCBub2RlLlxyXG4gICAgKi9cclxuICAgIGRldGFjaFNjcm9sbExpc3RlbmVyOiBmdW5jdGlvbiBkZXRhY2hTY3JvbGxMaXN0ZW5lcigpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVTY3JvbGwpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVNjcm9sbCk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyQmFyKCkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGBoZWFkZXItJHt0aGlzLnN0YXRlLnNpemV9YDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBkYXRhLWZvY3VzPSdoZWFkZXInIGRhdGEtcm91dGU9e3RoaXMuc3RhdGUucm91dGV9IGRhdGEtbW9kZT17dGhpcy5zdGF0ZS5tb2RlfSBkYXRhLXNpemU9e3RoaXMuc3RhdGUuc2l6ZX0+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGhlYWRlck1peGluKTtcclxuIl19