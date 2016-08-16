'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var i18nBehaviour = require('../../i18n/mixin');
var fieldGridBehaviour = require('../../mixin/field-grid-behaviour');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

var _require = require('lodash/lang');

var isUndefined = _require.isUndefined;


var checkBoxMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviour, mdlBehaviour],

    /**
    * Tag name.
    */
    displayName: 'input-checkbox',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            value: false
        };
    },

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        value: (0, _types2.default)('bool'),
        label: (0, _types2.default)('string'),
        onChange: (0, _types2.default)('func')
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.value });
    },

    /** @inheritDoc */
    getInitialState: function getInitialState() {
        var value = this.props.value;

        return {
            isChecked: isUndefined(value) ? false : value
        };
    },

    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange: function _onChange() {
        var _this = this;

        this.setState({
            isChecked: !this.state.isChecked
        }, function () {
            if (_this.props.onChange) {
                _this.props.onChange(_this.state.isChecked);
            }
        });
    },

    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    getValue: function getValue() {
        return this.state.isChecked;
    },

    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function render() {
        var isChecked = this.state.isChecked;
        var label = this.props.label;

        var checkedProps = isChecked ? { checked: 'checked' } : {};
        var inputProps = _extends({ className: 'mdl-checkbox__input', onChange: this._onChange, type: 'checkbox' }, checkedProps);
        return React.createElement(
            'label',
            { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox' },
            React.createElement('input', inputProps),
            label && React.createElement(
                'span',
                { className: 'mdl-checkbox__label' },
                this.i18n(label)
            )
        );
    }
};

