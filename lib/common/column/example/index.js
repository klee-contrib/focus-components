'use strict';

var _FocusComponents$common = FocusComponents.common;
var Column = _FocusComponents$common.column;
var Grid = _FocusComponents$common.grid;

// Blue square to  fill the grid.
var BlueSquare = React.createClass({
    displayName: 'BlueSquare',

    render: function render() {
        var label = this.props.label;
        var style = { backgroundColor: '#BDBDBD', height: '200px', color: 'white' };
        return React.createElement(
            'div',
            { style: style },
            label
        );
    }
});

var GridColumnSample = React.createClass({
    displayName: 'GridColumnSample',

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            Grid,
            null,
            React.createElement(
                Column,
                { size: '4' },
                React.createElement(BlueSquare, { label: 'size4' })
            ),
            React.createElement(
                Column,
                { size: '3' },
                React.createElement(BlueSquare, { label: 'size3' })
            ),
            React.createElement(
                Column,
                { size: '5' },
                React.createElement(BlueSquare, { label: 'size5' })
            ),
            React.createElement(
                Column,
                { size: '4' },
                React.createElement(BlueSquare, { label: 'size4' })
            )
        );
    }
});

return React.createElement(GridColumnSample, null);