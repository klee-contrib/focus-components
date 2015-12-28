// Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

const builder = require('focus-core').component.builder;
const type = require('focus-core').component.types;
const uuid = require('uuid');
const find = require('lodash/collection/find');
const {uniqueId} = require('lodash/utility');

// Components
const Icon = require('../../common/icon').component;
const Dropdown = require('../../common/select-action').component;
const {componentHandler} = window;

// Mixins
const i18nMixin = require('../../common/i18n/mixin');

const scopeMixin = {
    /**
    * Component tag name.
    * @type {String}
    */
    displayName: 'Scope',
    mixins: [i18nMixin],
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps() {
        return {
            list: []
        };
    },
    /**
    * Scope property validation.
    * @type {Object}
    */
    propTypes: {
        list: type('array'),
        value: type(['string', 'number'])
    },
    /**
    * Called when component will mount.
    */
    componentWillMount() {
        this.scopesId = uniqueId('scopes_');
    },
    /**
    * Called when component is mounted.
    */
    componentDidMount() {
        if (ReactDOM.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.scopeDropdown));
        }
    },
    /**
    * Component will receive props.
    * @param {Object} nextProps the next props
    */
    componentWillReceiveProps(nextProps) {
        if (ReactDOM.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.scopeDropdown));
        }
    },
    /**
    * Called before component is unmounted.
    */
    componentWillUnmount() {
        if (ReactDOM.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this.refs.scopeDropdown));
        }
    },
    /**
    * Get the scope click handler, based on the scope given as an argument.
    * @param  {String} code   the clicked scope's code
    * @return {Function}  the scope click handler
    */
    _getScopeClickHandler({code}) {
        const {onScopeSelection} = this.props;
        return () => {
            if (onScopeSelection) {
                onScopeSelection(code);
            }
        };
    },
    _getActiveScope() {
        const {list, value} = this.props;
        const activeScope = find(list, {code: value});
        return activeScope || {};
    },
    /**
    * Render the scope list if it is deployed
    * @return {HTML} the rendered scope list
    */
    _renderScopeList() {
        const {scopesId} = this;
        const {list: scopeList, value} = this.props;
        return (
            <ul className={`mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect`} data-focus='search-bar-scopes' htmlFor={scopesId} ref='scopeDropdown'>
                {0 < scopeList.length && scopeList.map(scope => {
                    const {code, label, ...otherScopeProps} = scope;
                    const icon = scope.icon ? scope.icon : code; //legacy
                    const scopeId = uniqueId('scopes_');
                    const isActive = value === code;
                    return (
                        <li className='mdl-menu__item' data-active={isActive} key={scope.code || scopeId} data-scope={scope.code || scopeId} onClick={this._getScopeClickHandler(scope)}>
                            {scope.code &&
                                <Icon name={icon} {...otherScopeProps}/>
                            }
                            <span>{this.i18n(label)}</span>
                        </li>
                    );
                })}
                {0 === scopeList.length &&
                    <li className='mdl-menu__item'>
                        {this.i18n('scopes.empty')}
                    </li>
                }
            </ul>
        );
    },
    /**
    * Render the complete scope element.
    * @return {object} - The jsx element.
    */
    render() {
        const {scopesId} = this;
        const activeScope = this._getActiveScope();
        const {code, label, ...otherScopeProps} = activeScope;
        const icon = activeScope.icon ? activeScope.icon : code; //legacy
        return (
            <div data-focus='search-bar-scope'>
                <button className='mdl-button mdl-js-button' id={scopesId} data-scope={code}>
                    <Icon name={icon} {...otherScopeProps}/>
                    <span>{this.i18n(label)}</span>
                </button>
                {this._renderScopeList()}
            </div>
        );
    }
};
module.exports = builder(scopeMixin);
