import React, {PropTypes} from 'react';
import i18next from 'i18next';

const Snackbar = ({actionHandler, actionText, message, deleteMessage, type}) => {
    const active = !!message;
    const classNames = `mdl-snackbar ${active ? 'mdl-snackbar--active' :  ''}`;
    const otherProps = { 'aria-hidden': active, 'aria-live':'assertive', 'aria-atomic':'true', 'aria-relevant': 'text' };
    return (
        <div data-focus='snackbar-message-center' data-message-type={type} className={classNames}>
            <div className='mdl-snackbar__text'>{i18next.t(message)}</div>
            {actionText &&
                <button className='mdl-snackbar__action' type='button' onClick={actionHandler}>{i18next.t(actionText)}</button>
            }
            <button className='mdl-snackbar__close' type='button' onClick={this._forceCleanup}><i className='material-icons'>clear</i></button>
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

// MessageCenter.displayName = 'MessageCenter';
// MessageCenter.defaultProps = {
//     ttlError: 8000,
//     ttlInfo: 3000,
//     ttlSuccess: 3000,
//     ttlWarning: 3000
// };
// MessageCenter.propTypes = {
//     ttlError: PropTypes.number.isRequired,
//     ttlInfo: PropTypes.number.isRequired,
//     ttlSuccess: PropTypes.number.isRequired,
//     ttlWarning: PropTypes.number.isRequired
// };
