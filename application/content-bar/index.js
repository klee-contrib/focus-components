'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var headerMixin = {
    /** @inheriteddoc */
    render: function render() {
        return React.createElement(
            'div',
            { 'data-focus': 'content-bar' },
            this.props.children
        );
    }
};

module.exports = (0, _builder2.default)(headerMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJoZWFkZXJNaXhpbiIsInJlbmRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDs7QUFFQSxJQUFNQyxjQUFjO0FBQ2hCO0FBQ0FDLFVBRmdCLG9CQUVQO0FBQ0wsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGFBQWhCO0FBQ0ssaUJBQUtDLEtBQUwsQ0FBV0M7QUFEaEIsU0FESjtBQUtIO0FBUmUsQ0FBcEI7O0FBV0FDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFMLFdBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IGhlYWRlck1peGluID0ge1xyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvbnRlbnQtYmFyJz5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGhlYWRlck1peGluKTtcclxuIl19