'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _react.PropTypes.string,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired,
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string
};

var defaultProps = {
    value: false,
    disabled: false
};

var InputCheckBoxWithError = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
    _inherits(InputCheckBoxWithError, _Component);

    function InputCheckBoxWithError() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputCheckBoxWithError);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.checkbox);
            return domElement.checked;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    InputCheckBoxWithError.prototype.componentDidUpdate = function componentDidUpdate() {
        var value = this.props.value;

        var method = value ? 'add' : 'remove';
        var node = _reactDom2.default.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    };

    InputCheckBoxWithError.prototype.handleOnChange = function handleOnChange(_ref) {
        var checked = _ref.target.checked;
        var onChange = this.props.onChange;

        onChange(checked);
    };

    InputCheckBoxWithError.prototype.render = function render() {
        var _props = this.props,
            label = _props.label,
            value = _props.value,
            error = _props.error,
            disabled = _props.disabled;

        return _react2.default.createElement(
            'div',
            { 'data-error': !!error, 'data-focus': 'input-checkbox-with-error-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', { checked: value, className: 'mdl-checkbox__input', disabled: disabled, onChange: this.handleOnChange.bind(this), ref: 'checkbox', type: 'checkbox' }),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    this.i18n(label)
                ),
                error && _react2.default.createElement(
                    'span',
                    { className: 'input-checkbox__error' },
                    this.i18n(error)
                )
            )
        );
    };

    return InputCheckBoxWithError;
}(_react.Component)) || _class) || _class);


