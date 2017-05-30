'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var panelMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            style: {}
        };
    },
    /**
     * Header of theblock function.
     * @return {[type]} [description]
     */
    heading: function heading() {
        if (this.props.title) {
            return React.createElement(
                'div',
                { className: 'panel-heading' },
                this.props.title
            );
        }
    },
    /**
     * Render the a block container and the cild content of the block.
     * @return {DOM}
     */
    render: function renderBlock() {
        return React.createElement(
            'div',
            { className: 'panel panel-default ' + this.props.style.className },
            this.heading(),
            React.createElement(
                'div',
                { className: 'panel-body' },
                this.props.children
            )
        );
    }
};
module.exports = (0, _builder2.default)(panelMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJwYW5lbE1peGluIiwiZ2V0RGVmYXVsdFByb3BzIiwic3R5bGUiLCJoZWFkaW5nIiwicHJvcHMiLCJ0aXRsZSIsInJlbmRlciIsInJlbmRlckJsb2NrIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7QUFEQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjs7QUFFQTs7OztBQUlBLElBQUlDLGFBQWE7QUFDYkMscUJBQWlCLDJCQUFXO0FBQ3hCLGVBQU87QUFDSEMsbUJBQU87QUFESixTQUFQO0FBR0gsS0FMWTtBQU1mOzs7O0FBSUVDLGFBQVMsbUJBQVc7QUFDaEIsWUFBRyxLQUFLQyxLQUFMLENBQVdDLEtBQWQsRUFBcUI7QUFDakIsbUJBQ0o7QUFBQTtBQUFBLGtCQUFLLFdBQVUsZUFBZjtBQUNHLHFCQUFLRCxLQUFMLENBQVdDO0FBRGQsYUFESTtBQUtIO0FBQ0osS0FsQlk7QUFtQmY7Ozs7QUFJRUMsWUFBUSxTQUFTQyxXQUFULEdBQXVCO0FBQzNCLGVBQ0Y7QUFBQTtBQUFBLGNBQUssb0NBQWtDLEtBQUtILEtBQUwsQ0FBV0YsS0FBWCxDQUFpQk0sU0FBeEQ7QUFDRyxpQkFBS0wsT0FBTCxFQURIO0FBRUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsWUFBZjtBQUNLLHFCQUFLQyxLQUFMLENBQVdLO0FBRGhCO0FBRkYsU0FERTtBQVFIO0FBaENZLENBQWpCO0FBa0NBQyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRWCxVQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG4vKipcclxuICogTWl4aW4gdXNlZCBpbiBvcmRlciB0byBjcmVhdGUgYSBibG9jay5cclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBwYW5lbE1peGluID0ge1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdHlsZToge31cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIEhlYWRlciBvZiB0aGVibG9jayBmdW5jdGlvbi5cclxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICAgIGhlYWRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMudGl0bGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpdGxlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBhIGJsb2NrIGNvbnRhaW5lciBhbmQgdGhlIGNpbGQgY29udGVudCBvZiB0aGUgYmxvY2suXHJcbiAgICogQHJldHVybiB7RE9NfVxyXG4gICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXJCbG9jaygpIHtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcGFuZWwgcGFuZWwtZGVmYXVsdCAke3RoaXMucHJvcHMuc3R5bGUuY2xhc3NOYW1lfWB9PlxyXG4gICAgICAgIHt0aGlzLmhlYWRpbmcoKX1cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICAgIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIocGFuZWxNaXhpbik7XHJcbiJdfQ==