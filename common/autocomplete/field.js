'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Dependencies
var React = require('react');

var find = require('lodash/collection/find');

// Components

var Autocomplete = require('./awesomplete').component;

/**
 * Autocomplete for component
 * @type {Object}
 */
var AutocompleteFor = {
    /**
     * Default props
     * @return {Object} default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            AutocompleteComp: Autocomplete,
            pickList: [],
            value: ''
        };
    },

    /**
     * Props validation
     * @type {Object}
     */
    propTypes: {
        AutocompleteComp: (0, _types2.default)('func'),
        allowUnmatchedValue: (0, _types2.default)('bool'),
        codeResolver: (0, _types2.default)('func'),
        isEdit: (0, _types2.default)('bool'),
        onInputBlur: (0, _types2.default)('func'),
        pickList: (0, _types2.default)('array'),
        searcher: (0, _types2.default)('func'),
        selectionHandler: (0, _types2.default)('func'),
        value: (0, _types2.default)('string')
    },
    /**
     * Get initial state
     * @return {Object} initial state
     */
    getInitialState: function getInitialState() {
        var pickList = this.props.pickList;

        return { pickList: pickList };
    },

    /**
     * Component will mount, load the list
     */
    componentWillMount: function componentWillMount() {
        var _this = this;

        var _props = this.props,
            isEdit = _props.isEdit,
            value = _props.value,
            codeResolver = _props.codeResolver;

        if (!isEdit && value && codeResolver) {
            // Resolve the code if in consult
            codeResolver(value).then(function (resolvedCode) {
                return _this.setState({ value: resolvedCode });
            });
        } else {
            this._doLoad();
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var _this2 = this;

        var codeResolver = _ref.codeResolver,
            value = _ref.value;

        if (value !== this.props.value) {
            codeResolver(value).then(function (resolvedCode) {
                return _this2.setState({ value: resolvedCode });
            });
        }
    },

    /**
     * List loader
     * @param  {string} text='' input text to search from
     */
    _doLoad: function _doLoad() {
        var _this3 = this;

        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var searcher = this.props.searcher;

        if (searcher) {
            searcher(text).then(function (pickList) {
                return _this3.setState({ pickList: pickList });
            });
        }
    },

    /**
     * Get value of the field
     * @return {string} the code of the curren value
     */
    getValue: function getValue() {
        var autocomplete = this.refs.autocomplete;
        var _props2 = this.props,
            allowUnmatchedValue = _props2.allowUnmatchedValue,
            value = _props2.value;

        return autocomplete ? autocomplete.getValue() : allowUnmatchedValue ? this.state.value : value;
    },

    /**
     * Render the edit mode
     * @return {HTML} rendered element
     */
    _renderEdit: function _renderEdit() {
        var _props3 = this.props,
            AutocompleteComp = _props3.AutocompleteComp,
            allowUnmatchedValue = _props3.allowUnmatchedValue,
            codeResolver = _props3.codeResolver,
            onInputBlur = _props3.onInputBlur,
            selectionHandler = _props3.selectionHandler,
            code = _props3.value,
            InputAutoComplete = _props3.InputAutoComplete,
            defaultPickList = _props3.pickList,
            otherProps = _objectWithoutProperties(_props3, ['AutocompleteComp', 'allowUnmatchedValue', 'codeResolver', 'onInputBlur', 'selectionHandler', 'value', 'InputAutoComplete', 'pickList']);

        var pickList = this.state.pickList;

        return React.createElement(AutocompleteComp, _extends({
            InputAutoComplete: InputAutoComplete,
            allowUnmatchedValue: allowUnmatchedValue,
            code: code,
            codeResolver: codeResolver,
            inputChangeHandler: this._doLoad,
            onInputBlur: onInputBlur,
            pickList: pickList,
            ref: 'autocomplete',
            selectionHandler: selectionHandler
        }, otherProps));
    },

    /**
     * Render the consult mode
     * @return {HTML} rendered element
     */
    _renderConsult: function _renderConsult() {
        var value = this.state.value;
        var code = this.props.value;

        return React.createElement(
            'span',
            null,
            value ? value : code
        );
    },

    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var isEdit = this.props.isEdit;

        return false === isEdit ? this._renderConsult() : this._renderEdit();
    }
};