InputCheckBoxWithError.displayName = 'InputCheckBoxWithError';
InputCheckBoxWithError.propTypes = propTypes;
InputCheckBoxWithError.defaultProps = defaultProps;
exports.default = InputCheckBoxWithError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImJvb2wiLCJkaXNhYmxlZCIsImVycm9yIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRDaGVja0JveFdpdGhFcnJvciIsImdldFZhbHVlIiwiZG9tRWxlbWVudCIsImZpbmRET01Ob2RlIiwicmVmcyIsImNoZWNrYm94IiwiY2hlY2tlZCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByb3BzIiwibWV0aG9kIiwibm9kZSIsIm1kbEhvbGRlciIsImNsYXNzTGlzdCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0IiwicmVuZGVyIiwiaTE4biIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsTUFESDtBQUVkQyxjQUFVLGlCQUFVQyxJQUFWLENBQWVDLFVBRlg7QUFHZEMsV0FBTyxpQkFBVUMsSUFBVixDQUFlRixVQUhSO0FBSWRHLGNBQVUsaUJBQVVELElBSk47QUFLZEUsV0FBTyxpQkFBVVA7QUFMSCxDQUFsQjs7QUFRQSxJQUFNUSxlQUFlO0FBQ2pCSixXQUFPLEtBRFU7QUFFakJFLGNBQVU7QUFGTyxDQUFyQjs7SUFPTUcsc0IsV0FETCx3QkFBUyxXQUFULEM7Ozs7Ozs7Ozs7OztnSkFFR0MsUSxHQUFXLFlBQU07QUFDYixnQkFBTUMsYUFBYSxtQkFBU0MsV0FBVCxDQUFxQixNQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQW5CO0FBQ0EsbUJBQU9ILFdBQVdJLE9BQWxCO0FBQ0gsUzs7O3FDQUVEQyxrQixpQ0FBcUI7QUFBQSxZQUNWWixLQURVLEdBQ0QsS0FBS2EsS0FESixDQUNWYixLQURVOztBQUVqQixZQUFNYyxTQUFTZCxRQUFRLEtBQVIsR0FBZ0IsUUFBL0I7QUFDQSxZQUFNZSxPQUFPLG1CQUFTUCxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVU8sU0FBL0IsQ0FBYjtBQUNBLFlBQUlELElBQUosRUFBVTtBQUNOQSxpQkFBS0UsU0FBTCxDQUFlSCxNQUFmLEVBQXVCLFlBQXZCO0FBQ0g7QUFDSixLOztxQ0FFREksYyxpQ0FBb0M7QUFBQSxZQUFYUCxPQUFXLFFBQXBCUSxNQUFvQixDQUFYUixPQUFXO0FBQUEsWUFDekJkLFFBRHlCLEdBQ2IsS0FBS2dCLEtBRFEsQ0FDekJoQixRQUR5Qjs7QUFFaENBLGlCQUFTYyxPQUFUO0FBQ0gsSzs7cUNBRURTLE0scUJBQVM7QUFBQSxxQkFDbUMsS0FBS1AsS0FEeEM7QUFBQSxZQUNFbEIsS0FERixVQUNFQSxLQURGO0FBQUEsWUFDU0ssS0FEVCxVQUNTQSxLQURUO0FBQUEsWUFDZ0JHLEtBRGhCLFVBQ2dCQSxLQURoQjtBQUFBLFlBQ3VCRCxRQUR2QixVQUN1QkEsUUFEdkI7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFZLENBQUMsQ0FBQ0MsS0FBbkIsRUFBMEIsY0FBVyxxQ0FBckM7QUFDSTtBQUFBO0FBQUEsa0JBQU8sV0FBVyxtREFBbEIsRUFBdUUsY0FBVyxnQkFBbEYsRUFBbUcsS0FBSSxXQUF2RztBQUNJLHlEQUFPLFNBQVNILEtBQWhCLEVBQXVCLFdBQVUscUJBQWpDLEVBQXVELFVBQVVFLFFBQWpFLEVBQTJFLFVBQVksS0FBS2dCLGNBQWpCLE1BQVksSUFBWixDQUEzRSxFQUE0RyxLQUFJLFVBQWhILEVBQTJILE1BQUssVUFBaEksR0FESjtBQUVLdkIseUJBQVM7QUFBQTtBQUFBLHNCQUFNLFdBQVUscUJBQWhCO0FBQXVDLHlCQUFLMEIsSUFBTCxDQUFVMUIsS0FBVjtBQUF2QyxpQkFGZDtBQUdLUSx5QkFBUztBQUFBO0FBQUEsc0JBQU0sV0FBVSx1QkFBaEI7QUFBeUMseUJBQUtrQixJQUFMLENBQVVsQixLQUFWO0FBQXpDO0FBSGQ7QUFESixTQURKO0FBU0gsSzs7Ozs7O0FBR0xFLHVCQUF1QmlCLFdBQXZCLEdBQXFDLHdCQUFyQztBQUNBakIsdUJBQXVCWCxTQUF2QixHQUFtQ0EsU0FBbkM7QUFDQVcsdUJBQXVCRCxZQUF2QixHQUFzQ0EsWUFBdEM7a0JBQ2VDLHNCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBUcmFuc2xhdGlvbiBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IE1hdGVyaWFsIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHZhbHVlOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZVxyXG59O1xyXG5cclxuQFRyYW5zbGF0aW9uXHJcbkBNYXRlcmlhbCgnbWRsSG9sZGVyJylcclxuY2xhc3MgSW5wdXRDaGVja0JveFdpdGhFcnJvciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmNoZWNrYm94KTtcclxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5jaGVja2VkO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnO1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWRsSG9sZGVyKTtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdFttZXRob2RdKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU9uQ2hhbmdlKHt0YXJnZXQ6IHtjaGVja2VkfX0pIHtcclxuICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBvbkNoYW5nZShjaGVja2VkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCB2YWx1ZSwgZXJyb3IsIGRpc2FibGVkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWVycm9yPXshIWVycm9yfSBkYXRhLWZvY3VzPSdpbnB1dC1jaGVja2JveC13aXRoLWVycm9yLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXsnbWRsLWNoZWNrYm94IG1kbC1qcy1jaGVja2JveCBtZGwtanMtcmlwcGxlLWVmZmVjdCd9IGRhdGEtZm9jdXM9J2lucHV0LWNoZWNrYm94JyByZWY9J21kbEhvbGRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNoZWNrZWQ9e3ZhbHVlfSBjbGFzc05hbWU9J21kbC1jaGVja2JveF9faW5wdXQnIGRpc2FibGVkPXtkaXNhYmxlZH0gb25DaGFuZ2U9ezo6dGhpcy5oYW5kbGVPbkNoYW5nZX0gcmVmPSdjaGVja2JveCcgdHlwZT0nY2hlY2tib3gnLz5cclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWwgJiYgPHNwYW4gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2xhYmVsJz57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8c3BhbiBjbGFzc05hbWU9J2lucHV0LWNoZWNrYm94X19lcnJvcic+e3RoaXMuaTE4bihlcnJvcil9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbklucHV0Q2hlY2tCb3hXaXRoRXJyb3IuZGlzcGxheU5hbWUgPSAnSW5wdXRDaGVja0JveFdpdGhFcnJvcic7XHJcbklucHV0Q2hlY2tCb3hXaXRoRXJyb3IucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuZXhwb3J0IGRlZmF1bHQgSW5wdXRDaGVja0JveFdpdGhFcnJvcjtcclxuIl19