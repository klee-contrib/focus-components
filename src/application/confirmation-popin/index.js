import React from 'react';
// Dependencies

import builder from 'focus-core/component/builder';
import type from 'focus-core/component/types';

// Mixins

let i18nMixin = require('../../common/i18n/mixin');

// Components

let Popin = require('../popin').component;
let Button = require('../../common/button/action').component;

let ConfirmationPopin = {
    /**
    * Display name.
    */
    displayName: 'confirmation-popin',
    mixins: [i18nMixin],
    getDefaultProps() {
        return {
            open: false,
            cancelButtonLabel: 'popin.confirmation.cancel',
            confirmButtonLabel: 'popin.confirmation.confirm'
        };
    },

    getInitialState() {
        return ({
            fromButtonClick: false
        });
    },

    propTypes: {
        cancelButtonLabel: type('string'),
        cancelHandler: type(['func', 'object']),
        confirmButtonLabel: type('string'),
        confirmHandler: type(['func', 'object'])
    },

    /**
    * Confirmation action handler
    */
    _handleConfirm() {
        this.toggleOpen();
        if (this.props.confirmHandler) {
            this.props.confirmHandler();
        }
    },

    /**
    * Cancel action handler
    */
    _handleCancel() {
        this.toggleOpen();
        if (this.props.cancelHandler) {
            this.props.cancelHandler();
        }
    },

    _handlePopinClose() {
        if (this.props.cancelHandler && !this.state.fromButtonClick) {
            this.props.cancelHandler();
        }
        this.setState({fromButtonClick: false});
    },

    toggleOpen() {
        this.setState({
            fromButtonClick: true
        }, () => {
            this.refs.popin.toggleOpen();
        });
    },

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

module.exports = builder(ConfirmationPopin);
