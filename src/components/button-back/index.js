import React, {PropTypes} from 'react';
import Button from '../button';
import {back as defaultBack} from 'focus-core/history';

const propTypes = {
    back: PropTypes.func
};

function ButtonBack({back}) {
    return (
        <Button
            handleOnClick={back || defaultBack}
            icon='keyboard_backspace'
            label='button.back'
            shape={null}
            type='button' 
        />
    );
}

ButtonBack.propTypes = propTypes;

export default ButtonBack;
