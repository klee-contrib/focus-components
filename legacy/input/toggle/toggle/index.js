'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react'); //Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */

var fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');

var toggleMixin = {
    mixins: [fieldGridBehaviourMixin],
    /**
     * Get the checkbox default attributes.
     */
    getDefaultProps: function getInputDefaultProps() {
        return {
            value: undefined,
            label: undefined,
            style: {}
        };
    },
    /**
     * Properties validation.
     * @type {Object}
     */
    propTypes: {
        value: (0, _types2.default)('bool'),
        label: (0, _types2.default)('string'),
        style: (0, _types2.default)('object')
    },
    getInitialState: function getInitialState() {
        return {
            isChecked: this.props.value
        };
    },
    _onChange: function onChange(event) {
        this.setState({
            isChecked: !this.state.isChecked
        });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    _labelClassName: function labelClassName() {
        return '' + this._getContentGridClassName();
    },
    /**
     * Get the value from the input in  the DOM.
     */
    getValue: function getValue() {
        return this.getDOMNode().value;
    },
    /**
     * Render the Checkbox HTML.
     * @return {VirtualDOM} - The virtual DOM of the checkbox.
     */
    render: function renderToggle() {
        return React.createElement(
            'div',
            { className: 'togglebutton form-group' },
            React.createElement(
                'label',
                { className: this._getLabelGridClassName() },
                this.props.label ? this.props.label : ''
            ),
            React.createElement(
                'label',
                { className: this._labelClassName() },
                React.createElement('input', { ref: 'checkbox', checked: this.state.isChecked, onChange: this._onChange, type: 'checkbox' })
            )
        );
    },
    /** @inheritedDoc*/
    componentWillReceiveProps: function toggleWillreceiveProps(nextProps) {
        if (nextProps.value !== undefined) {
            this.setState({ isChecked: nextProps.value });
        }
    }
};

module.exports = (0, _builder2.default)(toggleMixin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBRUE7Ozs7OztBQURBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBWixDLENBUEE7QUFDQTs7Ozs7O0FBUUEsSUFBSSwwQkFBMEIsUUFBUSxrQ0FBUixDQUE5Qjs7QUFFQSxJQUFJLGNBQWM7QUFDZCxZQUFRLENBQUMsdUJBQUQsQ0FETTtBQUVoQjs7O0FBR0UscUJBQWlCLFNBQVMsb0JBQVQsR0FBZ0M7QUFDN0MsZUFBTztBQUNILG1CQUFPLFNBREo7QUFFSCxtQkFBTyxTQUZKO0FBR0gsbUJBQU87QUFISixTQUFQO0FBS0gsS0FYYTtBQVloQjs7OztBQUlFLGVBQVc7QUFDUCxlQUFPLHFCQUFLLE1BQUwsQ0FEQTtBQUVQLGVBQU8scUJBQUssUUFBTCxDQUZBO0FBR1AsZUFBTyxxQkFBSyxRQUFMO0FBSEEsS0FoQkc7QUFxQmQscUJBQWlCLDJCQUFXO0FBQ3hCLGVBQU87QUFDSCx1QkFBVyxLQUFLLEtBQUwsQ0FBVztBQURuQixTQUFQO0FBR0gsS0F6QmE7QUEwQmQsZUFBVyxTQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFDaEMsYUFBSyxRQUFMLENBQWM7QUFDVix1QkFBVyxDQUFDLEtBQUssS0FBTCxDQUFXO0FBRGIsU0FBZDtBQUdBLFlBQUksS0FBSyxLQUFMLENBQVcsUUFBZixFQUF5QjtBQUNyQixpQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFwQjtBQUNIO0FBQ0osS0FqQ2E7QUFrQ2QscUJBQWlCLFNBQVMsY0FBVCxHQUEwQjtBQUN2QyxvQkFBVSxLQUFLLHdCQUFMLEVBQVY7QUFDSCxLQXBDYTtBQXFDaEI7OztBQUdFLGNBQVUsU0FBUyxRQUFULEdBQW9CO0FBQzFCLGVBQU8sS0FBSyxVQUFMLEdBQWtCLEtBQXpCO0FBQ0gsS0ExQ2E7QUEyQ2hCOzs7O0FBSUUsWUFBUSxTQUFTLFlBQVQsR0FBd0I7QUFDNUIsZUFDRjtBQUFBO0FBQUEsY0FBSyxXQUFVLHlCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFPLFdBQVcsS0FBSyxzQkFBTCxFQUFsQjtBQUFrRCxxQkFBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxLQUE5QixHQUFzQztBQUF4RixhQURGO0FBRUU7QUFBQTtBQUFBLGtCQUFPLFdBQVcsS0FBSyxlQUFMLEVBQWxCO0FBQ0UsK0NBQU8sS0FBSSxVQUFYLEVBQXNCLFNBQVMsS0FBSyxLQUFMLENBQVcsU0FBMUMsRUFBcUQsVUFBVSxLQUFLLFNBQXBFLEVBQStFLE1BQUssVUFBcEY7QUFERjtBQUZGLFNBREU7QUFRSCxLQXhEYTtBQXlEaEI7QUFDRSwrQkFBMkIsU0FBUyxzQkFBVCxDQUFnQyxTQUFoQyxFQUEyQztBQUNsRSxZQUFHLFVBQVUsS0FBVixLQUFvQixTQUF2QixFQUFrQztBQUM5QixpQkFBSyxRQUFMLENBQWMsRUFBQyxXQUFZLFVBQVUsS0FBdkIsRUFBZDtBQUNIO0FBQ0o7QUE5RGEsQ0FBbEI7O0FBaUVBLE9BQU8sT0FBUCxHQUFpQix1QkFBUSxXQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vVGFyZ2V0XHJcbi8qXHJcbjxsYWJlbD5cclxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+PHNwYW4gY2xhc3M9XCJyaXBwbGVcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJjaGVja1wiPjwvc3Bhbj4gQ2hlY2tib3hcclxuPC9sYWJlbD5cclxuICovXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbnZhciBmaWVsZEdyaWRCZWhhdmlvdXJNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL21peGluL2ZpZWxkLWdyaWQtYmVoYXZpb3VyJyk7XHJcblxyXG52YXIgdG9nZ2xlTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtmaWVsZEdyaWRCZWhhdmlvdXJNaXhpbl0sXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjaGVja2JveCBkZWZhdWx0IGF0dHJpYnV0ZXMuXHJcbiAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldElucHV0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxhYmVsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIFByb3BlcnRpZXMgdmFsaWRhdGlvbi5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgdmFsdWU6IHR5cGUoJ2Jvb2wnKSxcclxuICAgICAgICBsYWJlbDogdHlwZSgnc3RyaW5nJyksXHJcbiAgICAgICAgc3R5bGU6IHR5cGUoJ29iamVjdCcpXHJcbiAgICB9LFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc0NoZWNrZWQ6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIF9vbkNoYW5nZTogZnVuY3Rpb24gb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNDaGVja2VkOiAhdGhpcy5zdGF0ZS5pc0NoZWNrZWRcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX2xhYmVsQ2xhc3NOYW1lOiBmdW5jdGlvbiBsYWJlbENsYXNzTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5fZ2V0Q29udGVudEdyaWRDbGFzc05hbWUoKX1gO1xyXG4gICAgfSxcclxuICAvKipcclxuICAgKiBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGlucHV0IGluICB0aGUgRE9NLlxyXG4gICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERPTU5vZGUoKS52YWx1ZTtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBDaGVja2JveCBIVE1MLlxyXG4gICAqIEByZXR1cm4ge1ZpcnR1YWxET019IC0gVGhlIHZpcnR1YWwgRE9NIG9mIHRoZSBjaGVja2JveC5cclxuICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyVG9nZ2xlKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9nZ2xlYnV0dG9uIGZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXt0aGlzLl9nZXRMYWJlbEdyaWRDbGFzc05hbWUoKX0+e3RoaXMucHJvcHMubGFiZWwgPyB0aGlzLnByb3BzLmxhYmVsIDogJyd9PC9sYWJlbD5cclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXt0aGlzLl9sYWJlbENsYXNzTmFtZSgpfT5cclxuICAgICAgICAgIDxpbnB1dCByZWY9J2NoZWNrYm94JyBjaGVja2VkPXt0aGlzLnN0YXRlLmlzQ2hlY2tlZH0gb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfSB0eXBlPVwiY2hlY2tib3hcIiAvPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICk7XHJcbiAgICB9LFxyXG4gIC8qKiBAaW5oZXJpdGVkRG9jKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIHRvZ2dsZVdpbGxyZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYobmV4dFByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNDaGVja2VkIDogbmV4dFByb3BzLnZhbHVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHRvZ2dsZU1peGluKTtcclxuIl19