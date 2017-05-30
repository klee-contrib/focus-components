'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var i18nBehaviour = require('../../i18n/mixin');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

var _require = require('lodash/utility'),
    uniqueId = _require.uniqueId;

var InputRadio = require('../../input/radio').component;

var selectRadioMixin = {
    mixins: [i18nBehaviour, mdlBehaviour],
    /**
    * Tag name.
    */
    displayName: 'SelectRadio',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            values: [],
            valueKey: 'code',
            labelKey: 'label',
            disabled: false
        };
    },


    /** @inheritdoc */
    propTypes: {
        values: (0, _types2.default)('array'),
        value: (0, _types2.default)(['number', 'string', 'array']),
        valueKey: (0, _types2.default)('string'),
        labelKey: (0, _types2.default)('string'),
        onChange: (0, _types2.default)('func'),
        disabled: (0, _types2.default)('bool')
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            uniqueName: uniqueId('options_'),
            value: this.props.value
        };
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'select-radio\' component from FocusComponents.common is deprecated, please use FocusComponents.components.select.SelectRadio');
    },


    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value
        });
    },


    /**
     * Get the value from the select in the DOM.
     * @return {string, number} selected value
     */
    getValue: function getValue() {
        return this.state.value;
    },


    /**
    * handle click on radio
    * @param {object} event - the click event
    */
    _handleRadioChange: function _handleRadioChange(newValue) {
        var onChange = this.props.onChange;

        if (onChange) {
            onChange(newValue);
            return;
        }
        //Set the state then call the change handler.
        this.setState({ value: newValue });
    },

    /**
     * Closure to capture key and radio status.
     * @param  {string} key the key of radio
     * @return {func} status closure
     */
    _getRadioChangeHandler: function _getRadioChangeHandler(key) {
        var _this = this;

        return function () {
            _this._handleRadioChange(key);
        };
    },

    /**
    * Render radio for each values
    * @return {XML} the different radio values
    */
    renderSelectRadios: function renderSelectRadios() {
        var _this2 = this;

        var uniqueName = this.state.uniqueName;

        return this.props.values.map(function (val, idx) {
            var value = val[_this2.props.valueKey];
            var label = val[_this2.props.labelKey];
            var disabled = _this2.props.disabled;
            var isChecked = value === _this2.state.value;
            return React.createElement(InputRadio, { key: idx, label: _this2.i18n(label), name: uniqueName, onChange: _this2._getRadioChangeHandler(value), value: isChecked, disabled: disabled });
        });
    },

    /** @inheritdoc */
    render: function render() {
        var error = this.props.error;

        return React.createElement(
            'div',
            { 'data-focus': 'select-radio', 'data-valid': !error },
            this.renderSelectRadios(),
            error && React.createElement(
                'div',
                { className: 'label-error', ref: 'error' },
                error
            )
        );
    }
};

