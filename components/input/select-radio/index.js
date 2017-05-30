'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _utility = require('lodash/utility');

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SelectRadio = (0, _translation2.default)(_class = function (_Component) {
    _inherits(SelectRadio, _Component);

    function SelectRadio() {
        var _temp, _this, _ret;

        _classCallCheck(this, SelectRadio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            uniqueName: (0, _utility.uniqueId)('options_'),
            value: _this.props.value
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    SelectRadio.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    };

    /**
     * Get the value from the select in the DOM.
     * @return {string, number} selected value
     */


    SelectRadio.prototype.getValue = function getValue() {
        return this.state.value;
    };

    /**
    * handle click on radio
    * @param {object} event - the click event
    */


    SelectRadio.prototype._handleRadioChange = function _handleRadioChange(newValue) {
        var onChange = this.props.onChange;

        if (onChange) {
            onChange(newValue);
            return;
        }
        //Set the state then call the change handler.
        this.setState({ value: newValue });
    };

    /**
     * Closure to capture key and radio status.
     * @param  {string} key the key of radio
     * @return {func} status closure
     */


    SelectRadio.prototype._getRadioChangeHandler = function _getRadioChangeHandler(key) {
        var _this2 = this;

        return function () {
            _this2._handleRadioChange(key);
        };
    };

    /**
    * Render radio for each values
    * @return {XML} the different radio values
    */


    SelectRadio.prototype.renderSelectRadios = function renderSelectRadios() {
        var _this3 = this;

        var uniqueName = this.state.uniqueName;

        return this.props.values.map(function (val, idx) {
            var value = val[_this3.props.valueKey];
            var label = val[_this3.props.labelKey];
            var disabled = _this3.props.disabled;
            var isChecked = value === _this3.state.value;
            return _react2.default.createElement(_radio2.default, { key: idx, label: _this3.i18n(label), name: uniqueName, onChange: _this3._getRadioChangeHandler(value), value: isChecked, disabled: disabled });
        });
    };

    SelectRadio.prototype.render = function render() {
        var _props = this.props,
            error = _props.error,
            style = _props.style;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'select-radio', 'data-valid': !error, style: style },
            this.renderSelectRadios(),
            error && _react2.default.createElement(
                'div',
                { className: 'label-error' },
                error
            )
        );
    };

    return SelectRadio;
}(_react.Component)) || _class;

SelectRadio.defaultProps = {
    values: [],
    valueKey: 'code',
    labelKey: 'label',
    disabled: false
};
SelectRadio.propTypes = {
    values: _react.PropTypes.array,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.array]),
    valueKey: _react.PropTypes.string,
    labelKey: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    disabled: _react.PropTypes.bool
};


SelectRadio.displayName = 'SelectRadio';

