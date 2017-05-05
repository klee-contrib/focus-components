'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _translation = require('focus-core/translation');

var _text = require('../../components/input/text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var actionWrapper = require('../../page/search/search-header/action-wrapper');

// Components
var Scope = require('./scope').component;


// Mixins
var stylable = require('../../mixin/stylable');

/**
* SearchBar component
* @type {Object}
*/
var SearchBar = {
    mixins: [stylable],
    displayName: 'SearchBar',
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: 'search.bar.placeholder',
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help',
            hasScopes: true,
            identifier: undefined,
            store: undefined,
            action: undefined,
            onSearchCriteriaChangeByUser: undefined
        };
    },

    propTypes: {
        hasScopes: _react.PropTypes.bool,
        helpTranslationPath: _react.PropTypes.string,
        loading: _react.PropTypes.bool,
        minChar: _react.PropTypes.number,
        placeholder: _react.PropTypes.string,
        scopes: _react.PropTypes.array,
        value: _react.PropTypes.string,
        onSearchCriteriaChangeByUser: _react.PropTypes.func
    },
    /**
    * Get the initial state
    * @return {Object} the initial state
    */
    getInitialState: function getInitialState() {
        return {
            loading: this.props.loading,
            scope: this.props.store.getScope(),
            query: this.props.store.getQuery()
        };
    },

    /**
    * Component did mount handler
    */
    componentDidMount: function componentDidMount() {
        this._focusQuery();
    },

    /**
    * Component will mount handler
    */
    componentWillMount: function componentWillMount() {
        this.props.store.addQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.addScopeChangeListener(this._onScopeChangeFromStore);
        this.props.store.addResultsChangeListener(this._onResultsChangeFromStore);
    },

    /**
    * Component did unmount handler
    */
    componentWillUnmount: function componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
        this.props.store.removeResultsChangeListener(this._onResultsChangeFromStore);
    },

    /**
    * Query changed in store event handler
    */
    _onQueryChangeFromStore: function _onQueryChangeFromStore() {
        this.setState({
            query: this.props.store.getQuery()
        });
    },

    /**
    * Scope changed in store event handler
    */
    _onScopeChangeFromStore: function _onScopeChangeFromStore() {
        this.setState({
            scope: this.props.store.getScope()
        });
    },
    _onResultsChangeFromStore: function _onResultsChangeFromStore() {
        this.setState({ loading: false });
    },

    /**
    * Broadcast query change
    */
    _broadcastQueryChange: function _broadcastQueryChange() {
        var _this = this;

        actionWrapper(function () {
            _this.props.action.updateProperties({
                query: _this.refs.query.getValue()
            });
            _this.setState({
                loading: true
            });
        })();
    },

    /**
    * Input change handler
    * @param  {String} query the new query
    */
    _onInputChange: function _onInputChange(query) {
        this.setState({ query: query });
        var _props = this.props,
            minChar = _props.minChar,
            onSearchCriteriaChangeByUser = _props.onSearchCriteriaChangeByUser;

        if (query.length >= minChar) {
            this._broadcastQueryChange();
        }
        if (onSearchCriteriaChangeByUser) {
            onSearchCriteriaChangeByUser();
        }
    },

    /**
    * Scope selection handler
    * @param  {Object} scope selected scope
    */
    _onScopeSelection: function _onScopeSelection(scope) {
        this._focusQuery();
        var _props2 = this.props,
            action = _props2.action,
            onSearchCriteriaChangeByUser = _props2.onSearchCriteriaChangeByUser;

        action.updateProperties({
            scope: scope,
            selectedFacets: {},
            groupingKey: undefined,
            sortBy: undefined,
            sortAsc: true
        });
        this.setState({ scope: scope });
        if (onSearchCriteriaChangeByUser) {
            onSearchCriteriaChangeByUser();
        }
    },

    /**
    * Input key press handler
    * @param  {String} key pressed key
    */
    _handleInputKeyPress: function _handleInputKeyPress(_ref) {
        var _this2 = this;

        var key = _ref.key;

        if ('Enter' === key) {
            var onSearchCriteriaChangeByUser = this.props.onSearchCriteriaChangeByUser;

            actionWrapper(function () {
                _this2.props.action.updateProperties({
                    query: _this2.refs.query.getValue()
                });
            }, null, 0)();
            if (onSearchCriteriaChangeByUser) {
                onSearchCriteriaChangeByUser();
            }
        }
    },

    /**
    * Render help message
    * @return {HTML} rendered help message
    */
    _renderHelp: function _renderHelp() {
        return _react2.default.createElement(
            'div',
            { ref: 'help' },
            (0, _translation.translate)(this.props.helpTranslationPath)
        );
    },

    /**
    * Focus the query input field
    */
    _focusQuery: function _focusQuery() {
        _reactDom2.default.findDOMNode(this.refs.query).focus();
    },

    /**
    * Render the component.
    * @return {HTML} - The rendered component
    */
    render: function render() {
        var _props3 = this.props,
            hasScopes = _props3.hasScopes,
            scopes = _props3.scopes;
        var _state = this.state,
            loading = _state.loading,
            query = _state.query,
            scope = _state.scope;

        var placeholder = this.props.placeholder;
        if (query && 0 < query.length) {
            placeholder = '';
        }
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'search-bar' },
            hasScopes && _react2.default.createElement(Scope, { list: scopes, onScopeSelection: this._onScopeSelection, ref: 'scope', value: scope }),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'search-bar-input' },
                _react2.default.createElement(_text2.default, { name: 'searchbarinput', onChange: this._onInputChange, onKeyPress: this._handleInputKeyPress, placeholder: (0, _translation.translate)(placeholder), ref: 'query', value: query }),
                loading && _react2.default.createElement('div', { className: 'three-quarters-loader', 'data-role': 'spinner' })
            )
        );
    }
};

