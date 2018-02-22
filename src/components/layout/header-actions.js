// Libs
import PropTypes from 'prop-types';

import React from 'react';
import isObject from 'lodash/lang/isObject';
import filterProps from '../../utils/filter-html-attributes';
// Stores
import applicationStore from 'focus-core/application/built-in-store';
// Components
import Button from '../../components/button';
import Dropdown from '../../components/icon-dropdown';
import storeConnect from '../../behaviours/store/connect';

/** Connector for HeaderActions. */
const connector = storeConnect([{
    store: applicationStore,
    properties: ['actions']
}], () => ({
    actions: applicationStore.getActions() || { primary: [], secondary: [] }
}));

/** Sub-action type. */
const subActionType = PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
}));

/** Action type. */
const actionType = PropTypes.oneOfType([
    PropTypes.shape({ // Icon action
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
        icon: PropTypes.string.isRequired,
        iconLibrary: PropTypes.string,
        className: PropTypes.string
    }),
    PropTypes.shape({ // Dropdown action
        icon: PropTypes.string,
        iconLibrary: PropTypes.string,
        action: subActionType.isRequired
    })
]);

/** Proptypes validation for HeaderActions. */
const propTypes = {
    actions: PropTypes.shape({
        primary: PropTypes.arrayOf(actionType),
        secondary: PropTypes.oneOfType([
            subActionType,
            actionType
        ])
    }).isRequired
};

/**
 * Render a list fab component.
 * @param {object} fab Fab.
 * @param {number} idx Index. 
 * @returns {JSXElement} Component.
 */
function renderFabListAction(fab, idx) {
    if (Array.isArray(fab.action) && fab.action.length > 0) {
        const { icon, iconLibrary, action, ...otherProps } = fab;
        return (
            <Dropdown
                key={`header-action-${idx}`}
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
function renderFabAction(fab) {
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

/**
 * HeaderActions component.
 * @returns {JSXElement} Component.
 */
const HeaderActions = ({ actions: { primary, secondary }, ...otherProps }) => {
    return (
        <div data-focus='header-actions' {...filterProps(otherProps)}>
            {primary.map((action, idx) => {
                return action && Array.isArray(action.action) ? renderFabListAction(action, idx) : renderFabAction(action)
            })}
            {Array.isArray(secondary) && renderFabListAction({ action: secondary }, 0)}
            {isObject(secondary) && renderFabListAction(secondary, 0)}
        </div>
    );
};
HeaderActions.displayName = 'HeaderActions';
HeaderActions.propTypes = propTypes;

export default connector(HeaderActions);