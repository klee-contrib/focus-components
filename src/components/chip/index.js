import React, { PropTypes } from 'react';

const Chip = ({ label, deleteElement, readonly }) => {
    let className = 'mdl-chip';
    if (!readonly) {
        className += ' mdl-chip--deletable';
    }
    return (
        <div data-focus='chip' className={className}>
            <span data-focus='chip-text' className='mdl-chip__text'>{label}</span>
            {!readonly && <button type='button' data-focus='chip-button' className='mdl-chip__action' onClick={deleteElement}><i className='material-icons'>{'cancel'}</i></button>}
        </div>
    );
};

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    readonly: PropTypes.bool.isRequired,
    deleteElement: PropTypes.func.isRequired
};

Chip.defaultProps = {
};

export default Chip