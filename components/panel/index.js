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
            modalTitleId = _props.modalTitleId,
            otherProps = _objectWithoutProperties(_props, ['actions', 'actionsPosition', 'children', 'title', 'showHelp', 'blockName', 'modalTitleId']);

        var spyId = this.state.spyId;

        var shouldDisplayActionsTop = actions && (0, _collection.includes)(['both', 'top'], actionsPosition);
        var shouldDisplayActionsBottom = actions && (0, _collection.includes)(['both', 'bottom'], actionsPosition);
        var optionnalModalProps = {};
        if (modalTitleId) {
            optionnalModalProps['id'] = modalTitleId;
        }
        return _react2.default.createElement(
            'div',
            _extends({ className: 'mdl-card mdl-card--border mdl-shadow--4dp', 'data-spy': spyId, 'data-focus': 'panel' }, otherProps),
            _react2.default.createElement(
                'div',
                { className: 'mdl-card__title mdl-card--border', 'data-focus': 'panel-title' },
                title && _react2.default.createElement(
                    'h3',
                    _extends({ 'data-spy-title': true }, optionnalModalProps),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJhY3Rpb25zUG9zaXRpb24iLCJwcm9wVHlwZXMiLCJhY3Rpb25zIiwiZnVuYyIsIm9uZU9mIiwiaXNSZXF1aXJlZCIsInRpdGxlIiwic3RyaW5nIiwic2hvd0hlbHAiLCJib29sIiwiYmxvY2tOYW1lIiwiUGFuZWwiLCJwcm9wcyIsInN0YXRlIiwic3B5SWQiLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm1vZGFsVGl0bGVJZCIsIm90aGVyUHJvcHMiLCJzaG91bGREaXNwbGF5QWN0aW9uc1RvcCIsInNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tIiwib3B0aW9ubmFsTW9kYWxQcm9wcyIsImkxOG4iLCJzcGxpdCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlO0FBQ2pCQyxxQkFBaUI7QUFEQSxDQUFyQjs7QUFJQSxJQUFNQyxZQUFZO0FBQ2RDLGFBQVMsaUJBQVVDLElBREw7QUFFZEgscUJBQWlCLGlCQUFVSSxLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsS0FBbkIsQ0FBaEIsRUFBMkNDLFVBRjlDO0FBR2RDLFdBQU8saUJBQVVDLE1BSEg7QUFJZEMsY0FBVSxpQkFBVUMsSUFKTjtBQUtkQyxlQUFXLGlCQUFVSDtBQUxQLENBQWxCOztBQVFBOzs7O0lBSU1JLEs7OztBQUNGLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEscURBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFFZixZQUFNQyxRQUFRO0FBQ1ZDLG1CQUFPLHVCQUFTLFFBQVQ7QUFERyxTQUFkO0FBR0EsY0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBTGU7QUFNbEI7O0FBRUQ7Ozs7OztvQkFJQUUsTSxxQkFBUztBQUFBLHFCQUNpRyxLQUFLSCxLQUR0RztBQUFBLFlBQ0VWLE9BREYsVUFDRUEsT0FERjtBQUFBLFlBQ1dGLGVBRFgsVUFDV0EsZUFEWDtBQUFBLFlBQzRCZ0IsUUFENUIsVUFDNEJBLFFBRDVCO0FBQUEsWUFDc0NWLEtBRHRDLFVBQ3NDQSxLQUR0QztBQUFBLFlBQzZDRSxRQUQ3QyxVQUM2Q0EsUUFEN0M7QUFBQSxZQUN1REUsU0FEdkQsVUFDdURBLFNBRHZEO0FBQUEsWUFDa0VPLFlBRGxFLFVBQ2tFQSxZQURsRTtBQUFBLFlBQ21GQyxVQURuRjs7QUFBQSxZQUVFSixLQUZGLEdBRVcsS0FBS0QsS0FGaEIsQ0FFRUMsS0FGRjs7QUFHTCxZQUFNSywwQkFBMEJqQixXQUFXLDBCQUFTLENBQUMsTUFBRCxFQUFTLEtBQVQsQ0FBVCxFQUEwQkYsZUFBMUIsQ0FBM0M7QUFDQSxZQUFNb0IsNkJBQTZCbEIsV0FBVywwQkFBUyxDQUFDLE1BQUQsRUFBUyxRQUFULENBQVQsRUFBNkJGLGVBQTdCLENBQTlDO0FBQ0EsWUFBTXFCLHNCQUFzQixFQUE1QjtBQUNBLFlBQUlKLFlBQUosRUFBa0I7QUFDZEksZ0NBQW9CLElBQXBCLElBQTRCSixZQUE1QjtBQUNIO0FBQ0QsZUFDSTtBQUFBO0FBQUEsdUJBQUssV0FBVSwyQ0FBZixFQUEyRCxZQUFVSCxLQUFyRSxFQUE0RSxjQUFXLE9BQXZGLElBQW1HSSxVQUFuRztBQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGtDQUFmLEVBQWtELGNBQVcsYUFBN0Q7QUFDS1oseUJBQ0c7QUFBQTtBQUFBLCtCQUFJLHNCQUFKLElBQXVCZSxtQkFBdkI7QUFBNkMseUJBQUtDLElBQUwsQ0FBVWhCLEtBQVY7QUFBN0MsaUJBRlI7QUFJS2EsMkNBQ0c7QUFBQTtBQUFBLHNCQUFLLFdBQVUsU0FBZjtBQUEwQmpCO0FBQTFCLGlCQUxSO0FBT0tNLDRCQUFZLHNEQUFZLFdBQVdFLGFBQWEsdUJBQVUsS0FBS1ksSUFBTCxDQUFVaEIsS0FBVixDQUFWLEVBQTRCaUIsS0FBNUIsQ0FBa0MsR0FBbEMsRUFBdUMsQ0FBdkMsQ0FBcEM7QUFQakIsYUFESjtBQVVJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLDJCQUFmLEVBQTJDLGNBQVcsZUFBdEQ7QUFDS1A7QUFETCxhQVZKO0FBYUtJLDBDQUNHO0FBQUE7QUFBQSxrQkFBSyxXQUFVLG9DQUFmLEVBQW9ELGNBQVcsZUFBL0Q7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmO0FBQTBCbEI7QUFBMUI7QUFESjtBQWRSLFNBREo7QUFxQkgsSzs7Ozs7QUFHTDs7O0FBQ0FTLE1BQU1hLFdBQU4sR0FBb0IsT0FBcEI7QUFDQWIsTUFBTVosWUFBTixHQUFxQkEsWUFBckI7QUFDQVksTUFBTVYsU0FBTixHQUFrQkEsU0FBbEI7O2tCQUVlVSxLIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCB7IGluY2x1ZGVzIH0gZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24nO1xyXG5pbXBvcnQgeyB1bmlxdWVJZCB9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IHsgc25ha2VDYXNlIH0gZnJvbSAnbG9kYXNoL3N0cmluZyc7XHJcbmltcG9ydCBCdXR0b25IZWxwIGZyb20gJy4uL2J1dHRvbi1oZWxwJztcclxuaW1wb3J0IHhvciBmcm9tICdsb2Rhc2gvYXJyYXkveG9yJztcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGFjdGlvbnNQb3NpdGlvbjogJ3RvcCdcclxufTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGFjdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgYWN0aW9uc1Bvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydib3RoJywgJ2JvdHRvbScsICd0b3AnXSkuaXNSZXF1aXJlZCxcclxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc2hvd0hlbHA6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYmxvY2tOYW1lOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG4vKipcclxuKiBQYW5lbC5cclxuKi9cclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIFBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICAgICAgICBzcHlJZDogdW5pcXVlSWQoJ3BhbmVsXycpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgYSBibG9jayBjb250YWluZXIgYW5kIHRoZSBjaWxkIGNvbnRlbnQgb2YgdGhlIGJsb2NrLlxyXG4gICAgKiBAcmV0dXJuIHtET019IFJlYWN0IERPTSBlbGVtZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHthY3Rpb25zLCBhY3Rpb25zUG9zaXRpb24sIGNoaWxkcmVuLCB0aXRsZSwgc2hvd0hlbHAsIGJsb2NrTmFtZSwgbW9kYWxUaXRsZUlkLCAuLi5vdGhlclByb3BzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3NweUlkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qgc2hvdWxkRGlzcGxheUFjdGlvbnNUb3AgPSBhY3Rpb25zICYmIGluY2x1ZGVzKFsnYm90aCcsICd0b3AnXSwgYWN0aW9uc1Bvc2l0aW9uKTtcclxuICAgICAgICBjb25zdCBzaG91bGREaXNwbGF5QWN0aW9uc0JvdHRvbSA9IGFjdGlvbnMgJiYgaW5jbHVkZXMoWydib3RoJywgJ2JvdHRvbSddLCBhY3Rpb25zUG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbm5hbE1vZGFsUHJvcHMgPSB7fTtcclxuICAgICAgICBpZiAobW9kYWxUaXRsZUlkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbm5hbE1vZGFsUHJvcHNbJ2lkJ10gPSBtb2RhbFRpdGxlSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2FyZCBtZGwtY2FyZC0tYm9yZGVyIG1kbC1zaGFkb3ctLTRkcCcgZGF0YS1zcHk9e3NweUlkfSBkYXRhLWZvY3VzPSdwYW5lbCcgey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkX190aXRsZSBtZGwtY2FyZC0tYm9yZGVyJyBkYXRhLWZvY3VzPSdwYW5lbC10aXRsZSc+XHJcbiAgICAgICAgICAgICAgICAgICAge3RpdGxlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBkYXRhLXNweS10aXRsZSB7Li4ub3B0aW9ubmFsTW9kYWxQcm9wc30+e3RoaXMuaTE4bih0aXRsZSl9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3VsZERpc3BsYXlBY3Rpb25zVG9wICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhY3Rpb25zJz57YWN0aW9ucygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd0hlbHAgJiYgPEJ1dHRvbkhlbHAgYmxvY2tOYW1lPXtibG9ja05hbWUgfHwgc25ha2VDYXNlKHRoaXMuaTE4bih0aXRsZSkpLnNwbGl0KCdfJylbMF19IC8+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNhcmRfX3N1cHBvcnRpbmctdGV4dCcgZGF0YS1mb2N1cz0ncGFuZWwtY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7c2hvdWxkRGlzcGxheUFjdGlvbnNCb3R0b20gJiZcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNhcmRfX2FjdGlvbnMgbWRsLWNhcmQtLWJvcmRlcicgZGF0YS1mb2N1cz0ncGFuZWwtYWN0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhY3Rpb25zJz57YWN0aW9ucygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuUGFuZWwuZGlzcGxheU5hbWUgPSAnUGFuZWwnO1xyXG5QYW5lbC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcblBhbmVsLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhbmVsO1xyXG4iXX0=