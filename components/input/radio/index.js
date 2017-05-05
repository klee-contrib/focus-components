'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _grid = require('../../../behaviours/grid');

var _grid2 = _interopRequireDefault(_grid);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

var _lang = require('lodash/lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Radio = (_dec = (0, _material2.default)('inputMdl'), (0, _translation2.default)(_class = _dec(_class = (0, _grid2.default)(_class = function (_Component) {
    _inherits(Radio, _Component);

    function Radio() {
        var _temp, _this, _ret;

        _classCallCheck(this, Radio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            isChecked: (0, _lang.isUndefined)(_this.props.value) ? false : _this.props.value
        }, _this._onChange = function () {
            _this.setState({ isChecked: !_this.state.isChecked }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.isChecked);
                }
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Radio.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.value });
    };

    Radio.prototype.componentDidUpdate = function componentDidUpdate() {
        var inputMdl = this.refs.inputMdl;
        var isChecked = this.state.isChecked;

        if (inputMdl) {
            var classList = inputMdl.classList;

            if (isChecked === true) classList.add('is-checked');
            if (isChecked === false) classList.remove('is-checked');
        }
    };

    /**
    * Executed actions on change event.
    * @param  {event} event
    */


    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    Radio.prototype.getValue = function getValue() {
        return this.state.isChecked;
    };

    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */


    Radio.prototype.render = function render() {
        var isChecked = this.state.isChecked;
        var label = this.props.label;

        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        validInputProps.onChange = this._onChange;
        validInputProps.checked = isChecked ? 'checked' : undefined;
        var inputProps = _extends({}, validInputProps);

        return _react2.default.createElement(
            'label',
            { className: 'mdl-radio mdl-js-radio mdl-js-ripple-effect', 'data-focus': 'input-radio', ref: 'inputMdl' },
            _react2.default.createElement('input', _extends({ className: 'mdl-radio__button', type: 'radio', ref: 'inputRadio' }, inputProps)),
            _react2.default.createElement(
                'span',
                { className: 'mdl-radio__label' },
                this.i18n(label)
            )
        );
    };

    return Radio;
}(_react.Component)) || _class) || _class) || _class);
Radio.defaultProps = {
    value: false
};
Radio.propTypes = {
    label: _react.PropTypes.string.isRequired,
    name: _react.PropTypes.string,
    value: _react.PropTypes.bool,
    onChange: _react.PropTypes.func
};


Radio.displayName = 'InputRadio';

