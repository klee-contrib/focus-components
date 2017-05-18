'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _iconDropdown = require('../../components/icon-dropdown');

var _iconDropdown2 = _interopRequireDefault(_iconDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
* HeaderActions component.
*/
var HeaderActions = function (_Component) {
    _inherits(HeaderActions, _Component);

    function HeaderActions(props) {
        _classCallCheck(this, HeaderActions);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._getStateFromStore = function () {
            return { actions: _builtInStore2.default.getActions() || { primary: [], secondary: [] } };
        };

        _this._handleComponentChange = function () {
            _this.setState(_this._getStateFromStore());
        };

        _this.state = _this._getStateFromStore();
        return _this;
    }

    /** @inheriteddoc */


    HeaderActions.prototype.componentWillMount = function componentWillMount() {
        _builtInStore2.default.addActionsChangeListener(this._handleComponentChange);
    };

    /** @inheriteddoc */


    HeaderActions.prototype.componentWillUnmount = function componentWillUnmount() {
        _builtInStore2.default.removeActionsChangeListener(this._handleComponentChange);
    };

    /**
    * Get state from store
    * @return {Object} actions extracted from the store
    */


    /**
    * Component change handler
    */


    /** @inheriteddoc */
    HeaderActions.prototype.render = function render() {
        var otherProps = _objectWithoutProperties(this.props, []);

        var actions = this.state.actions;

        return _react2.default.createElement(
            'div',
            _extends({ 'data-focus': 'header-actions' }, otherProps),
            actions.primary.map(function (primary, index) {
                var action = primary.action,
                    className = primary.className,
                    icon = primary.icon,
                    iconLibrary = primary.iconLibrary,
                    label = primary.label,
                    otherProps = _objectWithoutProperties(primary, ['action', 'className', 'icon', 'iconLibrary', 'label']);

                return _react2.default.createElement(_button2.default, _extends({ key: 'header-action-' + label, className: className, handleOnClick: action, icon: icon, iconLibrary: iconLibrary, label: label, shape: 'fab', type: 'button' }, otherProps));
            }),
            actions.secondary && actions.secondary.length > 0 && _react2.default.createElement(_iconDropdown2.default, { operationList: actions.secondary })
        );
    };

    return HeaderActions;
}(_react.Component);

//Static props.


HeaderActions.displayName = 'HeaderActions';
//HeaderActions.defaultProps = defaultProps;
//HeaderActions.propTypes = propTypes;

exports.default = HeaderActions;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJIZWFkZXJBY3Rpb25zIiwicHJvcHMiLCJfZ2V0U3RhdGVGcm9tU3RvcmUiLCJhY3Rpb25zIiwiZ2V0QWN0aW9ucyIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJfaGFuZGxlQ29tcG9uZW50Q2hhbmdlIiwic2V0U3RhdGUiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImFkZEFjdGlvbnNDaGFuZ2VMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQWN0aW9uc0NoYW5nZUxpc3RlbmVyIiwicmVuZGVyIiwib3RoZXJQcm9wcyIsIm1hcCIsImluZGV4IiwiYWN0aW9uIiwiY2xhc3NOYW1lIiwiaWNvbiIsImljb25MaWJyYXJ5IiwibGFiZWwiLCJsZW5ndGgiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsYTs7O0FBQ0YsMkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxREFDZixzQkFBTUEsS0FBTixDQURlOztBQUFBLGNBbUJuQkMsa0JBbkJtQixHQW1CRSxZQUFNO0FBQ3ZCLG1CQUFPLEVBQUNDLFNBQVMsdUJBQWlCQyxVQUFqQixNQUFpQyxFQUFDQyxTQUFTLEVBQVYsRUFBY0MsV0FBVyxFQUF6QixFQUEzQyxFQUFQO0FBQ0gsU0FyQmtCOztBQUFBLGNBMEJuQkMsc0JBMUJtQixHQTBCTSxZQUFNO0FBQzNCLGtCQUFLQyxRQUFMLENBQWMsTUFBS04sa0JBQUwsRUFBZDtBQUNILFNBNUJrQjs7QUFFZixjQUFLTyxLQUFMLEdBQWEsTUFBS1Asa0JBQUwsRUFBYjtBQUZlO0FBR2xCOztBQUVEOzs7NEJBQ0FRLGtCLGlDQUFxQjtBQUNqQiwrQkFBaUJDLHdCQUFqQixDQUEwQyxLQUFLSixzQkFBL0M7QUFDSCxLOztBQUVEOzs7NEJBQ0FLLG9CLG1DQUF1QjtBQUNuQiwrQkFBaUJDLDJCQUFqQixDQUE2QyxLQUFLTixzQkFBbEQ7QUFDSCxLOztBQUVEOzs7Ozs7QUFRQTs7Ozs7QUFPQTs0QkFDQU8sTSxxQkFBUztBQUFBLFlBQ0tDLFVBREwsNEJBQ21CLEtBQUtkLEtBRHhCOztBQUFBLFlBRUVFLE9BRkYsR0FFYSxLQUFLTSxLQUZsQixDQUVFTixPQUZGOztBQUdMLGVBQ0k7QUFBQTtBQUFBLHVCQUFLLGNBQVcsZ0JBQWhCLElBQXFDWSxVQUFyQztBQUNLWixvQkFBUUUsT0FBUixDQUFnQlcsR0FBaEIsQ0FBb0IsVUFBQ1gsT0FBRCxFQUFVWSxLQUFWLEVBQW9CO0FBQUEsb0JBQzlCQyxNQUQ4QixHQUNnQ2IsT0FEaEMsQ0FDOUJhLE1BRDhCO0FBQUEsb0JBQ3RCQyxTQURzQixHQUNnQ2QsT0FEaEMsQ0FDdEJjLFNBRHNCO0FBQUEsb0JBQ1hDLElBRFcsR0FDZ0NmLE9BRGhDLENBQ1hlLElBRFc7QUFBQSxvQkFDTEMsV0FESyxHQUNnQ2hCLE9BRGhDLENBQ0xnQixXQURLO0FBQUEsb0JBQ1FDLEtBRFIsR0FDZ0NqQixPQURoQyxDQUNRaUIsS0FEUjtBQUFBLG9CQUNrQlAsVUFEbEIsNEJBQ2dDVixPQURoQzs7QUFFckMsdUJBQ0ksMkRBQVEsd0JBQXNCaUIsS0FBOUIsRUFBdUMsV0FBV0gsU0FBbEQsRUFBNkQsZUFBZUQsTUFBNUUsRUFBb0YsTUFBTUUsSUFBMUYsRUFBZ0csYUFBYUMsV0FBN0csRUFBMEgsT0FBT0MsS0FBakksRUFBd0ksT0FBTSxLQUE5SSxFQUFvSixNQUFLLFFBQXpKLElBQXNLUCxVQUF0SyxFQURKO0FBR0gsYUFMQSxDQURMO0FBT0taLG9CQUFRRyxTQUFSLElBQXFCSCxRQUFRRyxTQUFSLENBQWtCaUIsTUFBbEIsR0FBMkIsQ0FBaEQsSUFBcUQsd0RBQVUsZUFBZXBCLFFBQVFHLFNBQWpDO0FBUDFELFNBREo7QUFXSCxLOzs7OztBQUdMOzs7QUFDQU4sY0FBY3dCLFdBQWQsR0FBNEIsZUFBNUI7QUFDQTtBQUNBOztrQkFFZXhCLGEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBhcHBsaWNhdGlvblN0b3JlIGZyb20gJ2ZvY3VzLWNvcmUvYXBwbGljYXRpb24vYnVpbHQtaW4tc3RvcmUnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IERyb3Bkb3duIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaWNvbi1kcm9wZG93bic7XHJcblxyXG4vKipcclxuKiBIZWFkZXJBY3Rpb25zIGNvbXBvbmVudC5cclxuKi9cclxuY2xhc3MgSGVhZGVyQWN0aW9ucyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUuYWRkQWN0aW9uc0NoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUucmVtb3ZlQWN0aW9uc0NoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBzdGF0ZSBmcm9tIHN0b3JlXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gYWN0aW9ucyBleHRyYWN0ZWQgZnJvbSB0aGUgc3RvcmVcclxuICAgICovXHJcbiAgICBfZ2V0U3RhdGVGcm9tU3RvcmUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHthY3Rpb25zOiBhcHBsaWNhdGlvblN0b3JlLmdldEFjdGlvbnMoKSB8fCB7cHJpbWFyeTogW10sIHNlY29uZGFyeTogW119fTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBjaGFuZ2UgaGFuZGxlclxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVDb21wb25lbnRDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXRTdGF0ZUZyb21TdG9yZSgpKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Li4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHthY3Rpb25zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdoZWFkZXItYWN0aW9ucycgey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAge2FjdGlvbnMucHJpbWFyeS5tYXAoKHByaW1hcnksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2FjdGlvbiwgY2xhc3NOYW1lLCBpY29uLCBpY29uTGlicmFyeSwgbGFiZWwsIC4uLm90aGVyUHJvcHN9ID0gcHJpbWFyeTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGtleT17YGhlYWRlci1hY3Rpb24tJHtsYWJlbH1gfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gaGFuZGxlT25DbGljaz17YWN0aW9ufSBpY29uPXtpY29ufSBpY29uTGlicmFyeT17aWNvbkxpYnJhcnl9IGxhYmVsPXtsYWJlbH0gc2hhcGU9J2ZhYicgdHlwZT0nYnV0dG9uJyB7Li4ub3RoZXJQcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIHthY3Rpb25zLnNlY29uZGFyeSAmJiBhY3Rpb25zLnNlY29uZGFyeS5sZW5ndGggPiAwICYmIDxEcm9wZG93biBvcGVyYXRpb25MaXN0PXthY3Rpb25zLnNlY29uZGFyeX0vPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbkhlYWRlckFjdGlvbnMuZGlzcGxheU5hbWUgPSAnSGVhZGVyQWN0aW9ucyc7XHJcbi8vSGVhZGVyQWN0aW9ucy5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbi8vSGVhZGVyQWN0aW9ucy5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJBY3Rpb25zO1xyXG4iXX0=