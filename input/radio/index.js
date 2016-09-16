'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _grid = require('../../behaviours/grid');

var _grid2 = _interopRequireDefault(_grid);

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Radio = (_dec = (0, _material2.default)('inputMdl'), _dec(_class = (0, _grid2.default)(_class = function (_Component) {
    _inherits(Radio, _Component);

    function Radio() {
        var _temp, _this, _ret;

        _classCallCheck(this, Radio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            isChecked: (0, _isUndefined2.default)(_this.props.value) ? false : _this.props.value
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


    Radio.prototype._onChange = function _onChange() {
        var _this2 = this;

        this.setState({ isChecked: !this.state.isChecked }, function () {
            if (_this2.props.onChange) {
                _this2.props.onChange(_this2.state.isChecked);
            }
        });
    };

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
        var _props = this.props;
        var label = _props.label;
        var name = _props.name;

        var otherProps = _objectWithoutProperties(_props, ['label', 'name']);
        // we use inputProps to be able to display 'checked' property. it is required to be able to use MDL.


        var checkedProps = isChecked ? { checked: 'checked' } : {};

        return _react2.default.createElement(
            'label',
            { className: 'mdl-radio mdl-js-radio mdl-js-ripple-effect', 'data-focus': 'input-radio', ref: 'inputMdl' },
            _react2.default.createElement('input', _extends({ className: 'mdl-radio__button', name: name, onChange: this._onChange.bind(this), type: 'radio' }, checkedProps, otherProps, { ref: 'inputRadio' })),
            _react2.default.createElement(
                'span',
                { className: 'mdl-radio__label' },
                _i18next2.default.t(label)
            )
        );
    };

    return Radio;
}(_react.Component)) || _class) || _class);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlJhZGlvIiwic3RhdGUiLCJpc0NoZWNrZWQiLCJwcm9wcyIsInZhbHVlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5ld1Byb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJpbnB1dE1kbCIsInJlZnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJfb25DaGFuZ2UiLCJvbkNoYW5nZSIsImdldFZhbHVlIiwicmVuZGVyIiwibGFiZWwiLCJuYW1lIiwib3RoZXJQcm9wcyIsImNoZWNrZWRQcm9wcyIsImNoZWNrZWQiLCJ0IiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJmdW5jIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBSU1BLEssV0FGTCx3QkFBa0IsVUFBbEIsQztjQUVLQSxLOzthQUFBQSxLOzs7OEJBQUFBLEs7Ozs7OztnSkFZRkMsSyxHQUFRO0FBQ0pDLHVCQUFXLDJCQUFZLE1BQUtDLEtBQUwsQ0FBV0MsS0FBdkIsSUFBZ0MsS0FBaEMsR0FBd0MsTUFBS0QsS0FBTCxDQUFXQztBQUQxRCxTOzs7QUFaTkosUyxXQWdCRksseUIsc0NBQTBCQyxRLEVBQVU7QUFDaEMsYUFBS0MsUUFBTCxDQUFjLEVBQUNMLFdBQVdJLFNBQVNGLEtBQXJCLEVBQWQ7QUFDSCxLOztBQWxCQ0osUyxXQW9CRlEsa0IsaUNBQXFCO0FBQUEsWUFDVkMsUUFEVSxHQUNFLEtBQUtDLElBRFAsQ0FDVkQsUUFEVTtBQUFBLFlBRVZQLFNBRlUsR0FFRyxLQUFLRCxLQUZSLENBRVZDLFNBRlU7O0FBR2pCLFlBQUlPLFFBQUosRUFBYztBQUFBLGdCQUNIRSxTQURHLEdBQ1VGLFFBRFYsQ0FDSEUsU0FERzs7QUFFVixnQkFBSVQsY0FBYyxJQUFsQixFQUF3QlMsVUFBVUMsR0FBVixDQUFjLFlBQWQ7QUFDeEIsZ0JBQUlWLGNBQWMsS0FBbEIsRUFBeUJTLFVBQVVFLE1BQVYsQ0FBaUIsWUFBakI7QUFDNUI7QUFDSixLOztBQUVEOzs7Ozs7QUE5QkViLFMsV0FrQ0ZjLFMsd0JBQVk7QUFBQTs7QUFDUixhQUFLUCxRQUFMLENBQWMsRUFBQ0wsV0FBVyxDQUFDLEtBQUtELEtBQUwsQ0FBV0MsU0FBeEIsRUFBZCxFQUFrRCxZQUFNO0FBQ3BELGdCQUFHLE9BQUtDLEtBQUwsQ0FBV1ksUUFBZCxFQUF3QjtBQUNwQix1QkFBS1osS0FBTCxDQUFXWSxRQUFYLENBQW9CLE9BQUtkLEtBQUwsQ0FBV0MsU0FBL0I7QUFDSDtBQUNKLFNBSkQ7QUFLSCxLOztBQUVEOzs7Ozs7QUExQ0VGLFMsV0E4Q0ZnQixRLHVCQUFXO0FBQ1AsZUFBTyxLQUFLZixLQUFMLENBQVdDLFNBQWxCO0FBQ0gsSzs7QUFFRDs7Ozs7O0FBbERFRixTLFdBc0RGaUIsTSxxQkFBUztBQUFBLFlBQ0VmLFNBREYsR0FDZSxLQUFLRCxLQURwQixDQUNFQyxTQURGO0FBQUEscUJBRWdDLEtBQUtDLEtBRnJDO0FBQUEsWUFFRWUsS0FGRixVQUVFQSxLQUZGO0FBQUEsWUFFU0MsSUFGVCxVQUVTQSxJQUZUOztBQUFBLFlBRWtCQyxVQUZsQjtBQUdMOzs7QUFDQSxZQUFNQyxlQUFlbkIsWUFBWSxFQUFDb0IsU0FBUyxTQUFWLEVBQVosR0FBbUMsRUFBeEQ7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBTyxXQUFVLDZDQUFqQixFQUErRCxjQUFXLGFBQTFFLEVBQXdGLEtBQUksVUFBNUY7QUFDSSw4REFBTyxXQUFVLG1CQUFqQixFQUFxQyxNQUFNSCxJQUEzQyxFQUFpRCxVQUFZLEtBQUtMLFNBQWpCLE1BQVksSUFBWixDQUFqRCxFQUE2RSxNQUFLLE9BQWxGLElBQThGTyxZQUE5RixFQUFnSEQsVUFBaEgsSUFBNEgsS0FBSSxZQUFoSSxJQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFNLFdBQVUsa0JBQWhCO0FBQW9DLGtDQUFRRyxDQUFSLENBQVVMLEtBQVY7QUFBcEM7QUFGSixTQURKO0FBTUgsSzs7V0FsRUNsQixLOztBQUFBQSxLLENBQ0t3QixZLEdBQWU7QUFDbEJwQixXQUFPO0FBRFcsQztBQURwQkosSyxDQUtLeUIsUyxHQUFZO0FBQ2ZQLFdBQU8saUJBQVVRLE1BQVYsQ0FBaUJDLFVBRFQ7QUFFZlIsVUFBTSxpQkFBVU8sTUFGRDtBQUdmdEIsV0FBTyxpQkFBVXdCLElBSEY7QUFJZmIsY0FBVSxpQkFBVWM7QUFKTCxDOzs7QUFnRXZCN0IsTUFBTThCLFdBQU4sR0FBb0IsWUFBcEI7O2tCQUVlOUIsSyIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgR3JpZEJlaGF2aW91ciBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL2dyaWQnO1xyXG5pbXBvcnQgTWF0ZXJpYWxCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBpc1VuZGVmaW5lZCBmcm9tICdsb2Rhc2gvaXNVbmRlZmluZWQnO1xyXG5cclxuQE1hdGVyaWFsQmVoYXZpb3VyKCdpbnB1dE1kbCcpXHJcbkBHcmlkQmVoYXZpb3VyXHJcbmNsYXNzIFJhZGlvIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgdmFsdWU6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgaXNDaGVja2VkOiBpc1VuZGVmaW5lZCh0aGlzLnByb3BzLnZhbHVlKSA/IGZhbHNlIDogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNDaGVja2VkOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7aW5wdXRNZGx9ID0gdGhpcy5yZWZzO1xyXG4gICAgICAgIGNvbnN0IHtpc0NoZWNrZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoaW5wdXRNZGwpIHtcclxuICAgICAgICAgICAgY29uc3Qge2NsYXNzTGlzdH0gPSBpbnB1dE1kbDtcclxuICAgICAgICAgICAgaWYgKGlzQ2hlY2tlZCA9PT0gdHJ1ZSkgY2xhc3NMaXN0LmFkZCgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICBpZiAoaXNDaGVja2VkID09PSBmYWxzZSkgY2xhc3NMaXN0LnJlbW92ZSgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRXhlY3V0ZWQgYWN0aW9ucyBvbiBjaGFuZ2UgZXZlbnQuXHJcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxyXG4gICAgKi9cclxuICAgIF9vbkNoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0NoZWNrZWQ6ICF0aGlzLnN0YXRlLmlzQ2hlY2tlZH0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLmlzQ2hlY2tlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiAgdGhlIERPTS5cclxuICAgICogQHJldHVybnMgVGhlIERPTSBub2RlIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzQ2hlY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBDaGVja2JveCBIVE1MLlxyXG4gICAgKiBAcmV0dXJuIHtWaXJ0dWFsRE9NfSAtIFRoZSB2aXJ0dWFsIERPTSBvZiB0aGUgY2hlY2tib3guXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0NoZWNrZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIG5hbWUsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyB3ZSB1c2UgaW5wdXRQcm9wcyB0byBiZSBhYmxlIHRvIGRpc3BsYXkgJ2NoZWNrZWQnIHByb3BlcnR5LiBpdCBpcyByZXF1aXJlZCB0byBiZSBhYmxlIHRvIHVzZSBNREwuXHJcbiAgICAgICAgY29uc3QgY2hlY2tlZFByb3BzID0gaXNDaGVja2VkID8ge2NoZWNrZWQ6ICdjaGVja2VkJ30gOiB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXJhZGlvIG1kbC1qcy1yYWRpbyBtZGwtanMtcmlwcGxlLWVmZmVjdCcgZGF0YS1mb2N1cz1cImlucHV0LXJhZGlvXCIgcmVmPSdpbnB1dE1kbCc+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdtZGwtcmFkaW9fX2J1dHRvbicgbmFtZT17bmFtZX0gb25DaGFuZ2U9ezo6dGhpcy5fb25DaGFuZ2V9IHR5cGU9J3JhZGlvJyB7Li4uY2hlY2tlZFByb3BzfSB7Li4ub3RoZXJQcm9wc30gcmVmPSdpbnB1dFJhZGlvJy8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J21kbC1yYWRpb19fbGFiZWwnPntpMThuZXh0LnQobGFiZWwpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SYWRpby5kaXNwbGF5TmFtZSA9ICdJbnB1dFJhZGlvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvO1xyXG4iXX0=