exports.default = Radio;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSYWRpbyIsInN0YXRlIiwiaXNDaGVja2VkIiwicHJvcHMiLCJ2YWx1ZSIsIl9vbkNoYW5nZSIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV3UHJvcHMiLCJjb21wb25lbnREaWRVcGRhdGUiLCJpbnB1dE1kbCIsInJlZnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJnZXRWYWx1ZSIsInJlbmRlciIsImxhYmVsIiwidmFsaWRJbnB1dFByb3BzIiwiY2hlY2tlZCIsInVuZGVmaW5lZCIsImlucHV0UHJvcHMiLCJpMThuIiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm5hbWUiLCJib29sIiwiZnVuYyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFLTUEsSyxXQUZMLHdCQUFrQixVQUFsQixDOzs7Ozs7Ozs7Ozs7Z0pBY0dDLEssR0FBUTtBQUNKQyx1QkFBVyx1QkFBWSxNQUFLQyxLQUFMLENBQVdDLEtBQXZCLElBQWdDLEtBQWhDLEdBQXdDLE1BQUtELEtBQUwsQ0FBV0M7QUFEMUQsUyxRQXNCUkMsUyxHQUFZLFlBQU07QUFDZCxrQkFBS0MsUUFBTCxDQUFjLEVBQUNKLFdBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDLFNBQXhCLEVBQWQsRUFBa0QsWUFBTTtBQUNwRCxvQkFBSSxNQUFLQyxLQUFMLENBQVdJLFFBQWYsRUFBeUI7QUFDckIsMEJBQUtKLEtBQUwsQ0FBV0ksUUFBWCxDQUFvQixNQUFLTixLQUFMLENBQVdDLFNBQS9CO0FBQ0g7QUFDSixhQUpEO0FBS0gsUzs7O29CQXhCRE0seUIsc0NBQTBCQyxRLEVBQVU7QUFDaEMsYUFBS0gsUUFBTCxDQUFjLEVBQUNKLFdBQVdPLFNBQVNMLEtBQXJCLEVBQWQ7QUFDSCxLOztvQkFFRE0sa0IsaUNBQXFCO0FBQUEsWUFDVkMsUUFEVSxHQUNFLEtBQUtDLElBRFAsQ0FDVkQsUUFEVTtBQUFBLFlBRVZULFNBRlUsR0FFRyxLQUFLRCxLQUZSLENBRVZDLFNBRlU7O0FBR2pCLFlBQUlTLFFBQUosRUFBYztBQUFBLGdCQUNIRSxTQURHLEdBQ1VGLFFBRFYsQ0FDSEUsU0FERzs7QUFFVixnQkFBSVgsY0FBYyxJQUFsQixFQUF3QlcsVUFBVUMsR0FBVixDQUFjLFlBQWQ7QUFDeEIsZ0JBQUlaLGNBQWMsS0FBbEIsRUFBeUJXLFVBQVVFLE1BQVYsQ0FBaUIsWUFBakI7QUFDNUI7QUFDSixLOztBQUVEOzs7Ozs7QUFZQTs7OztvQkFJQUMsUSx1QkFBVztBQUNQLGVBQU8sS0FBS2YsS0FBTCxDQUFXQyxTQUFsQjtBQUNILEs7O0FBRUQ7Ozs7OztvQkFJQWUsTSxxQkFBUztBQUFBLFlBQ0VmLFNBREYsR0FDZSxLQUFLRCxLQURwQixDQUNFQyxTQURGO0FBQUEsWUFFRWdCLEtBRkYsR0FFVyxLQUFLZixLQUZoQixDQUVFZSxLQUZGOztBQUdMLFlBQU1DLGtCQUFrQixvQ0FBWSxLQUFLaEIsS0FBakIsQ0FBeEI7O0FBRUFnQix3QkFBZ0JaLFFBQWhCLEdBQTJCLEtBQUtGLFNBQWhDO0FBQ0FjLHdCQUFnQkMsT0FBaEIsR0FBMEJsQixZQUFZLFNBQVosR0FBd0JtQixTQUFsRDtBQUNBLFlBQU1DLDBCQUFpQkgsZUFBakIsQ0FBTjs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFPLFdBQVUsNkNBQWpCLEVBQStELGNBQVcsYUFBMUUsRUFBd0YsS0FBSSxVQUE1RjtBQUNJLDhEQUFPLFdBQVUsbUJBQWpCLEVBQXFDLE1BQUssT0FBMUMsRUFBa0QsS0FBSSxZQUF0RCxJQUF1RUcsVUFBdkUsRUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBTSxXQUFVLGtCQUFoQjtBQUFvQyxxQkFBS0MsSUFBTCxDQUFVTCxLQUFWO0FBQXBDO0FBRkosU0FESjtBQU1ILEs7Ozs7QUFyRUNsQixLLENBQ0t3QixZLEdBQWU7QUFDbEJwQixXQUFPO0FBRFcsQztBQURwQkosSyxDQUtLeUIsUyxHQUFZO0FBQ2ZQLFdBQU8saUJBQVVRLE1BQVYsQ0FBaUJDLFVBRFQ7QUFFZkMsVUFBTSxpQkFBVUYsTUFGRDtBQUdmdEIsV0FBTyxpQkFBVXlCLElBSEY7QUFJZnRCLGNBQVUsaUJBQVV1QjtBQUpMLEM7OztBQW1FdkI5QixNQUFNK0IsV0FBTixHQUFvQixZQUFwQjs7a0JBRWUvQixLIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUcmFuc2xhdGlvbiBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IEdyaWRCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9ncmlkJztcclxuaW1wb3J0IE1hdGVyaWFsQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuXHJcbkBUcmFuc2xhdGlvblxyXG5ATWF0ZXJpYWxCZWhhdmlvdXIoJ2lucHV0TWRsJylcclxuQEdyaWRCZWhhdmlvdXJcclxuY2xhc3MgUmFkaW8gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICB2YWx1ZTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBpc0NoZWNrZWQ6IGlzVW5kZWZpbmVkKHRoaXMucHJvcHMudmFsdWUpID8gZmFsc2UgOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0NoZWNrZWQ6IG5ld1Byb3BzLnZhbHVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dE1kbH0gPSB0aGlzLnJlZnM7XHJcbiAgICAgICAgY29uc3Qge2lzQ2hlY2tlZH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChpbnB1dE1kbCkge1xyXG4gICAgICAgICAgICBjb25zdCB7Y2xhc3NMaXN0fSA9IGlucHV0TWRsO1xyXG4gICAgICAgICAgICBpZiAoaXNDaGVja2VkID09PSB0cnVlKSBjbGFzc0xpc3QuYWRkKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIGlmIChpc0NoZWNrZWQgPT09IGZhbHNlKSBjbGFzc0xpc3QucmVtb3ZlKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBFeGVjdXRlZCBhY3Rpb25zIG9uIGNoYW5nZSBldmVudC5cclxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XHJcbiAgICAqL1xyXG4gICAgX29uQ2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzQ2hlY2tlZDogIXRoaXMuc3RhdGUuaXNDaGVja2VkfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLmlzQ2hlY2tlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiAgdGhlIERPTS5cclxuICAgICogQHJldHVybnMgVGhlIERPTSBub2RlIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzQ2hlY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBDaGVja2JveCBIVE1MLlxyXG4gICAgKiBAcmV0dXJuIHtWaXJ0dWFsRE9NfSAtIFRoZSB2aXJ0dWFsIERPTSBvZiB0aGUgY2hlY2tib3guXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0NoZWNrZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7bGFiZWx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5fb25DaGFuZ2U7XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLmNoZWNrZWQgPSBpc0NoZWNrZWQgPyAnY2hlY2tlZCcgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsuLi52YWxpZElucHV0UHJvcHN9O1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtcmFkaW8gbWRsLWpzLXJhZGlvIG1kbC1qcy1yaXBwbGUtZWZmZWN0JyBkYXRhLWZvY3VzPSdpbnB1dC1yYWRpbycgcmVmPSdpbnB1dE1kbCc+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdtZGwtcmFkaW9fX2J1dHRvbicgdHlwZT0ncmFkaW8nIHJlZj0naW5wdXRSYWRpbycgey4uLmlucHV0UHJvcHN9Lz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXJhZGlvX19sYWJlbCc+e3RoaXMuaTE4bihsYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJhZGlvLmRpc3BsYXlOYW1lID0gJ0lucHV0UmFkaW8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFkaW87XHJcbiJdfQ==