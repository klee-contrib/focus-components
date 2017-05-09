'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired
};

var defaultProps = {
    value: false,
    disabled: false
};

var displayName = 'InputCheckBox';

var InputCheckBox = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
    _inherits(InputCheckBox, _Component);

    function InputCheckBox(props) {
        _classCallCheck(this, InputCheckBox);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.checkbox);
            return domElement.checked;
        };

        _this.handleOnChange = function (_ref) {
            var checked = _ref.target.checked;
            var onChange = _this.props.onChange;

            onChange(checked);
        };

        _this.handleOnChange = _this.handleOnChange.bind(_this);
        return _this;
    }

    InputCheckBox.prototype.componentDidUpdate = function componentDidUpdate() {
        var value = this.props.value;

        var method = value ? 'add' : 'remove';
        var node = _reactDom2.default.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    };

    InputCheckBox.prototype.render = function render() {
        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        var _props = this.props,
            label = _props.label,
            value = _props.value,
            disabled = _props.disabled;


        validInputProps.onChange = this.handleOnChange;
        var inputProps = _extends({}, validInputProps, { type: 'checkbox', disabled: disabled, checked: value, className: 'mdl-checkbox__input' });
        delete inputProps.value;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'input-checkbox-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', _extends({ ref: 'checkbox' }, inputProps)),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    this.i18n(label)
                )
            )
        );
    };

    return InputCheckBox;
}(_react.Component)) || _class) || _class);


InputCheckBox.propTypes = propTypes;
InputCheckBox.defaultProps = defaultProps;
InputCheckBox.displayName = displayName;

