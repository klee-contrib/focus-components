import React, { Component } from 'react';
import { translate } from 'focus-core/translation';
import noop from 'lodash/utility/noop'

import Button from '../../components/button';
import MDBehaviour from '../../behaviours/material';

/**
 * Action menu component
 * 
 * @class ActionMenu
 * @extends {Component}
 */
@MDBehaviour('dropdown')
class ActionMenu extends Component {


    /**
     * Creates an instance of ActionMenu.
     * @param {any} props component props
     * @memberof ActionMenu
     */
    constructor(props) {
        super(props);
    }

    /**
     * Build a function to handle the action call.
     * 
     * @param {function} action the function to call
     * @returns {function} the built function
     * @memberof ActionMenu
     */
    _handleAction(action) {
        return () => {
            if (this.props.operationParam) {
                action(this.props.operationParam);
            } else {
                action();
            }
        };
    }

    /**
     * Render the menu items.
     * 
     * @param {array} operationList the list of action to display
     * @returns {any} the render
     * @memberof ActionMenu
     */
    renderMenuItems(operationList) {
        return operationList.map((operation, idx) => {
            return (
                <li className={`mdl-menu__item ${operation.style}`} key={idx}
                    onClick={this._handleAction(operation.action)}
                >
                    {translate(operation.label)}
                </li>
            )
        })
    }


    /** @inheritdoc */
    render() {
        const { id, iconProps, operationList, position, shape } = this.props;

        // This button/menu thing is actually working based on htmlFor and buttonId
        // No action is required on click, so we give a noop function for onclick
        return (
            <div>
                <Button type='button' icon={iconProps.name} id={id} isJs shape={shape}
                    handleOnClick={noop}
                />
                <div>
                    <ul className={`mdl-menu mdl-menu--bottom-${position} mdl-js-menu mdl-js-ripple-effect`}
                        htmlFor={id}
                        ref='dropdown'
                    >
                        {this.renderMenuItems(operationList || [])}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ActionMenu;