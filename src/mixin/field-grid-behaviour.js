import React, { PropTypes } from 'react';

const GRID_SIZE = 12, CELL = 'mdl-cell';

/**
 * An example of the label and content size, and of label and content offset, with function fieldFor
 * 
 * I want to have the label on the first row of the grid, the field on the second one,
 * with a 'padding' (offset) of one cell on each row.
 * 
 * const fieldOptions = { labelSize: 10, contentSize: 10, labelOffset:1, contentOffset:1 };
 * ...
 * {this.fieldFor('nom', fieldOptions)}
 * 
 **/

const fieldGridBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps() {
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
        contentCellPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        labelCellPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        labelSize: PropTypes.number,
        contentSize: PropTypes.number,
        labelOffset: PropTypes.number,
        contentOffset: PropTypes.number
    },
    _buildGridClassName(prop, suffix) {
        return prop ? (' mdl-cell--' + prop + (suffix ? suffix : '')) : '';
    },
    _getCellGridClassName(position, size, offset) {
        const cellPosition = this._buildGridClassName(position);
        const cellSize = this._buildGridClassName(size, '-col');
        const cellOffset = this._buildGridClassName(offset, '-offset');

        return CELL + cellPosition + cellSize + cellOffset;
    },
    /**
    * Get the label gridClass.
    * @returns {string} - The label gridSize.
    */
    _getLabelGridClassName() {
        return this._getCellGridClassName(this.props.labelCellPosition, this.props.labelSize, this.props.labelOffset);
    },
    /**
    * Get the content class Name.
    * @returns {string} - The content gridSize.
    */
    _getContentGridClassName() {
        return this._getCellGridClassName(this.props.contentCellPosition, (this.props.contentSize || (GRID_SIZE - this.props.labelSize)), this.props.contentOffset);
    },
    /**
    * Get the content offset className.
    * @returns {string} - The label gridSize.
    */
    _getContentOffsetClassName() {
        return `${CELL} mdl-cell--${this.props.labelSize}-offset`;
    }
};

export default fieldGridBehaviourMixin;
