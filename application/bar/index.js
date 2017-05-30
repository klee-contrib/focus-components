'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');


var barMixin = {
    /**
    * Get initial state
    * @return {object} Initial state
    */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },

    /**
    * Component will mount
    */
    componentWillMount: function componentWillMount() {
        _builtInStore2.default.addSummaryComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.addBarContentLeftComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.addBarContentRightComponentChangeListener(this._handleComponentChange);
    },

    /**
    * Component will unmount.
    */
    componentWillUnmount: function componentWillUnmount() {
        _builtInStore2.default.removeSummaryComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.removeBarContentLeftComponentChangeListener(this._handleComponentChange);
        _builtInStore2.default.removeBarContentRightComponentChangeListener(this._handleComponentChange);
    },

    /**
    * Get state from store
    * @return {object} state from store
    */
    _getStateFromStore: function _getStateFromStore() {
        return {
            summaryComponent: _builtInStore2.default.getSummaryComponent(),
            barContentLeftComponent: _builtInStore2.default.getBarContentLeftComponent(),
            barContentRightComponent: _builtInStore2.default.getBarContentRightComponent()
        };
    },

    /**
    * Component change handler.
    */
    _handleComponentChange: function _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },

    /**
    * Render the component
    * @return {HTML} Rendered component
    */
    render: function render() {
        var _state = this.state,
            barContentLeftComponent = _state.barContentLeftComponent,
            barContentRightComponent = _state.barContentRightComponent,
            summaryComponent = _state.summaryComponent;

        return React.createElement(
            'div',
            { 'data-focus': 'bar' },
            React.createElement(
                'div',
                { 'data-focus': 'bar-content-left' },
                barContentLeftComponent && React.createElement(barContentLeftComponent.component, barContentLeftComponent.props)
            ),
            React.createElement(
                'div',
                { 'data-focus': 'bar-content-right' },
                barContentRightComponent && React.createElement(barContentRightComponent.component, barContentRightComponent.props)
            ),
            React.createElement(
                'div',
                { 'data-focus': 'bar-content-middle' },
                summaryComponent && React.createElement(summaryComponent.component, summaryComponent.props)
            )
        );
    }
};

