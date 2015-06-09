/**@jsx*/
let builder = require('focus').component.builder;
let styleBeahviour = require('../../mixin/stylable');
let type = require('focus').component.types;

let alphabetLetters = 'abcdefghijklmnopqrstuvwxyz';

let lettersFilterMixin = {
    mixins: [styleBeahviour],
    /** */
    displayName: 'list-letters-filter',

    /**
     * [letters description]
     * @type {Array}
     */
    letters: alphabetLetters.toUpperCase().split(''),

    /** @inheritedDoc */
    getDefaultProps() {
        return {
            /**
             * current selected letter.
             * @type {string}
             */
            selectedLetter: '',

            /**
             * available letters to be actioned
             * @type {string}
             */
            availableLetters: '',

            /**
             * handle letter selection action (must be overridden by calling component)
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

    /**
     * on letter select function
     * @private
     */
    _selectionFunction(event) {
        var letter = event.target.getAttribute('data-letter');
        if(this._isLetterAvailable(letter)){
            this.setState({selectedLetter: letter});
            return this.props.handleLetterSelection(letter);
        }
    },

    /**
     * check if letter is available in input data
     * @returns {boolean} letter is available in input data
     * @private
     */
    _isLetterAvailable(letter){
        return this.props.availableLetters.toUpperCase().indexOf(letter) > -1;
    },

    /**
     * get selected style for letter
     * @param {string} letter letter to render.
     * @param {string} selectedLetter letter corresponding to the selected one.
     * @returns {string} selected if letter equals to the selected letter.
     * @private
     */
    _getSelectedStyle(letter, selectedLetter){
        return letter === selectedLetter ?'selected': undefined;
    },

    /**
     * get disabled behavior
     * @param {string} letter letter to render.
     * @returns {string} disabled if letter not available in input data.
     * @private
     */
    _getDisabledBehavior(letter){
        return !this._isLetterAvailable(letter)? 'disabled': undefined;
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     * @private
     */
    render(){
        return (
            <div className={`letters-filter-bar ${this._getStyleClassName()}`}>
                {
                this.letters.map((letter)=>{
                    var isLetterAvailable = this._isLetterAvailable(letter) ;
                    var elementClassName = `letter-element ${isLetterAvailable ? '': 'disabled'} ${this._getSelectedStyle(letter, this.state.selectedLetter)}`;
                      return (
                            <button ref={letter} onClick={this._selectionFunction} className={elementClassName} data-letter={letter} disabled={this._getDisabledBehavior(letter)}>
                              {letter}
                            </button>
                      );
                })
                }
            </div>
        );
    }
};

module.exports = builder(lettersFilterMixin);