exports.default = SelectRadio;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJTZWxlY3RSYWRpbyIsInN0YXRlIiwidW5pcXVlTmFtZSIsInZhbHVlIiwicHJvcHMiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV3UHJvcHMiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwiX2hhbmRsZVJhZGlvQ2hhbmdlIiwibmV3VmFsdWUiLCJvbkNoYW5nZSIsIl9nZXRSYWRpb0NoYW5nZUhhbmRsZXIiLCJrZXkiLCJyZW5kZXJTZWxlY3RSYWRpb3MiLCJ2YWx1ZXMiLCJtYXAiLCJ2YWwiLCJpZHgiLCJ2YWx1ZUtleSIsImxhYmVsIiwibGFiZWxLZXkiLCJkaXNhYmxlZCIsImlzQ2hlY2tlZCIsImkxOG4iLCJyZW5kZXIiLCJlcnJvciIsInN0eWxlIiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiYXJyYXkiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwiYm9vbCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFHTUEsVzs7Ozs7Ozs7Ozs7O2dKQWlCRkMsSyxHQUFRO0FBQ0pDLHdCQUFZLHVCQUFTLFVBQVQsQ0FEUjtBQUVKQyxtQkFBTyxNQUFLQyxLQUFMLENBQVdEO0FBRmQsUzs7OzBCQUtSRSx5QixzQ0FBMEJDLFEsRUFBVTtBQUNoQyxhQUFLQyxRQUFMLENBQWMsRUFBRUosT0FBT0csU0FBU0gsS0FBbEIsRUFBZDtBQUNILEs7O0FBRUQ7Ozs7OzswQkFJQUssUSx1QkFBVztBQUNQLGVBQU8sS0FBS1AsS0FBTCxDQUFXRSxLQUFsQjtBQUNILEs7O0FBRUQ7Ozs7OzswQkFJQU0sa0IsK0JBQW1CQyxRLEVBQVU7QUFBQSxZQUNqQkMsUUFEaUIsR0FDSixLQUFLUCxLQURELENBQ2pCTyxRQURpQjs7QUFFekIsWUFBSUEsUUFBSixFQUFjO0FBQ1ZBLHFCQUFTRCxRQUFUO0FBQ0E7QUFDSDtBQUNEO0FBQ0EsYUFBS0gsUUFBTCxDQUFjLEVBQUVKLE9BQU9PLFFBQVQsRUFBZDtBQUNILEs7O0FBRUQ7Ozs7Ozs7MEJBS0FFLHNCLG1DQUF1QkMsRyxFQUFLO0FBQUE7O0FBQ3hCLGVBQU8sWUFBTTtBQUNULG1CQUFLSixrQkFBTCxDQUF3QkksR0FBeEI7QUFDSCxTQUZEO0FBR0gsSzs7QUFFRDs7Ozs7OzBCQUlBQyxrQixpQ0FBcUI7QUFBQTs7QUFBQSxZQUNUWixVQURTLEdBQ00sS0FBS0QsS0FEWCxDQUNUQyxVQURTOztBQUVqQixlQUFPLEtBQUtFLEtBQUwsQ0FBV1csTUFBWCxDQUFrQkMsR0FBbEIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDdkMsZ0JBQU1mLFFBQVFjLElBQUksT0FBS2IsS0FBTCxDQUFXZSxRQUFmLENBQWQ7QUFDQSxnQkFBTUMsUUFBUUgsSUFBSSxPQUFLYixLQUFMLENBQVdpQixRQUFmLENBQWQ7QUFDQSxnQkFBTUMsV0FBVyxPQUFLbEIsS0FBTCxDQUFXa0IsUUFBNUI7QUFDQSxnQkFBTUMsWUFBWXBCLFVBQVUsT0FBS0YsS0FBTCxDQUFXRSxLQUF2QztBQUNBLG1CQUNJLGlEQUFPLEtBQUtlLEdBQVosRUFBaUIsT0FBTyxPQUFLTSxJQUFMLENBQVVKLEtBQVYsQ0FBeEIsRUFBMEMsTUFBTWxCLFVBQWhELEVBQTRELFVBQVUsT0FBS1Usc0JBQUwsQ0FBNEJULEtBQTVCLENBQXRFLEVBQTBHLE9BQU9vQixTQUFqSCxFQUE0SCxVQUFVRCxRQUF0SSxHQURKO0FBR0gsU0FSTSxDQUFQO0FBU0gsSzs7MEJBRURHLE0scUJBQVM7QUFBQSxxQkFDb0IsS0FBS3JCLEtBRHpCO0FBQUEsWUFDR3NCLEtBREgsVUFDR0EsS0FESDtBQUFBLFlBQ1VDLEtBRFYsVUFDVUEsS0FEVjs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsY0FBaEIsRUFBK0IsY0FBWSxDQUFDRCxLQUE1QyxFQUFtRCxPQUFPQyxLQUExRDtBQUNLLGlCQUFLYixrQkFBTCxFQURMO0FBRUtZLHFCQUFTO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGFBQWY7QUFBOEJBO0FBQTlCO0FBRmQsU0FESjtBQU1ILEs7Ozs7O0FBcEZDMUIsVyxDQUNLNEIsWSxHQUFlO0FBQ2xCYixZQUFRLEVBRFU7QUFFbEJJLGNBQVUsTUFGUTtBQUdsQkUsY0FBVSxPQUhRO0FBSWxCQyxjQUFVO0FBSlEsQztBQURwQnRCLFcsQ0FRSzZCLFMsR0FBWTtBQUNmZCxZQUFRLGlCQUFVZSxLQURIO0FBRWYzQixXQUFPLGlCQUFVNEIsU0FBVixDQUFvQixDQUFDLGlCQUFVQyxNQUFYLEVBQW1CLGlCQUFVQyxNQUE3QixFQUFxQyxpQkFBVUgsS0FBL0MsQ0FBcEIsQ0FGUTtBQUdmWCxjQUFVLGlCQUFVYyxNQUhMO0FBSWZaLGNBQVUsaUJBQVVZLE1BSkw7QUFLZnRCLGNBQVUsaUJBQVV1QixJQUxMO0FBTWZaLGNBQVUsaUJBQVVhO0FBTkwsQzs7O0FBK0V2Qm5DLFlBQVlvQyxXQUFaLEdBQTBCLGFBQTFCOztrQkFFZXBDLFciLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmFkaW8gZnJvbSAnLi4vcmFkaW8nO1xyXG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5cclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIFNlbGVjdFJhZGlvIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgdmFsdWVzOiBbXSxcclxuICAgICAgICB2YWx1ZUtleTogJ2NvZGUnLFxyXG4gICAgICAgIGxhYmVsS2V5OiAnbGFiZWwnLFxyXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKSxcclxuICAgICAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBsYWJlbEtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIHVuaXF1ZU5hbWU6IHVuaXF1ZUlkKCdvcHRpb25zXycpLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IG5ld1Byb3BzLnZhbHVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3QgaW4gdGhlIERPTS5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZywgbnVtYmVyfSBzZWxlY3RlZCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogaGFuZGxlIGNsaWNrIG9uIHJhZGlvXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIHRoZSBjbGljayBldmVudFxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVSYWRpb0NoYW5nZShuZXdWYWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKG9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1NldCB0aGUgc3RhdGUgdGhlbiBjYWxsIHRoZSBjaGFuZ2UgaGFuZGxlci5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IG5ld1ZhbHVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc3VyZSB0byBjYXB0dXJlIGtleSBhbmQgcmFkaW8gc3RhdHVzLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgdGhlIGtleSBvZiByYWRpb1xyXG4gICAgICogQHJldHVybiB7ZnVuY30gc3RhdHVzIGNsb3N1cmVcclxuICAgICAqL1xyXG4gICAgX2dldFJhZGlvQ2hhbmdlSGFuZGxlcihrZXkpIHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVSYWRpb0NoYW5nZShrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciByYWRpbyBmb3IgZWFjaCB2YWx1ZXNcclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgZGlmZmVyZW50IHJhZGlvIHZhbHVlc1xyXG4gICAgKi9cclxuICAgIHJlbmRlclNlbGVjdFJhZGlvcygpIHtcclxuICAgICAgICBjb25zdCB7IHVuaXF1ZU5hbWUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsdWVzLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWxbdGhpcy5wcm9wcy52YWx1ZUtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdmFsW3RoaXMucHJvcHMubGFiZWxLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMucHJvcHMuZGlzYWJsZWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9IHZhbHVlID09PSB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFJhZGlvIGtleT17aWR4fSBsYWJlbD17dGhpcy5pMThuKGxhYmVsKX0gbmFtZT17dW5pcXVlTmFtZX0gb25DaGFuZ2U9e3RoaXMuX2dldFJhZGlvQ2hhbmdlSGFuZGxlcih2YWx1ZSl9IHZhbHVlPXtpc0NoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBlcnJvciwgc3R5bGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QtcmFkaW8nIGRhdGEtdmFsaWQ9eyFlcnJvcn0gc3R5bGU9e3N0eWxlfSA+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTZWxlY3RSYWRpb3MoKX1cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT0nbGFiZWwtZXJyb3InPntlcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblNlbGVjdFJhZGlvLmRpc3BsYXlOYW1lID0gJ1NlbGVjdFJhZGlvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdFJhZGlvO1xyXG4iXX0=