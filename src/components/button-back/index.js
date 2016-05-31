import React, {PropTypes} from 'react';
import Button from '../button';
import {back} from 'focus-core/history';

// Dependencies
import historic from 'focus-core/history';

const propTypes = {
    back: PropTypes.func.isRequired
};

const ButtonBack = ({back}) => (
    <Button
        handleOnClick={back}
        icon='keyboard_backspace'
        label='button.back'
        shape={null}
        type='button' />
);

ButtonBack.propTypes = propTypes;

export default ButtonBack;
