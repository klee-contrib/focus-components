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

var _lang = require('lodash/lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

        var _props = this.props,
            label = _props.label,
            name = _props.name,
            otherProps = _objectWithoutProperties(_props, ['label', 'name']);
        // we use inputProps to be able to display 'checked' property. it is required to be able to use MDL.


        var checkedProps = isChecked ? { checked: 'checked' } : {};

        return _react2.default.createElement(
            'label',
            { className: 'mdl-radio mdl-js-radio mdl-js-ripple-effect', 'data-focus': 'input-radio', ref: 'inputMdl' },
            _react2.default.createElement('input', _extends({ className: 'mdl-radio__button', name: name, onChange: this._onChange.bind(this), type: 'radio' }, checkedProps, otherProps, { ref: 'inputRadio' })),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSYWRpbyIsInN0YXRlIiwiaXNDaGVja2VkIiwicHJvcHMiLCJ2YWx1ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInNldFN0YXRlIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRNZGwiLCJyZWZzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiX29uQ2hhbmdlIiwib25DaGFuZ2UiLCJnZXRWYWx1ZSIsInJlbmRlciIsImxhYmVsIiwibmFtZSIsIm90aGVyUHJvcHMiLCJjaGVja2VkUHJvcHMiLCJjaGVja2VkIiwiaTE4biIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJib29sIiwiZnVuYyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFLTUEsSyxXQUZMLHdCQUFrQixVQUFsQixDOzs7Ozs7Ozs7Ozs7Z0pBY0dDLEssR0FBUTtBQUNKQyx1QkFBVyx1QkFBWSxNQUFLQyxLQUFMLENBQVdDLEtBQXZCLElBQWdDLEtBQWhDLEdBQXdDLE1BQUtELEtBQUwsQ0FBV0M7QUFEMUQsUzs7O29CQUlSQyx5QixzQ0FBMEJDLFEsRUFBVTtBQUNoQyxhQUFLQyxRQUFMLENBQWMsRUFBQ0wsV0FBV0ksU0FBU0YsS0FBckIsRUFBZDtBQUNILEs7O29CQUVESSxrQixpQ0FBcUI7QUFBQSxZQUNWQyxRQURVLEdBQ0UsS0FBS0MsSUFEUCxDQUNWRCxRQURVO0FBQUEsWUFFVlAsU0FGVSxHQUVHLEtBQUtELEtBRlIsQ0FFVkMsU0FGVTs7QUFHakIsWUFBSU8sUUFBSixFQUFjO0FBQUEsZ0JBQ0hFLFNBREcsR0FDVUYsUUFEVixDQUNIRSxTQURHOztBQUVWLGdCQUFJVCxjQUFjLElBQWxCLEVBQXdCUyxVQUFVQyxHQUFWLENBQWMsWUFBZDtBQUN4QixnQkFBSVYsY0FBYyxLQUFsQixFQUF5QlMsVUFBVUUsTUFBVixDQUFpQixZQUFqQjtBQUM1QjtBQUNKLEs7O0FBRUQ7Ozs7OztvQkFJQUMsUyx3QkFBWTtBQUFBOztBQUNSLGFBQUtQLFFBQUwsQ0FBYyxFQUFDTCxXQUFXLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxTQUF4QixFQUFkLEVBQWtELFlBQU07QUFDcEQsZ0JBQUcsT0FBS0MsS0FBTCxDQUFXWSxRQUFkLEVBQXdCO0FBQ3BCLHVCQUFLWixLQUFMLENBQVdZLFFBQVgsQ0FBb0IsT0FBS2QsS0FBTCxDQUFXQyxTQUEvQjtBQUNIO0FBQ0osU0FKRDtBQUtILEs7O0FBRUQ7Ozs7OztvQkFJQWMsUSx1QkFBVztBQUNQLGVBQU8sS0FBS2YsS0FBTCxDQUFXQyxTQUFsQjtBQUNILEs7O0FBRUQ7Ozs7OztvQkFJQWUsTSxxQkFBUztBQUFBLFlBQ0VmLFNBREYsR0FDZSxLQUFLRCxLQURwQixDQUNFQyxTQURGOztBQUFBLHFCQUVnQyxLQUFLQyxLQUZyQztBQUFBLFlBRUVlLEtBRkYsVUFFRUEsS0FGRjtBQUFBLFlBRVNDLElBRlQsVUFFU0EsSUFGVDtBQUFBLFlBRWtCQyxVQUZsQjtBQUdMOzs7QUFDQSxZQUFNQyxlQUFlbkIsWUFBWSxFQUFDb0IsU0FBUyxTQUFWLEVBQVosR0FBbUMsRUFBeEQ7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBTyxXQUFVLDZDQUFqQixFQUErRCxjQUFXLGFBQTFFLEVBQXdGLEtBQUksVUFBNUY7QUFDSSw4REFBTyxXQUFVLG1CQUFqQixFQUFxQyxNQUFNSCxJQUEzQyxFQUFpRCxVQUFZLEtBQUtMLFNBQWpCLE1BQVksSUFBWixDQUFqRCxFQUE2RSxNQUFLLE9BQWxGLElBQThGTyxZQUE5RixFQUFnSEQsVUFBaEgsSUFBNEgsS0FBSSxZQUFoSSxJQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFNLFdBQVUsa0JBQWhCO0FBQW9DLHFCQUFLRyxJQUFMLENBQVVMLEtBQVY7QUFBcEM7QUFGSixTQURKO0FBTUgsSzs7OztBQWxFQ2xCLEssQ0FDS3dCLFksR0FBZTtBQUNsQnBCLFdBQU87QUFEVyxDO0FBRHBCSixLLENBS0t5QixTLEdBQVk7QUFDZlAsV0FBTyxpQkFBVVEsTUFBVixDQUFpQkMsVUFEVDtBQUVmUixVQUFNLGlCQUFVTyxNQUZEO0FBR2Z0QixXQUFPLGlCQUFVd0IsSUFIRjtBQUlmYixjQUFVLGlCQUFVYztBQUpMLEM7OztBQWdFdkI3QixNQUFNOEIsV0FBTixHQUFvQixZQUFwQjs7a0JBRWU5QixLIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUcmFuc2xhdGlvbiBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IEdyaWRCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9ncmlkJztcclxuaW1wb3J0IE1hdGVyaWFsQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcblxyXG5AVHJhbnNsYXRpb25cclxuQE1hdGVyaWFsQmVoYXZpb3VyKCdpbnB1dE1kbCcpXHJcbkBHcmlkQmVoYXZpb3VyXHJcbmNsYXNzIFJhZGlvIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgdmFsdWU6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgaXNDaGVja2VkOiBpc1VuZGVmaW5lZCh0aGlzLnByb3BzLnZhbHVlKSA/IGZhbHNlIDogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNDaGVja2VkOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7aW5wdXRNZGx9ID0gdGhpcy5yZWZzO1xyXG4gICAgICAgIGNvbnN0IHtpc0NoZWNrZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoaW5wdXRNZGwpIHtcclxuICAgICAgICAgICAgY29uc3Qge2NsYXNzTGlzdH0gPSBpbnB1dE1kbDtcclxuICAgICAgICAgICAgaWYgKGlzQ2hlY2tlZCA9PT0gdHJ1ZSkgY2xhc3NMaXN0LmFkZCgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICBpZiAoaXNDaGVja2VkID09PSBmYWxzZSkgY2xhc3NMaXN0LnJlbW92ZSgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRXhlY3V0ZWQgYWN0aW9ucyBvbiBjaGFuZ2UgZXZlbnQuXHJcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxyXG4gICAgKi9cclxuICAgIF9vbkNoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0NoZWNrZWQ6ICF0aGlzLnN0YXRlLmlzQ2hlY2tlZH0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLmlzQ2hlY2tlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiAgdGhlIERPTS5cclxuICAgICogQHJldHVybnMgVGhlIERPTSBub2RlIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzQ2hlY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBDaGVja2JveCBIVE1MLlxyXG4gICAgKiBAcmV0dXJuIHtWaXJ0dWFsRE9NfSAtIFRoZSB2aXJ0dWFsIERPTSBvZiB0aGUgY2hlY2tib3guXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0NoZWNrZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIG5hbWUsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyB3ZSB1c2UgaW5wdXRQcm9wcyB0byBiZSBhYmxlIHRvIGRpc3BsYXkgJ2NoZWNrZWQnIHByb3BlcnR5LiBpdCBpcyByZXF1aXJlZCB0byBiZSBhYmxlIHRvIHVzZSBNREwuXHJcbiAgICAgICAgY29uc3QgY2hlY2tlZFByb3BzID0gaXNDaGVja2VkID8ge2NoZWNrZWQ6ICdjaGVja2VkJ30gOiB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXJhZGlvIG1kbC1qcy1yYWRpbyBtZGwtanMtcmlwcGxlLWVmZmVjdCcgZGF0YS1mb2N1cz1cImlucHV0LXJhZGlvXCIgcmVmPSdpbnB1dE1kbCc+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdtZGwtcmFkaW9fX2J1dHRvbicgbmFtZT17bmFtZX0gb25DaGFuZ2U9ezo6dGhpcy5fb25DaGFuZ2V9IHR5cGU9J3JhZGlvJyB7Li4uY2hlY2tlZFByb3BzfSB7Li4ub3RoZXJQcm9wc30gcmVmPSdpbnB1dFJhZGlvJy8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J21kbC1yYWRpb19fbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SYWRpby5kaXNwbGF5TmFtZSA9ICdJbnB1dFJhZGlvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhZGlvO1xyXG4iXX0=