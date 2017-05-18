'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _translation = require('../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _collection = require('lodash/collection');

var _utility = require('lodash/utility');

var _string = require('lodash/string');

var _buttonHelp = require('../button-help');

var _buttonHelp2 = _interopRequireDefault(_buttonHelp);

var _xor = require('lodash/array/xor');

var _xor2 = _interopRequireDefault(_xor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultProps = {
    actionsPosition: 'top'
};

var propTypes = {
    actions: _react.PropTypes.func,
    actionsPosition: _react.PropTypes.oneOf(['both', 'bottom', 'top']).isRequired,
    title: _react.PropTypes.string,
    showHelp: _react.PropTypes.bool,
    blockName: _react.PropTypes.string
};

/**
* Panel.
*/

var Panel = (0, _translation2.default)(_class = function (_Component) {
    _inherits(Panel, _Component);

    function Panel(props) {
        _classCallCheck(this, Panel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var state = {
            spyId: (0, _utility.uniqueId)('panel_')
        };
        _this.state = state;
        return _this;
    }

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */


    Panel.prototype.render = function render() {
        var _props = this.props,
            actions = _props.actions,
            actionsPosition = _props.actionsPosition,
            children = _props.children,
            title = _props.title,
            showHelp = _props.showHelp,
            blockName = _props.blockName,
            otherProps = _objectWithoutProperties(_props, ['actions', 'actionsPosition', 'children', 'title', 'showHelp', 'blockName']);

        var spyId = this.state.spyId;

        var shouldDisplayActionsTop = actions && (0, _collection.includes)(['both', 'top'], actionsPosition);
        var shouldDisplayActionsBottom = actions && (0, _collection.includes)(['both', 'bottom'], actionsPosition);
        return _react2.default.createElement(
            'div',
            _extends({ className: 'mdl-card mdl-card--border mdl-shadow--4dp', 'data-spy': spyId, 'data-focus': 'panel' }, otherProps),
            _react2.default.createElement(
                'div',
                { className: 'mdl-card__title mdl-card--border', 'data-focus': 'panel-title' },
                title && _react2.default.createElement(
                    'h3',
                    { 'data-spy-title': true },
                    this.i18n(title)
                ),
                shouldDisplayActionsTop && _react2.default.createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                ),
                showHelp && _react2.default.createElement(_buttonHelp2.default, { blockName: blockName || (0, _string.snakeCase)(this.i18n(title)).split('_')[0] })
            ),
            _react2.default.createElement(
                'div',
                { className: 'mdl-card__supporting-text', 'data-focus': 'panel-content' },
                children
            ),
            shouldDisplayActionsBottom && _react2.default.createElement(
                'div',
                { className: 'mdl-card__actions mdl-card--border', 'data-focus': 'panel-actions' },
                _react2.default.createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                )
            )
        );
    };

    return Panel;
}(_react.Component)) || _class;

//Static props.


Panel.displayName = 'Panel';
Panel.defaultProps = defaultProps;
Panel.propTypes = propTypes;

