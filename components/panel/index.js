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
            (title || shouldDisplayActionsTop || showHelp) && _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJhY3Rpb25zUG9zaXRpb24iLCJwcm9wVHlwZXMiLCJhY3Rpb25zIiwiZnVuYyIsIm9uZU9mIiwiaXNSZXF1aXJlZCIsInRpdGxlIiwic3RyaW5nIiwic2hvd0hlbHAiLCJib29sIiwiYmxvY2tOYW1lIiwiUGFuZWwiLCJwcm9wcyIsInN0YXRlIiwic3B5SWQiLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm90aGVyUHJvcHMiLCJzaG91bGREaXNwbGF5QWN0aW9uc1RvcCIsInNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tIiwiaTE4biIsInNwbGl0IiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWU7QUFDakJDLHFCQUFpQjtBQURBLENBQXJCOztBQUlBLElBQU1DLFlBQVk7QUFDZEMsYUFBUyxpQkFBVUMsSUFETDtBQUVkSCxxQkFBaUIsaUJBQVVJLEtBQVYsQ0FBZ0IsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixLQUFuQixDQUFoQixFQUEyQ0MsVUFGOUM7QUFHZEMsV0FBTyxpQkFBVUMsTUFISDtBQUlkQyxjQUFVLGlCQUFVQyxJQUpOO0FBS2RDLGVBQVcsaUJBQVVIO0FBTFAsQ0FBbEI7O0FBUUE7Ozs7SUFJTUksSzs7O0FBQ0YsbUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxREFDZixzQkFBTUEsS0FBTixDQURlOztBQUVmLFlBQU1DLFFBQVE7QUFDVkMsbUJBQU8sdUJBQVMsUUFBVDtBQURHLFNBQWQ7QUFHQSxjQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFMZTtBQU1sQjs7QUFFRDs7Ozs7O29CQUlBRSxNLHFCQUFTO0FBQUEscUJBQ3FGLEtBQUtILEtBRDFGO0FBQUEsWUFDR1YsT0FESCxVQUNHQSxPQURIO0FBQUEsWUFDWUYsZUFEWixVQUNZQSxlQURaO0FBQUEsWUFDNkJnQixRQUQ3QixVQUM2QkEsUUFEN0I7QUFBQSxZQUN1Q1YsS0FEdkMsVUFDdUNBLEtBRHZDO0FBQUEsWUFDOENFLFFBRDlDLFVBQzhDQSxRQUQ5QztBQUFBLFlBQ3dERSxTQUR4RCxVQUN3REEsU0FEeEQ7QUFBQSxZQUNzRU8sVUFEdEU7O0FBQUEsWUFFR0gsS0FGSCxHQUVhLEtBQUtELEtBRmxCLENBRUdDLEtBRkg7O0FBR0wsWUFBTUksMEJBQTBCaEIsV0FBVywwQkFBUyxDQUFDLE1BQUQsRUFBUyxLQUFULENBQVQsRUFBMEJGLGVBQTFCLENBQTNDO0FBQ0EsWUFBTW1CLDZCQUE2QmpCLFdBQVcsMEJBQVMsQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFULEVBQTZCRixlQUE3QixDQUE5QztBQUNBLGVBQ0k7QUFBQTtBQUFBLHVCQUFLLFdBQVUsMkNBQWYsRUFBMkQsWUFBVWMsS0FBckUsRUFBNEUsY0FBVyxPQUF2RixJQUFtR0csVUFBbkc7QUFDSyxhQUFDWCxTQUFTWSx1QkFBVCxJQUFvQ1YsUUFBckMsS0FBa0Q7QUFBQTtBQUFBLGtCQUFLLFdBQVUsa0NBQWYsRUFBa0QsY0FBVyxhQUE3RDtBQUM5Q0YseUJBQ0c7QUFBQTtBQUFBLHNCQUFJLHNCQUFKO0FBQW9CLHlCQUFLYyxJQUFMLENBQVVkLEtBQVY7QUFBcEIsaUJBRjJDO0FBSTlDWSwyQ0FDRztBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmO0FBQTBCaEI7QUFBMUIsaUJBTDJDO0FBTzlDTSw0QkFBWSxzREFBWSxXQUFXRSxhQUFhLHVCQUFVLEtBQUtVLElBQUwsQ0FBVWQsS0FBVixDQUFWLEVBQTRCZSxLQUE1QixDQUFrQyxHQUFsQyxFQUF1QyxDQUF2QyxDQUFwQztBQVBrQyxhQUR2RDtBQVVJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLDJCQUFmLEVBQTJDLGNBQVcsZUFBdEQ7QUFDS0w7QUFETCxhQVZKO0FBYUtHLDBDQUNHO0FBQUE7QUFBQSxrQkFBSyxXQUFVLG9DQUFmLEVBQW9ELGNBQVcsZUFBL0Q7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmO0FBQTBCakI7QUFBMUI7QUFESjtBQWRSLFNBREo7QUFxQkgsSzs7Ozs7QUFHTDs7O0FBQ0FTLE1BQU1XLFdBQU4sR0FBb0IsT0FBcEI7QUFDQVgsTUFBTVosWUFBTixHQUFxQkEsWUFBckI7QUFDQVksTUFBTVYsU0FBTixHQUFrQkEsU0FBbEI7O2tCQUVlVSxLIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCB7IGluY2x1ZGVzIH0gZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24nO1xyXG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IHsgc25ha2VDYXNlIH0gZnJvbSAnbG9kYXNoL3N0cmluZyc7XHJcbmltcG9ydCBCdXR0b25IZWxwIGZyb20gJy4uL2J1dHRvbi1oZWxwJztcclxuaW1wb3J0IHhvciBmcm9tICdsb2Rhc2gvYXJyYXkveG9yJztcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGFjdGlvbnNQb3NpdGlvbjogJ3RvcCdcclxufTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGFjdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgYWN0aW9uc1Bvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydib3RoJywgJ2JvdHRvbScsICd0b3AnXSkuaXNSZXF1aXJlZCxcclxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc2hvd0hlbHA6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYmxvY2tOYW1lOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG4vKipcclxuKiBQYW5lbC5cclxuKi9cclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIFBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICAgICAgICBzcHlJZDogdW5pcXVlSWQoJ3BhbmVsXycpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgYSBibG9jayBjb250YWluZXIgYW5kIHRoZSBjaWxkIGNvbnRlbnQgb2YgdGhlIGJsb2NrLlxyXG4gICAgKiBAcmV0dXJuIHtET019IFJlYWN0IERPTSBlbGVtZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9ucywgYWN0aW9uc1Bvc2l0aW9uLCBjaGlsZHJlbiwgdGl0bGUsIHNob3dIZWxwLCBibG9ja05hbWUsIC4uLm90aGVyUHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBzcHlJZCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBzaG91bGREaXNwbGF5QWN0aW9uc1RvcCA9IGFjdGlvbnMgJiYgaW5jbHVkZXMoWydib3RoJywgJ3RvcCddLCBhY3Rpb25zUG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tID0gYWN0aW9ucyAmJiBpbmNsdWRlcyhbJ2JvdGgnLCAnYm90dG9tJ10sIGFjdGlvbnNQb3NpdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkIG1kbC1jYXJkLS1ib3JkZXIgbWRsLXNoYWRvdy0tNGRwJyBkYXRhLXNweT17c3B5SWR9IGRhdGEtZm9jdXM9J3BhbmVsJyB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICAgICB7KHRpdGxlIHx8IHNob3VsZERpc3BsYXlBY3Rpb25zVG9wIHx8IHNob3dIZWxwKSAmJiA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNhcmRfX3RpdGxlIG1kbC1jYXJkLS1ib3JkZXInIGRhdGEtZm9jdXM9J3BhbmVsLXRpdGxlJz5cclxuICAgICAgICAgICAgICAgICAgICB7dGl0bGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGRhdGEtc3B5LXRpdGxlPnt0aGlzLmkxOG4odGl0bGUpfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG91bGREaXNwbGF5QWN0aW9uc1RvcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWN0aW9ucyc+e2FjdGlvbnMoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dIZWxwICYmIDxCdXR0b25IZWxwIGJsb2NrTmFtZT17YmxvY2tOYW1lIHx8IHNuYWtlQ2FzZSh0aGlzLmkxOG4odGl0bGUpKS5zcGxpdCgnXycpWzBdfSAvPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2FyZF9fc3VwcG9ydGluZy10ZXh0JyBkYXRhLWZvY3VzPSdwYW5lbC1jb250ZW50Jz5cclxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtzaG91bGREaXNwbGF5QWN0aW9uc0JvdHRvbSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2FyZF9fYWN0aW9ucyBtZGwtY2FyZC0tYm9yZGVyJyBkYXRhLWZvY3VzPSdwYW5lbC1hY3Rpb25zJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FjdGlvbnMnPnthY3Rpb25zKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5QYW5lbC5kaXNwbGF5TmFtZSA9ICdQYW5lbCc7XHJcblBhbmVsLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuUGFuZWwucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFuZWw7XHJcbiJdfQ==