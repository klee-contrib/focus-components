import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const Chips = ({label, letter, onDeleteClick}) => {
    if(letter && letter.length !== 1) {
        console.error(`[CHIPS] Param 'letter' should be a character. You put value : '${letter}'.`);
    }
    const className = `mdl-chip${onDeleteClick ? ' mdl-chip--deletable' : ''}${letter ? ' mdl-chip--contact' : ''}`;
    return (
        <span data-focus='chips' className={className}>
            {letter && <span className='mdl-chip__contact mdl-color--teal mdl-color-text--white'>{letter}</span>}
            <span className='mdl-chip__text'>{label}</span>
            {onDeleteClick &&
                <button type='button' className='mdl-chip__action' onClick={() => (onDeleteClick())}><i className='material-icons'>cancel</i></button>
            }
        </span>
    )
};
Chips.displayName = 'Chips';
Chips.propTypes = {
    label: PropTypes.string.isRequired,
    letter: PropTypes.string,
    onDeleteClick: PropTypes.func
};
export default Chips;
