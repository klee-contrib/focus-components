'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } // Dependencies


var _require = require('lodash/utility'),
    uniqueId = _require.uniqueId;

var Title = function (_Component) {
    _inherits(Title, _Component);

    function Title() {
        var _temp, _this, _ret;

        _classCallCheck(this, Title);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            spyId: uniqueId('title_')
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Title.prototype.render = function render() {
        var spyId = this.state.spyId;
        var _props = this.props,
            id = _props.id,
            label = _props.label;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h3',
                { 'data-spy': spyId, id: id },
                label
            )
        );
    };

    return Title;
}(_react.Component);

Title.propTypes = {
    id: _react.PropTypes.string,
    label: _react.PropTypes.string
};
exports.default = Title;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidW5pcXVlSWQiLCJUaXRsZSIsInN0YXRlIiwic3B5SWQiLCJyZW5kZXIiLCJwcm9wcyIsImlkIiwibGFiZWwiLCJwcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OytlQUhBOzs7ZUFJbUJBLFFBQVEsZ0JBQVIsQztJQUFaQyxRLFlBQUFBLFE7O0lBR0RDLEs7Ozs7Ozs7Ozs7OztnSkFNRkMsSyxHQUFRO0FBQ0pDLG1CQUFPSCxTQUFTLFFBQVQ7QUFESCxTOzs7b0JBSVJJLE0scUJBQVM7QUFBQSxZQUNFRCxLQURGLEdBQ1csS0FBS0QsS0FEaEIsQ0FDRUMsS0FERjtBQUFBLHFCQUVlLEtBQUtFLEtBRnBCO0FBQUEsWUFFRUMsRUFGRixVQUVFQSxFQUZGO0FBQUEsWUFFTUMsS0FGTixVQUVNQSxLQUZOOztBQUdMLGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGtCQUFJLFlBQVVKLEtBQWQsRUFBcUIsSUFBSUcsRUFBekI7QUFBOEJDO0FBQTlCO0FBREosU0FESjtBQUtILEs7Ozs7O0FBbEJDTixLLENBQ0tPLFMsR0FBWTtBQUNmRixRQUFJLGlCQUFVRyxNQURDO0FBRWZGLFdBQU8saUJBQVVFO0FBRkYsQztrQkFvQlJSLEsiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IHt1bmlxdWVJZH0gPSByZXF1aXJlKCdsb2Rhc2gvdXRpbGl0eScpO1xyXG5cclxuXHJcbmNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmdcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgc3B5SWQ6IHVuaXF1ZUlkKCd0aXRsZV8nKVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3NweUlkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2lkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxoMyBkYXRhLXNweT17c3B5SWR9IGlkPXtpZH0+e2xhYmVsfTwvaDM+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpdGxlO1xyXG4iXX0=