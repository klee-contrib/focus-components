'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var emptyMixin = {
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Empty\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Empty');
    },
    render: function render() {
        return React.createElement('div', { 'data-focus': 'empty' });
    }
};

module.exports = (0, _builder2.default)(emptyMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJlbXB0eU1peGluIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29uc29sZSIsIndhcm4iLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFDQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUlDLGFBQWE7QUFDYkMsc0JBRGEsZ0NBQ1M7QUFDbEJDLGdCQUFRQyxJQUFSLENBQWEsdUlBQWI7QUFDSCxLQUhZO0FBSWJDLFVBSmEsb0JBSUo7QUFDTCxlQUFPLDZCQUFLLGNBQVcsT0FBaEIsR0FBUDtBQUNIO0FBTlksQ0FBakI7O0FBU0FDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFOLFVBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBlbXB0eU1peGluID0ge1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyB2MC4xNTogdGhlIFxcJ0VtcHR5XFwnIGNvbXBvbmVudCBmcm9tIEZvY3VzQ29tcG9uZW50cy5jb21tb24gaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBGb2N1c0NvbXBvbmVudHMuY29tcG9uZW50cy5FbXB0eScpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBkYXRhLWZvY3VzPSdlbXB0eSc+PC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihlbXB0eU1peGluKTtcclxuIl19