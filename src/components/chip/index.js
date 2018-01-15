import PropTypes from 'prop-types';
import React from 'react';

/**
 * Implementation of material design lite Chip component.
 * @see https://getmdl.io/components/index.html#chips-section
 * @param {object} props props given to component.
 * @return {ReactElement} markup.
 */
const Chip = ({ label, deleteElement, readonly }) => {
    let className = 'mdl-chip';
    if (!readonly) {
        className += ' mdl-chip--deletable';
    }

    return (
        <div data-focus='chip' className={className}>
            <span data-focus='chip-text' className='mdl-chip__text'>{label}</span>
            {!readonly && (
                <button
                    type='button'
                    data-focus='chip-button'
                    className='mdl-chip__action'
                    onClick={deleteElement}
                >
                    <i className='material-icons'>{'cancel'}</i>
                </button>
            )}
        </div>
    );
};

/**
 * Chip's display name.
 */
Chip.displayName = 'Chip';

/**
 * Chip's prop types.
 */
Chip.propTypes = {
    label: PropTypes.string.isRequired,
    readonly: PropTypes.bool.isRequired,
    deleteElement: PropTypes.func.isRequired
};

/**
 * Chip's default props.
 */
Chip.defaultProps = {

};

export default Chip;