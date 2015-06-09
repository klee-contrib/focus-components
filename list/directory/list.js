/**@jsx*/

var React = require('react');
var type = require('focus').component.types;
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var builder = require('focus').component.builder;

var memoryMixin = require('../mixin/memory-scroll').mixin;
var LettersFilter = require('../letters-filter').component;
var List = require('../selection/list').component;

var assign = require('object-assign');
var groupBy = require('lodash/collection/groupBy');
var pairs = require('lodash/object/pairs');
var sortBy = require('lodash/collection/sortBy');
var uuid= require('uuid');

var directoryListMixin = {
    /** */
    displayName: 'directory-list',

    mixins: [memoryMixin],

    currentSelectedLetter: '',

    currentSelectedGroup: {},

    /** @inheritedDoc */
    getDefaultProps() {
        return {
            /**
             * property name to be filtered by letters-filter component
             * @type {string}
             */
            fieldName: '',

            /**
             * data to be displayed
             * @type {Array}
             */
            data: [],

            /**
             * show all data
             * @type {boolean}
             */
            showAll: true,

            /**
             * display group size
             * @type {boolean}
             */
            displayGroupSize: false,

            /**
             * linecomponent
             * @type {Array}
             */
            lineComponent: undefined

        };
    },

    /** @inheritdoc */
    propTypes: {
        listPropertyName: type('string'),
        data: type('array'),
        lineComponent: type('func', true),
        showAll: type('boolean'),
        displayGroupSize: type('boolean')
    },

    /** @inheritdoc */
    componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /** @inheritdoc */
    getInitialState(){
        this._sortData();

        var dataToUse = this._getDataToUse();
        var initialSelectedLetter = this._getInitialSelectedLetter(dataToUse);
        var availableLetters = this._getAvailableLetters(dataToUse);

        var dataToDisplay = this.props.showAll ? dataToUse: this._getGroupFromData(initialSelectedLetter) ;

        return {
            currentSelectedLetter: initialSelectedLetter,
            dataToDisplay: dataToDisplay,
            availableLetters: availableLetters
        };
    },

    /**
     * sort data
     * @returns {object} data sorted by letter
     * @private
     */
     _sortData(){
        //sorting data by first letter
        this.props.data = sortBy(this.props.data, (singleData) => {
            return singleData[this.props.fieldName].charAt(0).toLowerCase();
        });
    },

    /**
     * get data to display
     * @returns {object} data grouped by letter. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @private
     */
     _getDataToUse(){
        return (() => {
            return groupBy(this.props.data, (line) => {
                return line[this.props.fieldName][0].toUpperCase();
            });
        })();
    },

    /**
     * get group by letter
     * @param {string} selected letter
     * @returns {string} group corresponding to selected letter
     * @private
     */
     _getGroupFromData(letter){
        var group = {};
        group[letter] = this._getDataToUse()[letter];
        return group;
    },

    /**
     * get initial letter from a grouped data:
     * The grouped array is already sorted, so we need to pick only first object property name
     * @param {object} grouped data. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @returns {string} initial selected data from grouped array
     * @private
     */
    _getInitialSelectedLetter(data){
        return Object.keys(data)[0];
    },

    /**
     * retrieve available letters from data. The grouped data is already sorted by letter
     * @param {object} grouped data. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @returns {string} a string of available letters
     * @private
     */
    _getAvailableLetters(data){
        return Object.keys(data).join('');
    },

    /**
     * handle letter click event
     * @param {string} selected letter
     * @private
     */
    _onLetterSelected(letter){
        if(this.props.showAll){
            var groupView = document.getElementById(this._getGroupId(letter));
            groupView.scrollIntoView();
        }else{
            var groupToDisplay = this._getGroupFromData(letter);
            this.setState({dataToDisplay: groupToDisplay});
        }

    },

    /**
     * get group id
     * @param {string} selected letter
     * @returns {string} group id
     * @private
     */
     _getGroupId(letter){
        return `directory-group-${letter}`;
    },

    /**
     * get group header label
     * @param {string} selected letter
     * @returns {string} group header label
     * @private
     */
     _getGroupHeaderLabel(letter){
        var groupHeaderLabel = letter;
        if(this.props.displayGroupSize){
            groupHeaderLabel = groupHeaderLabel.concat(' (', this._getGroupSize(letter), ')')
        }
        return groupHeaderLabel;
    },
    /**
     * get group size
     * @param {string} selected letter
     * @returns {int} group size
     * @private
     */
     _getGroupSize(letter){
        return this.state.dataToDisplay[letter].length;
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     * @private
     */
     render(){
        return (
            <div data-focus='list-directory' >

                <div className='letters-filter-bar'>
                    <LettersFilter
                        selectedLetter={this.state.currentSelectedLetter}
                        availableLetters={this.state.availableLetters}
                        handleLetterSelection={this._onLetterSelected}
                    />
                </div>

                <div className='directory-list-container'>
                {pairs(this.state.dataToDisplay).map((groupList)=>{
                    var groupLetter = groupList[0];
                    var groupLetterId = this._getGroupId(groupLetter);
                    var groupData = groupList[1];

                    return(
                        <div id={groupLetterId}>
                            <div className='directory-list-group'>{this._getGroupHeaderLabel(groupLetter)}</div>

                              <List data={groupData}
                                    key={this.props.idField || uuid.v4()}
                                    hasMoreData={false}
                                    lineComponent={this.props.lineComponent}
                                    isSelection={false}
                                    isManualFetch={true}
                                  />

                        </div>
                    )})
                }
                </div>

            </div>
        );
    }
};

module.exports = builder(directoryListMixin);

