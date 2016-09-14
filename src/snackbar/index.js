import React, {PropTypes} from 'react';
import i18next from 'i18next';

const Snackbar = ({actionHandler, actionText, message, deleteMessage, type}) => {
    const otherProps = { 'aria-hidden': !!message, 'aria-live':'assertive', 'aria-atomic':'true', 'aria-relevant': 'text' };
    const hasAction = actionText && actionHandler;
    return (
        <div data-focus='snackbar' data-upgraded='MaterialSnackbar' data-message-type={type} className='mdl-js-snackbar mdl-snackbar mdl-snackbar--active animated slideInUp' {...otherProps}>
            <div className='mdl-snackbar__text'>{i18next.t(message)}</div>
            {hasAction &&
                <button className='mdl-snackbar__action' type='button' onClick={actionHandler}>{i18next.t(actionText)}</button>
            }
            <button className='mdl-snackbar__close' type='button' onClick={deleteMessage}><i className='material-icons'>clear</i></button>
        </div>
    );
};
Snackbar.displayName = 'Snackbar';
Snackbar.propTypes = {
    actionHandler: PropTypes.func,
    actionText: PropTypes.string,
    message: PropTypes.string,
    deleteMessage: PropTypes.func,
    type: PropTypes.string
};
export default Snackbar;
