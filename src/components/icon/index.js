import React, { PropTypes } from 'react';
import filterProps from '../../utils/filter-html-attributes';

function Icon({ name, library, onClick, style }) {
    switch (library) {
        case 'material':
            return (
                <i className='material-icons' onClick={onClick} {...filterProps(style) }>{name}</i>
            );
        case 'font-awesome':
            return (
                <i className={`fa fa-${name}`} onClick={onClick} {...filterProps(style) } />
            );
        case 'font-custom':
            return (
                <span className={`icon-${name}`} {...filterProps(style) } />
            );
        default:
            return null;
    }
}

Icon.displayName = 'Icon';

Icon.defaultProps = {
    name: '',
    library: 'material'
};

Icon.propTypes = {
    onClick: PropTypes.func,
    library: PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    name: PropTypes.string
};

export default Icon;
