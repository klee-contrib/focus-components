// Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

const builder = require('focus-core').component.builder;
const type = require('focus-core').component.types;
const uuid = require('uuid');
const find = require('lodash/collection/find');

// Components
const Icon = require('../../common/icon').component;
const Dropdown = require('../../common/select-action').component;
const {componentHandler} = window;

// Mixins
const i18nMixin = require('../../common/i18n/mixin');


const operationList = [
    {
        label: 'Action_a',
        action() {
            alert('Actiona');
        }
    },
    {
        label: 'Action_b',
        action() {
            alert('Actionb');
        }
    },
    {
        label: 'Action_c',
        action() {
            alert('Actionc');
        }
    }
];

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
    getActiveScopeIcon() {
        const {list, value} = this.props;
        const activeScope = find(list, {code: value});
        if (!activeScope) {
            return 'list';
        }
        return activeScope.code;
    },
    /**
    * Render the scope list if it is deployed
    * @return {HTML} the rendered scope list
    */
    _renderScopeList() {
        const {list: scopeList, value} = this.props;
        return (
            <ul className={`mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect`} data-focus='search-bar-scopes' htmlFor='dropdown' ref='scopeDropdown'>
                {0 < scopeList.length && scopeList.map(scope => {
                    const isActive = value === scope.code;
                    return (
                        <li className='mdl-menu__item' data-active={isActive} key={scope.code || uuid.v4()} onClick={this._getScopeClickHandler(scope)}>
                            {scope.code &&
                                <Icon name={scope.code} />
                            }
                            <span>{scope.label}</span>
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
        const {isDeployed} = this.state;
        const activeIcon = this.getActiveScopeIcon();
        return (
            <div data-focus='search-bar-scope'>
                <button className='mdl-button mdl-js-button' id='dropdown' onClick={this._handleDeployClick}>
                    <Icon name={activeIcon} />
                </button>
                {this._renderScopeList()}
            </div>
        );
    }
};
module.exports = builder(scopeMixin);
