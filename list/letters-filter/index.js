/**@jsx*/
let builder = require('focus').component.builder;
let stylable = require('../../mixin/stylable');
let type = require('focus').component.types;

const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let lettersFilterMixin = {
    mixins: [stylable],
    /**
     * Component display name.
     */
    displayName: 'list-letters-filter',

    /**
     * Letters.
     * @type {Array}
     */
    letters: alphabetLetters.split(''),

    /** @inheritedDoc */
    getDefaultProps() {
        return {
            /**
             * Current selected letter.
             * @type {string}
             */
            selectedLetter: '',

            /**
             * Available letters.
             * @type {string}
             */
            availableLetters: '',

            /**
             * Handle letter selection action (must be overridden by calling component).
             * @param letter
             */
            handleLetterSelection: function(letter) { console.warn('selected letter: ', letter); } // Action on selection click
        };
    },

    /** @inheritdoc */
    propTypes: {
        selectedLetter: type('string'),
        availableLetters: type('string')
    },

    /** @inheritdoc */
    getInitialState(){
        return{
            selectedLetter: this.props.selectedLetter
        }
    },

    /** @inheritdoc */
    componentWillReceiveProps(newProps){
        this.setState(
            {
                selectedLetter: newProps.selectedLetter,
                availableLetters: newProps.availableLetters
            }
        );
    },

    /**
     * Handle letter selection.
     * @private
     */
    _selectionFunction(event) {
        let letter = event.target.getAttribute('data-letter');
        if(this._isLetterAvailable(letter)){
            //this.setState({selectedLetter: letter});
            this.setState({selectedLetter: letter}, () => {this.props.handleLetterSelection(letter)});
        }
    },

    /**
     * Check if a letter is available.
     * @param {string} letter.
     * @returns {boolean} letter is available in input data
     * @private
     */
    _isLetterAvailable(letter){
        return this.props.availableLetters.toUpperCase().indexOf(letter) > -1;
    },

    /**
     * Get selected style for a letter.
     * @param {string} letter letter to render.
     * @param {string} selectedLetter letter corresponding to the selected one.
     * @returns {string} selected if letter equals to the selected letter.
     * @private
     */
    _getSelectedStyle(letter, selectedLetter){
        return letter === selectedLetter ?'selected': undefined;
    },

    /**
     * Get disabled behavior style.
     * @param {string} letter
     * @returns {string} disabled if letter not available.
     * @private
     */
    _getDisabledBehavior(letter){
        return !this._isLetterAvailable(letter)? 'disabled': undefined;
    },

    /**
     * Render letters component. This is done by rendering each letter component from letters array.
     * @returns {JSX} Htm content.
     * @private
     */
    _renderLetters(){
        return (() => {
            return this.letters.map((letter)=>{
                /*
                 render each letter component from letters array.
                 */
                let isLetterAvailable = this._isLetterAvailable(letter);
                let elementClassName = `${isLetterAvailable ? '': 'disabled'} ${this._getSelectedStyle(letter, this.state.selectedLetter)}`;

                return (
                    <button key={letter}
                            ref={letter}
                            onClick={this._selectionFunction}
                            className={elementClassName}
                            data-focus='letter-element'
                            data-letter={letter}
                            disabled={this._getDisabledBehavior(letter)}>
                        {letter}
                    </button>
                );
            });
        })();
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     * @private
     */
    render(){
        return (
            <div className={this._getStyleClassName()} data-focus='letters-filter-bar'>
                {this._renderLetters()}
            </div>
        );
    }
};

module.exports = builder(lettersFilterMixin);