// Libs
import React, { Component } from 'react';
import isObject from 'lodash/lang/isObject';
// Stores
import applicationStore from 'focus-core/application/built-in-store';
// Components
import Button from '../../components/button';
import Dropdown from '../../components/icon-dropdown';

/**
* HeaderActions component.
*/
class HeaderActions extends Component {

    /** Display name. */
    static displayName = 'HeaderActions';

    /**
     * Constructor.
     * @param {object} props Props.
     */
    constructor(props) {
        super(props);

        this.state = this._getStateFromStore();

        this._handleComponentChange = this._handleComponentChange.bind(this);
    }

    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addActionsChangeListener(this._handleComponentChange);
    }

    /** @inheriteddoc */
    componentWillUnmount() {
        applicationStore.removeActionsChangeListener(this._handleComponentChange);
    }

    /**
    * Get state from store
    * @return {Object} actions extracted from the store
    */
    _getStateFromStore() {
        return {
            actions: applicationStore.getActions() || { primary: [], secondary: [] }
        };
    }

    /**
    * Component change handler
    */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    }

    /**
     * Render a list fab component.
     * @param {object} fab Fab.
     * @returns {JSXElement} Component.
     */
    renderFabListAction(fab) {
        if (Array.isArray(fab.action) && fab.action.length > 0) {
            const { icon, iconLibrary, action, ...otherProps } = fab;
            return (
                <Dropdown
                    iconProps={{ name: icon, iconLibrary }}
                    operationList={action}
                    shape='fab'
                    {...otherProps}
                />
            );
        }
    }

    /**
     * Render a fab component.
     * @param {object} fab Fab.
     * @returns {JSXElement} Component.
     */
    renderFabAction(fab) {
        const { action, className, icon, iconLibrary, label, ...otherProps } = fab;
        return (
            <Button
                key={`header-action-${label}`}
                className={className}
                handleOnClick={action}
                icon={icon}
                iconLibrary={iconLibrary}
                label={label}
                shape='fab'
                type='button'
                {...otherProps}
            />
        );
    }

    /** @inheritdoc */
    render() {
        const props = this.props;
        const { actions: { primary, secondary } } = this.state;

        return (
            <div data-focus='header-actions' {...props}>
                {primary.map((action) => this.renderFabAction(action))}
                {Array.isArray(secondary) && this.renderFabListAction({ action: secondary })}
                {isObject(secondary) && this.renderFabListAction(secondary)}
            </div>
        );
    }
}

export default HeaderActions;
