import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button';
import { back as defaultBack } from 'focus-core/history';

const propTypes = {
    back: PropTypes.func
};

const defaultProps = {
    back: defaultBack
};

function ButtonBack({ back }) {
    return (
        <Button
            handleOnClick={back}
            icon='keyboard_backspace'
            label='button.back'
            shape={null}
            type='button'
        />
    );
}

ButtonBack.propTypes = propTypes;
ButtonBack.defaultProps = defaultProps;

export default ButtonBack;