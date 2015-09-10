// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var types = require('focus').component.types;
/**
 * Column component.
 */

var Column = (function (_Component) {
    _inherits(Column, _Component);

    function Column(props) {
        _classCallCheck(this, Column);

        _Component.call(this, props);
        this._className = this._className.bind(this);
    }

    //Static props.

    Column.prototype._className = function _className() {
        var _props = this.props;
        var size = _props.size;
        var className = _props.className;

        if (className) {
            return className;
        }
        var SIZE_CSS = size ? 'mdl-cell--' + size + '-col' : '';
        return 'mdl-cell ' + SIZE_CSS + ' ';
    };

    /** @inheriteDoc */

    Column.prototype.render = function render() {
        var _props2 = this.props;
        var children = _props2.children;
        var style = _props2.style;

        var className = this._className();
        return React.createElement(
            'div',
            { className: className, style: style },
            children
        );
    };

    return Column;
})(Component);

Column.displayName = 'Column';
Column.defaultProps = {
    size: 6
};
Column.propTypes = {
    size: types('number'),
    children: types('element'),
    className: types('string'),
    style: types('object')
};

module.exports = Column;