'use strict';

var _translation = require('focus-core/translation');

var React = require('react');
var searchHeaderMixin = require('./mixin');
module.exports = React.createClass({
  displayName: 'exports',

  mixins: [searchHeaderMixin],
  render: function render() {
    return React.createElement(
      'div',
      { className: 'cartridge-search', 'data-focus': 'cartridge-search' },
      React.createElement(
        'h1',
        null,
        (0, _translation.translate)('search.cartridge.title')
      ),
      this._SearchBarComponent()
    );
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJzZWFyY2hIZWFkZXJNaXhpbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVDbGFzcyIsIm1peGlucyIsInJlbmRlciIsIl9TZWFyY2hCYXJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0EsSUFBSUEsUUFBUUMsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJQyxvQkFBb0JELFFBQVEsU0FBUixDQUF4QjtBQUNBRSxPQUFPQyxPQUFQLEdBQWlCSixNQUFNSyxXQUFOLENBQWtCO0FBQUE7O0FBQy9CQyxVQUFRLENBQUNKLGlCQUFELENBRHVCO0FBRS9CSyxRQUYrQixvQkFFdEI7QUFDTCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsa0JBQWYsRUFBa0MsY0FBVyxrQkFBN0M7QUFDRTtBQUFBO0FBQUE7QUFBSyxvQ0FBVSx3QkFBVjtBQUFMLE9BREY7QUFFRyxXQUFLQyxtQkFBTDtBQUZILEtBREY7QUFNSDtBQVQ4QixDQUFsQixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBzZWFyY2hIZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4nKTtcclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtzZWFyY2hIZWFkZXJNaXhpbl0sXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjYXJ0cmlkZ2Utc2VhcmNoJyBkYXRhLWZvY3VzPSdjYXJ0cmlkZ2Utc2VhcmNoJz5cclxuICAgICAgICAgICAgPGgxPnt0cmFuc2xhdGUoJ3NlYXJjaC5jYXJ0cmlkZ2UudGl0bGUnKX08L2gxPlxyXG4gICAgICAgICAgICB7dGhpcy5fU2VhcmNoQmFyQ29tcG9uZW50KCl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==