exports.default = InputCheckBox;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsImRpc2FibGVkIiwiYm9vbCIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImRlZmF1bHRQcm9wcyIsImRpc3BsYXlOYW1lIiwiSW5wdXRDaGVja0JveCIsInByb3BzIiwiZ2V0VmFsdWUiLCJkb21FbGVtZW50IiwiZmluZERPTU5vZGUiLCJyZWZzIiwiY2hlY2tib3giLCJjaGVja2VkIiwiaGFuZGxlT25DaGFuZ2UiLCJ0YXJnZXQiLCJiaW5kIiwiY29tcG9uZW50RGlkVXBkYXRlIiwibWV0aG9kIiwibm9kZSIsIm1kbEhvbGRlciIsImNsYXNzTGlzdCIsInJlbmRlciIsInZhbGlkSW5wdXRQcm9wcyIsImlucHV0UHJvcHMiLCJ0eXBlIiwiY2xhc3NOYW1lIiwiaTE4biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxNQURIO0FBRWRDLGNBQVUsaUJBQVVDLElBRk47QUFHZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlQyxVQUhYO0FBSWRDLFdBQU8saUJBQVVKLElBQVYsQ0FBZUc7QUFKUixDQUFsQjs7QUFPQSxJQUFNRSxlQUFlO0FBQ2pCRCxXQUFPLEtBRFU7QUFFakJMLGNBQVU7QUFGTyxDQUFyQjs7QUFLQSxJQUFNTyxjQUFjLGVBQXBCOztJQUlNQyxhLFdBREwsd0JBQVMsV0FBVCxDOzs7QUFFRywyQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHFEQUNmLHNCQUFNQSxLQUFOLENBRGU7O0FBQUEsY0FLbkJDLFFBTG1CLEdBS1IsWUFBTTtBQUNiLGdCQUFNQyxhQUFhLG1CQUFTQyxXQUFULENBQXFCLE1BQUtDLElBQUwsQ0FBVUMsUUFBL0IsQ0FBbkI7QUFDQSxtQkFBT0gsV0FBV0ksT0FBbEI7QUFDSCxTQVJrQjs7QUFBQSxjQW1CbkJDLGNBbkJtQixHQW1CRixnQkFBeUI7QUFBQSxnQkFBZEQsT0FBYyxRQUF2QkUsTUFBdUIsQ0FBZEYsT0FBYztBQUFBLGdCQUMvQmIsUUFEK0IsR0FDbkIsTUFBS08sS0FEYyxDQUMvQlAsUUFEK0I7O0FBRXRDQSxxQkFBU2EsT0FBVDtBQUNILFNBdEJrQjs7QUFFZixjQUFLQyxjQUFMLEdBQXNCLE1BQUtBLGNBQUwsQ0FBb0JFLElBQXBCLE9BQXRCO0FBRmU7QUFHbEI7OzRCQU9EQyxrQixpQ0FBcUI7QUFBQSxZQUNWZCxLQURVLEdBQ0QsS0FBS0ksS0FESixDQUNWSixLQURVOztBQUVqQixZQUFNZSxTQUFTZixRQUFRLEtBQVIsR0FBZ0IsUUFBL0I7QUFDQSxZQUFNZ0IsT0FBTyxtQkFBU1QsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVTLFNBQS9CLENBQWI7QUFDQSxZQUFJRCxJQUFKLEVBQVU7QUFDTkEsaUJBQUtFLFNBQUwsQ0FBZUgsTUFBZixFQUF1QixZQUF2QjtBQUNIO0FBQ0osSzs7NEJBT0RJLE0scUJBQVM7QUFDTCxZQUFNQyxrQkFBa0Isb0NBQVksS0FBS2hCLEtBQWpCLENBQXhCOztBQURLLHFCQUc0QixLQUFLQSxLQUhqQztBQUFBLFlBR0VYLEtBSEYsVUFHRUEsS0FIRjtBQUFBLFlBR1NPLEtBSFQsVUFHU0EsS0FIVDtBQUFBLFlBR2dCTCxRQUhoQixVQUdnQkEsUUFIaEI7OztBQUtMeUIsd0JBQWdCdkIsUUFBaEIsR0FBMkIsS0FBS2MsY0FBaEM7QUFDQSxZQUFNVSwwQkFBaUJELGVBQWpCLElBQWtDRSxNQUFNLFVBQXhDLEVBQW9EM0Isa0JBQXBELEVBQThEZSxTQUFTVixLQUF2RSxFQUE4RXVCLFdBQVcscUJBQXpGLEdBQU47QUFDQSxlQUFPRixXQUFXckIsS0FBbEI7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLDBCQUFoQjtBQUNJO0FBQUE7QUFBQSxrQkFBTyxXQUFXLG1EQUFsQixFQUF1RSxjQUFXLGdCQUFsRixFQUFtRyxLQUFJLFdBQXZHO0FBQ0ksa0VBQU8sS0FBSSxVQUFYLElBQTBCcUIsVUFBMUIsRUFESjtBQUVLNUIseUJBQVM7QUFBQTtBQUFBLHNCQUFNLFdBQVUscUJBQWhCO0FBQXVDLHlCQUFLK0IsSUFBTCxDQUFVL0IsS0FBVjtBQUF2QztBQUZkO0FBREosU0FESjtBQVFILEs7Ozs7OztBQUdMVSxjQUFjWCxTQUFkLEdBQTBCQSxTQUExQjtBQUNBVyxjQUFjRixZQUFkLEdBQTZCQSxZQUE3QjtBQUNBRSxjQUFjRCxXQUFkLEdBQTRCQSxXQUE1Qjs7a0JBRWVDLGEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBUcmFuc2xhdGlvbiBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IE1hdGVyaWFsIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHZhbHVlOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheU5hbWUgPSAnSW5wdXRDaGVja0JveCc7XHJcblxyXG5AVHJhbnNsYXRpb25cclxuQE1hdGVyaWFsKCdtZGxIb2xkZXInKVxyXG5jbGFzcyBJbnB1dENoZWNrQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9IFxyXG5cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY2hlY2tib3gpO1xyXG4gICAgICAgIHJldHVybiBkb21FbGVtZW50LmNoZWNrZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5tZGxIb2xkZXIpO1xyXG4gICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0W21ldGhvZF0oJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT25DaGFuZ2UgPSAoe3RhcmdldDoge2NoZWNrZWR9fSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIG9uQ2hhbmdlKGNoZWNrZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCB2YWx1ZSwgZGlzYWJsZWR9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5oYW5kbGVPbkNoYW5nZTtcclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gey4uLnZhbGlkSW5wdXRQcm9wcywgdHlwZTogJ2NoZWNrYm94JywgZGlzYWJsZWQsIGNoZWNrZWQ6IHZhbHVlLCBjbGFzc05hbWU6ICdtZGwtY2hlY2tib3hfX2lucHV0J307XHJcbiAgICAgICAgZGVsZXRlIGlucHV0UHJvcHMudmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0naW5wdXQtY2hlY2tib3gtY29udGFpbmVyJz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9eydtZGwtY2hlY2tib3ggbWRsLWpzLWNoZWNrYm94IG1kbC1qcy1yaXBwbGUtZWZmZWN0J30gZGF0YS1mb2N1cz0naW5wdXQtY2hlY2tib3gnIHJlZj0nbWRsSG9sZGVyJz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPSdjaGVja2JveCcgey4uLmlucHV0UHJvcHN9Lz5cclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWwgJiYgPHNwYW4gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2xhYmVsJz57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSW5wdXRDaGVja0JveC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcbklucHV0Q2hlY2tCb3guZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dENoZWNrQm94LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dENoZWNrQm94O1xyXG4iXX0=