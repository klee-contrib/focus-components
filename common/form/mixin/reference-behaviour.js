'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //Focus.reference.builder.loadListByName('papas').then(function(data){Focus.dispatcher.dispatch({action: {type: "update",data: {papas: data}}})})

var _builtInStore = require('focus-core/reference/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _builtInAction = require('focus-core/reference/built-in-action');

var _builtInAction2 = _interopRequireDefault(_builtInAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = require('lodash/lang/isEmpty');
var referenceMixin = {
    /** @inheritdoc */
    /*  getDefaultProps: function getReferenceDefaultProps(){
    return {*/
    /**
    * Array which contains all the reference lists.
    * If the referenceNames are set into the object, they are set into the default props.
    * @type {Array}
    */
    /*  referenceNames: this.referenceNames || []
    };
    },*/
    getInitialState: function getInitialState() {
        return { reference: {} };
    },

    /**
    * Build actions associated to the reference.
    */
    _buildReferenceActions: function _buildReferenceActions() {
        this.action = _extends({
            loadReference: (0, _builtInAction2.default)(this.referenceNames)
        }, this.action);
    },
    _loadReference: function _loadReference() {
        return this.action.loadReference();
    },

    /**
    * Build the reference names and set the store into the application.
    */
    _buildReferenceStoreConfig: function _buildReferenceStoreConfig() {

        //If the reference store is empty don't do anything.
        if (isEmpty(this.referenceNames)) {
            return;
        }
        this.stores = this.stores || [];
        //Set as referencestore the referencestore of the application.
        this.stores.push({
            store: (0, _builtInStore2.default)(),
            properties: this.referenceNames
        });
    },

    /**
    * Build store and actions related to the reference.
    */
    _buildReference: function _buildReference() {
        this._buildReferenceStoreConfig();
        this._buildReferenceActions();
    },

    /** @inheritdoc */
    componentWillMount: function componentWillMount() {
        this.referenceNames = this.props.referenceNames || this.referenceNames;
        this._buildReference();
    }
};

module.exports = referenceMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc0VtcHR5IiwicmVxdWlyZSIsInJlZmVyZW5jZU1peGluIiwiZ2V0SW5pdGlhbFN0YXRlIiwicmVmZXJlbmNlIiwiX2J1aWxkUmVmZXJlbmNlQWN0aW9ucyIsImFjdGlvbiIsImxvYWRSZWZlcmVuY2UiLCJyZWZlcmVuY2VOYW1lcyIsIl9sb2FkUmVmZXJlbmNlIiwiX2J1aWxkUmVmZXJlbmNlU3RvcmVDb25maWciLCJzdG9yZXMiLCJwdXNoIiwic3RvcmUiLCJwcm9wZXJ0aWVzIiwiX2J1aWxkUmVmZXJlbmNlIiwiY29tcG9uZW50V2lsbE1vdW50IiwicHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztrUUFBQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNQSxVQUFVQyxRQUFRLHFCQUFSLENBQWhCO0FBQ0EsSUFBTUMsaUJBQWlCO0FBQ25CO0FBQ0E7O0FBRUE7Ozs7O0FBS0E7OztBQUdBQyxtQkFabUIsNkJBWUQ7QUFDZCxlQUFPLEVBQUNDLFdBQVcsRUFBWixFQUFQO0FBQ0gsS0Fka0I7O0FBZW5COzs7QUFHQUMsMEJBbEJtQixvQ0FrQk07QUFDckIsYUFBS0MsTUFBTDtBQUNJQywyQkFBZSw2QkFBNkIsS0FBS0MsY0FBbEM7QUFEbkIsV0FFTyxLQUFLRixNQUZaO0FBSUgsS0F2QmtCO0FBd0JuQkcsa0JBeEJtQiw0QkF3QkY7QUFDYixlQUFPLEtBQUtILE1BQUwsQ0FBWUMsYUFBWixFQUFQO0FBQ0gsS0ExQmtCOztBQTJCbkI7OztBQUdBRyw4QkE5Qm1CLHdDQThCVTs7QUFFekI7QUFDQSxZQUFHVixRQUFRLEtBQUtRLGNBQWIsQ0FBSCxFQUFpQztBQUM3QjtBQUNIO0FBQ0QsYUFBS0csTUFBTCxHQUFjLEtBQUtBLE1BQUwsSUFBZSxFQUE3QjtBQUNBO0FBQ0EsYUFBS0EsTUFBTCxDQUFZQyxJQUFaLENBQWlCO0FBQ2JDLG1CQUFPLDZCQURNO0FBRWJDLHdCQUFZLEtBQUtOO0FBRkosU0FBakI7QUFJSCxLQTFDa0I7O0FBMkNuQjs7O0FBR0FPLG1CQTlDbUIsNkJBOENEO0FBQ2QsYUFBS0wsMEJBQUw7QUFDQSxhQUFLTCxzQkFBTDtBQUNILEtBakRrQjs7QUFrRG5CO0FBQ0FXLHNCQW5EbUIsZ0NBbURFO0FBQ2pCLGFBQUtSLGNBQUwsR0FBc0IsS0FBS1MsS0FBTCxDQUFXVCxjQUFYLElBQTZCLEtBQUtBLGNBQXhEO0FBQ0EsYUFBS08sZUFBTDtBQUNIO0FBdERrQixDQUF2Qjs7QUF5REFHLE9BQU9DLE9BQVAsR0FBaUJqQixjQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0ZvY3VzLnJlZmVyZW5jZS5idWlsZGVyLmxvYWRMaXN0QnlOYW1lKCdwYXBhcycpLnRoZW4oZnVuY3Rpb24oZGF0YSl7Rm9jdXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh7YWN0aW9uOiB7dHlwZTogXCJ1cGRhdGVcIixkYXRhOiB7cGFwYXM6IGRhdGF9fX0pfSlcclxuXHJcbmltcG9ydCBzdG9yZUdldHRlciBmcm9tICdmb2N1cy1jb3JlL3JlZmVyZW5jZS9idWlsdC1pbi1zdG9yZSc7XHJcbmltcG9ydCBidWlsdEluQWN0aW9uUmVmZXJlbmNlTG9hZGVyIGZyb20gJ2ZvY3VzLWNvcmUvcmVmZXJlbmNlL2J1aWx0LWluLWFjdGlvbic7XHJcbmNvbnN0IGlzRW1wdHkgPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc0VtcHR5Jyk7XHJcbmNvbnN0IHJlZmVyZW5jZU1peGluID0ge1xyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICAvKiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXRSZWZlcmVuY2VEZWZhdWx0UHJvcHMoKXtcclxuICAgIHJldHVybiB7Ki9cclxuICAgIC8qKlxyXG4gICAgKiBBcnJheSB3aGljaCBjb250YWlucyBhbGwgdGhlIHJlZmVyZW5jZSBsaXN0cy5cclxuICAgICogSWYgdGhlIHJlZmVyZW5jZU5hbWVzIGFyZSBzZXQgaW50byB0aGUgb2JqZWN0LCB0aGV5IGFyZSBzZXQgaW50byB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgKi9cclxuICAgIC8qICByZWZlcmVuY2VOYW1lczogdGhpcy5yZWZlcmVuY2VOYW1lcyB8fCBbXVxyXG4gICAgfTtcclxuICAgIH0sKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge3JlZmVyZW5jZToge319O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBCdWlsZCBhY3Rpb25zIGFzc29jaWF0ZWQgdG8gdGhlIHJlZmVyZW5jZS5cclxuICAgICovXHJcbiAgICBfYnVpbGRSZWZlcmVuY2VBY3Rpb25zKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0ge1xyXG4gICAgICAgICAgICBsb2FkUmVmZXJlbmNlOiBidWlsdEluQWN0aW9uUmVmZXJlbmNlTG9hZGVyKHRoaXMucmVmZXJlbmNlTmFtZXMpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmFjdGlvblxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgX2xvYWRSZWZlcmVuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uLmxvYWRSZWZlcmVuY2UoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQnVpbGQgdGhlIHJlZmVyZW5jZSBuYW1lcyBhbmQgc2V0IHRoZSBzdG9yZSBpbnRvIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgICovXHJcbiAgICBfYnVpbGRSZWZlcmVuY2VTdG9yZUNvbmZpZygpIHtcclxuXHJcbiAgICAgICAgLy9JZiB0aGUgcmVmZXJlbmNlIHN0b3JlIGlzIGVtcHR5IGRvbid0IGRvIGFueXRoaW5nLlxyXG4gICAgICAgIGlmKGlzRW1wdHkodGhpcy5yZWZlcmVuY2VOYW1lcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JlcyA9IHRoaXMuc3RvcmVzIHx8IFtdO1xyXG4gICAgICAgIC8vU2V0IGFzIHJlZmVyZW5jZXN0b3JlIHRoZSByZWZlcmVuY2VzdG9yZSBvZiB0aGUgYXBwbGljYXRpb24uXHJcbiAgICAgICAgdGhpcy5zdG9yZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHN0b3JlOiBzdG9yZUdldHRlcigpLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB0aGlzLnJlZmVyZW5jZU5hbWVzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHN0b3JlIGFuZCBhY3Rpb25zIHJlbGF0ZWQgdG8gdGhlIHJlZmVyZW5jZS5cclxuICAgICovXHJcbiAgICBfYnVpbGRSZWZlcmVuY2UoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVpbGRSZWZlcmVuY2VTdG9yZUNvbmZpZygpO1xyXG4gICAgICAgIHRoaXMuX2J1aWxkUmVmZXJlbmNlQWN0aW9ucygpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMucmVmZXJlbmNlTmFtZXMgPSB0aGlzLnByb3BzLnJlZmVyZW5jZU5hbWVzIHx8IHRoaXMucmVmZXJlbmNlTmFtZXM7XHJcbiAgICAgICAgdGhpcy5fYnVpbGRSZWZlcmVuY2UoKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVmZXJlbmNlTWl4aW47XHJcbiJdfQ==