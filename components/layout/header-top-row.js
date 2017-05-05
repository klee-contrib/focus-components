'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
* HeaderTopRow component.
*/
var HeaderTopRow = function (_Component) {
    _inherits(HeaderTopRow, _Component);

    function HeaderTopRow(props) {
        _classCallCheck(this, HeaderTopRow);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._handleComponentChange = function () {
            _this.setState(_this._getStateFromStore());
        };

        _this.state = _this._getStateFromStore();
        return _this;
    }

    /** @inheriteddoc */


    HeaderTopRow.prototype.componentWillMount = function componentWillMount() {
        _builtInStore2.default.addSummaryComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.addBarContentLeftComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.addBarContentRightComponentChangeListener(this._handleComponentChange);
    };

    /** @inheriteddoc */


    HeaderTopRow.prototype.componentWillUnmount = function componentWillUnmount() {
        _builtInStore2.default.removeSummaryComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.removeBarContentLeftComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.removeBarContentRightComponentChangeListener(this._handleComponentChange);
    };

    HeaderTopRow.prototype._getStateFromStore = function _getStateFromStore() {
        return {
            summaryComponent: _builtInStore2.default.getSummaryComponent(),
            barContentLeftComponent: _builtInStore2.default.getBarContentLeftComponent(),
            barContentRightComponent: _builtInStore2.default.getBarContentRightComponent()
        };
    };

    /**
    * Component change handler.
    */


    /**
    * Render the component
    * @return {HTML} Rendered component
    */
    HeaderTopRow.prototype.render = function render() {
        var _state = this.state,
            barContentLeftComponent = _state.barContentLeftComponent,
            barContentRightComponent = _state.barContentRightComponent,
            summaryComponent = _state.summaryComponent;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'header-top-row' },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'header-top-row-left' },
                    barContentLeftComponent && _react2.default.createElement(barContentLeftComponent.component, barContentLeftComponent.props)
                ),
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'header-top-row-right' },
                    barContentRightComponent && _react2.default.createElement(barContentRightComponent.component, barContentRightComponent.props)
                ),
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'header-top-row-middle' },
                    summaryComponent && _react2.default.createElement(summaryComponent.component, summaryComponent.props)
                )
            )
        );
    };

    return HeaderTopRow;
}(_react.Component);

//Static props.


HeaderTopRow.displayName = 'HeaderTopRow';
//HeaderTopRow.defaultProps = defaultProps;
//HeaderTopRow.propTypes = propTypes;

