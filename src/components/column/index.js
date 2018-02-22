// see http://www.getmdl.io/components/index.html#layout-section/grid
import PropTypes from 'prop-types';

import React from 'react';
import filterProps from '../../utils/filter-html-attributes';

/**
 * Compute class name.
 * @param {string} className base class name.
 * @param {number} size number of columns.
 */
function _className(className, size) {
    const SIZE_CSS = size ? `mdl-cell--${size}-col` : '';
    return `mdl-cell ${SIZE_CSS} ${className}`;
}

/**
 * Column component.
 */
function Column({ size, className, children, ...otherProps }) {
    return (
        <div
            className={_className(className, size)}
            {...filterProps(otherProps)}
        >
            {children}
        </div>
    );
}

Column.displayName = 'Column';

Column.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string
};

Column.defaultProps = {
    size: 6,
    className: ''
};

export default Column;