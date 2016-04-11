import React from 'react';
import Button from '../button';

// Dependencies
import historic from 'focus-core/history';

const ButtonBack = () => (
    <Button
        handleOnClick={() => {historic.history.back()}}
        icon='keyboard_backspace'
        label='button.back'
        shape={null}
        type='button' />
);

export default ButtonBack;
