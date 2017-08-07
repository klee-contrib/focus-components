import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isString } from 'lodash/lang';
import { component as ConfirmationModal } from '../../application/confirmation-popin';
import connect from '../../behaviours/store/connect';
import { builtInStore as applicationStore } from 'focus-core/application';

const propTypes = {
    isVisible: PropTypes.bool,
    ConfirmContentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    handleCancel: PropTypes.func,
    handleConfirm: PropTypes.func
};

const defaultProps = {
    isVisible: false,
    ConfirmContentComponent: null
};

const connector = connect(
    [{
        store: applicationStore,
        properties: ['confirmConfig']
    }],
    () => {
        const {
            isVisible = false,
            Content: ConfirmContentComponent = null,
            handleCancel: cancelHandler,
            handleConfirm: confirmHandler,
            ...contentProps
        } = applicationStore.getConfirmConfig() || {};

        return { isVisible, ConfirmContentComponent, cancelHandler, confirmHandler, contentProps };
    }
)

const ConfirmWrapper = () => {
    const { isVisible, ConfirmContentComponent, cancelHandler, confirmHandler, contentProps } = this.props;
    const ConfirmContent = isString(ConfirmContentComponent)
        ? () => (<span>{ConfirmContentComponent}</span>)
        : ConfirmContentComponent;

    return isVisible ? (
        <ConfirmationModal
            open
            cancelHandler={cancelHandler}
            confirmHandler={confirmHandler}
            {...contentProps}
        >
            {ConfirmContent ? (<ConfirmContent />) : null}
        </ConfirmationModal>
    ) : null;
}

ConfirmWrapper.propTypes = propTypes;
ConfirmWrapper.defaultProps = defaultProps;
ConfirmWrapper.displayName = 'ConfirmWrapper';

export default connector(ConfirmWrapper);
