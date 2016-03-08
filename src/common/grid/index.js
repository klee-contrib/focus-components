// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
const React = require('react');
const {Component} = React;
import types from 'focus-core/component/types';
/**
 * Grid component.
 */
class Grid extends Component {
    constructor(props) {
        super(props);
    }
    /** @inheriteDoc */
    render() {
        const {children, ...otherProps} = this.props;
        return (
            <div className='mdl-grid' {...otherProps}>
                {children}
            </div>
        );
    }
}

Grid.propTypes = {};

//Static props.
Grid.displayName = 'Grid';
module.exports = Grid;
