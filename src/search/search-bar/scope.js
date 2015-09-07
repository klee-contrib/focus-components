// Dependencies

const builder = require('focus').component.builder;
const type = require('focus').component.types;
const uuid = require('uuid');
const find = require('lodash/collection/find');
const {scopes: style} = require('./style');

// Components

const Icon = require('../../common/icon').component;

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
            list: [],
            isDeployed: false
        };
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
    * @return {Object} the initial state
    */
    getInitialState() {
        return {
            isDeployed: this.props.isDeployed
        };
    },
    /**
    * Get the scope click handler, based on the scope given as an argument.
    * @param  {String} code   the clicked scope's code
    * @return {Function}  the scope click handler
    */
    _getScopeClickHandler({code}) {
        const {onScopeSelection} = this.props;
        return () => {
            this.setState({
                isDeployed: false
            });
            if (onScopeSelection) {
                onScopeSelection(code);
            }
        };
    },
    /**
    * Handle the click on the scope element.
    */
    _handleDeployClick() {
        this.setState({
            isDeployed: !this.state.isDeployed
        });
    },
    /**
    * Return the css class for the scope.
    * @return {String} the current scope's classname
    */
    getScopeClassname() {
        const {list, value} = this.props;
        const activeScope = find(list, {code: value});
        if (!activeScope) {
            return 'sb-scope-none';
        }
        return `sb-scope-${activeScope.code}`;
    },
    /**
    * Render the scope list if it is deployed
    * @return {HTML} the rendered scope list
    */
    _renderScopeList() {
        const {list: scopeList, value} = this.props;
        return (
            <div style={style.list}>
                {0 < scopeList.length && scopeList.map(scope => {
                    const isActive = value === scope.code;
                    let scopeStyle = {...style.scope, ...scope.style};
                    if (isActive) {
                        scopeStyle = {...scopeStyle, ...style.activeScope};
                    }
                    return (
                        <div className={`sb-scope-${scope.code}`} data-focus='searchBarScope' key={scope.code || uuid.v4()} onClick={this._getScopeClickHandler(scope)} style={scopeStyle}>
                            {scope.label}
                        </div>
                    );
                })}
                {0 === scopeList.length &&
                    <div data-focus='searchBarScope' style={style.scope}>
                        {this.i18n('scopes.empty')}
                    </div>
                }
            </div>
        );
    },
    /**
    * Render the complete scope element.
    * @return {object} - The jsx element.
    */
    render() {
        const {isDeployed} = this.state;
        return (
            <div data-focus='scope'>
                <div style={style.visible}>
                    <div onClick={this._handleDeployClick} style={style.selectedScope}>
                        <div className={this.getScopeClassname()} />
                    </div>
                    <div style={style.icon}>
                        <Icon name={isDeployed ? 'caret-up' : 'caret-down'}/>
                    </div>
                </div>
                {isDeployed && this._renderScopeList()}
            </div>
        );
    }
};

module.exports = builder(scopeMixin);
