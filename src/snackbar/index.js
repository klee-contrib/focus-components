import React, {PropTypes} from 'react';

function Snackbar(props){
  return (
    <div className="mdl-js-snackbar mdl-snackbar mdl-snackbar--active animated slideInUp" data-upgraded="MaterialSnackbar" aria-hidden="false">
      <div className="mdl-snackbar__text">{props.content}</div>
      {actionHandler && actionText &&
                <button className='mdl-snackbar__action' type='button' onClick={() =>{
                actionHandler(props); deleteMessage({id});
                }}>{actionText}</button>
            }
      <button className="mdl-snackbar__action" type="button" onClick={() => deleteMessage({id})}>Close</button>
    </div>
  );
}
Snackbar.displayName = 'Snackbar';
Snackbar.propTypes = {
    actionHandler: PropTypes.func,
    actionText: PropTypes.string,
    message: PropTypes.string,
    deleteMessage: PropTypes.func,
    type: PropTypes.string
};
export default Snackbar;
