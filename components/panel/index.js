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
            (title || shouldDisplayActionsTop || showHelp) && _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJhY3Rpb25zUG9zaXRpb24iLCJwcm9wVHlwZXMiLCJhY3Rpb25zIiwiZnVuYyIsIm9uZU9mIiwiaXNSZXF1aXJlZCIsInRpdGxlIiwic3RyaW5nIiwic2hvd0hlbHAiLCJib29sIiwiYmxvY2tOYW1lIiwiUGFuZWwiLCJwcm9wcyIsInN0YXRlIiwic3B5SWQiLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm1vZGFsVGl0bGVJZCIsIm90aGVyUHJvcHMiLCJzaG91bGREaXNwbGF5QWN0aW9uc1RvcCIsInNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tIiwib3B0aW9ubmFsTW9kYWxQcm9wcyIsImkxOG4iLCJzcGxpdCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlO0FBQ2pCQyxxQkFBaUI7QUFEQSxDQUFyQjs7QUFJQSxJQUFNQyxZQUFZO0FBQ2RDLGFBQVMsaUJBQVVDLElBREw7QUFFZEgscUJBQWlCLGlCQUFVSSxLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsS0FBbkIsQ0FBaEIsRUFBMkNDLFVBRjlDO0FBR2RDLFdBQU8saUJBQVVDLE1BSEg7QUFJZEMsY0FBVSxpQkFBVUMsSUFKTjtBQUtkQyxlQUFXLGlCQUFVSDtBQUxQLENBQWxCOztBQVFBOzs7O0lBSU1JLEs7OztBQUNGLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEscURBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFFZixZQUFNQyxRQUFRO0FBQ1ZDLG1CQUFPLHVCQUFTLFFBQVQ7QUFERyxTQUFkO0FBR0EsY0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBTGU7QUFNbEI7O0FBRUQ7Ozs7OztvQkFJQUUsTSxxQkFBUztBQUFBLHFCQUNpRyxLQUFLSCxLQUR0RztBQUFBLFlBQ0VWLE9BREYsVUFDRUEsT0FERjtBQUFBLFlBQ1dGLGVBRFgsVUFDV0EsZUFEWDtBQUFBLFlBQzRCZ0IsUUFENUIsVUFDNEJBLFFBRDVCO0FBQUEsWUFDc0NWLEtBRHRDLFVBQ3NDQSxLQUR0QztBQUFBLFlBQzZDRSxRQUQ3QyxVQUM2Q0EsUUFEN0M7QUFBQSxZQUN1REUsU0FEdkQsVUFDdURBLFNBRHZEO0FBQUEsWUFDa0VPLFlBRGxFLFVBQ2tFQSxZQURsRTtBQUFBLFlBQ21GQyxVQURuRjs7QUFBQSxZQUVHSixLQUZILEdBRWEsS0FBS0QsS0FGbEIsQ0FFR0MsS0FGSDs7QUFHTCxZQUFNSywwQkFBMEJqQixXQUFXLDBCQUFTLENBQUMsTUFBRCxFQUFTLEtBQVQsQ0FBVCxFQUEwQkYsZUFBMUIsQ0FBM0M7QUFDQSxZQUFNb0IsNkJBQTZCbEIsV0FBVywwQkFBUyxDQUFDLE1BQUQsRUFBUyxRQUFULENBQVQsRUFBNkJGLGVBQTdCLENBQTlDO0FBQ0EsWUFBTXFCLHNCQUFzQixFQUE1QjtBQUNBLFlBQUlKLFlBQUosRUFBa0I7QUFDZEksZ0NBQW9CLElBQXBCLElBQTRCSixZQUE1QjtBQUNIO0FBQ0QsZUFDSTtBQUFBO0FBQUEsdUJBQUssV0FBVSwyQ0FBZixFQUEyRCxZQUFVSCxLQUFyRSxFQUE0RSxjQUFXLE9BQXZGLElBQW1HSSxVQUFuRztBQUNLLGFBQUNaLFNBQVNhLHVCQUFULElBQW9DWCxRQUFyQyxLQUFrRDtBQUFBO0FBQUEsa0JBQUssV0FBVSxrQ0FBZixFQUFrRCxjQUFXLGFBQTdEO0FBQzlDRix5QkFDRztBQUFBO0FBQUEsK0JBQUksc0JBQUosSUFBdUJlLG1CQUF2QjtBQUE2Qyx5QkFBS0MsSUFBTCxDQUFVaEIsS0FBVjtBQUE3QyxpQkFGMkM7QUFJOUNhLDJDQUNHO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFNBQWY7QUFBMEJqQjtBQUExQixpQkFMMkM7QUFPOUNNLDRCQUFZLHNEQUFZLFdBQVdFLGFBQWEsdUJBQVUsS0FBS1ksSUFBTCxDQUFVaEIsS0FBVixDQUFWLEVBQTRCaUIsS0FBNUIsQ0FBa0MsR0FBbEMsRUFBdUMsQ0FBdkMsQ0FBcEM7QUFQa0MsYUFEdkQ7QUFVSTtBQUFBO0FBQUEsa0JBQUssV0FBVSwyQkFBZixFQUEyQyxjQUFXLGVBQXREO0FBQ0tQO0FBREwsYUFWSjtBQWFLSSwwQ0FDRztBQUFBO0FBQUEsa0JBQUssV0FBVSxvQ0FBZixFQUFvRCxjQUFXLGVBQS9EO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsU0FBZjtBQUEwQmxCO0FBQTFCO0FBREo7QUFkUixTQURKO0FBcUJILEs7Ozs7O0FBR0w7OztBQUNBUyxNQUFNYSxXQUFOLEdBQW9CLE9BQXBCO0FBQ0FiLE1BQU1aLFlBQU4sR0FBcUJBLFlBQXJCO0FBQ0FZLE1BQU1WLFNBQU4sR0FBa0JBLFNBQWxCOztrQkFFZVUsSyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgeyBpbmNsdWRlcyB9IGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uJztcclxuaW1wb3J0IHsgdW5pcXVlSWQgfSBmcm9tICdsb2Rhc2gvdXRpbGl0eSc7XHJcbmltcG9ydCB7IHNuYWtlQ2FzZSB9IGZyb20gJ2xvZGFzaC9zdHJpbmcnO1xyXG5pbXBvcnQgQnV0dG9uSGVscCBmcm9tICcuLi9idXR0b24taGVscCc7XHJcbmltcG9ydCB4b3IgZnJvbSAnbG9kYXNoL2FycmF5L3hvcic7XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBhY3Rpb25zUG9zaXRpb246ICd0b3AnXHJcbn07XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBhY3Rpb25zOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGFjdGlvbnNQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnYm90aCcsICdib3R0b20nLCAndG9wJ10pLmlzUmVxdWlyZWQsXHJcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHNob3dIZWxwOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGJsb2NrTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxuLyoqXHJcbiogUGFuZWwuXHJcbiovXHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgc3B5SWQ6IHVuaXF1ZUlkKCdwYW5lbF8nKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGEgYmxvY2sgY29udGFpbmVyIGFuZCB0aGUgY2lsZCBjb250ZW50IG9mIHRoZSBibG9jay5cclxuICAgICogQHJldHVybiB7RE9NfSBSZWFjdCBET00gZWxlbWVudFxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7YWN0aW9ucywgYWN0aW9uc1Bvc2l0aW9uLCBjaGlsZHJlbiwgdGl0bGUsIHNob3dIZWxwLCBibG9ja05hbWUsIG1vZGFsVGl0bGVJZCwgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgc3B5SWQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qgc2hvdWxkRGlzcGxheUFjdGlvbnNUb3AgPSBhY3Rpb25zICYmIGluY2x1ZGVzKFsnYm90aCcsICd0b3AnXSwgYWN0aW9uc1Bvc2l0aW9uKTtcclxuICAgICAgICBjb25zdCBzaG91bGREaXNwbGF5QWN0aW9uc0JvdHRvbSA9IGFjdGlvbnMgJiYgaW5jbHVkZXMoWydib3RoJywgJ2JvdHRvbSddLCBhY3Rpb25zUG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbm5hbE1vZGFsUHJvcHMgPSB7fTtcclxuICAgICAgICBpZiAobW9kYWxUaXRsZUlkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbm5hbE1vZGFsUHJvcHNbJ2lkJ10gPSBtb2RhbFRpdGxlSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2FyZCBtZGwtY2FyZC0tYm9yZGVyIG1kbC1zaGFkb3ctLTRkcCcgZGF0YS1zcHk9e3NweUlkfSBkYXRhLWZvY3VzPSdwYW5lbCcgey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgeyh0aXRsZSB8fCBzaG91bGREaXNwbGF5QWN0aW9uc1RvcCB8fCBzaG93SGVscCkgJiYgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkX190aXRsZSBtZGwtY2FyZC0tYm9yZGVyJyBkYXRhLWZvY3VzPSdwYW5lbC10aXRsZSc+XHJcbiAgICAgICAgICAgICAgICAgICAge3RpdGxlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBkYXRhLXNweS10aXRsZSB7Li4ub3B0aW9ubmFsTW9kYWxQcm9wc30+e3RoaXMuaTE4bih0aXRsZSl9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3VsZERpc3BsYXlBY3Rpb25zVG9wICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhY3Rpb25zJz57YWN0aW9ucygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd0hlbHAgJiYgPEJ1dHRvbkhlbHAgYmxvY2tOYW1lPXtibG9ja05hbWUgfHwgc25ha2VDYXNlKHRoaXMuaTE4bih0aXRsZSkpLnNwbGl0KCdfJylbMF19IC8+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkX19zdXBwb3J0aW5nLXRleHQnIGRhdGEtZm9jdXM9J3BhbmVsLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge3Nob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkX19hY3Rpb25zIG1kbC1jYXJkLS1ib3JkZXInIGRhdGEtZm9jdXM9J3BhbmVsLWFjdGlvbnMnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWN0aW9ucyc+e2FjdGlvbnMoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcblBhbmVsLmRpc3BsYXlOYW1lID0gJ1BhbmVsJztcclxuUGFuZWwuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5QYW5lbC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYW5lbDtcclxuIl19