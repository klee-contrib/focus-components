// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;
let React = require('react');
let words = require('lodash/string/words');

// Components

let Scope = require('./scope').component;

// Mixins

let stylable = require('../../mixin/stylable');
let i18n = require('../../common/i18n/mixin');

/**
 * SearchBar component
 * @type {Object}
 */
let SearchBar = {
    mixins: [i18n, stylable],
    displayName: 'SearchBar',
    getDefaultProps() {
        return {
            placeholder: 'Enter your search here...',
            value: 'defaultValue',
            scope: undefined,
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help'
        };
    },
    propTypes: {
        placeholder: type('string'),
        value: type('string'),
        scope: type(['string', 'number']),
        scopes: type('array'),
        minChar: type('number'),
        loading: type('bool'),
        helpTranslationPath: type('string')
    },
    getInitialState() {
        return {
            value: this.props.value,
            scope: this.props.scope,
            loading: this.props.loading
        };
    },
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.loading !== undefined) {
            this.setState({loading: newProps.loading, scope: newProps.scope});
        }
    },
    componentDidMount() {
        React.findDOMNode(this.refs.query).focus();
    },
    getValue() {
        return {
            scope: this.refs.scope.getValue(),
            query: React.findDOMNode(this.refs.query).value
        };
    },
    _getClassName() {
        return `form-control`;
    },
    _handleChange() {
        if (this.props.handleChange) {
            return this.props.handleChange(this.getValue());
        }
    },
    _handleKeyUp(event) {
        let val = event.target.value;
        if (val.length >= this.props.minChar) {
            if (this.props.handleKeyUp) {
                this.props.handleKeyUp(event);
            }
            this._handleChange();
        }
    },
    _handleChangeScope(event) {
        this._focusQuery();
        //If query not empty
        let query = this.getValue().query;
        if (!query || 0 === query.length) {
            return;
        }
        if (this.props.handleChangeScope) {
            this.props.handleChangeScope(event);
        }
        this._handleChange();
    },
    _handleOnClickScope() {
        this.setState({scope: this.refs.scope.getValue()}, this._handleChangeScope(event));
    },
    _renderHelp() {
        return (
            <div className='sb-help' ref='help'>{this.i18n(this.props.helpTranslationPath)}</div>
        );
    },
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    setStateFromSubComponent() {
        return this.setState(this.getValue(), this._focusQuery);
    },
    render() {
        let loadingClassName = this.props.loading ? 'sb-loading' : '';
        return (
            <div className={`${this._getStyleClassName()}`} data-focus='search-bar'>
                <div className='sb-scope-choice'><Scope handleOnClick={this._handleOnClickScope} list={this.props.scopes} ref='scope' value={this.state.scope}/></div>
                <div className='sb-input-search'>
                    <input autofocus className={this._getClassName()} onKeyUp={this._handleKeyUp} ref='query'  type='search' placeholder={this.props.placeholder} />
                    <div className={`sb-spinner three-quarters-loader ${loadingClassName}`}></div>
                </div>
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);
