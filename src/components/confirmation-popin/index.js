import React, {Component, PropTypes} from 'react';
import {translate} from 'focus-core/translation';
import {component as Popin} from '../../application/popin';
import Button from '../../components/button';


class ConfirmationPopin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromButtonClick: false
        };
    };

    /**
    * Confirmation action handler
    */
    _handleConfirm() {
        this.toggleOpen();
        if (this.props.confirmHandler) {
            this.props.confirmHandler();
        }
    };

    /**
    * Cancel action handler
    */
    _handleCancel() {
        this.toggleOpen();
        if (this.props.cancelHandler) {
            this.props.cancelHandler();
        }
    };

    _handlePopinClose() {
        if (this.props.cancelHandler && !this.state.fromButtonClick) {
            this.props.cancelHandler();
        }
        this.setState({fromButtonClick: false});
    };

    toggleOpen() {
        this.setState({
            fromButtonClick: true
        }, () => {
            this.refs.popin.toggleOpen();
        });
    };

    render() {
        return (
            <div data-focus='confirmation-popin'>
                <Popin onPopinClose={this._handlePopinClose} open={this.props.open} ref='popin'>
                    {this.props.children}
                    <div data-focus='button-stack'>
                        <Button handleOnClick={this._handleCancel} label={translate(this.props.cancelButtonLabel)} />
                        <Button handleOnClick={this._handleConfirm} label={translate(this.props.confirmButtonLabel)} option='primary' />
                    </div>
                </Popin>
            </div>
        );
    };
};

ConfirmationPopin.displayName = 'ConfirmationPopin';
ConfirmationPopin.propTypes = {
    cancelButtonLabel: PropTypes.string,
    cancelHandler: PropTypes.func,
    confirmButtonLabel: PropTypes.string,
    confirmHandler: PropTypes.func
};
ConfirmationPopin.defaultProps = {
    open: false,
    cancelButtonLabel: 'popin.confirmation.cancel',
    confirmButtonLabel: 'popin.confirmation.confirm'
};
export default ConfirmationPopin;