module.exports = (0, _builder2.default)(AutocompleteFor);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJmaW5kIiwiQXV0b2NvbXBsZXRlIiwiY29tcG9uZW50IiwiQXV0b2NvbXBsZXRlRm9yIiwiZ2V0RGVmYXVsdFByb3BzIiwiQXV0b2NvbXBsZXRlQ29tcCIsInBpY2tMaXN0IiwidmFsdWUiLCJwcm9wVHlwZXMiLCJhbGxvd1VubWF0Y2hlZFZhbHVlIiwiY29kZVJlc29sdmVyIiwiaXNFZGl0Iiwib25JbnB1dEJsdXIiLCJzZWFyY2hlciIsInNlbGVjdGlvbkhhbmRsZXIiLCJnZXRJbml0aWFsU3RhdGUiLCJwcm9wcyIsImNvbXBvbmVudFdpbGxNb3VudCIsInRoZW4iLCJzZXRTdGF0ZSIsInJlc29sdmVkQ29kZSIsIl9kb0xvYWQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwidGV4dCIsImdldFZhbHVlIiwiYXV0b2NvbXBsZXRlIiwicmVmcyIsInN0YXRlIiwiX3JlbmRlckVkaXQiLCJjb2RlIiwiSW5wdXRBdXRvQ29tcGxldGUiLCJkZWZhdWx0UGlja0xpc3QiLCJvdGhlclByb3BzIiwiX3JlbmRlckNvbnN1bHQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7QUFIQTtBQUNBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOztBQUdBLElBQU1DLE9BQU9ELFFBQVEsd0JBQVIsQ0FBYjs7QUFFQTs7QUFFQSxJQUFNRSxlQUFlRixRQUFRLGVBQVIsRUFBeUJHLFNBQTlDOztBQUVBOzs7O0FBSUEsSUFBTUMsa0JBQWtCO0FBQ3BCOzs7O0FBSUFDLG1CQUxvQiw2QkFLRjtBQUNkLGVBQU87QUFDSEMsOEJBQWtCSixZQURmO0FBRUhLLHNCQUFVLEVBRlA7QUFHSEMsbUJBQU87QUFISixTQUFQO0FBS0gsS0FYbUI7O0FBWXBCOzs7O0FBSUFDLGVBQVc7QUFDUEgsMEJBQWtCLHFC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QUEsWUFFSDFCLFFBRkcsR0FFUyxLQUFLcUIsS0FGZCxDQUVIckIsUUFGRzs7QUFHVixlQUNJLG9CQUFDLGdCQUFEO0FBQ0ksK0JBQW1Cd0IsaUJBRHZCO0FBRUksaUNBQXFCckIsbUJBRnpCO0FBR0ksa0JBQU1vQixJQUhWO0FBSUksMEJBQWNuQixZQUpsQjtBQUtJLGdDQUFvQixLQUFLVyxPQUw3QjtBQU1JLHlCQUFhVCxXQU5qQjtBQU9JLHNCQUFVTixRQVBkO0FBUUksaUJBQUksY0FSUjtBQVNJLDhCQUFrQlE7QUFUdEIsV0FVUWtCLFVBVlIsRUFESjtBQWNILEtBM0ZtQjs7QUE0RnBCOzs7O0FBSUFDLGtCQWhHb0IsNEJBZ0dIO0FBQUEsWUFDTjFCLEtBRE0sR0FDRyxLQUFLb0IsS0FEUixDQUNOcEIsS0FETTtBQUFBLFlBRUNzQixJQUZELEdBRVMsS0FBS2IsS0FGZCxDQUVOVCxLQUZNOztBQUdiLGVBQ0k7QUFBQTtBQUFBO0FBQU9BLG9CQUFRQSxLQUFSLEdBQWdCc0I7QUFBdkIsU0FESjtBQUdILEtBdEdtQjs7QUF1R3BCOzs7O0FBSUFLLFVBM0dvQixvQkEyR1g7QUFBQSxZQUNBdkIsTUFEQSxHQUNVLEtBQUtLLEtBRGYsQ0FDQUwsTUFEQTs7QUFFTCxlQUFPLFVBQVVBLE1BQVYsR0FBbUIsS0FBS3NCLGNBQUwsRUFBbkIsR0FBMkMsS0FBS0wsV0FBTCxFQUFsRDtBQUNIO0FBOUdtQixDQUF4Qjs7QUFpSEFPLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFqQyxlQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBmaW5kID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24vZmluZCcpO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuY29uc3QgQXV0b2NvbXBsZXRlID0gcmVxdWlyZSgnLi9hd2Vzb21wbGV0ZScpLmNvbXBvbmVudDtcclxuXHJcbi8qKlxyXG4gKiBBdXRvY29tcGxldGUgZm9yIGNvbXBvbmVudFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuY29uc3QgQXV0b2NvbXBsZXRlRm9yID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHByb3BzXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGRlZmF1bHQgcHJvcHNcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEF1dG9jb21wbGV0ZUNvbXA6IEF1dG9jb21wbGV0ZSxcclxuICAgICAgICAgICAgcGlja0xpc3Q6IFtdLFxyXG4gICAgICAgICAgICB2YWx1ZTogJydcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUHJvcHMgdmFsaWRhdGlvblxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgQXV0b2NvbXBsZXRlQ29tcDogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBhbGxvd1VubWF0Y2hlZFZhbHVlOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIGNvZGVSZXNvbHZlcjogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBpc0VkaXQ6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgb25JbnB1dEJsdXI6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgcGlja0xpc3Q6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIHNlYXJjaGVyOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIHNlbGVjdGlvbkhhbmRsZXI6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgdmFsdWU6IHR5cGVzKCdzdHJpbmcnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGluaXRpYWwgc3RhdGVcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5pdGlhbCBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IHtwaWNrTGlzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiB7cGlja0xpc3R9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50IHdpbGwgbW91bnQsIGxvYWQgdGhlIGxpc3RcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0VkaXQsIHZhbHVlLCBjb2RlUmVzb2x2ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIWlzRWRpdCAmJiB2YWx1ZSAmJiBjb2RlUmVzb2x2ZXIpIHsgLy8gUmVzb2x2ZSB0aGUgY29kZSBpZiBpbiBjb25zdWx0XHJcbiAgICAgICAgICAgIGNvZGVSZXNvbHZlcih2YWx1ZSkudGhlbihyZXNvbHZlZENvZGUgPT4gdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHJlc29sdmVkQ29kZX0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kb0xvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7Y29kZVJlc29sdmVyLCB2YWx1ZX0pIHtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICAgY29kZVJlc29sdmVyKHZhbHVlKS50aGVuKHJlc29sdmVkQ29kZSA9PiB0aGlzLnNldFN0YXRlKHt2YWx1ZTogcmVzb2x2ZWRDb2RlfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIExpc3QgbG9hZGVyXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRleHQ9JycgaW5wdXQgdGV4dCB0byBzZWFyY2ggZnJvbVxyXG4gICAgICovXHJcbiAgICBfZG9Mb2FkKHRleHQ9JycpIHtcclxuICAgICAgICBjb25zdCB7c2VhcmNoZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoc2VhcmNoZXIpIHtcclxuICAgICAgICAgICAgc2VhcmNoZXIodGV4dCkudGhlbihwaWNrTGlzdCA9PiB0aGlzLnNldFN0YXRlKHtwaWNrTGlzdH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdmFsdWUgb2YgdGhlIGZpZWxkXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBjb2RlIG9mIHRoZSBjdXJyZW4gdmFsdWVcclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgY29uc3Qge2F1dG9jb21wbGV0ZX0gPSB0aGlzLnJlZnM7XHJcbiAgICAgICAgY29uc3Qge2FsbG93VW5tYXRjaGVkVmFsdWUsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIGF1dG9jb21wbGV0ZSA/IGF1dG9jb21wbGV0ZS5nZXRWYWx1ZSgpIDogYWxsb3dVbm1hdGNoZWRWYWx1ZSA/IHRoaXMuc3RhdGUudmFsdWUgOiB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgZWRpdCBtb2RlXHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MfSByZW5kZXJlZCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJFZGl0KCkge1xyXG4gICAgICAgIGNvbnN0IHtBdXRvY29tcGxldGVDb21wLCBhbGxvd1VubWF0Y2hlZFZhbHVlLCBjb2RlUmVzb2x2ZXIsIG9uSW5wdXRCbHVyLCBzZWxlY3Rpb25IYW5kbGVyLCB2YWx1ZTogY29kZSwgSW5wdXRBdXRvQ29tcGxldGUsIHBpY2tMaXN0OiBkZWZhdWx0UGlja0xpc3QsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7cGlja0xpc3R9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b2NvbXBsZXRlQ29tcFxyXG4gICAgICAgICAgICAgICAgSW5wdXRBdXRvQ29tcGxldGU9e0lucHV0QXV0b0NvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgYWxsb3dVbm1hdGNoZWRWYWx1ZT17YWxsb3dVbm1hdGNoZWRWYWx1ZX1cclxuICAgICAgICAgICAgICAgIGNvZGU9e2NvZGV9XHJcbiAgICAgICAgICAgICAgICBjb2RlUmVzb2x2ZXI9e2NvZGVSZXNvbHZlcn1cclxuICAgICAgICAgICAgICAgIGlucHV0Q2hhbmdlSGFuZGxlcj17dGhpcy5fZG9Mb2FkfVxyXG4gICAgICAgICAgICAgICAgb25JbnB1dEJsdXI9e29uSW5wdXRCbHVyfVxyXG4gICAgICAgICAgICAgICAgcGlja0xpc3Q9e3BpY2tMaXN0fVxyXG4gICAgICAgICAgICAgICAgcmVmPSdhdXRvY29tcGxldGUnXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25IYW5kbGVyPXtzZWxlY3Rpb25IYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgey4uLm90aGVyUHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29uc3VsdCBtb2RlXHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MfSByZW5kZXJlZCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJDb25zdWx0KCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZTogY29kZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzcGFuPnt2YWx1ZSA/IHZhbHVlIDogY29kZX08L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQge2lzRWRpdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBmYWxzZSA9PT0gaXNFZGl0ID8gdGhpcy5fcmVuZGVyQ29uc3VsdCgpIDogdGhpcy5fcmVuZGVyRWRpdCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKEF1dG9jb21wbGV0ZUZvcik7XHJcbiJdfQ==