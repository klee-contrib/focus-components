'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

//web components


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _number = require('focus-core/definition/formatter/number');

var _number2 = _interopRequireDefault(_number);

var _button = require('../../../components/button');

var _button2 = _interopRequireDefault(_button);

var _column = require('../../../components/column');

var _column2 = _interopRequireDefault(_column);

var _grid = require('../../../components/grid');

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    canShowMore: _react.PropTypes.bool.isRequired,
    count: _react.PropTypes.number.isRequired,
    groupKey: _react.PropTypes.string.isRequired,
    showAllHandler: _react.PropTypes.func.isRequired,
    showMoreHandler: _react.PropTypes.func.isRequired
};

var defaultProps = {
    count: 0
};

var AdvancedSearchGroup = (0, _translation2.default)(_class = function (_Component) {
    _inherits(AdvancedSearchGroup, _Component);

    function AdvancedSearchGroup() {
        _classCallCheck(this, AdvancedSearchGroup);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    AdvancedSearchGroup.prototype.render = function render() {
        var _props = this.props,
            canShowMore = _props.canShowMore,
            count = _props.count,
            children = _props.children,
            groupKey = _props.groupKey,
            showAllHandler = _props.showAllHandler,
            showMoreHandler = _props.showMoreHandler;

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
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'group-container-actions' },
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'group-container-actions__left' },
                    canShowMore && _react2.default.createElement(_button2.default, { handleOnClick: showMoreHandler, label: this.i18n('search.show.more') })
                ),
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'group-container-actions__right' },
                    _react2.default.createElement(_button2.default, { shape: null, color: 'accent', handleOnClick: function handleOnClick() {
                            showAllHandler(groupKey);
                        }, label: this.i18n('search.show.all') })
                )
            )
        );
    };

    return AdvancedSearchGroup;
}(_react.Component)) || _class;

AdvancedSearchGroup.propTypes = propTypes;
AdvancedSearchGroup.defaultProps = defaultProps;
AdvancedSearchGroup.displayName = 'AdvancedSearchGroup';

