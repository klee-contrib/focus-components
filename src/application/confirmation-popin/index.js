// Libs
import React, { PropTypes } from 'react';
// Dependencies
import builder from 'focus-core/component/builder';
import { translate } from 'focus-core/translation';
// Components
import { component as Popin } from '../popin';
import Button from '../../components/button';

/**
 * ConfirmationPopin.
 */
const ConfirmationPopin = {
    
    /**
    * Display name.
    */
    displayName: 'confirmation-popin',
        
    /**
     * PropTypes validation.
     */
    propTypes: {
        cancelButtonLabel: PropTypes.string,
        cancelHandler: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object
        ]),
        confirmButtonLabel: PropTypes.string,
        confirmHandler: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object
        ])
    },
    
    /**
     * Get default props.
     * @returns {object} Default props.
     */
    getDefaultProps() {
        return {
            open: false,
            cancelButtonLabel: 'popin.confirmation.cancel',
            confirmButtonLabel: 'popin.confirmation.confirm'
        };
    },

    /**
     * Get inital state.
     * @returns {object} Initial state.
     */
    getInitialState() {
        return ({
            fromButtonClick: false
        });
    },

    /**
    * Confirmation action handler.
    */
    _handleConfirm() {
        if (this.props.confirmHandler) {
            const result = this.props.confirmHandler();
            if (result === undefined || result === true) {
                this.toggleOpen();
            }
        } else {
            this.toggleOpen();
        }
    },

    /**
    * Cancel action handler
    */
    _handleCancel() {
        if (this.props.cancelHandler) {
            const result = this.props.cancelHandler();
            if (result === undefined || result === true) {
                this.toggleOpen();
            }
        } else {
            this.toggleOpen();
        }
    },

    /**
     * Handler for popin close.
     */
    _handlePopinClose() {
        if (this.props.cancelHandler && !this.state.fromButtonClick) {
            this.props.cancelHandler();
        }
        this.setState({fromButtonClick: false});
    },

    /**
     * Toggle opoening of popin.
     */
    toggleOpen() {
        this.setState({
            fromButtonClick: true
        }, () => {
            this.refs.popin.toggleOpen();
        });
    },

    /**
     * Render.
     * @return {ReactElement} markup.
     */
    render() {
        return (
            <div data-focus='confirmation-popin'>
                <Popin onPopinClose={this._handlePopinClose} open={this.props.open} ref='popin'>
                    {this.props.children}
                    <div data-focus='button-stack'>
                        <Button handleOnClick={this._handleCancel} label={this.i18n(this.props.cancelButtonLabel)}/>
                        <Button handleOnClick={this._handleConfirm} label={this.i18n(this.props.confirmButtonLabel)} option='primary'/>
                    </div>
                </Popin>
            </div>
        );
    }
};

const builded = builder(ConfirmationPopin);
const { component, mixin } = builded;

export { component, mixin }
export default builded;
