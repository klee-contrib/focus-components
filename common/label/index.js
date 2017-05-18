'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var styleBehaviour = require('../../mixin/stylable');

/**
* Label mixin for form.
* @type {Object}
*/
var labelMixin = {
    mixins: [styleBehaviour],

    /** @inheritdoc */
    propTypes: {
        name: _react.PropTypes.string.isRequired,
        text: _react.PropTypes.string
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Label\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Label');
    },

    /** @inheritdoc */
    render: function render() {
        var _props = this.props,
            name = _props.name,
            text = _props.text,
            style = _props.style;

        var content = text || name;
        return _react2.default.createElement(
            'label',
            { className: style.className, 'data-focus': 'label', htmlFor: name },
            (0, _translation.translate)(content)
        );
    }
};

module.exports = (0, _builder2.default)(labelMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdHlsZUJlaGF2aW91ciIsInJlcXVpcmUiLCJsYWJlbE1peGluIiwibWl4aW5zIiwicHJvcFR5cGVzIiwibmFtZSIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJ0ZXh0IiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29uc29sZSIsIndhcm4iLCJyZW5kZXIiLCJwcm9wcyIsInN0eWxlIiwiY29udGVudCIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFKQTtBQU1BLElBQU1BLGlCQUFpQkMsUUFBUSxzQkFBUixDQUF2Qjs7QUFFQTs7OztBQUlBLElBQU1DLGFBQWE7QUFDZkMsWUFBUSxDQUFDSCxjQUFELENBRE87O0FBR2Y7QUFDQUksZUFBVztBQUNQQyxjQUFNLGlCQUFVQyxNQUFWLENBQWlCQyxVQURoQjtBQUVQQyxjQUFNLGlCQUFVRjtBQUZULEtBSkk7QUFRZkcsc0JBUmUsZ0NBUU07QUFDakJDLGdCQUFRQyxJQUFSLENBQWEsdUlBQWI7QUFDSCxLQVZjOztBQVdmO0FBQ0FDLFVBWmUsb0JBWU47QUFBQSxxQkFDdUIsS0FBS0MsS0FENUI7QUFBQSxZQUNFUixJQURGLFVBQ0VBLElBREY7QUFBQSxZQUNRRyxJQURSLFVBQ1FBLElBRFI7QUFBQSxZQUNjTSxLQURkLFVBQ2NBLEtBRGQ7O0FBRUwsWUFBTUMsVUFBVVAsUUFBUUgsSUFBeEI7QUFDQSxlQUNJO0FBQUE7QUFBQSxjQUFPLFdBQVdTLE1BQU1FLFNBQXhCLEVBQW1DLGNBQVcsT0FBOUMsRUFBc0QsU0FBU1gsSUFBL0Q7QUFDSyx3Q0FBVVUsT0FBVjtBQURMLFNBREo7QUFLSDtBQXBCYyxDQUFuQjs7QUF1QkFFLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFoQixVQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuXHJcbmNvbnN0IHN0eWxlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuXHJcbi8qKlxyXG4qIExhYmVsIG1peGluIGZvciBmb3JtLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IGxhYmVsTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtzdHlsZUJlaGF2aW91cl0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZ1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyB2MC4xNTogdGhlIFxcJ0xhYmVsXFwnIGNvbXBvbmVudCBmcm9tIEZvY3VzQ29tcG9uZW50cy5jb21tb24gaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBGb2N1c0NvbXBvbmVudHMuY29tcG9uZW50cy5MYWJlbCcpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtuYW1lLCB0ZXh0LCBzdHlsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0ZXh0IHx8IG5hbWU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17c3R5bGUuY2xhc3NOYW1lfSBkYXRhLWZvY3VzPVwibGFiZWxcIiBodG1sRm9yPXtuYW1lfT5cclxuICAgICAgICAgICAgICAgIHt0cmFuc2xhdGUoY29udGVudCl9XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihsYWJlbE1peGluKTtcclxuIl19