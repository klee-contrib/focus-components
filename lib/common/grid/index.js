// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var types = require('focus').component.types;
/**
 * Grid component.
 */

var Grid = (function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        _Component.call(this, props);
    }

    /** @inheriteDoc */

    Grid.prototype.render = function render() {
        var children = this.props.children;

        return React.createElement(
            'div',
            { className: 'mdl-grid' },
            children
        );
    };

    return Grid;
})(Component);

Grid.propTypes = {
    children: types('element')
};

//Static props.
Grid.displayName = 'Grid';
module.exports = Grid;