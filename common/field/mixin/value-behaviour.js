'use strict';

var _require = require('lodash/lang'),
    isObject = _require.isObject,
    isFunction = _require.isFunction,
    isUndefined = _require.isUndefined;

var EMPTY = '';
var valueBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            error: undefined,
            value: undefined
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            error: this.props.error,
            value: this.props.value
        };
    },

    /**
    * Gte the value from the field, it will look into the refs for the value, then into the state and then into the props.
    * If the value is null or empty string the value will be changed to undefined.
    * @return {object} - The value of the field.
    */
    getValue: function getValue() {
        var value = void 0;
        if (isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)) {
            value = this.refs.input.getValue();
        } else if (this.state && this.state.value !== undefined) {
            value = this.state.value;
        } else if (this.props && this.props.value !== undefined) {
            value = this.props.value;
        }
        if (isUndefined(value) || EMPTY === value) {
            value = null;
        }
        return value;
    },

    /**
    * Handler called when the input Change its value.
    * @param {event} event - The event to set.
    * @deprecated
    */
    onInputChange: function onInputChange(newValue) {
        if (this.props.onChange) {
            console.warn('\n                FOCUS 0.7.0\n                The onChange props signature has changed, instead of providing the DOM event with an object event: {target: \'The new value\'},\n                the new value is directly passed to the onChange function \'The new Value\'.\n                Don\'t forget that in your code you have to change the way you read the new value and you have to update the state of the component with\n                this.setState({error: null, value: newValue});\n            ');
            return this.props.onChange(newValue);
        }
        this.setState({ error: null, value: newValue });
    }
};
module.exports = valueBehaviourMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaXNPYmplY3QiLCJpc0Z1bmN0aW9uIiwiaXNVbmRlZmluZWQiLCJFTVBUWSIsInZhbHVlQmVoYXZpb3VyTWl4aW4iLCJnZXREZWZhdWx0UHJvcHMiLCJlcnJvciIsInVuZGVmaW5lZCIsInZhbHVlIiwiZ2V0SW5pdGlhbFN0YXRlIiwicHJvcHMiLCJnZXRWYWx1ZSIsInJlZnMiLCJpbnB1dCIsInN0YXRlIiwib25JbnB1dENoYW5nZSIsIm5ld1ZhbHVlIiwib25DaGFuZ2UiLCJjb25zb2xlIiwid2FybiIsInNldFN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBNENBLFFBQVEsYUFBUixDO0lBQXJDQyxRLFlBQUFBLFE7SUFBVUMsVSxZQUFBQSxVO0lBQVlDLFcsWUFBQUEsVzs7QUFDN0IsSUFBTUMsUUFBUSxFQUFkO0FBQ0EsSUFBTUMsc0JBQXNCO0FBQ3hCO0FBQ0FDLG1CQUZ3Qiw2QkFFTjtBQUNkLGVBQU87QUFDSEMsbUJBQU9DLFNBREo7QUFFSEMsbUJBQU9EO0FBRkosU0FBUDtBQUlILEtBUHVCOztBQVF4QjtBQUNBRSxtQkFUd0IsNkJBU047QUFDZCxlQUFPO0FBQ0hILG1CQUFPLEtBQUtJLEtBQUwsQ0FBV0osS0FEZjtBQUVIRSxtQkFBTyxLQUFLRSxLQUFMLENBQVdGO0FBRmYsU0FBUDtBQUlILEtBZHVCOztBQWV4Qjs7Ozs7QUFLQUcsWUFwQndCLHNCQW9CYjtBQUNQLFlBQUlILGNBQUo7QUFDQSxZQUFHUixTQUFTLEtBQUtZLElBQWQsS0FBdUJaLFNBQVMsS0FBS1ksSUFBTCxDQUFVQyxLQUFuQixDQUF2QixJQUFvRFosV0FBVyxLQUFLVyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JGLFFBQTNCLENBQXZELEVBQTZGO0FBQ3pGSCxvQkFBUSxLQUFLSSxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JGLFFBQWhCLEVBQVI7QUFDSCxTQUZELE1BRU8sSUFBRyxLQUFLRyxLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXTixLQUFYLEtBQXFCRCxTQUF0QyxFQUFrRDtBQUNyREMsb0JBQVEsS0FBS00sS0FBTCxDQUFXTixLQUFuQjtBQUNILFNBRk0sTUFFQSxJQUFHLEtBQUtFLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdGLEtBQVgsS0FBcUJELFNBQXRDLEVBQWlEO0FBQ3BEQyxvQkFBUSxLQUFLRSxLQUFMLENBQVdGLEtBQW5CO0FBQ0g7QUFDRCxZQUFJTixZQUFZTSxLQUFaLEtBQXNCTCxVQUFVSyxLQUFwQyxFQUEyQztBQUN2Q0Esb0JBQVEsSUFBUjtBQUNIO0FBQ0QsZUFBT0EsS0FBUDtBQUNILEtBakN1Qjs7QUFrQ3hCOzs7OztBQUtBTyxpQkF2Q3dCLHlCQXVDVkMsUUF2Q1UsRUF1Q0E7QUFDcEIsWUFBRyxLQUFLTixLQUFMLENBQVdPLFFBQWQsRUFBd0I7QUFDcEJDLG9CQUFRQyxJQUFSO0FBT0EsbUJBQU8sS0FBS1QsS0FBTCxDQUFXTyxRQUFYLENBQW9CRCxRQUFwQixDQUFQO0FBQ0g7QUFDRCxhQUFLSSxRQUFMLENBQWMsRUFBQ2QsT0FBTyxJQUFSLEVBQWNFLE9BQU9RLFFBQXJCLEVBQWQ7QUFDSDtBQW5EdUIsQ0FBNUI7QUFxREFLLE9BQU9DLE9BQVAsR0FBaUJsQixtQkFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2lzT2JqZWN0LCBpc0Z1bmN0aW9uLCBpc1VuZGVmaW5lZH0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5jb25zdCBFTVBUWSA9ICcnO1xyXG5jb25zdCB2YWx1ZUJlaGF2aW91ck1peGluID0ge1xyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3I6IHRoaXMucHJvcHMuZXJyb3IsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR3RlIHRoZSB2YWx1ZSBmcm9tIHRoZSBmaWVsZCwgaXQgd2lsbCBsb29rIGludG8gdGhlIHJlZnMgZm9yIHRoZSB2YWx1ZSwgdGhlbiBpbnRvIHRoZSBzdGF0ZSBhbmQgdGhlbiBpbnRvIHRoZSBwcm9wcy5cclxuICAgICogSWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgZW1wdHkgc3RyaW5nIHRoZSB2YWx1ZSB3aWxsIGJlIGNoYW5nZWQgdG8gdW5kZWZpbmVkLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHZhbHVlIG9mIHRoZSBmaWVsZC5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgaWYoaXNPYmplY3QodGhpcy5yZWZzKSAmJiBpc09iamVjdCh0aGlzLnJlZnMuaW5wdXQpICYmIGlzRnVuY3Rpb24odGhpcy5yZWZzLmlucHV0LmdldFZhbHVlKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUudmFsdWUgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLnByb3BzICYmIHRoaXMucHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgRU1QVFkgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGVyIGNhbGxlZCB3aGVuIHRoZSBpbnB1dCBDaGFuZ2UgaXRzIHZhbHVlLlxyXG4gICAgKiBAcGFyYW0ge2V2ZW50fSBldmVudCAtIFRoZSBldmVudCB0byBzZXQuXHJcbiAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAqL1xyXG4gICAgb25JbnB1dENoYW5nZShuZXdWYWx1ZSkge1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBcclxuICAgICAgICAgICAgICAgIEZPQ1VTIDAuNy4wXHJcbiAgICAgICAgICAgICAgICBUaGUgb25DaGFuZ2UgcHJvcHMgc2lnbmF0dXJlIGhhcyBjaGFuZ2VkLCBpbnN0ZWFkIG9mIHByb3ZpZGluZyB0aGUgRE9NIGV2ZW50IHdpdGggYW4gb2JqZWN0IGV2ZW50OiB7dGFyZ2V0OiAnVGhlIG5ldyB2YWx1ZSd9LFxyXG4gICAgICAgICAgICAgICAgdGhlIG5ldyB2YWx1ZSBpcyBkaXJlY3RseSBwYXNzZWQgdG8gdGhlIG9uQ2hhbmdlIGZ1bmN0aW9uICdUaGUgbmV3IFZhbHVlJy5cclxuICAgICAgICAgICAgICAgIERvbid0IGZvcmdldCB0aGF0IGluIHlvdXIgY29kZSB5b3UgaGF2ZSB0byBjaGFuZ2UgdGhlIHdheSB5b3UgcmVhZCB0aGUgbmV3IHZhbHVlIGFuZCB5b3UgaGF2ZSB0byB1cGRhdGUgdGhlIHN0YXRlIG9mIHRoZSBjb21wb25lbnQgd2l0aFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IG51bGwsIHZhbHVlOiBuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2UobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogbnVsbCwgdmFsdWU6IG5ld1ZhbHVlfSk7XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gdmFsdWVCZWhhdmlvdXJNaXhpbjtcclxuIl19