/**@jsx*/
var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');
var type = require('focus').component.types;
var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var LettersFilter = require('../letters-filter').component;
var List = require('../selection/list').component;

var directoryListMixin = {
    /** */
    displayName: 'directory-list',

    /** @inheritedDoc */
        getDefaultProps() {
        return {
            /**
             * property name to be filtered by letters-filter component
             * @type {string}
             */
            listPropertyName: '',

            /**
             * current selected letter
             * @type {string}
             */
            currentSelectedLetter: ''


        };
    },

    /** @inheritdoc */
    propTypes: {
        listPropertyName: type('string'),
        currentSelectedLetter: type('string')
    },

    _getInitialSelectedLetter(){
        //data from store ???
        return 'C';
    },

    _getAvailableLetters(){
        //data from store ???
        return 'CDEF';
    },

    _onLetterSelected(letter){
        if(this.currentSelectedLetter !== letter){
            this.currentSelectedLetter = letter;
            console.log('directory - letter selected: ', letter);
            //filtrer la liste
            //render liste
        }
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     * @private
     */
     render(){
        return (
            <div>
                <LettersFilter
                    selectedLetter={this._getInitialSelectedLetter()}
                    availableLetters={this._getAvailableLetters()}
                    handleLetterSelection={this._onLetterSelected}
                />


            </div>
        );
    }
};

module.exports = builder(directoryListMixin);

