// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
const React = require('react');
const {Component} = React;
const types = require('focusjs').component.types;
/**
 * Grid component.
 */
class Grid extends Component{
    constructor(props){
        super(props);
    }
    /** @inheriteDoc */
    render() {
        const {children} = this.props;
        return (
            <div className='mdl-grid'>
                {children}
            </div>
        );
    }
}

Grid.propTypes = {
    children: types('element')
};

//Static props.
Grid.displayName = 'Grid';
module.exports = Grid;
