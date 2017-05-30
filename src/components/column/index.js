// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
import React, {Component, PropTypes} from 'react';
import filterProps from '../../utils/filter-html-attributes';

/**
 * Column component.
 */

function _className(className, size) {
    const SIZE_CSS = size ? `mdl-cell--${size}-col` : '';
    return `mdl-cell ${SIZE_CSS} ${className ? className : ''}`;
};

function Column({size, className, children, ...otherProps}) {

    return(
        <div className={_className(className, size) } {...filterProps(otherProps)}>
            {children}
        </div>
    );
}

//Static props.
Column.displayName = 'Column';
Column.defaultProps = {
    size: 6
};
Column.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string
};

module.exports = Column;
