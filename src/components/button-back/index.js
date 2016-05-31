import React, {Component, PropTypes} from 'react';
import Button from '../button';
import Translation from '../../behaviours/translation';

// Dependencies
import {back} from 'focus-core/history';

@Translation
class ButtonBack extends Component {

    render() {
        const {back} = this.props;
        return(
            <div>
                <Button handleOnClick={back} icon='keyboard_backspace' label={this.i18n('button.back')} shape={null} type='button' />
            </div>
        );
    }
}

ButtonBack.displayName = 'ButtonBack';
ButtonBack.defaultProps = {
    back: back
}

export default ButtonBack;
