import React, {Component, PropTypes} from 'react';
import filterProps from '../../utils/filter-html-attributes';

function Icon({name, library, onClick, style}) {
    switch (library) {
        case 'material':
            return <i className='material-icons' onClick={onClick} {...filterProps(style)}>{name}</i>;
        case 'font-awesome':
            const faCss = `fa fa-${name}`;
            return <i className={faCss} onClick={onClick} {...filterProps(style)} />;
        case 'font-custom':
            return <span className={`icon-${name}`} {...filterProps(style)}/>;
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

module.exports = Icon;
