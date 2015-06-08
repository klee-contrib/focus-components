/**@jsx*/

var React = require('react');
var type = require('focus').component.types;
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var builder = require('focus').component.builder;

var memoryMixin = require('../mixin/memory-scroll').mixin;
let stylable = require('../../mixin/stylable');

var LettersFilter = require('../letters-filter').component;
var List = require('../selection/list').component;
var Table = require('../table/list').component;

var isArray = require('lodash/lang/isArray');
var groupBy = require('lodash/collection/groupBy');
var pairs = require('lodash/object/pairs');
var sortBy = require('lodash/collection/sortBy');
var keys = require('lodash/object/keys');
var values = require('lodash/object/values');
let omit = require('lodash/object/omit');
let escapeRegExp = require('lodash/string/escapeRegExp');

var uuid= require('uuid');

var INPUT_EVENT = 'input';

var directoryListMixin = {
    /**
     * Component display name.
     */
    displayName: 'directory-list',

    /**
     * Mixins used by component.
     * @type {Array}
     */
    mixins: [memoryMixin, stylable],

    /**
     * Sorted data.
     * @type {Array}
     */
    sortedData: [],

    /**
     * search text.
     * @type {string}
     */
    searchText: '',

    /**
     * search dom node.
     * @type {object}
     */
    quickSearchDOMNode: undefined,

    /** @inheritedDoc */
    getDefaultProps() {
        return {
            /**
             * Property name to be filtered by letters-filter component.
             * @type {string}
             */
            fieldName: '',

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
            displayGroupSize: false,

            /**
             * Data to be displayed in the list.
             * @type {Array}
             */
            data: [],

            /**
             * Define an external quick search input.
             * In this case, the default quick search will be omitted.
             * @type {string}
             */
            quickSearchInput: undefined,

            /**
             * Add a default quick search input.
             * @type {boolean}
             */
            withQuickSearch: true,

            /**
             * Search in all fields.
             * @type {boolean}
             */
            globalSearch: false,

            /**
             * Display headers for each group.
             * @type {boolean}
             */
            displayGroupHeader: false,

            /**
             * function called after component is refreshed.
             * @type {function}
             */
            handleAfterRefresh: function(searchText){}
        };
    },

    /** @inheritdoc */
    propTypes: {
        listPropertyName: type('string'),
        data: type('array'),
        lineComponent: type('func', true),
        showAll: type('bool'),
        displayGroupSize: type('bool'),
        globalSearch: type('bool'),
        quickSearchInput: type('string'),
        withQuickSearch: type('bool')
    },

    /** @inheritdoc */
    getInitialState(){
        return this._getStateFromStore();
    },

    /**
     * Get component state using store data.
     * @param {array} data to use.
     * @returns {object} state.
     * @private
     */
     _getStateFromStore(newData){
        this._sortData(newData);
        return this._getState();
    },

    /**
     * Get component state.
     * @returns {object} state.
     * @private
     */
     _getState(){
        var dataToUse = this._getDataToUse();
        var initialSelectedLetter = this._getInitialSelectedLetter(dataToUse);
        var availableLetters = this._getAvailableLetters(dataToUse);

        var dataToDisplay = this.props.showAll ? dataToUse: this._getGroupFromData(dataToUse, initialSelectedLetter) ;
        return {
            data: dataToDisplay,
            currentSelectedLetter: initialSelectedLetter,
            availableLetters: availableLetters
        };
    },


    /** @inheritdoc */
    componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
        checkIsNotNull('data', this.props.data);
    },

    /** @inheritdoc */
    componentDidMount(){
        if(document.querySelector(this.props.quickSearchInput) != null){
            this.quickSearchDOMNode = document.querySelector(this.props.quickSearchInput);
        }else if(this.props.withQuickSearch) {
            this.quickSearchDOMNode = React.findDOMNode(this.refs.quickSearch);
        }
        if(this.quickSearchDOMNode != undefined){
            this.quickSearchDOMNode.addEventListener(INPUT_EVENT, this._filterResults);
        }
    },

    /** @inheritdoc */
    componentWillUnmount(){
        if(this.quickSearchDOMNode != undefined){
            this.quickSearchDOMNode.removeEventListener(INPUT_EVENT, this._filterResults);
        }
    },

    /** @inheritdoc */
    componentWillReceiveProps(newProps){
        this.setState(this._getStateFromStore(newProps.data));
    },

    /** @inheritdoc */
    componentDidUpdate(){
        if(!this.props.showAll){
            var groupView = document.getElementById(this._getGroupId(this.state.currentSelectedLetter));
            groupView.scrollIntoView();
        }
        this.props.doAfterRefresh(this.searchText);
    },

    /**
     * Sorting data by letter.
     * @returns {object} data sorted by letter.
     * @private
     */
     _sortData(newData){
        var dataToSort = newData != undefined ? newData: this.props.data;
        this.sortedData = sortBy(dataToSort, (singleData) => {
            return singleData[this.props.fieldName].charAt(0).toLowerCase();
        });
    },

    /**
     * Get data to use grouped by letter.
     * @returns {object} data grouped by letter. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @private
     */
     _getDataToUse(){
        var dataToUse = [];
        if(this.searchText !== ''){
            var regExp = new RegExp(escapeRegExp(this.searchText), 'i');
            if(this.props.globalSearch){
                dataToUse = (() => {
                    return this.sortedData.filter((obj) => {
                        return regExp.test(values(obj).join(''));
                    });
                })();
            }else{
                dataToUse = (() => {
                    return this.sortedData.filter((obj) => {
                        return regExp.test(obj[this.props.fieldName]);
                    });
                })();
            }
        }else{
            dataToUse = this.sortedData;
        }
        return (() => {
            return groupBy(dataToUse, (line) => {
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
    _getGroupFromData(dataToUse, letter){
        var group = {};
        group[letter] = dataToUse[letter];
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
     * if showAll is true, scroll to letter group. Otherwise, show only group related to selected letter
     * @param {string} selected letter
     * @private
     */
    _onLetterSelected(letter){
        if(this.props.showAll){//display all data
            var groupView = document.getElementById(this._getGroupId(letter));
            groupView.scrollIntoView();
        }else{//display only one group
            var dataToUse = this._getDataToUse();
            var availableLetters = this._getAvailableLetters(dataToUse);
            var groupToDisplay = this._getGroupFromData(dataToUse, letter);
            this.setState({data: groupToDisplay, currentSelectedLetter: letter, availableLetters: availableLetters});
        }

    },

    /**
     * Filter results by searching text in data.
     * @private
     */
    _filterResults(){
        this.searchText = this.quickSearchDOMNode.value.trim();
        var newState = this._getState();

        this.setState(
            {   data: newState.data,
                currentSelectedLetter: newState.currentSelectedLetter,
                availableLetters: newState.availableLetters
            });
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
     * Get group size.
     * @param {string} selected letter
     * @returns {int} group size
     * @private
     */
    _getGroupSize(letter){
        if(this.state && this.state.data && isArray(this.state.data[letter])){
            return this.state.data[letter].length;
        }
    },

    /**
     * Render letters filter.
     * @returns {JSX} Htm content.
     * @private
     */
    _renderLettersFilter(){
        return (
            <LettersFilter
                selectedLetter={this.state.currentSelectedLetter}
                availableLetters={this.state.availableLetters}
                handleLetterSelection={this._onLetterSelected}
                />
        );
    },

    /**
     * Render quick search.
     * @returns {JSX} Htm content.
     * @private
     */
    _renderQuickSearch(){
        if(document.querySelector(this.props.quickSearchInput) == null){
            return(
                <input ref="quickSearch" type="text" placeholder="search text"></input>
            );
        }
    },

    /**
     * Render group header.
     * @param {string} selected letter
     * @returns {JSX} Htm content.
     * @private
     */
    _renderGroupHeader(letter){
        return(
            <div data-focus='directory-list-group'>
                <div data-focus="directory-list-group-letter" className="circle">{letter}</div>
                {this.props.displayGroupSize ?  <span data-focus="directory-list-group-size"> ({this._getGroupSize(letter)})</span>: false}
            </div>
        );
    },

    /**
     * Render data list.
     * @returns {JSX} Htm content.
     * @private
     */
    _renderDataList(){
        var listProps = omit(this.props, ['fieldName', 'showAll', 'displayGroupSize', 'data', 'quickSearchInput', 'withQuickSearch', 'globalSearch', 'handleAfterRefresh', 'displayGroupHeader']);

        if(this.state && this.state.data && keys(this.state.data).length > 0){
            return (() => {
                return pairs(this.state.data).map((groupList)=>{
                        var groupLetter = groupList[0];
                        var groupLetterId = this._getGroupId(groupLetter);
                        var listData = groupList[1];

                        var dataList;
                        if(this.props.displayGroupHeader){
                            dataList = <Table data={listData} {...listProps} />;

                        }else{
                            dataList = <List data={listData} {...listProps}/>;
                        }

                        return(
                            <div id={groupLetterId} key={groupLetterId}>
                                {this._renderGroupHeader(groupLetter)}
                                {dataList}
                            </div>
                        )});
            })();
        }

    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     * @private
     */
    render(){
        return (
            <div data-focus='directory-list' className={this._getStyleClassName()}>
                <div data-focus='directory-letters-container'>
                    {this._renderLettersFilter()}
                    {this._renderQuickSearch()}
                </div>
                <div data-focus='directory-list-container' ref='directoryListContainer'>
                    {this._renderDataList()}
                </div>
            </div>
        );
    }
};

module.exports = builder(directoryListMixin);

