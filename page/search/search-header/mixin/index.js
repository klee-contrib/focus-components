'use strict';

var _actionBuilder = require('focus-core/search/action-builder');

var _actionBuilder2 = _interopRequireDefault(_actionBuilder);

var _builtInStore = require('focus-core/search/built-in-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
var storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components
var SearchBar = require('../../../../search/search-bar').component;

// Actions


// Store


module.exports = {
    mixins: [referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getDefaultProps: function getDefaultProps() {
        return {
            service: undefined,
            store: _builtInStore.advancedSearchStore,
            onSearchCriteriaChange: undefined,
            onSearchCriteriaChangeByUser: undefined
        };
    },
    getInitialState: function getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount: function componentWillMount() {
        var _this = this;

        this._loadReference();
        this._action = this.props.action || (0, _actionBuilder2.default)({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: function getSearchOptions() {
                return _this.props.store.getValue.call(_this.props.store);
            } // Binding the store in the function call
        });
        this.props.store.addQueryChangeListener(this._onSearchCriteriaChange);
        this.props.store.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onSearchCriteriaChange);
        this.props.store.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange: function _onSearchCriteriaChange() {
        var onSearchCriteriaChange = this.props.onSearchCriteriaChange;

        if (onSearchCriteriaChange) {
            onSearchCriteriaChange();
        }
    },
    _SearchBarComponent: function _SearchBarComponent() {
        var _props = this.props,
            helpTranslationPath = _props.helpTranslationPath,
            minChar = _props.minChar,
            onSearchCriteriaChangeByUser = _props.onSearchCriteriaChangeByUser,
            placeholder = _props.placeholder,
            store = _props.store;
        var _state = this.state,
            isLoading = _state.isLoading,
            scopes = _state.reference.scopes;

        return React.createElement(SearchBar, {
            action: this._action,
            helpTranslationPath: helpTranslationPath,
            loading: isLoading,
            minChar: minChar,
            placeholder: placeholder,
            ref: 'searchBar',
            scopes: scopes,
            store: store,
            onSearchCriteriaChangeByUser: onSearchCriteriaChangeByUser });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJyZWZlcmVuY2VCZWhhdmlvdXIiLCJzdG9yZUJlaGF2aW91ciIsIlNlYXJjaEJhciIsImNvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtaXhpbnMiLCJyZWZlcmVuY2VOYW1lcyIsImdldERlZmF1bHRQcm9wcyIsInNlcnZpY2UiLCJ1bmRlZmluZWQiLCJzdG9yZSIsIm9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2UiLCJvblNlYXJjaENyaXRlcmlhQ2hhbmdlQnlVc2VyIiwiZ2V0SW5pdGlhbFN0YXRlIiwiaXNMb2FkaW5nIiwiY29tcG9uZW50V2lsbE1vdW50IiwiX2xvYWRSZWZlcmVuY2UiLCJfYWN0aW9uIiwicHJvcHMiLCJhY3Rpb24iLCJpZGVudGlmaWVyIiwiZ2V0U2VhcmNoT3B0aW9ucyIsImdldFZhbHVlIiwiY2FsbCIsImFkZFF1ZXJ5Q2hhbmdlTGlzdGVuZXIiLCJfb25TZWFyY2hDcml0ZXJpYUNoYW5nZSIsImFkZFNjb3BlQ2hhbmdlTGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZVF1ZXJ5Q2hhbmdlTGlzdGVuZXIiLCJyZW1vdmVTY29wZUNoYW5nZUxpc3RlbmVyIiwiX1NlYXJjaEJhckNvbXBvbmVudCIsImhlbHBUcmFuc2xhdGlvblBhdGgiLCJtaW5DaGFyIiwicGxhY2Vob2xkZXIiLCJzdGF0ZSIsInNjb3BlcyIsInJlZmVyZW5jZSJdLCJtYXBwaW5ncyI6Ijs7QUFRQTs7OztBQUdBOzs7O0FBWEEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNQyxxQkFBcUJELFFBQVEsbURBQVIsQ0FBM0I7QUFDQSxJQUFNRSxpQkFBaUJGLFFBQVEsMENBQVIsQ0FBdkI7O0FBRUE7QUFDQSxJQUFNRyxZQUFZSCxRQUFRLCtCQUFSLEVBQXlDSSxTQUEzRDs7QUFFQTs7O0FBR0E7OztBQUdBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLFlBQVEsQ0FBQ04sa0JBQUQsRUFBcUJDLGNBQXJCLENBREs7QUFFYk0sb0JBQWdCLENBQUMsUUFBRCxDQUZIO0FBR2JDLG1CQUhhLDZCQUdLO0FBQ2QsZUFBTztBQUNIQyxxQkFBU0MsU0FETjtBQUVIQyxvREFGRztBQUdIQyxvQ0FBd0JGLFNBSHJCO0FBSUhHLDBDQUE4Qkg7QUFKM0IsU0FBUDtBQU1ILEtBVlk7QUFXYkksbUJBWGEsNkJBV0s7QUFDZCxlQUFPO0FBQ0hDLHVCQUFXO0FBRFIsU0FBUDtBQUdILEtBZlk7QUFnQmJDLHNCQWhCYSxnQ0FnQlE7QUFBQTs7QUFDakIsYUFBS0MsY0FBTDtBQUNBLGFBQUtDLE9BQUwsR0FBZSxLQUFLQyxLQUFMLENBQVdDLE1BQVgsSUFBcUIsNkJBQWM7QUFDOUNYLHFCQUFTLEtBQUtVLEtBQUwsQ0FBV1YsT0FEMEI7QUFFOUNZLHdCQUFZLEtBQUtGLEtBQUwsQ0FBV1IsS0FBWCxDQUFpQlUsVUFGaUI7QUFHOUNDLDhCQUFrQiw0QkFBTTtBQUFDLHVCQUFPLE1BQUtILEtBQUwsQ0FBV1IsS0FBWCxDQUFpQlksUUFBakIsQ0FBMEJDLElBQTFCLENBQStCLE1BQUtMLEtBQUwsQ0FBV1IsS0FBMUMsQ0FBUDtBQUEwRCxhQUhyQyxDQUdzQztBQUh0QyxTQUFkLENBQXBDO0FBS0EsYUFBS1EsS0FBTCxDQUFXUixLQUFYLENBQWlCYyxzQkFBakIsQ0FBd0MsS0FBS0MsdUJBQTdDO0FBQ0EsYUFBS1AsS0FBTCxDQUFXUixLQUFYLENBQWlCZ0Isc0JBQWpCLENBQXdDLEtBQUtELHVCQUE3QztBQUNILEtBekJZO0FBMEJiRSx3QkExQmEsa0NBMEJVO0FBQ25CLGFBQUtULEtBQUwsQ0FBV1IsS0FBWCxDQUFpQmtCLHlCQUFqQixDQUEyQyxLQUFLSCx1QkFBaEQ7QUFDQSxhQUFLUCxLQUFMLENBQVdSLEtBQVgsQ0FBaUJtQix5QkFBakIsQ0FBMkMsS0FBS0osdUJBQWhEO0FBQ0gsS0E3Qlk7QUE4QmJBLDJCQTlCYSxxQ0E4QmE7QUFBQSxZQUNmZCxzQkFEZSxHQUNXLEtBQUtPLEtBRGhCLENBQ2ZQLHNCQURlOztBQUV0QixZQUFJQSxzQkFBSixFQUE0QjtBQUN4QkE7QUFDSDtBQUNKLEtBbkNZO0FBb0NibUIsdUJBcENhLGlDQW9DUztBQUFBLHFCQUN1RSxLQUFLWixLQUQ1RTtBQUFBLFlBQ1hhLG1CQURXLFVBQ1hBLG1CQURXO0FBQUEsWUFDVUMsT0FEVixVQUNVQSxPQURWO0FBQUEsWUFDbUJwQiw0QkFEbkIsVUFDbUJBLDRCQURuQjtBQUFBLFlBQ2lEcUIsV0FEakQsVUFDaURBLFdBRGpEO0FBQUEsWUFDOER2QixLQUQ5RCxVQUM4REEsS0FEOUQ7QUFBQSxxQkFFdUIsS0FBS3dCLEtBRjVCO0FBQUEsWUFFWHBCLFNBRlcsVUFFWEEsU0FGVztBQUFBLFlBRVlxQixNQUZaLFVBRUFDLFNBRkEsQ0FFWUQsTUFGWjs7QUFHbEIsZUFDSSxvQkFBQyxTQUFEO0FBQ0ksb0JBQVEsS0FBS2xCLE9BRGpCO0FBRUksaUNBQXFCYyxtQkFGekI7QUFHSSxxQkFBU2pCLFNBSGI7QUFJSSxxQkFBU2tCLE9BSmI7QUFLSSx5QkFBYUMsV0FMakI7QUFNSSxpQkFBSSxXQU5SO0FBT0ksb0JBQVFFLE1BUFo7QUFRSSxtQkFBT3pCLEtBUlg7QUFTSSwwQ0FBOEJFLDRCQVRsQyxHQURKO0FBWUg7QUFuRFksQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCByZWZlcmVuY2VCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9jb21tb24vZm9ybS9taXhpbi9yZWZlcmVuY2UtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IHN0b3JlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vY29tbW9uL21peGluL3N0b3JlLWJlaGF2aW91cicpO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5jb25zdCBTZWFyY2hCYXIgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9zZWFyY2gvc2VhcmNoLWJhcicpLmNvbXBvbmVudDtcclxuXHJcbi8vIEFjdGlvbnNcclxuaW1wb3J0IGFjdGlvbkJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9zZWFyY2gvYWN0aW9uLWJ1aWxkZXInO1xyXG5cclxuLy8gU3RvcmVcclxuaW1wb3J0IHthZHZhbmNlZFNlYXJjaFN0b3JlfSBmcm9tICdmb2N1cy1jb3JlL3NlYXJjaC9idWlsdC1pbi1zdG9yZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1peGluczogW3JlZmVyZW5jZUJlaGF2aW91ciwgc3RvcmVCZWhhdmlvdXJdLFxyXG4gICAgcmVmZXJlbmNlTmFtZXM6IFsnc2NvcGVzJ10sXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VydmljZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzdG9yZTogYWR2YW5jZWRTZWFyY2hTdG9yZSxcclxuICAgICAgICAgICAgb25TZWFyY2hDcml0ZXJpYUNoYW5nZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBvblNlYXJjaENyaXRlcmlhQ2hhbmdlQnlVc2VyOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZFJlZmVyZW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2FjdGlvbiA9IHRoaXMucHJvcHMuYWN0aW9uIHx8IGFjdGlvbkJ1aWxkZXIoe1xyXG4gICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLnByb3BzLnNlcnZpY2UsXHJcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IHRoaXMucHJvcHMuc3RvcmUuaWRlbnRpZmllcixcclxuICAgICAgICAgICAgZ2V0U2VhcmNoT3B0aW9uczogKCkgPT4ge3JldHVybiB0aGlzLnByb3BzLnN0b3JlLmdldFZhbHVlLmNhbGwodGhpcy5wcm9wcy5zdG9yZSk7IH0gLy8gQmluZGluZyB0aGUgc3RvcmUgaW4gdGhlIGZ1bmN0aW9uIGNhbGxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLnN0b3JlLmFkZFF1ZXJ5Q2hhbmdlTGlzdGVuZXIodGhpcy5fb25TZWFyY2hDcml0ZXJpYUNoYW5nZSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZS5hZGRTY29wZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uU2VhcmNoQ3JpdGVyaWFDaGFuZ2UpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuc3RvcmUucmVtb3ZlUXVlcnlDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vblNlYXJjaENyaXRlcmlhQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLnByb3BzLnN0b3JlLnJlbW92ZVNjb3BlQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25TZWFyY2hDcml0ZXJpYUNoYW5nZSk7XHJcbiAgICB9LFxyXG4gICAgX29uU2VhcmNoQ3JpdGVyaWFDaGFuZ2UoKSB7XHJcbiAgICAgICAgY29uc3Qge29uU2VhcmNoQ3JpdGVyaWFDaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAob25TZWFyY2hDcml0ZXJpYUNoYW5nZSkge1xyXG4gICAgICAgICAgICBvblNlYXJjaENyaXRlcmlhQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9TZWFyY2hCYXJDb21wb25lbnQoKSB7XHJcbiAgICAgICAgY29uc3Qge2hlbHBUcmFuc2xhdGlvblBhdGgsIG1pbkNoYXIsIG9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXIsIHBsYWNlaG9sZGVyLCBzdG9yZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmcsIHJlZmVyZW5jZToge3Njb3Blc319ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2VhcmNoQmFyXHJcbiAgICAgICAgICAgICAgICBhY3Rpb249e3RoaXMuX2FjdGlvbn1cclxuICAgICAgICAgICAgICAgIGhlbHBUcmFuc2xhdGlvblBhdGg9e2hlbHBUcmFuc2xhdGlvblBhdGh9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBtaW5DaGFyPXttaW5DaGFyfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICAgICAgcmVmPSdzZWFyY2hCYXInXHJcbiAgICAgICAgICAgICAgICBzY29wZXM9e3Njb3Blc31cclxuICAgICAgICAgICAgICAgIHN0b3JlPXtzdG9yZX1cclxuICAgICAgICAgICAgICAgIG9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXI9e29uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXJ9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuIl19