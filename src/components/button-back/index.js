import React, {PropTypes} from 'react';
import Button from '../button';


function ButtonBack({back}) {
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

ButtonBack.propTypes = {
    back: PropTypes.func.isRequired
};
export default ButtonBack;
