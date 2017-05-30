// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
import React, {Component, PropTypes} from 'react';
import filterProps from '../../utils/filter-html-attributes';

/**
 * Grid component.
 */

 function Grid({children, className, ...otherProps}) {
     return (
         <div className={`mdl-grid ${className ? className : ''}`} {...filterProps(otherProps)}>
             {children}
         </div>
     );
 }

Grid.propTypes = {};
//Static props.
Grid.displayName = 'Grid';

module.exports = Grid;
