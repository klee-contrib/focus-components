'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _actionBuilder = require('focus-core/search/action-builder');

var _actionBuilder2 = _interopRequireDefault(_actionBuilder);

var _builtInStore = require('focus-core/search/built-in-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // Dependencies


// Components
var DefaultSearchBar = require('../../../search/search-bar').component;
var Results = require('../common/component/results').component;


// Mixins
var referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
var storeBehaviour = require('../../../common/mixin/store-behaviour');

// Actions


// Stores


/**
* General search mixin.
* Contains a search bar, and a results list.
* @type {Object}
*/
var QuickSearchComponent = {
    /**
    * Component's mixins
    * @type {Array}
    */
    mixins: [referenceBehaviour, storeBehaviour],
    /**
    * Tag name.
    */
    displayName: 'QuickSearch',
    /**
    * Reference names to be fetched by the reference behaviour
    * @type {Array}
    */
    referenceNames: ['scopes'],
    /**
    * Get the default props
    * @return {object} the default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            action: undefined,
            groupComponent: _group2.default,
            groupMaxRows: undefined,
            lineComponentMapper: undefined,
            lineOperationList: undefined,
            onLineClick: undefined,
            scopesConfig: {},
            scopeFacetKey: 'FCT_SCOPE',
            scopeSelectionHandler: this._scopeSelectionHandler,
            scrollParentSelector: undefined,
            SearchBar: DefaultSearchBar,
            service: undefined,
            store: _builtInStore.quickSearchStore
        };
    },

    /**
    * Prop validation
    * @type {Object}
    */
    propTypes: {
        action: _react.PropTypes.object,
        groupComponent: _react.PropTypes.func,
        groupMaxRows: _react.PropTypes.number,
        lineComponentMapper: _react.PropTypes.func,
        onLineClick: _react.PropTypes.func,
        scopesConfig: _react.PropTypes.object,
        scopeFacetKey: _react.PropTypes.string,
        scopeSelectionHandler: _react.PropTypes.func,
        service: _react.PropTypes.object,
        store: _react.PropTypes.object,
        showAllHandler: _react.PropTypes.func
    },
    /**
    * Register the store listeners
    */
    componentWillMount: function componentWillMount() {
        var _props = this.props,
            action = _props.action,
            service = _props.service,
            store = _props.store;

        this._action = action || (0, _actionBuilder2.default)({
            service: service,
            identifier: store.identifier,
            getSearchOptions: function getSearchOptions() {
                return store.getValue.call(store);
            } // Binding the store in the function call
        });
        this._loadReference();

        store.on('quick-search-criterias:change', this._triggerSearch);
        // store.addQueryChangeListener(this._triggerSearch);
        // store.addScopeChangeListener(this._triggerSearch);
        store.addResultsChangeListener(this._onResultsChange);
    },

    /**
    * Unregister the store listeners
    */
    componentWillUnmount: function componentWillUnmount() {
        var store = this.props.store;

        store.removeListener('quick-search-criterias:change', this._triggerSearch);
        // store.removeQueryChangeListener(this._triggerSearch);
        // store.removeScopeChangeListener(this._triggerSearch);
        store.removeResultsChangeListener(this._onResultsChange);
    },

    /**
    * Trigger search
    */
    _triggerSearch: function _triggerSearch() {
        this._action.search();
    },

    /**
    * Results change handler
    */
    _onResultsChange: function _onResultsChange() {
        var store = this.props.store;

        var resultsMap = store.getResults();
        var facets = store.getFacets();
        var totalCount = store.getTotalCount();
        this.setState({ resultsMap: resultsMap, facets: facets, totalCount: totalCount });
    },

    /**
    * Action on line click.
    * @param {object} item  the item clicked
    */
    _lineClickHandler: function _lineClickHandler(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },

    /**
    * redner the SearchBar
    * @returns {HTML} the rendered component
    */
    _renderSearchBar: function _renderSearchBar() {
        var _props2 = this.props,
            placeholder = _props2.placeholder,
            SearchBar = _props2.SearchBar,
            store = _props2.store;
        var _state = this.state,
            isLoading = _state.isLoading,
            scopes = _state.reference.scopes;

        return _react2.default.createElement(SearchBar, {
            action: this._action,
            'data-focus': 'search-bar',
            loading: isLoading,
            placeholder: placeholder,
            ref: 'searchBar',
            scopes: scopes,
            store: store
        });
    },

    /**
    * redner the results
    * @returns {HTML} the rendered component
    */
    _renderResults: function _renderResults() {
        // Adding 'action' in this.props destructuring here prevent the fact that '...otherProps' consider the props 'action' in otherProps.
        // It didn't give 'this._action' to the 'action' props without doing it
        var _props3 = this.props,
            action = _props3.action,
            groupComponent = _props3.groupComponent,
            groupMaxRows = _props3.groupMaxRows,
            lineComponentMapper = _props3.lineComponentMapper,
            lineOperationList = _props3.lineOperationList,
            scrollParentSelector = _props3.scrollParentSelector,
            scopeFacetKey = _props3.scopeFacetKey,
            store = _props3.store,
            scopesConfig = _props3.scopesConfig,
            otherProps = _objectWithoutProperties(_props3, ['action', 'groupComponent', 'groupMaxRows', 'lineComponentMapper', 'lineOperationList', 'scrollParentSelector', 'scopeFacetKey', 'store', 'scopesConfig']);

        var _state2 = this.state,
            facets = _state2.facets,
            resultsMap = _state2.resultsMap,
            totalCount = _state2.totalCount;

        return _react2.default.createElement(Results, _extends({
            action: this._action,
            groupComponent: groupComponent,
            groupingKey: scopeFacetKey,
            initialRowsCount: groupMaxRows,
            isSelection: false,
            lineClickHandler: this._lineClickHandler,
            lineComponentMapper: lineComponentMapper,
            lineOperationList: lineOperationList,
            resultsFacets: facets,
            resultsMap: resultsMap,
            scopesConfig: scopesConfig,
            scrollParentSelector: scrollParentSelector,
            store: store,
            totalCount: totalCount
        }, otherProps));
    },

    /**
    * Render the component
    * @return {HTML} the rendered component
    */
    render: function render() {

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'quick-search' },
            _react2.default.createElement(
                'div',
                { 'data-focus': 'quick-search-bar' },
                this._renderSearchBar()
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'quick-search-results' },
                this._renderResults()
            )
        );
    }
};