exports.default = HeaderTopRow;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJIZWFkZXJUb3BSb3ciLCJwcm9wcyIsIl9oYW5kbGVDb21wb25lbnRDaGFuZ2UiLCJzZXRTdGF0ZSIsIl9nZXRTdGF0ZUZyb21TdG9yZSIsInN0YXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwiYWRkU3VtbWFyeUNvbXBvbmVudENoYW5nZUxpc3RlbmVyIiwiYWRkQmFyQ29udGVudExlZnRDb21wb25lbnRDaGFuZ2VMaXN0ZW5lciIsImFkZEJhckNvbnRlbnRSaWdodENvbXBvbmVudENoYW5nZUxpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVTdW1tYXJ5Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIiLCJyZW1vdmVCYXJDb250ZW50TGVmdENvbXBvbmVudENoYW5nZUxpc3RlbmVyIiwicmVtb3ZlQmFyQ29udGVudFJpZ2h0Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIiLCJzdW1tYXJ5Q29tcG9uZW50IiwiZ2V0U3VtbWFyeUNvbXBvbmVudCIsImJhckNvbnRlbnRMZWZ0Q29tcG9uZW50IiwiZ2V0QmFyQ29udGVudExlZnRDb21wb25lbnQiLCJiYXJDb250ZW50UmlnaHRDb21wb25lbnQiLCJnZXRCYXJDb250ZW50UmlnaHRDb21wb25lbnQiLCJyZW5kZXIiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLFk7OztBQUNGLDBCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEscURBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFBQSxjQThCbkJDLHNCQTlCbUIsR0E4Qk0sWUFBTTtBQUMzQixrQkFBS0MsUUFBTCxDQUFjLE1BQUtDLGtCQUFMLEVBQWQ7QUFDSCxTQWhDa0I7O0FBRWYsY0FBS0MsS0FBTCxHQUFhLE1BQUtELGtCQUFMLEVBQWI7QUFGZTtBQUdsQjs7QUFFRDs7OzJCQUNBRSxrQixpQ0FBcUI7QUFDakIsK0JBQWlCQyxpQ0FBakIsQ0FBbUQsS0FBS0wsc0JBQXhEO0FBQ0EsK0JBQWlCTSx3Q0FBakIsQ0FBMEQsS0FBS04sc0JBQS9EO0FBQ0EsK0JBQWlCTyx5Q0FBakIsQ0FBMkQsS0FBS1Asc0JBQWhFO0FBQ0gsSzs7QUFFRDs7OzJCQUNBUSxvQixtQ0FBdUI7QUFDbkIsK0JBQWlCQyxvQ0FBakIsQ0FBc0QsS0FBS1Qsc0JBQTNEO0FBQ0EsK0JBQWlCVSwyQ0FBakIsQ0FBNkQsS0FBS1Ysc0JBQWxFO0FBQ0EsK0JBQWlCVyw0Q0FBakIsQ0FBOEQsS0FBS1gsc0JBQW5FO0FBQ0gsSzs7MkJBRURFLGtCLGlDQUFxQjtBQUNqQixlQUFPO0FBQ0hVLDhCQUFrQix1QkFBaUJDLG1CQUFqQixFQURmO0FBRUhDLHFDQUF5Qix1QkFBaUJDLDBCQUFqQixFQUZ0QjtBQUdIQyxzQ0FBMEIsdUJBQWlCQywyQkFBakI7QUFIdkIsU0FBUDtBQUtILEs7O0FBRUQ7Ozs7O0FBT0E7Ozs7MkJBSUFDLE0scUJBQVM7QUFBQSxxQkFDeUUsS0FBS2YsS0FEOUU7QUFBQSxZQUNFVyx1QkFERixVQUNFQSx1QkFERjtBQUFBLFlBQzJCRSx3QkFEM0IsVUFDMkJBLHdCQUQzQjtBQUFBLFlBQ3FESixnQkFEckQsVUFDcURBLGdCQURyRDs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsZ0JBQWhCO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLGNBQVcscUJBQWhCO0FBQ0tFLCtDQUNHLDhCQUFDLHVCQUFELENBQXlCLFNBQXpCLEVBQXVDQSx3QkFBd0JmLEtBQS9EO0FBRlIsaUJBREo7QUFNSTtBQUFBO0FBQUEsc0JBQUssY0FBVyxzQkFBaEI7QUFDS2lCLGdEQUNHLDhCQUFDLHdCQUFELENBQTBCLFNBQTFCLEVBQXdDQSx5QkFBeUJqQixLQUFqRTtBQUZSLGlCQU5KO0FBV0k7QUFBQTtBQUFBLHNCQUFLLGNBQVcsdUJBQWhCO0FBQ0thLHdDQUNHLDhCQUFDLGdCQUFELENBQWtCLFNBQWxCLEVBQWdDQSxpQkFBaUJiLEtBQWpEO0FBRlI7QUFYSjtBQURKLFNBREo7QUFxQkgsSzs7Ozs7QUFJTDs7O0FBQ0FELGFBQWFxQixXQUFiLEdBQTJCLGNBQTNCO0FBQ0E7QUFDQTs7a0JBRWVyQixZIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXBwbGljYXRpb25TdG9yZSBmcm9tICdmb2N1cy1jb3JlL2FwcGxpY2F0aW9uL2J1aWx0LWluLXN0b3JlJztcclxuXHJcbi8qKlxyXG4qIEhlYWRlclRvcFJvdyBjb21wb25lbnQuXHJcbiovXHJcbmNsYXNzIEhlYWRlclRvcFJvdyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUuYWRkU3VtbWFyeUNvbXBvbmVudENoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5hZGRCYXJDb250ZW50TGVmdENvbXBvbmVudENoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5hZGRCYXJDb250ZW50UmlnaHRDb21wb25lbnRDaGFuZ2VMaXN0ZW5lcih0aGlzLl9oYW5kbGVDb21wb25lbnRDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBhcHBsaWNhdGlvblN0b3JlLnJlbW92ZVN1bW1hcnlDb21wb25lbnRDaGFuZ2VMaXN0ZW5lcih0aGlzLl9oYW5kbGVDb21wb25lbnRDaGFuZ2UpO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUucmVtb3ZlQmFyQ29udGVudExlZnRDb21wb25lbnRDaGFuZ2VMaXN0ZW5lcih0aGlzLl9oYW5kbGVDb21wb25lbnRDaGFuZ2UpO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUucmVtb3ZlQmFyQ29udGVudFJpZ2h0Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0U3RhdGVGcm9tU3RvcmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3VtbWFyeUNvbXBvbmVudDogYXBwbGljYXRpb25TdG9yZS5nZXRTdW1tYXJ5Q29tcG9uZW50KCksXHJcbiAgICAgICAgICAgIGJhckNvbnRlbnRMZWZ0Q29tcG9uZW50OiBhcHBsaWNhdGlvblN0b3JlLmdldEJhckNvbnRlbnRMZWZ0Q29tcG9uZW50KCksXHJcbiAgICAgICAgICAgIGJhckNvbnRlbnRSaWdodENvbXBvbmVudDogYXBwbGljYXRpb25TdG9yZS5nZXRCYXJDb250ZW50UmlnaHRDb21wb25lbnQoKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBjaGFuZ2UgaGFuZGxlci5cclxuICAgICovXHJcbiAgICBfaGFuZGxlQ29tcG9uZW50Q2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSBSZW5kZXJlZCBjb21wb25lbnRcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2JhckNvbnRlbnRMZWZ0Q29tcG9uZW50LCBiYXJDb250ZW50UmlnaHRDb21wb25lbnQsIHN1bW1hcnlDb21wb25lbnR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2hlYWRlci10b3Atcm93Jz5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdoZWFkZXItdG9wLXJvdy1sZWZ0Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2JhckNvbnRlbnRMZWZ0Q29tcG9uZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YmFyQ29udGVudExlZnRDb21wb25lbnQuY29tcG9uZW50IHsuLi5iYXJDb250ZW50TGVmdENvbXBvbmVudC5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdoZWFkZXItdG9wLXJvdy1yaWdodCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtiYXJDb250ZW50UmlnaHRDb21wb25lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiYXJDb250ZW50UmlnaHRDb21wb25lbnQuY29tcG9uZW50IHsuLi5iYXJDb250ZW50UmlnaHRDb21wb25lbnQucHJvcHN9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0naGVhZGVyLXRvcC1yb3ctbWlkZGxlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3N1bW1hcnlDb21wb25lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5Q29tcG9uZW50LmNvbXBvbmVudCB7Li4uc3VtbWFyeUNvbXBvbmVudC5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5IZWFkZXJUb3BSb3cuZGlzcGxheU5hbWUgPSAnSGVhZGVyVG9wUm93JztcclxuLy9IZWFkZXJUb3BSb3cuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG4vL0hlYWRlclRvcFJvdy5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJUb3BSb3c7XHJcbiJdfQ==