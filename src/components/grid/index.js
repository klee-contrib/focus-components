// see http://www.getmdl.io/components/index.html#layout-section/grid
import PropTypes from 'prop-types';

import React from 'react';
import filterProps from '../../utils/filter-html-attributes';

/**
 * Grid component.
 */
function Grid({ children, className, ...otherProps }) {
    return (
        <div className={`mdl-grid ${className}`} {...filterProps(otherProps)}>
            {children}
        </div>
    );
}

Grid.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string
};

Grid.defaultProps = {
    className: ''
};

Grid.displayName = 'Grid';

export default Grid;