module.exports = (0, _builder2.default)(QuickSearchComponent);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0U2VhcmNoQmFyIiwicmVxdWlyZSIsImNvbXBvbmVudCIsIlJlc3VsdHMiLCJyZWZlcmVuY2VCZWhhdmlvdXIiLCJzdG9yZUJlaGF2aW91ciIsIlF1aWNrU2VhcmNoQ29tcG9uZW50IiwibWl4aW5zIiwiZGlzcGxheU5hbWUiLCJyZWZlcmVuY2VOYW1lcyIsImdldERlZmF1bHRQcm9wcyIsImFjdGlvbiIsInVuZGVmaW5lZCIsImdyb3VwQ29tcG9uZW50IiwiZ3JvdXBNYXhSb3dzIiwibGluZUNvbXBvbmVudE1hcHBlciIsImxpbmVPcGVyYXRpb25MaXN0Iiwib25MaW5lQ2xpY2siLCJzY29wZXNDb25maWciLCJzY29wZUZhY2V0S2V5Iiwic2NvcGVTZWxlY3Rpb25IYW5kbGVyIiwiX3Njb3BlU2VsZWN0aW9uSGFuZGxlciIsInNjcm9sbFBhcmVudFNlbGVjdG9yIiwiU2VhcmNoQmFyIiwic2VydmljZSIsInN0b3JlIiwicHJvcFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIm51bWJlciIsInN0cmluZyIsInNob3dBbGxIYW5kbGVyIiwiY29tcG9uZW50V2lsbE1vdW50IiwicHJvcHMiLCJfYWN0aW9uIiwiaWRlbnRpZmllciIsImdldFNlYXJjaE9wdGlvbnMiLCJnZXRWYWx1ZSIsImNhbGwiLCJfbG9hZFJlZmVyZW5jZSIsIm9uIiwiX3RyaWdnZXJTZWFyY2giLCJhZGRSZXN1bHRzQ2hhbmdlTGlzdGVuZXIiLCJfb25SZXN1bHRzQ2hhbmdlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZVJlc3VsdHNDaGFuZ2VMaXN0ZW5lciIsInNlYXJjaCIsInJlc3VsdHNNYXAiLCJnZXRSZXN1bHRzIiwiZmFjZXRzIiwiZ2V0RmFjZXRzIiwidG90YWxDb3VudCIsImdldFRvdGFsQ291bnQiLCJzZXRTdGF0ZSIsIl9saW5lQ2xpY2tIYW5kbGVyIiwiaXRlbSIsIl9yZW5kZXJTZWFyY2hCYXIiLCJwbGFjZWhvbGRlciIsInN0YXRlIiwiaXNMb2FkaW5nIiwic2NvcGVzIiwicmVmZXJlbmNlIiwiX3JlbmRlclJlc3VsdHMiLCJvdGhlclByb3BzIiwicmVuZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFLQTs7OztBQU9BOzs7O0FBR0E7Ozs7Nk5BakJBOzs7QUFJQTtBQUNBLElBQU1BLG1CQUFtQkMsUUFBUSw0QkFBUixFQUFzQ0MsU0FBL0Q7QUFDQSxJQUFNQyxVQUFVRixRQUFRLDZCQUFSLEVBQXVDQyxTQUF2RDs7O0FBR0E7QUFDQSxJQUFNRSxxQkFBcUJILFFBQVEsZ0RBQVIsQ0FBM0I7QUFDQSxJQUFNSSxpQkFBaUJKLFFBQVEsdUNBQVIsQ0FBdkI7O0FBRUE7OztBQUdBOzs7QUFHQTs7Ozs7QUFLQSxJQUFNSyx1QkFBdUI7QUFDekI7Ozs7QUFJQUMsWUFBUSxDQUFDSCxrQkFBRCxFQUFxQkMsY0FBckIsQ0FMaUI7QUFNekI7OztBQUdBRyxpQkFBYSxhQVRZO0FBVXpCOzs7O0FBSUFDLG9CQUFnQixDQUFDLFFBQUQsQ0FkUztBQWV6Qjs7OztBQUlBQyxtQkFuQnlCLDZCQW1CUDtBQUNkLGVBQU87QUFDSEMsb0JBQVFDLFNBREw7QUFFSEMsMkNBRkc7QUFHSEMsMEJBQWNGLFNBSFg7QUFJSEcsaUNBQXFCSCxTQUpsQjtBQUtISSwrQkFBbUJKLFNBTGhCO0FBTUhLLHlCQUFhTCxTQU5WO0FBT0hNLDBCQUFjLEVBUFg7QUFRSEMsMkJBQWUsV0FSWjtBQVNIQyxtQ0FBdUIsS0FBS0Msc0JBVHpCO0FBVUhDLGtDQUFzQlYsU0FWbkI7QUFXSFcsdUJBQVd2QixnQkFYUjtBQVlId0IscUJBQVNaLFNBWk47QUFhSGE7QUFiRyxTQUFQO0FBZUgsS0FuQ3dCOztBQW9DekI7Ozs7QUFJQUMsZUFBVztBQUNQZixnQkFBUSxpQkFBVWdCLE1BRFg7QUFFUGQsd0JBQWdCLGlCQUFVZSxJQUZuQjtBQUdQZCxz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QUNLLHFCQUFLTSxjQUFMO0FBREw7QUFKSixTQURKO0FBVUg7QUF6S3dCLENBQTdCOztBQTRLQUcsT0FBT0MsT0FBUCxHQUFpQix1QkFBUTdELG9CQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbmNvbnN0IERlZmF1bHRTZWFyY2hCYXIgPSByZXF1aXJlKCcuLi8uLi8uLi9zZWFyY2gvc2VhcmNoLWJhcicpLmNvbXBvbmVudDtcclxuY29uc3QgUmVzdWx0cyA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jb21wb25lbnQvcmVzdWx0cycpLmNvbXBvbmVudDtcclxuaW1wb3J0IERlZmF1bHRHcm91cENvbXBvbmVudCBmcm9tICcuL2dyb3VwJztcclxuXHJcbi8vIE1peGluc1xyXG5jb25zdCByZWZlcmVuY2VCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vZm9ybS9taXhpbi9yZWZlcmVuY2UtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IHN0b3JlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL21peGluL3N0b3JlLWJlaGF2aW91cicpO1xyXG5cclxuLy8gQWN0aW9uc1xyXG5pbXBvcnQgYWN0aW9uQnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL3NlYXJjaC9hY3Rpb24tYnVpbGRlcic7XHJcblxyXG4vLyBTdG9yZXNcclxuaW1wb3J0IHtxdWlja1NlYXJjaFN0b3JlfSBmcm9tICdmb2N1cy1jb3JlL3NlYXJjaC9idWlsdC1pbi1zdG9yZSc7XHJcblxyXG4vKipcclxuKiBHZW5lcmFsIHNlYXJjaCBtaXhpbi5cclxuKiBDb250YWlucyBhIHNlYXJjaCBiYXIsIGFuZCBhIHJlc3VsdHMgbGlzdC5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCBRdWlja1NlYXJjaENvbXBvbmVudCA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQncyBtaXhpbnNcclxuICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgKi9cclxuICAgIG1peGluczogW3JlZmVyZW5jZUJlaGF2aW91ciwgc3RvcmVCZWhhdmlvdXJdLFxyXG4gICAgLyoqXHJcbiAgICAqIFRhZyBuYW1lLlxyXG4gICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnUXVpY2tTZWFyY2gnLFxyXG4gICAgLyoqXHJcbiAgICAqIFJlZmVyZW5jZSBuYW1lcyB0byBiZSBmZXRjaGVkIGJ5IHRoZSByZWZlcmVuY2UgYmVoYXZpb3VyXHJcbiAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICovXHJcbiAgICByZWZlcmVuY2VOYW1lczogWydzY29wZXMnXSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGRlZmF1bHQgcHJvcHNcclxuICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhY3Rpb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ3JvdXBDb21wb25lbnQ6IERlZmF1bHRHcm91cENvbXBvbmVudCxcclxuICAgICAgICAgICAgZ3JvdXBNYXhSb3dzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxpbmVDb21wb25lbnRNYXBwZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbGluZU9wZXJhdGlvbkxpc3Q6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgb25MaW5lQ2xpY2s6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2NvcGVzQ29uZmlnOiB7fSxcclxuICAgICAgICAgICAgc2NvcGVGYWNldEtleTogJ0ZDVF9TQ09QRScsXHJcbiAgICAgICAgICAgIHNjb3BlU2VsZWN0aW9uSGFuZGxlcjogdGhpcy5fc2NvcGVTZWxlY3Rpb25IYW5kbGVyLFxyXG4gICAgICAgICAgICBzY3JvbGxQYXJlbnRTZWxlY3RvcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBTZWFyY2hCYXI6IERlZmF1bHRTZWFyY2hCYXIsXHJcbiAgICAgICAgICAgIHNlcnZpY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc3RvcmU6IHF1aWNrU2VhcmNoU3RvcmVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBQcm9wIHZhbGlkYXRpb25cclxuICAgICogQHR5cGUge09iamVjdH1cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBhY3Rpb246IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgZ3JvdXBDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGdyb3VwTWF4Um93czogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBsaW5lQ29tcG9uZW50TWFwcGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBvbkxpbmVDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgc2NvcGVzQ29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgIHNjb3BlRmFjZXRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgc2NvcGVTZWxlY3Rpb25IYW5kbGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBzZXJ2aWNlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgIHN0b3JlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgIHNob3dBbGxIYW5kbGVyOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZWdpc3RlciB0aGUgc3RvcmUgbGlzdGVuZXJzXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHthY3Rpb24sIHNlcnZpY2UsIHN0b3JlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gYWN0aW9uIHx8IGFjdGlvbkJ1aWxkZXIoe1xyXG4gICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxyXG4gICAgICAgICAgICBpZGVudGlmaWVyOiBzdG9yZS5pZGVudGlmaWVyLFxyXG4gICAgICAgICAgICBnZXRTZWFyY2hPcHRpb25zOiAoKSA9PiB7cmV0dXJuIHN0b3JlLmdldFZhbHVlLmNhbGwoc3RvcmUpOyB9IC8vIEJpbmRpbmcgdGhlIHN0b3JlIGluIHRoZSBmdW5jdGlvbiBjYWxsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbG9hZFJlZmVyZW5jZSgpO1xyXG5cclxuICAgICAgICBzdG9yZS5vbigncXVpY2stc2VhcmNoLWNyaXRlcmlhczpjaGFuZ2UnLCB0aGlzLl90cmlnZ2VyU2VhcmNoKTtcclxuICAgICAgICAvLyBzdG9yZS5hZGRRdWVyeUNoYW5nZUxpc3RlbmVyKHRoaXMuX3RyaWdnZXJTZWFyY2gpO1xyXG4gICAgICAgIC8vIHN0b3JlLmFkZFNjb3BlQ2hhbmdlTGlzdGVuZXIodGhpcy5fdHJpZ2dlclNlYXJjaCk7XHJcbiAgICAgICAgc3RvcmUuYWRkUmVzdWx0c0NoYW5nZUxpc3RlbmVyKHRoaXMuX29uUmVzdWx0c0NoYW5nZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFVucmVnaXN0ZXIgdGhlIHN0b3JlIGxpc3RlbmVyc1xyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtzdG9yZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHN0b3JlLnJlbW92ZUxpc3RlbmVyKCdxdWljay1zZWFyY2gtY3JpdGVyaWFzOmNoYW5nZScsIHRoaXMuX3RyaWdnZXJTZWFyY2gpO1xyXG4gICAgICAgIC8vIHN0b3JlLnJlbW92ZVF1ZXJ5Q2hhbmdlTGlzdGVuZXIodGhpcy5fdHJpZ2dlclNlYXJjaCk7XHJcbiAgICAgICAgLy8gc3RvcmUucmVtb3ZlU2NvcGVDaGFuZ2VMaXN0ZW5lcih0aGlzLl90cmlnZ2VyU2VhcmNoKTtcclxuICAgICAgICBzdG9yZS5yZW1vdmVSZXN1bHRzQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25SZXN1bHRzQ2hhbmdlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVHJpZ2dlciBzZWFyY2hcclxuICAgICovXHJcbiAgICBfdHJpZ2dlclNlYXJjaCgpIHtcclxuICAgICAgICB0aGlzLl9hY3Rpb24uc2VhcmNoKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlc3VsdHMgY2hhbmdlIGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfb25SZXN1bHRzQ2hhbmdlKCkge1xyXG4gICAgICAgIGNvbnN0IHtzdG9yZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHNNYXAgPSBzdG9yZS5nZXRSZXN1bHRzKCk7XHJcbiAgICAgICAgY29uc3QgZmFjZXRzID0gc3RvcmUuZ2V0RmFjZXRzKCk7XHJcbiAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IHN0b3JlLmdldFRvdGFsQ291bnQoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZXN1bHRzTWFwLCBmYWNldHMsIHRvdGFsQ291bnR9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQWN0aW9uIG9uIGxpbmUgY2xpY2suXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtICB0aGUgaXRlbSBjbGlja2VkXHJcbiAgICAqL1xyXG4gICAgX2xpbmVDbGlja0hhbmRsZXIoaXRlbSkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uTGluZUNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25MaW5lQ2xpY2soaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiByZWRuZXIgdGhlIFNlYXJjaEJhclxyXG4gICAgKiBAcmV0dXJucyB7SFRNTH0gdGhlIHJlbmRlcmVkIGNvbXBvbmVudFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJTZWFyY2hCYXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3BsYWNlaG9sZGVyLCBTZWFyY2hCYXIsIHN0b3JlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2lzTG9hZGluZywgcmVmZXJlbmNlOiB7c2NvcGVzfX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTZWFyY2hCYXJcclxuICAgICAgICAgICAgICAgIGFjdGlvbj17dGhpcy5fYWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgZGF0YS1mb2N1cz0nc2VhcmNoLWJhcidcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgICAgIHJlZj0nc2VhcmNoQmFyJ1xyXG4gICAgICAgICAgICAgICAgc2NvcGVzPXtzY29wZXN9XHJcbiAgICAgICAgICAgICAgICBzdG9yZT17c3RvcmV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogcmVkbmVyIHRoZSByZXN1bHRzXHJcbiAgICAqIEByZXR1cm5zIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgX3JlbmRlclJlc3VsdHMoKSB7XHJcbiAgICAgICAgLy8gQWRkaW5nICdhY3Rpb24nIGluIHRoaXMucHJvcHMgZGVzdHJ1Y3R1cmluZyBoZXJlIHByZXZlbnQgdGhlIGZhY3QgdGhhdCAnLi4ub3RoZXJQcm9wcycgY29uc2lkZXIgdGhlIHByb3BzICdhY3Rpb24nIGluIG90aGVyUHJvcHMuXHJcbiAgICAgICAgLy8gSXQgZGlkbid0IGdpdmUgJ3RoaXMuX2FjdGlvbicgdG8gdGhlICdhY3Rpb24nIHByb3BzIHdpdGhvdXQgZG9pbmcgaXRcclxuICAgICAgICBjb25zdCB7YWN0aW9uLCBncm91cENvbXBvbmVudCwgZ3JvdXBNYXhSb3dzLCBsaW5lQ29tcG9uZW50TWFwcGVyLCBsaW5lT3BlcmF0aW9uTGlzdCwgc2Nyb2xsUGFyZW50U2VsZWN0b3IsIHNjb3BlRmFjZXRLZXksIHN0b3JlLCBzY29wZXNDb25maWcsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7ZmFjZXRzLCByZXN1bHRzTWFwLCB0b3RhbENvdW50fSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFJlc3VsdHNcclxuICAgICAgICAgICAgICAgIGFjdGlvbj17dGhpcy5fYWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgZ3JvdXBDb21wb25lbnQ9e2dyb3VwQ29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdLZXk9e3Njb3BlRmFjZXRLZXl9XHJcbiAgICAgICAgICAgICAgICBpbml0aWFsUm93c0NvdW50PXtncm91cE1heFJvd3N9XHJcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGlvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICBsaW5lQ2xpY2tIYW5kbGVyPXt0aGlzLl9saW5lQ2xpY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbXBvbmVudE1hcHBlcj17bGluZUNvbXBvbmVudE1hcHBlcn1cclxuICAgICAgICAgICAgICAgIGxpbmVPcGVyYXRpb25MaXN0PXtsaW5lT3BlcmF0aW9uTGlzdH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdHNGYWNldHM9e2ZhY2V0c31cclxuICAgICAgICAgICAgICAgIHJlc3VsdHNNYXA9e3Jlc3VsdHNNYXB9XHJcbiAgICAgICAgICAgICAgICBzY29wZXNDb25maWc9e3Njb3Blc0NvbmZpZ31cclxuICAgICAgICAgICAgICAgIHNjcm9sbFBhcmVudFNlbGVjdG9yPXtzY3JvbGxQYXJlbnRTZWxlY3Rvcn1cclxuICAgICAgICAgICAgICAgIHN0b3JlPXtzdG9yZX1cclxuICAgICAgICAgICAgICAgIHRvdGFsQ291bnQ9e3RvdGFsQ291bnR9XHJcbiAgICAgICAgICAgICAgICB7Li4ub3RoZXJQcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3F1aWNrLXNlYXJjaCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3F1aWNrLXNlYXJjaC1iYXInPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJTZWFyY2hCYXIoKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdxdWljay1zZWFyY2gtcmVzdWx0cyc+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclJlc3VsdHMoKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKFF1aWNrU2VhcmNoQ29tcG9uZW50KTtcclxuIl19