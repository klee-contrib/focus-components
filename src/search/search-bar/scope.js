import { translate } from 'focus-core/translation';

import PropTypes from 'prop-types';

import React from 'react';
import ReactDOM from 'react-dom';

import builder from 'focus-core/component/builder';
import find from 'lodash/collection/find';
import uniqueId from 'lodash/utility/uniqueId';
import 'material-design-lite/material';

// Components
import Icon from '../../components/icon';

const scopeMixin = {
    /**
    * Component tag name.
    * @type {String}
    */
    displayName: 'Scope',
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
        list: PropTypes.array.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
    _getScopeClickHandler({ code }) {
        const { onScopeSelection } = this.props;
        return () => {
            if (onScopeSelection) {
                onScopeSelection(code);
            }
            // Fix MDL issue with closing a dropdown
            const parentRef = this.refs.parent;
            if (parentRef) {
                const dropdownDiv = parentRef.getElementsByTagName('div')[0];
                dropdownDiv.className = dropdownDiv.className.replace(' is-visible', '');
            }
        };
    },
    _getActiveScope() {
        const { list, value } = this.props;
        const activeScope = find(list, { code: value });
        return activeScope || {};
    },
    /**
    * Render the scope list if it is deployed
    * @return {HTML} the rendered scope list
    */
    _renderScopeList() {
        const { scopesId } = this;
        const { list: scopeList, value } = this.props;
        return (
            <ul className={'mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect'} data-focus='search-bar-scopes' htmlFor={scopesId} ref='scopeDropdown'>
                {0 < scopeList.length && scopeList.map(scope => {
                    const { code, icon, label, ...otherScopeProps } = scope;
                    const scopeId = uniqueId('scopes_');
                    const isActive = value === code;
                    return (
                        <li className='mdl-menu__item' data-active={isActive} key={scope.code || scopeId} data-scope={scope.code || scopeId} onClick={this._getScopeClickHandler(scope)}>
                            {scope.code &&
                                <Icon name={icon || code} {...otherScopeProps} />
                            }
                            <span>{translate(label)}</span>
                        </li>
                    );
                })}
                {0 === scopeList.length &&
                    <li className='mdl-menu__item'>
                        {translate('scopes.empty')}
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
        const { scopesId } = this;
        const activeScope = this._getActiveScope();
        const { code, icon, label, ...otherScopeProps } = activeScope;
        return (
            <div data-focus='search-bar-scope' ref='parent'>
                <button className='mdl-button mdl-js-button' id={scopesId} data-scope={code}>
                    <Icon name={icon || code} {...otherScopeProps} />
                    <span>{translate(label)}</span>
                </button>
                {this._renderScopeList()}
            </div>
        );
    }
};
const { mixin, component } = builder(scopeMixin);
export default {
    mixin, component
}
export {
    mixin,
    component
}