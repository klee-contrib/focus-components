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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBRUE7Ozs7OztBQURBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7Ozs7OztBQUVKLElBQUksMEJBQTBCLFFBQVEsa0NBQVIsQ0FBMUI7O0FBRUosSUFBSSxjQUFjO0FBQ2QsWUFBUSxDQUFDLHVCQUFELENBQVI7Ozs7QUFJQSxxQkFBaUIsU0FBUyxvQkFBVCxHQUFnQztBQUM3QyxlQUFPO0FBQ0gsbUJBQU8sU0FBUDtBQUNBLG1CQUFPLFNBQVA7QUFDQSxtQkFBTyxFQUFQO1NBSEosQ0FENkM7S0FBaEM7Ozs7O0FBV2pCLGVBQVc7QUFDUCxlQUFPLHFCQUFLLE1BQUwsQ0FBUDtBQUNBLGVBQU8scUJBQUssUUFBTCxDQUFQO0FBQ0EsZUFBTyxxQkFBSyxRQUFMLENBQVA7S0FISjtBQUtBLHFCQUFpQiwyQkFBVztBQUN4QixlQUFPO0FBQ0gsdUJBQVcsS0FBSyxLQUFMLENBQVcsS0FBWDtTQURmLENBRHdCO0tBQVg7QUFLakIsZUFBVyxTQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFDaEMsYUFBSyxRQUFMLENBQWM7QUFDVix1QkFBVyxDQUFDLEtBQUssS0FBTCxDQUFXLFNBQVg7U0FEaEIsRUFEZ0M7QUFJaEMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLEVBRHFCO1NBQXpCO0tBSk87QUFRWCxxQkFBaUIsU0FBUyxjQUFULEdBQTBCO0FBQ3ZDLG9CQUFVLEtBQUssd0JBQUwsRUFBVixDQUR1QztLQUExQjs7OztBQU1qQixjQUFVLFNBQVMsUUFBVCxHQUFvQjtBQUMxQixlQUFPLEtBQUssVUFBTCxHQUFrQixLQUFsQixDQURtQjtLQUFwQjs7Ozs7QUFPVixZQUFRLFNBQVMsWUFBVCxHQUF3QjtBQUM1QixlQUNGOztjQUFLLFdBQVUseUJBQVYsRUFBTDtZQUNFOztrQkFBTyxXQUFXLEtBQUssc0JBQUwsRUFBWCxFQUFQO2dCQUFrRCxLQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsRUFBdEM7YUFEcEQ7WUFFRTs7a0JBQU8sV0FBVyxLQUFLLGVBQUwsRUFBWCxFQUFQO2dCQUNFLCtCQUFPLEtBQUksVUFBSixFQUFlLFNBQVMsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQixVQUFVLEtBQUssU0FBTCxFQUFnQixNQUFLLFVBQUwsRUFBL0UsQ0FERjthQUZGO1NBREUsQ0FENEI7S0FBeEI7O0FBV1IsK0JBQTJCLFNBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFBMkM7QUFDbEUsWUFBRyxVQUFVLEtBQVYsS0FBb0IsU0FBcEIsRUFBK0I7QUFDOUIsaUJBQUssUUFBTCxDQUFjLEVBQUMsV0FBWSxVQUFVLEtBQVYsRUFBM0IsRUFEOEI7U0FBbEM7S0FEdUI7Q0ExRDNCOztBQWlFSixPQUFPLE9BQVAsR0FBaUIsdUJBQVEsV0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1RhcmdldFxyXG4vKlxyXG48bGFiZWw+XHJcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPjxzcGFuIGNsYXNzPVwicmlwcGxlXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiY2hlY2tcIj48L3NwYW4+IENoZWNrYm94XHJcbjwvbGFiZWw+XHJcbiAqL1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IHR5cGUgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG52YXIgZmllbGRHcmlkQmVoYXZpb3VyTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9taXhpbi9maWVsZC1ncmlkLWJlaGF2aW91cicpO1xyXG5cclxudmFyIHRvZ2dsZU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbZmllbGRHcmlkQmVoYXZpb3VyTWl4aW5dLFxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY2hlY2tib3ggZGVmYXVsdCBhdHRyaWJ1dGVzLlxyXG4gICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXRJbnB1dERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBsYWJlbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzdHlsZToge31cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAvKipcclxuICAgKiBQcm9wZXJ0aWVzIHZhbGlkYXRpb24uXHJcbiAgICogQHR5cGUge09iamVjdH1cclxuICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIHZhbHVlOiB0eXBlKCdib29sJyksXHJcbiAgICAgICAgbGFiZWw6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIHN0eWxlOiB0eXBlKCdvYmplY3QnKVxyXG4gICAgfSxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNDaGVja2VkOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBfb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogIXRoaXMuc3RhdGUuaXNDaGVja2VkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9sYWJlbENsYXNzTmFtZTogZnVuY3Rpb24gbGFiZWxDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuX2dldENvbnRlbnRHcmlkQ2xhc3NOYW1lKCl9YDtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiAgdGhlIERPTS5cclxuICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRET01Ob2RlKCkudmFsdWU7XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIFJlbmRlciB0aGUgQ2hlY2tib3ggSFRNTC5cclxuICAgKiBAcmV0dXJuIHtWaXJ0dWFsRE9NfSAtIFRoZSB2aXJ0dWFsIERPTSBvZiB0aGUgY2hlY2tib3guXHJcbiAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlclRvZ2dsZSgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvZ2dsZWJ1dHRvbiBmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17dGhpcy5fZ2V0TGFiZWxHcmlkQ2xhc3NOYW1lKCl9Pnt0aGlzLnByb3BzLmxhYmVsID8gdGhpcy5wcm9wcy5sYWJlbCA6ICcnfTwvbGFiZWw+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17dGhpcy5fbGFiZWxDbGFzc05hbWUoKX0+XHJcbiAgICAgICAgICA8aW5wdXQgcmVmPSdjaGVja2JveCcgY2hlY2tlZD17dGhpcy5zdGF0ZS5pc0NoZWNrZWR9IG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZX0gdHlwZT1cImNoZWNrYm94XCIgLz5cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICApO1xyXG4gICAgfSxcclxuICAvKiogQGluaGVyaXRlZERvYyovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiB0b2dnbGVXaWxscmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmKG5leHRQcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzQ2hlY2tlZCA6IG5leHRQcm9wcy52YWx1ZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcih0b2dnbGVNaXhpbik7XHJcbiJdfQ==