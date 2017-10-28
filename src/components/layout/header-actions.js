// Libs
import React, { Component } from 'react';
import isObject from 'lodash/lang/isObject';

// Stores
import applicationStore from 'focus-core/application/built-in-store';
// Components
import Button from '../../components/button';
import Dropdown from '../../components/icon-dropdown';
import storeConnect from '../../behaviours/store/connect';

/**
* HeaderActions component.
*/
@storeConnect([
    { store: applicationStore, properties: ['actions'] }
], () => ({ actions: applicationStore.getActions() || { primary: [], secondary: [] } }))
class HeaderActions extends Component {

    /** Display name. */
    static displayName = 'HeaderActions';

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
        const { actions: { primary, secondary }, others } = this.props;

        return (
            <div data-focus='header-actions' {...others}>
                {primary.map((action) => action && Array.isArray(action.action) ? this.renderFabListAction(action) : this.renderFabAction(action))}
                {Array.isArray(secondary) && this.renderFabListAction({ action: secondary })}
                {isObject(secondary) && this.renderFabListAction(secondary)}
            </div>
        );
    }
}

export default HeaderActions;
