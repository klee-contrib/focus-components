'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var i18nBehaviour = require('../../i18n/mixin');
var fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

var _require = require('lodash/lang'),
    isUndefined = _require.isUndefined;

var radioMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviourMixin, mdlBehaviour],
    /**
    * Tag name.
    */
    displayName: 'input-radio',

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
        label: (0, _types2.default)('string').isRequired,
        name: (0, _types2.default)('string'),
        value: (0, _types2.default)('bool'),
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
    componentDidUpdate: function componentDidUpdate() {
        var inputMdl = this.refs.inputMdl;
        var isChecked = this.state.isChecked;

        if (inputMdl) {
            var classList = inputMdl.classList;

            if (isChecked === true) classList.add('is-checked');
            if (isChecked === false) classList.remove('is-checked');
        }
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

        var _props = this.props,
            label = _props.label,
            name = _props.name,
            otherProps = _objectWithoutProperties(_props, ['label', 'name']);
        // we use inputProps to be able to display 'checked' property. it is required to be able to use MDL.


        var checkedProps = isChecked ? { checked: 'checked' } : {};
        var inputProps = _extends({ className: 'mdl-radio__button', name: name, onChange: this._onChange, type: 'radio' }, checkedProps, otherProps);

        return React.createElement(
            'label',
            { className: 'mdl-radio mdl-js-radio mdl-js-ripple-effect', 'data-focus': 'input-radio', ref: 'inputMdl' },
            React.createElement('input', inputProps),
            React.createElement(
                'span',
                { className: 'mdl-radio__label' },
                this.i18n(label)
            )
        );
    }
};