exports.default = AdvancedSearchGroup;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjYW5TaG93TW9yZSIsImJvb2wiLCJpc1JlcXVpcmVkIiwiY291bnQiLCJudW1iZXIiLCJncm91cEtleSIsInN0cmluZyIsInNob3dBbGxIYW5kbGVyIiwiZnVuYyIsInNob3dNb3JlSGFuZGxlciIsImRlZmF1bHRQcm9wcyIsIkFkdmFuY2VkU2VhcmNoR3JvdXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiZm9ybWF0IiwiaTE4biIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBOzs7QUFKQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxpQkFBYSxpQkFBVUMsSUFBVixDQUFlQyxVQURkO0FBRWRDLFdBQU8saUJBQVVDLE1BQVYsQ0FBaUJGLFVBRlY7QUFHZEcsY0FBVSxpQkFBVUMsTUFBVixDQUFpQkosVUFIYjtBQUlkSyxvQkFBZ0IsaUJBQVVDLElBQVYsQ0FBZU4sVUFKakI7QUFLZE8scUJBQWlCLGlCQUFVRCxJQUFWLENBQWVOO0FBTGxCLENBQWxCOztBQVFBLElBQU1RLGVBQWU7QUFDakJQLFdBQU87QUFEVSxDQUFyQjs7SUFLTVEsbUI7Ozs7Ozs7OztrQ0FFRkMsTSxxQkFBUztBQUFBLHFCQUM2RSxLQUFLQyxLQURsRjtBQUFBLFlBQ0ViLFdBREYsVUFDRUEsV0FERjtBQUFBLFlBQ2VHLEtBRGYsVUFDZUEsS0FEZjtBQUFBLFlBQ3NCVyxRQUR0QixVQUNzQkEsUUFEdEI7QUFBQSxZQUNnQ1QsUUFEaEMsVUFDZ0NBLFFBRGhDO0FBQUEsWUFDMENFLGNBRDFDLFVBQzBDQSxjQUQxQztBQUFBLFlBQzBERSxlQUQxRCxVQUMwREEsZUFEMUQ7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGlCQUFoQjtBQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUFPSjtBQUFQLGlCQURKO0FBRUk7QUFBQTtBQUFBO0FBQU8scUNBQVVVLE1BQVYsQ0FBaUJaLEtBQWpCO0FBQVA7QUFGSixhQURKO0FBS0k7QUFBQTtBQUFBO0FBQUkscUJBQUthLElBQUwsQ0FBVSxxQkFBVjtBQUFKLGFBTEo7QUFNSTtBQUFBO0FBQUEsa0JBQUssY0FBVyx5QkFBaEI7QUFDS0Y7QUFETCxhQU5KO0FBU0k7QUFBQTtBQUFBLGtCQUFLLGNBQVcseUJBQWhCO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLGNBQVcsK0JBQWhCO0FBQ0tkLG1DQUNHLGtEQUFRLGVBQWVTLGVBQXZCLEVBQXdDLE9BQU8sS0FBS08sSUFBTCxDQUFVLGtCQUFWLENBQS9DO0FBRlIsaUJBREo7QUFNSTtBQUFBO0FBQUEsc0JBQUssY0FBVyxnQ0FBaEI7QUFDSSxzRUFBUSxPQUFPLElBQWYsRUFBcUIsT0FBTSxRQUEzQixFQUFvQyxlQUFlLHlCQUFNO0FBQUNULDJDQUFlRixRQUFmO0FBQTBCLHlCQUFwRixFQUFzRixPQUFPLEtBQUtXLElBQUwsQ0FBVSxpQkFBVixDQUE3RjtBQURKO0FBTko7QUFUSixTQURKO0FBc0JILEs7Ozs7O0FBR0xMLG9CQUFvQlosU0FBcEIsR0FBZ0NBLFNBQWhDO0FBQ0FZLG9CQUFvQkQsWUFBcEIsR0FBbUNBLFlBQW5DO0FBQ0FDLG9CQUFvQk0sV0FBcEIsR0FBa0MscUJBQWxDOztrQkFFZU4sbUIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgZm9ybWF0dGVyIGZyb20gJ2ZvY3VzLWNvcmUvZGVmaW5pdGlvbi9mb3JtYXR0ZXIvbnVtYmVyJztcclxuXHJcbi8vd2ViIGNvbXBvbmVudHNcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbic7XHJcbmltcG9ydCBDb2x1bW4gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2x1bW4nO1xyXG5pbXBvcnQgR3JpZCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2dyaWQnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY2FuU2hvd01vcmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBjb3VudDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgZ3JvdXBLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHNob3dBbGxIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgc2hvd01vcmVIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBjb3VudDogMFxyXG59O1xyXG5cclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIEFkdmFuY2VkU2VhcmNoR3JvdXAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y2FuU2hvd01vcmUsIGNvdW50LCBjaGlsZHJlbiwgZ3JvdXBLZXksIHNob3dBbGxIYW5kbGVyLCBzaG93TW9yZUhhbmRsZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2dyb3VwLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8aDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2dyb3VwS2V5fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Zm9ybWF0dGVyLmZvcm1hdChjb3VudCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLmkxOG4oJ3NlYXJjaC5tb3N0UmVsZXZhbnQnKX08L3A+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9XCJncm91cC1jb250YWluZXItcmVzdWx0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdncm91cC1jb250YWluZXItYWN0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdncm91cC1jb250YWluZXItYWN0aW9uc19fbGVmdCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjYW5TaG93TW9yZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXtzaG93TW9yZUhhbmRsZXJ9IGxhYmVsPXt0aGlzLmkxOG4oJ3NlYXJjaC5zaG93Lm1vcmUnKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nZ3JvdXAtY29udGFpbmVyLWFjdGlvbnNfX3JpZ2h0Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBzaGFwZT17bnVsbH0gY29sb3I9J2FjY2VudCcgaGFuZGxlT25DbGljaz17KCkgPT4ge3Nob3dBbGxIYW5kbGVyKGdyb3VwS2V5KTt9fSBsYWJlbD17dGhpcy5pMThuKCdzZWFyY2guc2hvdy5hbGwnKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5BZHZhbmNlZFNlYXJjaEdyb3VwLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuQWR2YW5jZWRTZWFyY2hHcm91cC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkFkdmFuY2VkU2VhcmNoR3JvdXAuZGlzcGxheU5hbWUgPSAnQWR2YW5jZWRTZWFyY2hHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZHZhbmNlZFNlYXJjaEdyb3VwO1xyXG4iXX0=