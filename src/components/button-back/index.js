import React, {PropTypes} from 'react';
import Button from '../button';
import {back} from 'focus-core/history';

// Dependencies
import history from 'focus-core/history';

const propTypes = {
    back: PropTypes.func
};

function ButtonBack({back}) {
    return (
        <Button
            handleOnClick={back || history.back}
            icon='keyboard_backspace'
            label='button.back'
            shape={null}
            type='button' 
        />
    );
}

ButtonBack.propTypes = propTypes;

export default ButtonBack;
