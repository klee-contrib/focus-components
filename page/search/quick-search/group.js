'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class; // libraires


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _number = require('focus-core/definition/formatter/number');

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//web components

var propTypes = {
    count: _react.PropTypes.number.isRequired,
    groupKey: _react.PropTypes.string.isRequired
};

var defaultProps = {
    count: 0
};

var QuickSearchGroup = (0, _translation2.default)(_class = function (_Component) {
    _inherits(QuickSearchGroup, _Component);

    function QuickSearchGroup() {
        _classCallCheck(this, QuickSearchGroup);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    QuickSearchGroup.prototype.render = function render() {
        var _props = this.props,
            children = _props.children,
            count = _props.count,
            groupKey = _props.groupKey,
            showAllHandler = _props.showAllHandler;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'group-container' },
            _react2.default.createElement(
                'h3',
                null,
                _react2.default.createElement(
                    'span',
                    null,
                    groupKey
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    _number2.default.format(count)
                )
            ),
            _react2.default.createElement(
                'p',
                null,
                this.i18n('search.mostRelevant')
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'group-container-results' },
                children
            )
        );
    };

    return QuickSearchGroup;
}(_react.Component)) || _class;

QuickSearchGroup.propTypes = propTypes;
QuickSearchGroup.defaultProps = defaultProps;
QuickSearchGroup.displayName = 'QuickSearchGroup';

exports.default = QuickSearchGroup;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjb3VudCIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJncm91cEtleSIsInN0cmluZyIsImRlZmF1bHRQcm9wcyIsIlF1aWNrU2VhcmNoR3JvdXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwic2hvd0FsbEhhbmRsZXIiLCJmb3JtYXQiLCJpMThuIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztZQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxNQUFWLENBQWlCQyxVQURWO0FBRWRDLGNBQVUsaUJBQVVDLE1BQVYsQ0FBaUJGO0FBRmIsQ0FBbEI7O0FBS0EsSUFBTUcsZUFBZTtBQUNqQkwsV0FBTztBQURVLENBQXJCOztJQUtNTSxnQjs7Ozs7Ozs7OytCQUNGQyxNLHFCQUFTO0FBQUEscUJBQytDLEtBQUtDLEtBRHBEO0FBQUEsWUFDRUMsUUFERixVQUNFQSxRQURGO0FBQUEsWUFDWVQsS0FEWixVQUNZQSxLQURaO0FBQUEsWUFDbUJHLFFBRG5CLFVBQ21CQSxRQURuQjtBQUFBLFlBQzZCTyxjQUQ3QixVQUM2QkEsY0FEN0I7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGlCQUFoQjtBQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUFPUDtBQUFQLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQU8scUNBQVVRLE1BQVYsQ0FBaUJYLEtBQWpCO0FBQVA7QUFGSixhQURKO0FBS0k7QUFBQTtBQUFBO0FBQUkscUJBQUtZLElBQUwsQ0FBVSxxQkFBVjtBQUFKLGFBTEo7QUFNSTtBQUFBO0FBQUEsa0JBQUssY0FBVyx5QkFBaEI7QUFDS0g7QUFETDtBQU5KLFNBREo7QUFZSCxLOzs7OztBQUdMSCxpQkFBaUJQLFNBQWpCLEdBQTZCQSxTQUE3QjtBQUNBTyxpQkFBaUJELFlBQWpCLEdBQWdDQSxZQUFoQztBQUNBQyxpQkFBaUJPLFdBQWpCLEdBQStCLGtCQUEvQjs7a0JBRWVQLGdCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYnJhaXJlc1xyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBmb3JtYXR0ZXIgZnJvbSAnZm9jdXMtY29yZS9kZWZpbml0aW9uL2Zvcm1hdHRlci9udW1iZXInO1xyXG5cclxuLy93ZWIgY29tcG9uZW50c1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY291bnQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgIGdyb3VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGNvdW50OiAwXHJcbn07XHJcblxyXG5AVHJhbnNsYXRpb25cclxuY2xhc3MgUXVpY2tTZWFyY2hHcm91cCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2NoaWxkcmVuLCBjb3VudCwgZ3JvdXBLZXksIHNob3dBbGxIYW5kbGVyfSA9IHRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9XCJncm91cC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxoMz5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Z3JvdXBLZXl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXR0ZXIuZm9ybWF0KGNvdW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgPHA+e3RoaXMuaTE4bignc2VhcmNoLm1vc3RSZWxldmFudCcpfTwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz1cImdyb3VwLWNvbnRhaW5lci1yZXN1bHRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblF1aWNrU2VhcmNoR3JvdXAucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5RdWlja1NlYXJjaEdyb3VwLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuUXVpY2tTZWFyY2hHcm91cC5kaXNwbGF5TmFtZSA9ICdRdWlja1NlYXJjaEdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFF1aWNrU2VhcmNoR3JvdXA7XHJcbiJdfQ==