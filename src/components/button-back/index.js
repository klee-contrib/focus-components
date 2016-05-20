import React, {Component, PropTypes} from 'react';
import Button from '../button';
import Translation from '../../behaviours/translation';

// Dependencies
import {history, goBack} from 'focus-core/history';

@Translation
class ButtonBack extends Component {

    static propTypes = {
        reactRouterNavigation: PropTypes.bool
    };

    _renderButtonBack() {
        const {reactRouterNavigation} = this.props;
        switch (reactRouterNavigation) {
            case true:
            return <Button handleOnClick={() => {goBack()}} icon='keyboard_backspace' label={this.i18n('button.back')} shape={null} type='button' />
            break;
            default:
            return <Button handleOnClick={() => {history.back()}} icon='keyboard_backspace' label={this.i18n('button.back')} shape={null} type='button' />
        }
    }

    render() {
        return(
            <div>
                {this._renderButtonBack()}
            </div>
        );
    }
}

ButtonBack.displayName = 'ButtonBack';
ButtonBack.defaultProps = {
    reactRouterNavigation: false
}

export default ButtonBack;