exports.default = Panel;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJhY3Rpb25zUG9zaXRpb24iLCJwcm9wVHlwZXMiLCJhY3Rpb25zIiwiZnVuYyIsIm9uZU9mIiwiaXNSZXF1aXJlZCIsInRpdGxlIiwic3RyaW5nIiwic2hvd0hlbHAiLCJib29sIiwiYmxvY2tOYW1lIiwiUGFuZWwiLCJwcm9wcyIsInN0YXRlIiwic3B5SWQiLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm90aGVyUHJvcHMiLCJzaG91bGREaXNwbGF5QWN0aW9uc1RvcCIsInNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tIiwiaTE4biIsInNwbGl0IiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWU7QUFDakJDLHFCQUFpQjtBQURBLENBQXJCOztBQUlBLElBQU1DLFlBQVk7QUFDZEMsYUFBUyxpQkFBVUMsSUFETDtBQUVkSCxxQkFBaUIsaUJBQVVJLEtBQVYsQ0FBZ0IsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixLQUFuQixDQUFoQixFQUEyQ0MsVUFGOUM7QUFHZEMsV0FBTyxpQkFBVUMsTUFISDtBQUlkQyxjQUFVLGlCQUFVQyxJQUpOO0FBS2RDLGVBQVcsaUJBQVVIO0FBTFAsQ0FBbEI7O0FBUUE7Ozs7SUFJTUksSzs7O0FBQ0YsbUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxREFDZixzQkFBTUEsS0FBTixDQURlOztBQUVmLFlBQU1DLFFBQVE7QUFDVkMsbUJBQU8sdUJBQVMsUUFBVDtBQURHLFNBQWQ7QUFHQSxjQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFMZTtBQU1sQjs7QUFFRDs7Ozs7O29CQUlBRSxNLHFCQUFTO0FBQUEscUJBQ21GLEtBQUtILEtBRHhGO0FBQUEsWUFDRVYsT0FERixVQUNFQSxPQURGO0FBQUEsWUFDV0YsZUFEWCxVQUNXQSxlQURYO0FBQUEsWUFDNEJnQixRQUQ1QixVQUM0QkEsUUFENUI7QUFBQSxZQUNzQ1YsS0FEdEMsVUFDc0NBLEtBRHRDO0FBQUEsWUFDNkNFLFFBRDdDLFVBQzZDQSxRQUQ3QztBQUFBLFlBQ3VERSxTQUR2RCxVQUN1REEsU0FEdkQ7QUFBQSxZQUNxRU8sVUFEckU7O0FBQUEsWUFFRUgsS0FGRixHQUVXLEtBQUtELEtBRmhCLENBRUVDLEtBRkY7O0FBR0wsWUFBTUksMEJBQTBCaEIsV0FBVywwQkFBUyxDQUFDLE1BQUQsRUFBUyxLQUFULENBQVQsRUFBMEJGLGVBQTFCLENBQTNDO0FBQ0EsWUFBTW1CLDZCQUE2QmpCLFdBQVcsMEJBQVMsQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFULEVBQTZCRixlQUE3QixDQUE5QztBQUNBLGVBQ0k7QUFBQTtBQUFBLHVCQUFLLFdBQVUsMkNBQWYsRUFBMkQsWUFBVWMsS0FBckUsRUFBNEUsY0FBVyxPQUF2RixJQUFtR0csVUFBbkc7QUFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxrQ0FBZixFQUFrRCxjQUFXLGFBQTdEO0FBQ0tYLHlCQUNHO0FBQUE7QUFBQSxzQkFBSSxzQkFBSjtBQUFvQix5QkFBS2MsSUFBTCxDQUFVZCxLQUFWO0FBQXBCLGlCQUZSO0FBSUtZLDJDQUNHO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFNBQWY7QUFBMEJoQjtBQUExQixpQkFMUjtBQU9LTSw0QkFBWSxzREFBWSxXQUFXRSxhQUFhLHVCQUFVLEtBQUtVLElBQUwsQ0FBVWQsS0FBVixDQUFWLEVBQTRCZSxLQUE1QixDQUFrQyxHQUFsQyxFQUF1QyxDQUF2QyxDQUFwQztBQVBqQixhQURKO0FBVUk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsMkJBQWYsRUFBMkMsY0FBVyxlQUF0RDtBQUNLTDtBQURMLGFBVko7QUFhS0csMENBQ0c7QUFBQTtBQUFBLGtCQUFLLFdBQVUsb0NBQWYsRUFBb0QsY0FBVyxlQUEvRDtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFNBQWY7QUFBMEJqQjtBQUExQjtBQURKO0FBZFIsU0FESjtBQXFCSCxLOzs7OztBQUdMOzs7QUFDQVMsTUFBTVcsV0FBTixHQUFvQixPQUFwQjtBQUNBWCxNQUFNWixZQUFOLEdBQXFCQSxZQUFyQjtBQUNBWSxNQUFNVixTQUFOLEdBQWtCQSxTQUFsQjs7a0JBRWVVLEsiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQge2luY2x1ZGVzfSBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbic7XHJcbmltcG9ydCB7dW5pcXVlSWR9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IHtzbmFrZUNhc2V9IGZyb20gJ2xvZGFzaC9zdHJpbmcnO1xyXG5pbXBvcnQgQnV0dG9uSGVscCBmcm9tICcuLi9idXR0b24taGVscCc7XHJcbmltcG9ydCB4b3IgZnJvbSAnbG9kYXNoL2FycmF5L3hvcic7XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBhY3Rpb25zUG9zaXRpb246ICd0b3AnXHJcbn07XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBhY3Rpb25zOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGFjdGlvbnNQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnYm90aCcsICdib3R0b20nLCAndG9wJ10pLmlzUmVxdWlyZWQsXHJcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHNob3dIZWxwOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGJsb2NrTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxuLyoqXHJcbiogUGFuZWwuXHJcbiovXHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgc3B5SWQ6IHVuaXF1ZUlkKCdwYW5lbF8nKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGEgYmxvY2sgY29udGFpbmVyIGFuZCB0aGUgY2lsZCBjb250ZW50IG9mIHRoZSBibG9jay5cclxuICAgICogQHJldHVybiB7RE9NfSBSZWFjdCBET00gZWxlbWVudFxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7YWN0aW9ucywgYWN0aW9uc1Bvc2l0aW9uLCBjaGlsZHJlbiwgdGl0bGUsIHNob3dIZWxwLCBibG9ja05hbWUsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7c3B5SWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBzaG91bGREaXNwbGF5QWN0aW9uc1RvcCA9IGFjdGlvbnMgJiYgaW5jbHVkZXMoWydib3RoJywgJ3RvcCddLCBhY3Rpb25zUG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tID0gYWN0aW9ucyAmJiBpbmNsdWRlcyhbJ2JvdGgnLCAnYm90dG9tJ10sIGFjdGlvbnNQb3NpdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkIG1kbC1jYXJkLS1ib3JkZXIgbWRsLXNoYWRvdy0tNGRwJyBkYXRhLXNweT17c3B5SWR9IGRhdGEtZm9jdXM9J3BhbmVsJyB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNhcmRfX3RpdGxlIG1kbC1jYXJkLS1ib3JkZXInIGRhdGEtZm9jdXM9J3BhbmVsLXRpdGxlJz5cclxuICAgICAgICAgICAgICAgICAgICB7dGl0bGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGRhdGEtc3B5LXRpdGxlPnt0aGlzLmkxOG4odGl0bGUpfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG91bGREaXNwbGF5QWN0aW9uc1RvcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWN0aW9ucyc+e2FjdGlvbnMoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dIZWxwICYmIDxCdXR0b25IZWxwIGJsb2NrTmFtZT17YmxvY2tOYW1lIHx8IHNuYWtlQ2FzZSh0aGlzLmkxOG4odGl0bGUpKS5zcGxpdCgnXycpWzBdfSAvPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkX19zdXBwb3J0aW5nLXRleHQnIGRhdGEtZm9jdXM9J3BhbmVsLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge3Nob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkX19hY3Rpb25zIG1kbC1jYXJkLS1ib3JkZXInIGRhdGEtZm9jdXM9J3BhbmVsLWFjdGlvbnMnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWN0aW9ucyc+e2FjdGlvbnMoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcblBhbmVsLmRpc3BsYXlOYW1lID0gJ1BhbmVsJztcclxuUGFuZWwuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5QYW5lbC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYW5lbDtcclxuIl19