module.exports = (0, _builder2.default)(SearchBar);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJhY3Rpb25XcmFwcGVyIiwicmVxdWlyZSIsIlNjb3BlIiwiY29tcG9uZW50Iiwic3R5bGFibGUiLCJTZWFyY2hCYXIiLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsInBsYWNlaG9sZGVyIiwic2NvcGVzIiwibWluQ2hhciIsImxvYWRpbmciLCJoZWxwVHJhbnNsYXRpb25QYXRoIiwiaGFzU2NvcGVzIiwiaWRlbnRpZmllciIsInVuZGVmaW5lZCIsInN0b3JlIiwiYWN0aW9uIiwib25TZWFyY2hDcml0ZXJpYUNoYW5nZUJ5VXNlciIsInByb3BUeXBlcyIsImJvb2wiLCJzdHJpbmciLCJudW1iZXIiLCJhcnJheSIsInZhbHVlIiwiZnVuYyIsImdldEluaXRpYWxTdGF0ZSIsInByb3BzIiwic2NvcGUiLCJnZXRTY29wZSIsInF1ZXJ5IiwiZ2V0UXVlcnkiLCJjb21wb25lbnREaWRNb3VudCIsIl9mb2N1c1F1ZXJ5IiwiY29tcG9uZW50V2lsbE1vdW50IiwiYWRkUXVlcnlDaGFuZ2VMaXN0ZW5lciIsIl9vblF1ZXJ5Q2hhbmdlRnJvbVN0b3JlIiwiYWRkU2NvcGVDaGFuZ2VMaXN0ZW5lciIsIl9vblNjb3BlQ2hhbmdlRnJvbVN0b3JlIiwiYWRkUmVzdWx0c0NoYW5nZUxpc3RlbmVyIiwiX29uUmVzdWx0c0NoYW5nZUZyb21TdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlUXVlcnlDaGFuZ2VMaXN0ZW5lciIsInJlbW92ZVNjb3BlQ2hhbmdlTGlzdGVuZXIiLCJyZW1vdmVSZXN1bHRzQ2hhbmdlTGlzdGVuZXIiLCJzZXRTdGF0ZSIsIl9icm9hZGNhc3RRdWVyeUNoYW5nZSIsInVwZGF0ZVByb3BlcnRpZXMiLCJyZWZzIiwiZ2V0VmFsdWUiLCJfb25JbnB1dENoYW5nZSIsImxlbmd0aCIsIl9vblNjb3BlU2VsZWN0aW9uIiwic2VsZWN0ZWRGYWNldHMiLCJncm91cGluZ0tleSIsInNvcnRCeSIsInNvcnRBc2MiLCJfaGFuZGxlSW5wdXRLZXlQcmVzcyIsImtleSIsIl9yZW5kZXJIZWxwIiwiZmluZERPTU5vZGUiLCJmb2N1cyIsInJlbmRlciIsInN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFNQTs7Ozs7O0FBVkE7QUFNQSxJQUFNQSxnQkFBZ0JDLFFBQVEsZ0RBQVIsQ0FBdEI7O0FBRUE7QUFDQSxJQUFNQyxRQUFRRCxRQUFRLFNBQVIsRUFBbUJFLFNBQWpDOzs7QUFHQTtBQUNBLElBQU1DLFdBQVdILFFBQVEsc0JBQVIsQ0FBakI7O0FBRUE7Ozs7QUFJQSxJQUFNSSxZQUFZO0FBQ2RDLFlBQVEsQ0FBQ0YsUUFBRCxDQURNO0FBRWRHLGlCQUFhLFdBRkM7QUFHZDs7OztBQUlBQyxtQkFQYyw2QkFPSTtBQUNkLGVBQU87QUFDSEMseUJBQWEsd0JBRFY7QUFFSEMsb0JBQVEsRUFGTDtBQUdIQyxxQkFBUyxDQUhOO0FBSUhDLHFCQUFTLEtBSk47QUFLSEMsaUNBQXFCLGlCQUxsQjtBQU1IQyx1QkFBVyxJQU5SO0FBT0hDLHdCQUFZQyxTQVBUO0FBUUhDLG1CQUFPRCxTQVJKO0FBU0hFLG9CQUFRRixTQVRMO0FBVUhHLDBDQUE4Qkg7QUFWM0IsU0FBUDtBQVlILEtBcEJhOztBQXFCZEksZUFBVztBQUNQTixtQkFBVyxpQkFBVU8sSUFEZDtBQUVQUiw2QkFBcUIsaUJBQVVTLE1BRnhCO0FBR1BWLGlCQUFTLGlCQUFVUyxJQUhaO0FBSVBWLGlCQUFTLGlCQUFVWSxNQUpaO0FBS1BkLHFCQUFhLGlCQUFVYSxNQUxoQjtBQU1QWixnQkFBUSxpQkFBVWMsS0FOWDtBQU9QQyxlQUFPLGlCQUFVSCxNQVBWO0FBUVBILHNDQUE4QixpQkFBVU87QUFSakMsS0FyQkc7QUErQmQ7Ozs7QUFJQUMsbUJBbkNjLDZCQW1DSTtBQUNkLGVBQU87QUFDSGYscUJBQVMsS0FBS2dCLEtBQUws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LE1BQU1xQixNQUF0QixFQUE4QjtBQUMxQjNDLDBCQUFjLEVBQWQ7QUFDSDtBQUNELGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxZQUFoQjtBQUNDSyx5QkFDRyw4QkFBQyxLQUFELElBQU8sTUFBTUosTUFBYixFQUFxQixrQkFBa0IsS0FBSzJDLGlCQUE1QyxFQUErRCxLQUFJLE9BQW5FLEVBQTJFLE9BQU94QixLQUFsRixHQUZKO0FBSUE7QUFBQTtBQUFBLGtCQUFLLGNBQVcsa0JBQWhCO0FBQ0EsZ0VBQU8sTUFBSyxnQkFBWixFQUE2QixVQUFVLEtBQUtzQixjQUE1QyxFQUE0RCxZQUFZLEtBQUtPLG9CQUE3RSxFQUFtRyxhQUFhLDRCQUFVakQsV0FBVixDQUFoSCxFQUF3SSxLQUFJLE9BQTVJLEVBQW9KLE9BQU9zQixLQUEzSixHQURBO0FBRUNuQiwyQkFDRyx1Q0FBSyxXQUFVLHVCQUFmLEVBQXVDLGFBQVUsU0FBakQ7QUFISjtBQUpBLFNBREo7QUFhSDtBQTFMYSxDQUFsQjs7QUE2TEFxRCxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRN0QsU0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHt0cmFuc2xhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5cclxuY29uc3QgYWN0aW9uV3JhcHBlciA9IHJlcXVpcmUoJy4uLy4uL3BhZ2Uvc2VhcmNoL3NlYXJjaC1oZWFkZXIvYWN0aW9uLXdyYXBwZXInKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxuY29uc3QgU2NvcGUgPSByZXF1aXJlKCcuL3Njb3BlJykuY29tcG9uZW50O1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnB1dC90ZXh0JztcclxuXHJcbi8vIE1peGluc1xyXG5jb25zdCBzdHlsYWJsZSA9IHJlcXVpcmUoJy4uLy4uL21peGluL3N0eWxhYmxlJyk7XHJcblxyXG4vKipcclxuKiBTZWFyY2hCYXIgY29tcG9uZW50XHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgU2VhcmNoQmFyID0ge1xyXG4gICAgbWl4aW5zOiBbc3R5bGFibGVdLFxyXG4gICAgZGlzcGxheU5hbWU6ICdTZWFyY2hCYXInLFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBkZWZhdWx0IHByb3BlcnRpZXMuXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIGRlZmF1bHQgcHJvcHMuXHJcbiAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnc2VhcmNoLmJhci5wbGFjZWhvbGRlcicsXHJcbiAgICAgICAgICAgIHNjb3BlczogW10sXHJcbiAgICAgICAgICAgIG1pbkNoYXI6IDAsXHJcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWxwVHJhbnNsYXRpb25QYXRoOiAnc2VhcmNoLmJhci5oZWxwJyxcclxuICAgICAgICAgICAgaGFzU2NvcGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBpZGVudGlmaWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHN0b3JlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGFjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBvblNlYXJjaENyaXRlcmlhQ2hhbmdlQnlVc2VyOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGhhc1Njb3BlczogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgaGVscFRyYW5zbGF0aW9uUGF0aDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBtaW5DaGFyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHNjb3BlczogUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXI6IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgaW5pdGlhbCBzdGF0ZVxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBpbml0aWFsIHN0YXRlXHJcbiAgICAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMucHJvcHMubG9hZGluZyxcclxuICAgICAgICAgICAgc2NvcGU6IHRoaXMucHJvcHMuc3RvcmUuZ2V0U2NvcGUoKSxcclxuICAgICAgICAgICAgcXVlcnk6IHRoaXMucHJvcHMuc3RvcmUuZ2V0UXVlcnkoKVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBkaWQgbW91bnQgaGFuZGxlclxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzUXVlcnkoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgbW91bnQgaGFuZGxlclxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLnN0b3JlLmFkZFF1ZXJ5Q2hhbmdlTGlzdGVuZXIodGhpcy5fb25RdWVyeUNoYW5nZUZyb21TdG9yZSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZS5hZGRTY29wZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uU2NvcGVDaGFuZ2VGcm9tU3RvcmUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuc3RvcmUuYWRkUmVzdWx0c0NoYW5nZUxpc3RlbmVyKHRoaXMuX29uUmVzdWx0c0NoYW5nZUZyb21TdG9yZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBkaWQgdW5tb3VudCBoYW5kbGVyXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZS5yZW1vdmVRdWVyeUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uUXVlcnlDaGFuZ2VGcm9tU3RvcmUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuc3RvcmUucmVtb3ZlU2NvcGVDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vblNjb3BlQ2hhbmdlRnJvbVN0b3JlKTtcclxuICAgICAgICB0aGlzLnByb3BzLnN0b3JlLnJlbW92ZVJlc3VsdHNDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vblJlc3VsdHNDaGFuZ2VGcm9tU3RvcmUpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBRdWVyeSBjaGFuZ2VkIGluIHN0b3JlIGV2ZW50IGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfb25RdWVyeUNoYW5nZUZyb21TdG9yZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcXVlcnk6IHRoaXMucHJvcHMuc3RvcmUuZ2V0UXVlcnkoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTY29wZSBjaGFuZ2VkIGluIHN0b3JlIGV2ZW50IGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfb25TY29wZUNoYW5nZUZyb21TdG9yZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2NvcGU6IHRoaXMucHJvcHMuc3RvcmUuZ2V0U2NvcGUoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25SZXN1bHRzQ2hhbmdlRnJvbVN0b3JlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6IGZhbHNlfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEJyb2FkY2FzdCBxdWVyeSBjaGFuZ2VcclxuICAgICovXHJcbiAgICBfYnJvYWRjYXN0UXVlcnlDaGFuZ2UoKSB7XHJcbiAgICAgICAgYWN0aW9uV3JhcHBlcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWN0aW9uLnVwZGF0ZVByb3BlcnRpZXMoe1xyXG4gICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMucmVmcy5xdWVyeS5nZXRWYWx1ZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogSW5wdXQgY2hhbmdlIGhhbmRsZXJcclxuICAgICogQHBhcmFtICB7U3RyaW5nfSBxdWVyeSB0aGUgbmV3IHF1ZXJ5XHJcbiAgICAqL1xyXG4gICAgX29uSW5wdXRDaGFuZ2UocXVlcnkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtxdWVyeX0pO1xyXG4gICAgICAgIGNvbnN0IHttaW5DaGFyLCBvblNlYXJjaENyaXRlcmlhQ2hhbmdlQnlVc2VyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSBtaW5DaGFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jyb2FkY2FzdFF1ZXJ5Q2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXIpIHtcclxuICAgICAgICAgICAgb25TZWFyY2hDcml0ZXJpYUNoYW5nZUJ5VXNlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2NvcGUgc2VsZWN0aW9uIGhhbmRsZXJcclxuICAgICogQHBhcmFtICB7T2JqZWN0fSBzY29wZSBzZWxlY3RlZCBzY29wZVxyXG4gICAgKi9cclxuICAgIF9vblNjb3BlU2VsZWN0aW9uKHNjb3BlKSB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNRdWVyeSgpO1xyXG4gICAgICAgIGNvbnN0IHthY3Rpb24sIG9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBhY3Rpb24udXBkYXRlUHJvcGVydGllcyh7XHJcbiAgICAgICAgICAgIHNjb3BlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEZhY2V0czoge30sXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHNvcnRCeTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzb3J0QXNjOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2NvcGV9KTtcclxuICAgICAgICBpZihvblNlYXJjaENyaXRlcmlhQ2hhbmdlQnlVc2VyKSB7XHJcbiAgICAgICAgICAgIG9uU2VhcmNoQ3JpdGVyaWFDaGFuZ2VCeVVzZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIElucHV0IGtleSBwcmVzcyBoYW5kbGVyXHJcbiAgICAqIEBwYXJhbSAge1N0cmluZ30ga2V5IHByZXNzZWQga2V5XHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0S2V5UHJlc3Moe2tleX0pIHtcclxuICAgICAgICBpZiAoJ0VudGVyJyA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtvblNlYXJjaENyaXRlcmlhQ2hhbmdlQnlVc2VyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgICAgIGFjdGlvbldyYXBwZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb24udXBkYXRlUHJvcGVydGllcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMucmVmcy5xdWVyeS5nZXRWYWx1ZSgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgbnVsbCwgMCkoKTtcclxuICAgICAgICAgICAgaWYob25TZWFyY2hDcml0ZXJpYUNoYW5nZUJ5VXNlcikge1xyXG4gICAgICAgICAgICAgICAgb25TZWFyY2hDcml0ZXJpYUNoYW5nZUJ5VXNlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgaGVscCBtZXNzYWdlXHJcbiAgICAqIEByZXR1cm4ge0hUTUx9IHJlbmRlcmVkIGhlbHAgbWVzc2FnZVxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJIZWxwKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgcmVmPSdoZWxwJz57dHJhbnNsYXRlKHRoaXMucHJvcHMuaGVscFRyYW5zbGF0aW9uUGF0aCl9PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRm9jdXMgdGhlIHF1ZXJ5IGlucHV0IGZpZWxkXHJcbiAgICAqL1xyXG4gICAgX2ZvY3VzUXVlcnkoKSB7XHJcbiAgICAgICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnF1ZXJ5KS5mb2N1cygpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7SFRNTH0gLSBUaGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtoYXNTY29wZXMsIHNjb3Blc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtsb2FkaW5nLCBxdWVyeSwgc2NvcGV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xyXG4gICAgICAgIGlmKHF1ZXJ5ICYmIDAgPCBxdWVyeS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWFyY2gtYmFyJz5cclxuICAgICAgICAgICAge2hhc1Njb3BlcyAmJlxyXG4gICAgICAgICAgICAgICAgPFNjb3BlIGxpc3Q9e3Njb3Blc30gb25TY29wZVNlbGVjdGlvbj17dGhpcy5fb25TY29wZVNlbGVjdGlvbn0gcmVmPSdzY29wZScgdmFsdWU9e3Njb3BlfS8+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWFyY2gtYmFyLWlucHV0Jz5cclxuICAgICAgICAgICAgPElucHV0IG5hbWU9J3NlYXJjaGJhcmlucHV0JyBvbkNoYW5nZT17dGhpcy5fb25JbnB1dENoYW5nZX0gb25LZXlQcmVzcz17dGhpcy5faGFuZGxlSW5wdXRLZXlQcmVzc30gcGxhY2Vob2xkZXI9e3RyYW5zbGF0ZShwbGFjZWhvbGRlcil9IHJlZj0ncXVlcnknIHZhbHVlPXtxdWVyeX0vPlxyXG4gICAgICAgICAgICB7bG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RocmVlLXF1YXJ0ZXJzLWxvYWRlcicgZGF0YS1yb2xlPSdzcGlubmVyJz48L2Rpdj5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihTZWFyY2hCYXIpO1xyXG4iXX0=