module.exports = (0, _builder2.default)(barMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJiYXJNaXhpbiIsImdldEluaXRpYWxTdGF0ZSIsIl9nZXRTdGF0ZUZyb21TdG9yZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImFkZFN1bW1hcnlDb21wb25lbnRDaGFuZ2VMaXN0ZW5lciIsIl9oYW5kbGVDb21wb25lbnRDaGFuZ2UiLCJhZGRCYXJDb250ZW50TGVmdENvbXBvbmVudENoYW5nZUxpc3RlbmVyIiwiYWRkQmFyQ29udGVudFJpZ2h0Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZVN1bW1hcnlDb21wb25lbnRDaGFuZ2VMaXN0ZW5lciIsInJlbW92ZUJhckNvbnRlbnRMZWZ0Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIiLCJyZW1vdmVCYXJDb250ZW50UmlnaHRDb21wb25lbnRDaGFuZ2VMaXN0ZW5lciIsInN1bW1hcnlDb21wb25lbnQiLCJnZXRTdW1tYXJ5Q29tcG9uZW50IiwiYmFyQ29udGVudExlZnRDb21wb25lbnQiLCJnZXRCYXJDb250ZW50TGVmdENvbXBvbmVudCIsImJhckNvbnRlbnRSaWdodENvbXBvbmVudCIsImdldEJhckNvbnRlbnRSaWdodENvbXBvbmVudCIsInNldFN0YXRlIiwicmVuZGVyIiwic3RhdGUiLCJwcm9wcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFFQTs7Ozs7O0FBREEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7OztBQUdBLElBQU1DLFdBQVc7QUFDYjs7OztBQUlBQyxtQkFMYSw2QkFLSztBQUNkLGVBQU8sS0FBS0Msa0JBQUwsRUFBUDtBQUNILEtBUFk7O0FBUWI7OztBQUdBQyxzQkFYYSxnQ0FXUTtBQUNqQiwrQkFBaUJDLGlDQUFqQixDQUFtRCxLQUFLQyxzQkFBeEQ7QUFDQSwrQkFBaUJDLHdDQUFqQixDQUEwRCxLQUFLRCxzQkFBL0Q7QUFDQSwrQkFBaUJFLHlDQUFqQixDQUEyRCxLQUFLRixzQkFBaEU7QUFDSCxLQWZZOztBQWdCYjs7O0FBR0FHLHdCQW5CYSxrQ0FtQlU7QUFDbkIsK0JBQWlCQyxvQ0FBakIsQ0FBc0QsS0FBS0osc0JBQTNEO0FBQ0EsK0JBQWlCSywyQ0FBakIsQ0FBNkQsS0FBS0wsc0JBQWxFO0FBQ0EsK0JBQWlCTSw0Q0FBakIsQ0FBOEQsS0FBS04sc0JBQW5FO0FBQ0gsS0F2Qlk7O0FBd0JiOzs7O0FBSUFILHNCQTVCYSxnQ0E0QlE7QUFDakIsZUFBTztBQUNIVSw4QkFBa0IsdUJBQWlCQyxtQkFBakIsRUFEZjtBQUVIQyxxQ0FBeUIsdUJBQWlCQywwQkFBakIsRUFGdEI7QUFHSEMsc0NBQTBCLHVCQUFpQkMsMkJBQWpCO0FBSHZCLFNBQVA7QUFLSCxLQWxDWTs7QUFtQ2I7OztBQUdBWiwwQkF0Q2Esb0NBc0NZO0FBQ3JCLGFBQUthLFFBQUwsQ0FBYyxLQUFLaEIsa0JBQUwsRUFBZDtBQUNILEtBeENZOztBQXlDYjs7OztBQUlBaUIsVUE3Q2Esb0JBNkNKO0FBQUEscUJBQ3lFLEtBQUtDLEtBRDlFO0FBQUEsWUFDRU4sdUJBREYsVUFDRUEsdUJBREY7QUFBQSxZQUMyQkUsd0JBRDNCLFVBQzJCQSx3QkFEM0I7QUFBQSxZQUNxREosZ0JBRHJELFVBQ3FEQSxnQkFEckQ7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLEtBQWhCO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLGNBQVcsa0JBQWhCO0FBQ0tFLDJDQUNHLG9CQUFDLHVCQUFELENBQXlCLFNBQXpCLEVBQXVDQSx3QkFBd0JPLEtBQS9EO0FBRlIsYUFESjtBQU1JO0FBQUE7QUFBQSxrQkFBSyxjQUFXLG1CQUFoQjtBQUNLTCw0Q0FDRyxvQkFBQyx3QkFBRCxDQUEwQixTQUExQixFQUF3Q0EseUJBQXlCSyxLQUFqRTtBQUZSLGFBTko7QUFXSTtBQUFBO0FBQUEsa0JBQUssY0FBVyxvQkFBaEI7QUFDS1Qsb0NBQ0csb0JBQUMsZ0JBQUQsQ0FBa0IsU0FBbEIsRUFBZ0NBLGlCQUFpQlMsS0FBakQ7QUFGUjtBQVhKLFNBREo7QUFtQkg7QUFsRVksQ0FBakI7O0FBcUVBQyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRdkIsUUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgYXBwbGljYXRpb25TdG9yZSBmcm9tICdmb2N1cy1jb3JlL2FwcGxpY2F0aW9uL2J1aWx0LWluLXN0b3JlJztcclxuXHJcbmNvbnN0IGJhck1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIEdldCBpbml0aWFsIHN0YXRlXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gSW5pdGlhbCBzdGF0ZVxyXG4gICAgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgbW91bnRcclxuICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5hZGRTdW1tYXJ5Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgICAgICBhcHBsaWNhdGlvblN0b3JlLmFkZEJhckNvbnRlbnRMZWZ0Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgICAgICBhcHBsaWNhdGlvblN0b3JlLmFkZEJhckNvbnRlbnRSaWdodENvbXBvbmVudENoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCB3aWxsIHVubW91bnQuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5yZW1vdmVTdW1tYXJ5Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgICAgICBhcHBsaWNhdGlvblN0b3JlLnJlbW92ZUJhckNvbnRlbnRMZWZ0Q29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgICAgICBhcHBsaWNhdGlvblN0b3JlLnJlbW92ZUJhckNvbnRlbnRSaWdodENvbXBvbmVudENoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBzdGF0ZSBmcm9tIHN0b3JlXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gc3RhdGUgZnJvbSBzdG9yZVxyXG4gICAgKi9cclxuICAgIF9nZXRTdGF0ZUZyb21TdG9yZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdW1tYXJ5Q29tcG9uZW50OiBhcHBsaWNhdGlvblN0b3JlLmdldFN1bW1hcnlDb21wb25lbnQoKSxcclxuICAgICAgICAgICAgYmFyQ29udGVudExlZnRDb21wb25lbnQ6IGFwcGxpY2F0aW9uU3RvcmUuZ2V0QmFyQ29udGVudExlZnRDb21wb25lbnQoKSxcclxuICAgICAgICAgICAgYmFyQ29udGVudFJpZ2h0Q29tcG9uZW50OiBhcHBsaWNhdGlvblN0b3JlLmdldEJhckNvbnRlbnRSaWdodENvbXBvbmVudCgpXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVDb21wb25lbnRDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXRTdGF0ZUZyb21TdG9yZSgpKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcclxuICAgICogQHJldHVybiB7SFRNTH0gUmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtiYXJDb250ZW50TGVmdENvbXBvbmVudCwgYmFyQ29udGVudFJpZ2h0Q29tcG9uZW50LCBzdW1tYXJ5Q29tcG9uZW50fSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdiYXInPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdiYXItY29udGVudC1sZWZ0Jz5cclxuICAgICAgICAgICAgICAgICAgICB7YmFyQ29udGVudExlZnRDb21wb25lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJhckNvbnRlbnRMZWZ0Q29tcG9uZW50LmNvbXBvbmVudCB7Li4uYmFyQ29udGVudExlZnRDb21wb25lbnQucHJvcHN9Lz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nYmFyLWNvbnRlbnQtcmlnaHQnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtiYXJDb250ZW50UmlnaHRDb21wb25lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJhckNvbnRlbnRSaWdodENvbXBvbmVudC5jb21wb25lbnQgey4uLmJhckNvbnRlbnRSaWdodENvbXBvbmVudC5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdiYXItY29udGVudC1taWRkbGUnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzdW1tYXJ5Q29tcG9uZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5Q29tcG9uZW50LmNvbXBvbmVudCB7Li4uc3VtbWFyeUNvbXBvbmVudC5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGJhck1peGluKTtcclxuIl19