let builder = require('focus').component.builder;
let type = require('focus').component.types;
let React = require('react');

let find = require('lodash/collection/find');
let uuid = require('uuid');

let scopeMixin = {
    /**
     * Component tag name.
     * @type {String}
     */
    displayName: 'Scope',
    /**
     * Component default properties.
     */
    getDefaultProps() {
        return {
            list: [],
            value: undefined,
            isDeployed: false
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    },
    /**
     * Scope property validation.
     * @type {Object}
     */
    propTypes: {
        list: type('array'),
        isDeployed: type('bool'),
        value: type(['string', 'number'])
    },
    /**
     * Get the initial state from the data.
     */
    getInitialState() {
        return {
            isDeployed: this.props.isDeployed,
            value: this.props.value
        };
    },
    /**
     * Get the value of the scope.
     */
    getValue() {
        return this.state.value;
    },
    _getClassName(){
        return `form-control ${this.props.className ? this.props.className : ''}`;
    },
    /**
     * Internal function which handles the click on the scope line element and call the real handleOnclick if it is defined.
     * @param {object} event - Event trigger by the search.
     */
    _handleOnClick(event) {
        let val = event.target.hasAttribute('value') ? event.target.getAttribute('value') : undefined;
        this.setState({
            value: val,
            isDeployed: false
        }, this.props.handleOnClick);
    },
    /**
     * Handle the click on the scope element.
     */
    handleDeployClick() {
        this.setState({
            isDeployed: !this.state.isDeployed
        });
    },
    /**
     * Get the current active scope.
     */
    getActiveScope() {
        return find(this.props.list, (scope) => {
            return scope.code === this.state.value;
        });
    },
    /**
     * Return the css class for the scope.
     */
    scopeStyle() {
        let activeScope = this.getActiveScope();
        if (!activeScope) {
            return 'sb-scope-none';
        }
        return activeScope.style || `sb-scope sb-scope-${activeScope.code}`;
    },
    renderScopeList() {
        if (!this.state.isDeployed) {
            return;
        }
        let scopes = this.props.list.map((scope) => {
            let selectedValue = this.state.value === scope.code ? 'active' : '';
            //Add defaut Style to scope if not define
            let scopeCss = scope.style;
            if (!scopeCss) {
                scopeCss = 'sb-scope sb-scope-' + scope.code;
            }
            scope.style = scopeCss;

            return (
                <li key={scope.code || uuid.v4()} value={scope.code} className={`${selectedValue} ${scope.style}`} onClick={this._handleOnClick}>
                    {scope.label}
                </li>
            );
        });
        return (
            <ul className='sb-scope-list'>
                {scopes}
            </ul>);
    },
    /**
     * Render the complete scope element.
     * @return {object} - The jsx element.
     */
    render() {
        let cssClass = `sb-scope-deploy ${this.state.isDeployed ? 'up' : 'down'}`;
        return (
            <div className={this._getClassName()} data-focus='scope'>
                <div className={cssClass} onClick={this.handleDeployClick}>
                    <div className={this.scopeStyle()} />
                </div>
                {this.renderScopeList()}
            </div>
        );
    }
};

module.exports = builder(scopeMixin);
