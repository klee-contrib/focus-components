'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// Mixins

var mdlBehaviour = require('../mixin/mdl-behaviour');

var Progress = {
    mixins: [mdlBehaviour],
    /**
     * Get default props
     * @return {Object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            completed: 0
        };
    },
    componentDidMount: function componentDidMount() {
        var bar = ReactDOM.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(0);
            bar.MaterialProgress.setBuffer(100);
        }
    },

    /**
     * Component will receive props
     * @param  {Object} completed new completed prop
     */
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var completed = _ref.completed;

        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        var bar = ReactDOM.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    },

    /**
     * Render the component
     * @return {Function} the rendered component
     */
    render: function render() {
        var completed = +this.props.completed;
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        return React.createElement('div', { className: 'mdl-progress mdl-js-progress', 'data-focus': 'progress-bar', ref: 'bar' });
    }
};

module.exports = (0, _builder2.default)(Progress);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsIm1kbEJlaGF2aW91ciIsIlByb2dyZXNzIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiY29tcGxldGVkIiwiY29tcG9uZW50RGlkTW91bnQiLCJiYXIiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJNYXRlcmlhbFByb2dyZXNzIiwic2V0UHJvZ3Jlc3MiLCJzZXRCdWZmZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwicmVuZGVyIiwicHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUlBOzs7Ozs7QUFKQTtBQUNBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTUMsV0FBV0QsUUFBUSxXQUFSLENBQWpCOztBQUlBOztBQUVBLElBQU1FLGVBQWVGLFFBQVEsd0JBQVIsQ0FBckI7O0FBRUEsSUFBTUcsV0FBVztBQUNiQyxZQUFRLENBQUNGLFlBQUQsQ0FESztBQUViOzs7O0FBSUFHLG1CQU5hLDZCQU1LO0FBQ2QsZUFBTztBQUNIQyx1QkFBVztBQURSLFNBQVA7QUFHSCxLQVZZO0FBV2JDLHFCQVhhLCtCQVdPO0FBQ2hCLFlBQU1DLE1BQU1QLFNBQVNRLFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVRixHQUEvQixDQUFaO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0xBLGdCQUFJRyxnQkFBSixDQUFxQkMsV0FBckIsQ0FBaUMsQ0FBakM7QUFDQUosZ0JBQUlHLGdCQUFKLENBQXFCRSxTQUFyQixDQUErQixHQUEvQjtBQUNIO0FBQ0osS0FqQlk7O0FBa0JiOzs7O0FBSUFDLDZCQXRCYSwyQ0FzQjBCO0FBQUEsWUFBWlIsU0FBWSxRQUFaQSxTQUFZOztBQUNuQyxZQUFJLElBQUlBLFNBQVIsRUFBbUI7QUFDZkEsd0JBQVksQ0FBWjtBQUNIO0FBQ0QsWUFBSSxNQUFNQSxTQUFWLEVBQXFCO0FBQ2pCQSx3QkFBWSxHQUFaO0FBQ0g7QUFDRCxZQUFNRSxNQUFNUCxTQUFTUSxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVUYsR0FBL0IsQ0FBWjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMQSxnQkFBSUcsZ0JBQUosQ0FBcUJDLFdBQXJCLENBQWlDTixTQUFqQztBQUNBRSxnQkFBSUcsZ0JBQUosQ0FBcUJFLFNBQXJCLENBQStCLEdBQS9CO0FBQ0g7QUFDSixLQWxDWTs7QUFtQ2I7Ozs7QUFJQUUsVUF2Q2Esb0JBdUNKO0FBQ0wsWUFBSVQsWUFBWSxDQUFDLEtBQUtVLEtBQUwsQ0FBV1YsU0FBNUI7QUFDQSxZQUFJLElBQUlBLFNBQVIsRUFBbUI7QUFDZkEsd0JBQVksQ0FBWjtBQUNIO0FBQ0QsWUFBSSxNQUFNQSxTQUFWLEVBQXFCO0FBQ2pCQSx3QkFBWSxHQUFaO0FBQ0g7QUFDRCxlQUNJLDZCQUFLLFdBQVUsOEJBQWYsRUFBOEMsY0FBVyxjQUF6RCxFQUF3RSxLQUFJLEtBQTVFLEdBREo7QUFHSDtBQWxEWSxDQUFqQjs7QUFxREFXLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFmLFFBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5jb25zdCBtZGxCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcblxyXG5jb25zdCBQcm9ncmVzcyA9IHtcclxuICAgIG1peGluczogW21kbEJlaGF2aW91cl0sXHJcbiAgICAvKipcclxuICAgICAqIEdldCBkZWZhdWx0IHByb3BzXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkZWZhdWx0IHByb3BzXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IGJhciA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5iYXIpO1xyXG4gICAgICAgIGlmIChiYXIpIHtcclxuICAgICAgICAgICAgYmFyLk1hdGVyaWFsUHJvZ3Jlc3Muc2V0UHJvZ3Jlc3MoMCk7XHJcbiAgICAgICAgICAgIGJhci5NYXRlcmlhbFByb2dyZXNzLnNldEJ1ZmZlcigxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENvbXBvbmVudCB3aWxsIHJlY2VpdmUgcHJvcHNcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29tcGxldGVkIG5ldyBjb21wbGV0ZWQgcHJvcFxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtjb21wbGV0ZWR9KSB7XHJcbiAgICAgICAgaWYgKDAgPiBjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgY29tcGxldGVkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKDEwMCA8IGNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICBjb21wbGV0ZWQgPSAxMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGJhciA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5iYXIpO1xyXG4gICAgICAgIGlmIChiYXIpIHtcclxuICAgICAgICAgICAgYmFyLk1hdGVyaWFsUHJvZ3Jlc3Muc2V0UHJvZ3Jlc3MoY29tcGxldGVkKTtcclxuICAgICAgICAgICAgYmFyLk1hdGVyaWFsUHJvZ3Jlc3Muc2V0QnVmZmVyKDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY29tcGxldGVkID0gK3RoaXMucHJvcHMuY29tcGxldGVkO1xyXG4gICAgICAgIGlmICgwID4gY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgxMDAgPCBjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgY29tcGxldGVkID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLXByb2dyZXNzIG1kbC1qcy1wcm9ncmVzcycgZGF0YS1mb2N1cz0ncHJvZ3Jlc3MtYmFyJyByZWY9J2JhcicgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKFByb2dyZXNzKTtcclxuIl19