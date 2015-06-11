/**@jsx*/

var React = require('react');
var type = require('focus').component.types;
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var builder = require('focus').component.builder;

var memoryMixin = require('../mixin/memory-scroll').mixin;
var LettersFilter = require('../letters-filter').component;
var List = require('../selection/list').component;

var groupBy = require('lodash/collection/groupBy');
var pairs = require('lodash/object/pairs');
var sortBy = require('lodash/collection/sortBy');
var keys = require('lodash/object/keys');
var uuid= require('uuid');

var directoryListMixin = {
    /**
     * Component display name.
     */
    displayName: 'directory-list',

    /**
     * Mixins used by component.
     */
    mixins: [memoryMixin],

    /**
     * Current selected letter.
     */
    currentSelectedLetter: '',

    /** @inheritedDoc */
    getDefaultProps() {
        return {
            /**
             * Property name to be filtered by letters-filter component.
             * @type {string}
             */
            fieldName: '',

            /**
             * Data to be displayed in the list.
             * @type {Array}
             */
            data: [],

            /**
             * Show all data.
             * If true, list will display all data separated by letters.
             * Otherwise, only data responding to filter criteria will be shown in the list.
             * @type {boolean}
             */
            showAll: true,

            /**
             * Display group size.
             * If true, display size of each group.
             * @type {boolean}
             */
            displayGroupSize: false

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
     * Sorting data by letter.
     * @returns {object} data sorted by letter.
     * @private
     */
     _sortData(){
        //sorting data by first letter
        this.props.data = sortBy(this.props.data, (singleData) => {
            return singleData[this.props.fieldName].charAt(0).toLowerCase();
        });
    },

    /**
     * Get data to use.
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
     * Get one group by letter.
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
     * Get initial letter from data.
     * Hint: The grouped array is already sorted, so we need to pick only first object property name.
     * @param {object} grouped data. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @returns {string} initial selected data from grouped array
     * @private
     */
    _getInitialSelectedLetter(data){
        return keys(data)[0];
    },

    /**
     * Retrieve available letters from data.
     * Hint: The grouped data is already sorted by letter.
     * @param {object} grouped data. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @returns {string} a string of available letters
     * @private
     */
    _getAvailableLetters(data){
        return keys(data).join('');
    },

    /**
     * Handle letter click event.
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
     * Get group id.
     * @param {string} selected letter
     * @returns {string} group id
     * @private
     */
     _getGroupId(letter){
        return `directory-group-${letter}`;
    },

    /**
     * Get group header label
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
     * Get group size.
     * @param {string} selected letter
     * @returns {int} group size
     * @private
     */
     _getGroupSize(letter){
        return this.state.dataToDisplay[letter].length;
    },

    /**
     * Render data list.
     * @returns {JSX} Htm content.
     * @private
     */
    _renderDataList(){
        return (() => {
            return pairs(this.state.dataToDisplay).map((groupList)=>{
                    var groupLetter = groupList[0];
                    var groupLetterId = this._getGroupId(groupLetter);
                    var listData = groupList[1];

                    return(
                        <div id={groupLetterId}>
                            <div data-focus='directory-list-group'>{this._getGroupHeaderLabel(groupLetter)}</div>

                            <List data={listData}
                                  key={this.props.idField || uuid.v4()}
                                  hasMoreData={false}
                                  lineComponent={this.props.lineComponent}
                                  isSelection={false}
                                  isManualFetch={true}
                                />

                        </div>
                    )});
        })();
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     * @private
     */
     render(){
        return (
            <div data-focus='list-directory'>

                <LettersFilter
                    selectedLetter={this.state.currentSelectedLetter}
                    availableLetters={this.state.availableLetters}
                    handleLetterSelection={this._onLetterSelected}
                />

                <div data-focus='directory-list-container'>
                    {this._renderDataList()}
                </div>
            </div>
        );
    }
};

module.exports = builder(directoryListMixin);