module.exports = (0, _builder2.default)(selectRadioMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpMThuQmVoYXZpb3VyIiwibWRsQmVoYXZpb3VyIiwidW5pcXVlSWQiLCJJbnB1dFJhZGlvIiwiY29tcG9uZW50Iiwic2VsZWN0UmFkaW9NaXhpbiIsIm1peGlucyIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwidmFsdWVzIiwidmFsdWVLZXkiLCJsYWJlbEtleSIsImRpc2FibGVkIiwicHJvcFR5cGVzIiwidmFsdWUiLCJvbkNoYW5nZSIsImdldEluaXRpYWxTdGF0ZSIsInVuaXF1ZU5hbWUiLCJwcm9wcyIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5ld1Byb3BzIiwic2V0U3RhdGUiLCJnZXRWYWx1ZSIsInN0YXRlIiwiX2hhbmRsZVJhZGlvQ2hhbmdlIiwibmV3VmFsdWUiLCJfZ2V0UmFkaW9DaGFuZ2VIYW5kbGVyIiwia2V5IiwicmVuZGVyU2VsZWN0UmFkaW9zIiwibWFwIiwidmFsIiwiaWR4IiwibGFiZWwiLCJpc0NoZWNrZWQiLCJpMThuIiwicmVuZGVyIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUE7Ozs7OztBQURBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOztBQUVBLElBQU1DLGdCQUFnQkQsUUFBUSxrQkFBUixDQUF0QjtBQUNBLElBQU1FLGVBQWVGLFFBQVEsMkJBQVIsQ0FBckI7O2VBQ21CQSxRQUFRLGdCQUFSLEM7SUFBWkcsUSxZQUFBQSxROztBQUNQLElBQU1DLGFBQWFKLFFBQVEsbUJBQVIsRUFBNkJLLFNBQWhEOztBQUVBLElBQU1DLG1CQUFtQjtBQUNyQkMsWUFBUSxDQUFDTixhQUFELEVBQWdCQyxZQUFoQixDQURhO0FBRXJCOzs7QUFHQU0saUJBQWEsYUFMUTs7QUFPckI7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LE9BQWpDO0FBQTBDQTtBQUExQztBQUZkLFNBREo7QUFNSDtBQXRHb0IsQ0FBekI7O0FBeUdBQyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRcEMsZ0JBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgaTE4bkJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2kxOG4vbWl4aW4nKTtcclxuY29uc3QgbWRsQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vbWRsLWJlaGF2aW91cicpO1xyXG5jb25zdCB7dW5pcXVlSWR9ID0gcmVxdWlyZSgnbG9kYXNoL3V0aWxpdHknKTtcclxuY29uc3QgSW5wdXRSYWRpbyA9IHJlcXVpcmUoJy4uLy4uL2lucHV0L3JhZGlvJykuY29tcG9uZW50O1xyXG5cclxuY29uc3Qgc2VsZWN0UmFkaW9NaXhpbiA9IHtcclxuICAgIG1peGluczogW2kxOG5CZWhhdmlvdXIsIG1kbEJlaGF2aW91cl0sXHJcbiAgICAvKipcclxuICAgICogVGFnIG5hbWUuXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdTZWxlY3RSYWRpbycsXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWVzOiBbXSxcclxuICAgICAgICAgICAgdmFsdWVLZXk6ICdjb2RlJyxcclxuICAgICAgICAgICAgbGFiZWxLZXk6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgdmFsdWVzOiB0eXBlcygnYXJyYXknKSxcclxuICAgICAgICB2YWx1ZTogdHlwZXMoWydudW1iZXInLCAnc3RyaW5nJywgJ2FycmF5J10pLFxyXG4gICAgICAgIHZhbHVlS2V5OiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGFiZWxLZXk6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBvbkNoYW5nZTogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBkaXNhYmxlZDogdHlwZXMoJ2Jvb2wnKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiB1bmlxdWVJZCgnb3B0aW9uc18nKSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgdjAuMTU6IHRoZSBcXCdzZWxlY3QtcmFkaW9cXCcgY29tcG9uZW50IGZyb20gRm9jdXNDb21wb25lbnRzLmNvbW1vbiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLnNlbGVjdC5TZWxlY3RSYWRpbycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXdQcm9wcy52YWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc2VsZWN0IGluIHRoZSBET00uXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcsIG51bWJlcn0gc2VsZWN0ZWQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogaGFuZGxlIGNsaWNrIG9uIHJhZGlvXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIHRoZSBjbGljayBldmVudFxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVSYWRpb0NoYW5nZShuZXdWYWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKG9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1NldCB0aGUgc3RhdGUgdGhlbiBjYWxsIHRoZSBjaGFuZ2UgaGFuZGxlci5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3VmFsdWV9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENsb3N1cmUgdG8gY2FwdHVyZSBrZXkgYW5kIHJhZGlvIHN0YXR1cy5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IHRoZSBrZXkgb2YgcmFkaW9cclxuICAgICAqIEByZXR1cm4ge2Z1bmN9IHN0YXR1cyBjbG9zdXJlXHJcbiAgICAgKi9cclxuICAgIF9nZXRSYWRpb0NoYW5nZUhhbmRsZXIoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlUmFkaW9DaGFuZ2Uoa2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgcmFkaW8gZm9yIGVhY2ggdmFsdWVzXHJcbiAgICAqIEByZXR1cm4ge1hNTH0gdGhlIGRpZmZlcmVudCByYWRpbyB2YWx1ZXNcclxuICAgICovXHJcbiAgICByZW5kZXJTZWxlY3RSYWRpb3MoKSB7XHJcbiAgICAgICAgY29uc3Qge3VuaXF1ZU5hbWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy52YWx1ZXMubWFwKCh2YWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbFt0aGlzLnByb3BzLnZhbHVlS2V5XTtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB2YWxbdGhpcy5wcm9wcy5sYWJlbEtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5wcm9wcy5kaXNhYmxlZDtcclxuICAgICAgICAgICAgY29uc3QgaXNDaGVja2VkID0gdmFsdWUgPT09IHRoaXMuc3RhdGUudmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8SW5wdXRSYWRpbyBrZXk9e2lkeH0gbGFiZWw9e3RoaXMuaTE4bihsYWJlbCl9IG5hbWU9e3VuaXF1ZU5hbWV9IG9uQ2hhbmdlPXt0aGlzLl9nZXRSYWRpb0NoYW5nZUhhbmRsZXIodmFsdWUpfSB2YWx1ZT17aXNDaGVja2VkfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QtcmFkaW8nIGRhdGEtdmFsaWQ9eyFlcnJvcn0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTZWxlY3RSYWRpb3MoKX1cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT0nbGFiZWwtZXJyb3InIHJlZj0nZXJyb3InPntlcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoc2VsZWN0UmFkaW9NaXhpbik7XHJcbiJdfQ==