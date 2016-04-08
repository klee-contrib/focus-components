import React, {Component, PropTypes} from 'react';
import Button from '../button';

// Dependencies
import builder from 'focus-core/component/builder';
import historic from 'focus-core/history';
import TanslationBehaviour from '../../behaviours/translation';

@TanslationBehaviour
class ButtonBack extends Component {
    render = () => {
        return (
            <Button
                handleOnClick={() => {historic.history.back()}}
                icon='keyboard_backspace'
                label='button.back'
                shape={null}
                type='button' />
        );
    }
}

ButtonBack.displayName = 'ButtonBack';
export default ButtonBack;
