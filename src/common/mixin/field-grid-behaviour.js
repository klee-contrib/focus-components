const {types} = require('focus-core').component;
const React = require('react');
const oneOf = React.PropTypes.oneOf;

const GRID_SIZE = 12, CELL = 'mdl-cell';

const fieldGridBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps(){
        return {
            /**
            * Size of the label in the grid system.
            * @type {Number}
            */
            labelSize: 4,
            /**
             * POsition of the label in the cell.
             * Possible values: top, middle, bottom
             * @type {String}
             */
            labelCellPosition: 'top',
            /**
             * Position of the content in the cell.
             * Possible values: top, middle, bottom
             * @type {String}
             */
            contentCellPosition: 'top'
        };
    },
    /** @inheritdoc */
    propTypes: {
        labelSize: types('number'),
        labelCellPosition: oneOf(['string', 'number']),
        contentCellPosition: oneOf(['string', 'number'])
    },
    /**
    * Get the label gridClass.
    * @returns {string} - The label gridSize.
    */
    _getLabelGridClassName(){
        return `${CELL} mdl-cell--${this.props.labelCellPosition} mdl-cell--${this.props.labelSize}-col`;
    },
    /**
    * Get the content class Name.
    * @returns {string} - The content gridSize.
    */
    _getContentGridClassName(){
        return `${CELL} mdl-cell--${this.props.contentCellPosition} mdl-cell--${GRID_SIZE - this.props.labelSize}-col`;
    },
    /**
    * Get the content offset className.
    * @returns {string} - The label gridSize.
    */
    _getContentOffsetClassName(){
        return `${CELL} mdl-cell--${this.props.labelSize}-offset-col`;
    }
};
module.exports = fieldGridBehaviourMixin;