module.exports = (0, _builder2.default)(radioMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpMThuQmVoYXZpb3VyIiwiZmllbGRHcmlkQmVoYXZpb3VyTWl4aW4iLCJtZGxCZWhhdmlvdXIiLCJpc1VuZGVmaW5lZCIsInJhZGlvTWl4aW4iLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsInZhbHVlIiwicHJvcFR5cGVzIiwibGFiZWwiLCJpc1JlcXVpcmVkIiwibmFtZSIsIm9uQ2hhbmdlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5ld1Byb3BzIiwic2V0U3RhdGUiLCJpc0NoZWNrZWQiLCJnZXRJbml0aWFsU3RhdGUiLCJwcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsImlucHV0TWRsIiwicmVmcyIsInN0YXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiX29uQ2hhbmdlIiwiZ2V0VmFsdWUiLCJyZW5kZXIiLCJvdGhlclByb3BzIiwiY2hlY2tlZFByb3BzIiwiY2hlY2tlZCIsImlucHV0UHJvcHMiLCJjbGFzc05hbWUiLCJ0eXBlIiwiaTE4biIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUZBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOztBQUdBLElBQU1DLGdCQUFnQkQsUUFBUSxrQkFBUixDQUF0QjtBQUNBLElBQU1FLDBCQUEwQkYsUUFBUSxrQ0FBUixDQUFoQztBQUNBLElBQU1HLGVBQWVILFFBQVEsMkJBQVIsQ0FBckI7O2VBQ3NCQSxRQUFRLGFBQVIsQztJQUFmSSxXLFlBQUFBLFc7O0FBRVAsSUFBTUMsYUFBYTtBQUNmQyxZQUFRLENBQUNMLGFBQUQsRUFBZ0JDLHVCQUFoQixFQUF5Q0MsWUFBekMsQ0FETztBQUVmOzs7QUFHQUksaUJBQWEsYUFMRTs7QUFPZjtBQUNBQyxtQkFSZSw2QkFRRztBQUNkLGVBQU87QUFDSEMsbUJBQU87QUFESixTQUFQO0FBR0gsS0FaYzs7QUFhZjs7OztBQUlBQyxlQUFXO0FBQ1BDLGVBQU8scUJBQU0sUUFBTixFQUFnQkMsVUFEaEI7QUFFUEMsY0FBTSxxQkFBTSxRQUFOLENBRkM7QUFHUEosZUFBTyxxQkFBTSxNQUFOLENBSEE7QUFJUEssa0JBQVUscUJBQU0sTUFBTjtBQUpILEtBakJJO0FBdUJmO0FBQ0FDLDZCQXhCZSxxQ0F3QldDLFFBeEJYLEVBd0JxQjtBQUNoQyxhQUFLQyxRQUFMLENBQWMsRUFBQ0MsV0FBV0YsU0FBU1AsS0FBckIsRUFBZDtBQUNILEtBMUJjOztBQTJCZjtBQUNBVSxtQkE1QmUsNkJBNEJHO0FBQUEsWUFDUFYsS0FETyxHQUNFLEtBQUtXLEtBRFAsQ0FDUFgsS0FETzs7QUFFZCxlQUFPO0FBQ0hTLHVCQUFXZCxZQUFZSyxLQUFaLElBQXFCLEtBQXJCLEdBQTZCQTtBQURyQyxTQUFQO0FBR0gsS0FqQ2M7QUFrQ2ZZLHNCQWxDZSxnQ0FrQ007QUFBQSxZQUNWQyxRQURVLEdBQ0UsS0FBS0MsSUFEUCxDQUNWRCxRQURVO0FBQUEsWUFFVkosU0FGVSxHQUVHLEtBQUtNLEtBRlIsQ0FFVk4sU0FGVTs7QUFHakIsWUFBSUksUUFBSixFQUFjO0FBQUEsZ0JBQ0hHLFNBREcsR0FDVUgsUUFEVixDQUNIRyxTQURHOztBQUVWLGdCQUFJUCxjQUFjLElBQWxCLEVBQXdCTyxVQUFVQyxHQUFWLENBQWMsWUFBZDtBQUN4QixnQkFBSVIsY0FBYyxLQUFsQixFQUF5Qk8sVUFBVUUsTUFBVixDQUFpQixZQUFqQjtBQUM1QjtBQUNKLEtBMUNjOztBQTJDZjs7OztBQUlBQyxhQS9DZSx1QkErQ0g7QUFBQTs7QUFDUixhQUFLWCxRQUFMLENBQWM7QUFDVkMsdUJBQVcsQ0FBQyxLQUFLTSxLQUFMLENBQVdOO0FBRGIsU0FBZCxFQUVHLFlBQU07QUFDTCxnQkFBRyxNQUFLRSxLQUFMLENBQVdOLFFBQWQsRUFBd0I7QUFDcEIsc0JBQUtNLEtBQUwsQ0FBV04sUUFBWCxDQUFvQixNQUFLVSxLQUFMLENBQVdOLFNBQS9CO0FBQ0g7QUFDSixTQU5EO0FBT0gsS0F2RGM7O0FBd0RmOzs7O0FBSUFXLFlBNURlLHNCQTRESjtBQUNQLGVBQU8sS0FBS0wsS0FBTCxDQUFXTixTQUFsQjtBQUNILEtBOURjOztBQStEZjs7OztBQUlBWSxVQW5FZSxvQkFtRU47QUFBQSxZQUNFWixTQURGLEdBQ2UsS0FBS00sS0FEcEIsQ0FDRU4sU0FERjs7QUFBQSxxQkFFZ0MsS0FBS0UsS0FGckM7QUFBQSxZQUVFVCxLQUZGLFVBRUVBLEtBRkY7QUFBQSxZQUVTRSxJQUZULFVBRVNBLElBRlQ7QUFBQSxZQUVrQmtCLFVBRmxCO0FBR0w7OztBQUNBLFlBQU1DLGVBQWVkLFlBQVksRUFBQ2UsU0FBUyxTQUFWLEVBQVosR0FBbUMsRUFBeEQ7QUFDQSxZQUFNQyxzQkFBaUIsRUFBQ0MsV0FBVyxtQkFBWixFQUFpQ3RCLE1BQU1BLElBQXZDLEVBQTZDQyxVQUFVLEtBQUtjLFNBQTVELEVBQXVFUSxNQUFNLE9BQTdFLEVBQWpCLEVBQTJHSixZQUEzRyxFQUE0SEQsVUFBNUgsQ0FBTjs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFPLFdBQVUsNkNBQWpCLEVBQStELGNBQVcsYUFBMUUsRUFBd0YsS0FBSSxVQUE1RjtBQUNJLHlDQUFXRyxVQUFYLENBREo7QUFFSTtBQUFBO0FBQUEsa0JBQU0sV0FBVSxrQkFBaEI7QUFBb0MscUJBQUtHLElBQUwsQ0FBVTFCLEtBQVY7QUFBcEM7QUFGSixTQURKO0FBTUg7QUFoRmMsQ0FBbkI7O0FBbUZBMkIsT0FBT0MsT0FBUCxHQUFpQix1QkFBUWxDLFVBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgaTE4bkJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2kxOG4vbWl4aW4nKTtcclxuY29uc3QgZmllbGRHcmlkQmVoYXZpb3VyTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9taXhpbi9maWVsZC1ncmlkLWJlaGF2aW91cicpO1xyXG5jb25zdCBtZGxCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IHtpc1VuZGVmaW5lZH0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5cclxuY29uc3QgcmFkaW9NaXhpbiA9IHtcclxuICAgIG1peGluczogW2kxOG5CZWhhdmlvdXIsIGZpZWxkR3JpZEJlaGF2aW91ck1peGluLCBtZGxCZWhhdmlvdXJdLFxyXG4gICAgLyoqXHJcbiAgICAqIFRhZyBuYW1lLlxyXG4gICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnaW5wdXQtcmFkaW8nLFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFByb3BlcnRpZXMgdmFsaWRhdGlvbi5cclxuICAgICogQHR5cGUge09iamVjdH1cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBsYWJlbDogdHlwZXMoJ3N0cmluZycpLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgbmFtZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIG9uQ2hhbmdlOiB0eXBlcygnZnVuYycpXHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNDaGVja2VkOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogaXNVbmRlZmluZWQodmFsdWUpID8gZmFsc2UgOiB2YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dE1kbH0gPSB0aGlzLnJlZnM7XHJcbiAgICAgICAgY29uc3Qge2lzQ2hlY2tlZH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChpbnB1dE1kbCkge1xyXG4gICAgICAgICAgICBjb25zdCB7Y2xhc3NMaXN0fSA9IGlucHV0TWRsO1xyXG4gICAgICAgICAgICBpZiAoaXNDaGVja2VkID09PSB0cnVlKSBjbGFzc0xpc3QuYWRkKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIGlmIChpc0NoZWNrZWQgPT09IGZhbHNlKSBjbGFzc0xpc3QucmVtb3ZlKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBFeGVjdXRlZCBhY3Rpb25zIG9uIGNoYW5nZSBldmVudC5cclxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XHJcbiAgICAqL1xyXG4gICAgX29uQ2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0NoZWNrZWQ6ICF0aGlzLnN0YXRlLmlzQ2hlY2tlZFxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLmlzQ2hlY2tlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiAgdGhlIERPTS5cclxuICAgICogQHJldHVybnMgVGhlIERPTSBub2RlIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzQ2hlY2tlZDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBDaGVja2JveCBIVE1MLlxyXG4gICAgKiBAcmV0dXJuIHtWaXJ0dWFsRE9NfSAtIFRoZSB2aXJ0dWFsIERPTSBvZiB0aGUgY2hlY2tib3guXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0NoZWNrZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIG5hbWUsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyB3ZSB1c2UgaW5wdXRQcm9wcyB0byBiZSBhYmxlIHRvIGRpc3BsYXkgJ2NoZWNrZWQnIHByb3BlcnR5LiBpdCBpcyByZXF1aXJlZCB0byBiZSBhYmxlIHRvIHVzZSBNREwuXHJcbiAgICAgICAgY29uc3QgY2hlY2tlZFByb3BzID0gaXNDaGVja2VkID8ge2NoZWNrZWQ6ICdjaGVja2VkJ30gOiB7fTtcclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gey4uLntjbGFzc05hbWU6ICdtZGwtcmFkaW9fX2J1dHRvbicsIG5hbWU6IG5hbWUsIG9uQ2hhbmdlOiB0aGlzLl9vbkNoYW5nZSwgdHlwZTogJ3JhZGlvJ30sIC4uLmNoZWNrZWRQcm9wcywgLi4ub3RoZXJQcm9wc307XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J21kbC1yYWRpbyBtZGwtanMtcmFkaW8gbWRsLWpzLXJpcHBsZS1lZmZlY3QnIGRhdGEtZm9jdXM9XCJpbnB1dC1yYWRpb1wiIHJlZj0naW5wdXRNZGwnPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dFByb3BzfS8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J21kbC1yYWRpb19fbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHJhZGlvTWl4aW4pO1xyXG4iXX0=