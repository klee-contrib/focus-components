const GRID_SIZE = 12,
CELL = 'mdl-cell';

const fieldGridBehaviourMixin = {
    getDefaultProps(){
        return {
            /**
            * Size of the label in the grid system.
            * @type {Number}
            */
            labelSize: 4
        };
    },
    /**
    * Get the label gridClass.
    * @returns {string} - The label gridSize.
    */
    _getLabelGridClassName(){
        return `${CELL} mdl-cell--${this.props.labelSize}-col`;
    },
    /**
    * Get the content class Name.
    * @returns {string} - The content gridSize.
    */
    _getContentGridClassName(){
        return `${CELL} mdl-cell--${GRID_SIZE - this.props.labelSize}-col`;
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
