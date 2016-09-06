import React, {Component, PropTypes} from 'react';
import Translation from '../../behaviours/translation';
import Modal from '../modal';
import Button from '../button';


class ConfirmationModal extends Component {
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

    _handleModalClose() {
        if (this.props.cancelHandler && !this.state.fromButtonClick) {
            this.props.cancelHandler();
        }
        this.setState({fromButtonClick: false});
    };

    toggleOpen() {
        this.setState({
            fromButtonClick: true
        }, () => {
            this.refs.modal.toggleOpen();
        });
    };

    render() {
        return (
            <div data-focus='confirmation-modal'>
                <Modal onModalClose={this._handleModalClose} open={this.props.open} ref='modal'>
                    {this.props.children}
                    <div data-focus='button-stack'>
                        <Button handleOnClick={this._handleCancel} label={this.i18n(this.props.cancelButtonLabel)} />
                        <Button handleOnClick={this._handleConfirm} label={this.i18n(this.props.confirmButtonLabel)} option='primary' />
                    </div>
                </Modal>
            </div>
        );
    };
};

ConfirmationModal.displayName = 'ConfirmationModal';
ConfirmationModal.propTypes = {
    cancelButtonLabel: PropTypes.string,
    cancelHandler: PropTypes.func,
    confirmButtonLabel: PropTypes.string,
    confirmHandler: PropTypes.func
};
ConfirmationModal.defaultProps = {
    open: false,
    cancelButtonLabel: 'modal.confirmation.cancel',
    confirmButtonLabel: 'modal.confirmation.confirm'
};
export default ConfirmationModal;
