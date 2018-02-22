import PropTypes from 'prop-types';
import React from 'react';
import isString from 'lodash/lang/isString';

import { builtInStore as applicationStore } from 'focus-core/application';

import { component as ConfirmationModal } from './popin';
import connect from '../../behaviours/store/connect';


const propTypes = {
    isVisible: PropTypes.bool,
    ConfirmContentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    cancelHandler: PropTypes.func,
    confirmHandler: PropTypes.func
};

const defaultProps = {
    isVisible: false,
    ConfirmContentComponent: null,
    cancelHandler: null,
    confirmHandler: null
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

const ConfirmWrapper = (props) => {
    const { isVisible, ConfirmContentComponent, cancelHandler, confirmHandler, contentProps } = props;
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