module.exports = (0, _builder2.default)(checkBoxMixin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTSxnQkFBZ0IsUUFBUSxrQkFBUixDQUF0QjtBQUNBLElBQU0scUJBQXFCLFFBQVEsa0NBQVIsQ0FBM0I7QUFDQSxJQUFNLGVBQWUsUUFBUSwyQkFBUixDQUFyQjs7ZUFDc0IsUUFBUSxhQUFSLEM7O0lBQWYsVyxZQUFBLFc7OztBQUdQLElBQU0sZ0JBQWdCO0FBQ2xCLFlBQVEsQ0FBQyxhQUFELEVBQWdCLGtCQUFoQixFQUFvQyxZQUFwQyxDQURVOztBQUdsQjs7O0FBR0EsaUJBQWEsZ0JBTks7O0FBUWxCO0FBQ0EsbUJBVGtCLDZCQVNBO0FBQ2QsZUFBTztBQUNILG1CQUFPO0FBREosU0FBUDtBQUdILEtBYmlCOztBQWNsQjs7OztBQUlBLGVBQVc7QUFDUCxlQUFPLHFCQUFNLE1BQU4sQ0FEQTtBQUVQLGVBQU8scUJBQU0sUUFBTixDQUZBO0FBR1Asa0JBQVUscUJBQU0sTUFBTjtBQUhILEtBbEJPO0FBdUJsQjtBQUNBLDZCQXhCa0IscUNBd0JRLFFBeEJSLEVBd0JrQjtBQUNoQyxhQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVcsU0FBUyxLQUFyQixFQUFkO0FBQ0gsS0ExQmlCOztBQTJCbEI7QUFDQSxtQkE1QmtCLDZCQTRCQTtBQUFBLFlBQ1AsS0FETyxHQUNFLEtBQUssS0FEUCxDQUNQLEtBRE87O0FBRWQsZUFBTztBQUNILHVCQUFXLFlBQVksS0FBWixJQUFxQixLQUFyQixHQUE2QjtBQURyQyxTQUFQO0FBR0gsS0FqQ2lCOztBQWtDbEI7Ozs7QUFJQSxhQXRDa0IsdUJBc0NOO0FBQUE7O0FBQ1IsYUFBSyxRQUFMLENBQWM7QUFDVix1QkFBVyxDQUFDLEtBQUssS0FBTCxDQUFXO0FBRGIsU0FBZCxFQUVHLFlBQU07QUFDTCxnQkFBRyxNQUFLLEtBQUwsQ0FBVyxRQUFkLEVBQXdCO0FBQ3BCLHNCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE1BQUssS0FBTCxDQUFXLFNBQS9CO0FBQ0g7QUFDSixTQU5EO0FBT0gsS0E5Q2lCOztBQStDbEI7Ozs7QUFJQSxZQW5Ea0Isc0JBbURQO0FBQ1AsZUFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFsQjtBQUNILEtBckRpQjs7QUFzRGxCOzs7O0FBSUEsVUExRGtCLG9CQTBEVDtBQUFBLFlBQ0UsU0FERixHQUNlLEtBQUssS0FEcEIsQ0FDRSxTQURGO0FBQUEsWUFFRSxLQUZGLEdBRVcsS0FBSyxLQUZoQixDQUVFLEtBRkY7O0FBR0wsWUFBTSxlQUFlLFlBQVksRUFBQyxTQUFTLFNBQVYsRUFBWixHQUFtQyxFQUF4RDtBQUNBLFlBQU0sc0JBQWlCLEVBQUMsV0FBVyxxQkFBWixFQUFtQyxVQUFVLEtBQUssU0FBbEQsRUFBNkQsTUFBTSxVQUFuRSxFQUFqQixFQUFvRyxZQUFwRyxDQUFOO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBTyxXQUFVLG1EQUFqQixFQUFxRSxjQUFXLGdCQUFoRjtBQUNJLHlDQUFXLFVBQVgsQ0FESjtBQUVLLHFCQUNHO0FBQUE7QUFBQSxrQkFBTSxXQUFVLHFCQUFoQjtBQUF1QyxxQkFBSyxJQUFMLENBQVUsS0FBVjtBQUF2QztBQUhSLFNBREo7QUFRSDtBQXZFaUIsQ0FBdEI7O0FBMEVBLE9BQU8sT0FBUCxHQUFpQix1QkFBUSxhQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IGkxOG5CZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9pMThuL21peGluJyk7XHJcbmNvbnN0IGZpZWxkR3JpZEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL21peGluL2ZpZWxkLWdyaWQtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IG1kbEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL21peGluL21kbC1iZWhhdmlvdXInKTtcclxuY29uc3Qge2lzVW5kZWZpbmVkfSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcblxyXG5cclxuY29uc3QgY2hlY2tCb3hNaXhpbiA9IHtcclxuICAgIG1peGluczogW2kxOG5CZWhhdmlvdXIsIGZpZWxkR3JpZEJlaGF2aW91ciwgbWRsQmVoYXZpb3VyXSxcclxuXHJcbiAgICAvKipcclxuICAgICogVGFnIG5hbWUuXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdpbnB1dC1jaGVja2JveCcsXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJvcGVydGllcyB2YWxpZGF0aW9uLlxyXG4gICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIHZhbHVlOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIGxhYmVsOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgb25DaGFuZ2U6IHR5cGVzKCdmdW5jJylcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0NoZWNrZWQ6IG5ld1Byb3BzLnZhbHVlfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNDaGVja2VkOiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyBmYWxzZSA6IHZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRXhlY3V0ZWQgYWN0aW9ucyBvbiBjaGFuZ2UgZXZlbnQuXHJcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxyXG4gICAgKi9cclxuICAgIF9vbkNoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNDaGVja2VkOiAhdGhpcy5zdGF0ZS5pc0NoZWNrZWRcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS5pc0NoZWNrZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgaW5wdXQgaW4gIHRoZSBET00uXHJcbiAgICAqIEByZXR1cm5zIFRoZSBET00gbm9kZSB2YWx1ZS5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0NoZWNrZWQ7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgQ2hlY2tib3ggSFRNTC5cclxuICAgICogQHJldHVybiB7VmlydHVhbERPTX0gLSBUaGUgdmlydHVhbCBET00gb2YgdGhlIGNoZWNrYm94LlxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aXNDaGVja2VkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgY2hlY2tlZFByb3BzID0gaXNDaGVja2VkID8ge2NoZWNrZWQ6ICdjaGVja2VkJ30gOiB7fTtcclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gey4uLntjbGFzc05hbWU6ICdtZGwtY2hlY2tib3hfX2lucHV0Jywgb25DaGFuZ2U6IHRoaXMuX29uQ2hhbmdlLCB0eXBlOiAnY2hlY2tib3gnfSwgLi4uY2hlY2tlZFByb3BzfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibWRsLWNoZWNrYm94IG1kbC1qcy1jaGVja2JveCBtZGwtanMtcmlwcGxlLWVmZmVjdFwiIGRhdGEtZm9jdXM9XCJpbnB1dC1jaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dFByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAge2xhYmVsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWRsLWNoZWNrYm94X19sYWJlbFwiPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGNoZWNrQm94TWl4aW4pO1xyXG4iXX0=