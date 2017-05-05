'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _history = require('focus-core/history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins

// Dependencies
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');

// Components

var Button = require('../action').component;

/**
* Mixin button.
* @type {Object}
*/
var buttonBackMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    /** inheritedDoc */
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: this component is deprecated, please use FocusComponents.components.Back');
    },
    render: function render() {
        return _react2.default.createElement(Button, {
            handleOnClick: function handleOnClick() {
                _history2.default.history.back();
            },
            icon: 'keyboard_backspace',
            label: this.i18n('button.back'),
            shape: null,
            type: 'button' });
    }
};

module.exports = (0, _builder2.default)(buttonBackMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpMThuTWl4aW4iLCJyZXF1aXJlIiwic3R5bGFibGVNaXhpbiIsIkJ1dHRvbiIsImNvbXBvbmVudCIsImJ1dHRvbkJhY2tNaXhpbiIsIm1peGlucyIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwicmVuZGVyIiwiaGlzdG9yeSIsImJhY2siLCJpMThuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUdBOzs7O0FBQ0E7Ozs7OztBQUVBOztBQUpBO0FBTUEsSUFBTUEsWUFBWUMsUUFBUSxrQkFBUixDQUFsQjtBQUNBLElBQU1DLGdCQUFnQkQsUUFBUSx5QkFBUixDQUF0Qjs7QUFFQTs7QUFFQSxJQUFNRSxTQUFTRixRQUFRLFdBQVIsRUFBcUJHLFNBQXBDOztBQUVBOzs7O0FBSUEsSUFBTUMsa0JBQWtCO0FBQ3BCO0FBQ0FDLFlBQVEsQ0FBQ04sU0FBRCxFQUFZRSxhQUFaLENBRlk7QUFHcEI7QUFDQUssc0JBSm9CLGdDQUlFO0FBQ2xCQyxnQkFBUUMsSUFBUixDQUFhLGlHQUFiO0FBQ0gsS0FObUI7QUFPcEJDLFVBUG9CLG9CQU9YO0FBQ0wsZUFDSSw4QkFBQyxNQUFEO0FBQ0ksMkJBQWUseUJBQU07QUFBQyxrQ0FBU0MsT0FBVCxDQUFpQkMsSUFBakI7QUFBd0IsYUFEbEQ7QUFFSSxrQkFBSyxvQkFGVDtBQUdJLG1CQUFPLEtBQUtDLElBQUwsQ0FBVSxhQUFWLENBSFg7QUFJSSxtQkFBTyxJQUpYO0FBS0ksa0JBQUssUUFMVCxHQURKO0FBUUg7QUFoQm1CLENBQXhCOztBQW1CQUMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUVYsZUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgaGlzdG9yaWMgZnJvbSAnZm9jdXMtY29yZS9oaXN0b3J5JztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuY29uc3QgaTE4bk1peGluID0gcmVxdWlyZSgnLi4vLi4vaTE4bi9taXhpbicpO1xyXG5jb25zdCBzdHlsYWJsZU1peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2FjdGlvbicpLmNvbXBvbmVudDtcclxuXHJcbi8qKlxyXG4qIE1peGluIGJ1dHRvbi5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCBidXR0b25CYWNrTWl4aW4gPSB7XHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICBtaXhpbnM6IFtpMThuTWl4aW4sIHN0eWxhYmxlTWl4aW5dLFxyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyB2MC4xNTogdGhpcyBjb21wb25lbnQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBGb2N1c0NvbXBvbmVudHMuY29tcG9uZW50cy5CYWNrJyk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgIGhhbmRsZU9uQ2xpY2s9eygpID0+IHtoaXN0b3JpYy5oaXN0b3J5LmJhY2soKX19XHJcbiAgICAgICAgICAgICAgICBpY29uPSdrZXlib2FyZF9iYWNrc3BhY2UnXHJcbiAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5pMThuKCdidXR0b24uYmFjaycpfVxyXG4gICAgICAgICAgICAgICAgc2hhcGU9e251bGx9XHJcbiAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihidXR0b25CYWNrTWl4aW4pO1xyXG4iXX0=