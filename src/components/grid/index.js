// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
import React, {Component, PropTypes} from 'react';

/**
 * Grid component.
 */

 function Grid({children, ...otherProps}) {
     return (
         <div className='mdl-grid' {...otherProps}>
             {children}
         </div>
     );
 }

Grid.propTypes = {};
//Static props.
Grid.displayName = 'Grid';

module.exports = Grid;
