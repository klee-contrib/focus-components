//dependencies
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var types = require('focus').component.types;

var _require = require('focus');

var dispatcher = _require.dispatcher;

/**
 * Component describing a component.
 */

var ComponentSearch = (function (_Component) {
    _inherits(ComponentSearch, _Component);

    function ComponentSearch(props) {
        _classCallCheck(this, ComponentSearch);

        _Component.call(this, props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getStateFromStore = this.getStateFromStore.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this.state = { criteria: { query: null } };
    }

    //Static props.

    ComponentSearch.prototype.getStateFromStore = function getStateFromStore() {
        var store = this.props.store;

        return store.getValue();
    };

    ComponentSearch.prototype.componentWillMount = function componentWillMount() {
        var _this = this;

        var store = this.props.store;

        store.addCriteriaChangeListener(function () {
            return _this.getStateFromStore();
        });
    };

    ComponentSearch.prototype.componentWillUnMount = function componentWillUnMount() {
        var _this2 = this;

        var store = this.props.store;

        store.removeCriteriaChangeListener(function () {
            return _this2.getStateFromStore();
        });
    };

    ComponentSearch.prototype._handleOnChange = function _handleOnChange() {
        var store = this.props.store;

        var query = React.findDOMNode(this.refs.input).value;
        //Dispatch the new criteria value..
        dispatcher.handleViewAction({
            data: { criteria: { query: query } },
            type: 'update',
            identifier: store.identifier
        });
    };

    /** @inheriteDoc */

    ComponentSearch.prototype.render = function render() {
        var criteria = this.state.criteria;
        var query = criteria.query;

        return React.createElement(
            'form',
            { action: '#' },
            React.createElement(
                'div',
                { className: 'mdl-textfield mdl-js-textfield mdl-textfield--expandable' },
                React.createElement(
                    'label',
                    { className: 'mdl-button mdl-js-button mdl-button--icon', htmlFor: 'search-catalog' },
                    React.createElement(
                        'i',
                        { className: 'material-icons' },
                        'search'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'mdl-textfield__expandable-holder' },
                    React.createElement('input', { className: 'mdl-textfield__input', id: 'search-catalog', onChange: this._handleOnChange, ref: 'input', type: 'text', value: query }),
                    React.createElement(
                        'label',
                        { className: 'mdl-textfield__label', htmlFor: 'search-expandable' },
                        'Expandable search'
                    )
                )
            )
        );
    };

    return ComponentSearch;
})(Component);

ComponentSearch.displayName = 'ComponentSearch';
ComponentSearch.defaultProps = {};
ComponentSearch.propTypes = {
    store: types('func').isRequired
};

module.exports = ComponentSearch;