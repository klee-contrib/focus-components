import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {component as ConfirmationModal} from '../../application/confirmation-popin';
import Connect from '../../behaviours/store/connect';
import {application} from 'focus-core';
const {builtInStore: applicationStore} = application;
const propTypes = {
    isVisible: PropTypes.bool,
    ConfirmContentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired
};

const defaultProps = {
    isVisible: false,
    ConfirmContentComponent: null
};

@Connect(
    [{store: applicationStore, properties: ['confirmConfig']}],
    () => {
        const {isVisible = false, Content: ConfirmContentComponent = null, handleCancel, handleConfirm} = applicationStore.getConfirmConfig() || {};

        const exp = {isVisible, ConfirmContentComponent, handleCancel, handleConfirm};
        return exp;
    }
)
class ConfirmWrapper extends Component {
    render() {
        console.log('confirm wrapper')
        const {isVisible, ConfirmContentComponent, handleCancel, handleConfirm} = this.props;
        return isVisible ? <ConfirmationModal open={true} handleCancel={handleCancel} handleConfirm={handleConfirm}>{ConfirmContentComponent ? <ConfirmContentComponent /> : <div>Hello</div>}</ConfirmationModal> : null;
    }
}

ConfirmWrapper.propTypes = propTypes;
ConfirmWrapper.defaultProps = defaultProps;
ConfirmWrapper.displayName = 'ConfirmWrapper';

export default ConfirmWrapper;
