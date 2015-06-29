/**@jsx*/

let React = require('react');
let type = require('focus').component.types;
let checkIsNotNull = require('focus').util.object.checkIsNotNull;
let builder = require('focus').component.builder;

//mixins
let memoryMixin = require('../mixin/memory-scroll').mixin;
let stylable = require('../../mixin/stylable');

//Components used by directory
let LettersFilter = require('../letters-filter').component;
let List = require('../selection/list').component;
let Table = require('../table/list').component;

//Lodash utilities functions
let isArray = require('lodash/lang/isArray');
let isEmpty = require('lodash/lang/isEmpty');
let groupBy = require('lodash/collection/groupBy');
let pairs = require('lodash/object/pairs');
let keys = require('lodash/object/keys');
let values = require('lodash/object/values');
let omit = require('lodash/object/omit');
let escapeRegExp = require('lodash/string/escapeRegExp');

//Event name to be listened for quick search
const INPUT_EVENT = 'input';

//RegExp for alphabetic letters needed to check if another chars are present in the list
const isLetterRegExp = new RegExp('[a-zA-Z]');

//Define a symbol to all non alphabitc characters
const nonAlphabeticCharactersSymbol = '*';

//Message to display if initial data is empty
const MESSAGE_EMPTY_LIST = 'empty.list'

//Message to display if no data found for a search text
const MESSAGE_NO_RESULT_FOUND = 'no.results.found'

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
            externalQuickSearch: undefined,

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
             * function called after search.
             * @type {function}
             */
            doAfterSearch: function(searchText){}
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
        externalQuickSearch: type('string'),
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
        let dataToUse = this._getDataToUse();
        let initialSelectedLetter = this._getInitialSelectedLetter(dataToUse);
        let availableLetters = this._getAvailableLetters(dataToUse);

        let dataToDisplay = this.props.showAll ? dataToUse: this._getGroupFromData(dataToUse, initialSelectedLetter) ;
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
        if(document.querySelector(this.props.externalQuickSearch) != null){
            this.quickSearchDOMNode = document.querySelector(this.props.externalQuickSearch);
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
            let groupView = document.querySelector(`[data-directory-group="${this.state.currentSelectedLetter}"]`);
            if(groupView != null){
                groupView.scrollIntoView();
            }
        }
        this.props.doAfterSearch(this.searchText);
    },

    /**
     * Sorting data by letter.
     * @returns {object} data sorted by letter.
     * @private
     */
     _sortData(newData){
        let dataToSort = newData != undefined ? newData: this.props.data;


        //this.sortedData = sortBy(dataToSort, (element) => {
        //    return element[this.props.fieldName].charAt(0).toLowerCase();
        //});

        this.sortedData = dataToSort.sort((a, b) => {
            let isStartWithLetterA = isLetterRegExp.test(a[this.props.fieldName].charAt(0).toLowerCase());
            let isStartWithLetterB = isLetterRegExp.test(b[this.props.fieldName].charAt(0).toLowerCase());

            if(!isStartWithLetterA && isStartWithLetterB){
                return -1;
            }else if(isStartWithLetterA && !isStartWithLetterB){
                return 1;
            }else{
                return a[this.props.fieldName].charAt(0).toLowerCase().localeCompare(b[this.props.fieldName].charAt(0).toLowerCase());
            }
        });

    },

    /**
     * Get data to use grouped by letter.
     * @returns {object} data grouped by letter. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @private
     */
     _getDataToUse(){
        let dataToUse = [];
        if(this.searchText !== ''){
            let regExp = new RegExp(escapeRegExp(this.searchText), 'i');
            if(this.props.globalSearch){
                dataToUse = this.sortedData.filter((obj) => {
                                return regExp.test(values(obj).join(''));
                            });
            }else{
                dataToUse = this.sortedData.filter((obj) => {
                                return regExp.test(obj[this.props.fieldName]);
                            });
            }
        }else{
            dataToUse = this.sortedData;
        }

        return groupBy(dataToUse, (line) => {
            let groupChar = line[this.props.fieldName].charAt(0);
            if(isLetterRegExp.test(groupChar)){
                return groupChar.toUpperCase();
            }else{
                return nonAlphabeticCharactersSymbol;
            }
        });
    },

    /**
     * Get one group by letter.
     * @param {string} selected letter
     * @returns {string} group corresponding to selected letter
     * @private
     */
    _getGroupFromData(dataToUse, letter){
        if(letter){
            let group = {[letter]: dataToUse[letter]};
            return group;
        }
    },

    /**
     * Get initial letter from data.
     * Hint: The grouped array is already sorted, so we need to pick only first object property name.
     * @param {object} grouped data. exemple: {A: Array[], B: Array[], C: Array[], ..., Z: Array[]}
     * @returns {string} initial selected data from grouped array
     * @private
     */
    _getInitialSelectedLetter(data){
        let initialLetter;
        if((initialLetter = keys(data)[0]) !== undefined){
            return initialLetter;
        }
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
            let groupView = document.querySelector(`[data-directory-group="${letter}"]`);
            groupView.scrollIntoView();
        }else{//display only one group
            let dataToUse = this._getDataToUse();
            let availableLetters = this._getAvailableLetters(dataToUse);
            let groupToDisplay = this._getGroupFromData(dataToUse, letter);
            this.setState({data: groupToDisplay, currentSelectedLetter: letter, availableLetters: availableLetters});
        }

    },

    /**
     * Filter results by searching text in data.
     * @private
     */
    _filterResults(){
        this.searchText = this.quickSearchDOMNode.value.trim();
        let newState = this._getState();

        this.setState(
            {   data: newState.data,
                currentSelectedLetter: newState.currentSelectedLetter,
                availableLetters: newState.availableLetters
            });
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
                extraCharsSymbol={nonAlphabeticCharactersSymbol}
                />
        );
    },

    /**
     * Render quick search.
     * @returns {JSX} Htm content.
     * @private
     */
    _renderQuickSearch(){
        if(document.querySelector(this.props.externalQuickSearch) == null){
            return(
                <div style={{display: 'inline-block'}}>
                    <input ref="quickSearch" className="form-control" type="text" placeholder="search text"></input>
                </div>
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
        let listProps = omit(this.props, ['fieldName', 'showAll', 'displayGroupSize', 'data', 'externalQuickSearch', 'withQuickSearch', 'globalSearch', 'doAfterSearch', 'displayGroupHeader']);

        if(this.props.data && isEmpty(this.props.data)){
            return(
                <div>{MESSAGE_EMPTY_LIST}</div>
            );
        } else if(this.state && this.state.data && isEmpty(this.state.data)){
            return(
                <div>{MESSAGE_NO_RESULT_FOUND}</div>
            );
        } else if(this.state && this.state.data && !isEmpty(this.state.data)){
            return (() => {
                return pairs(this.state.data).map((groupList)=>{
                    let groupLetter = groupList[0];
                    let listData = groupList[1];

                    let dataList;
                    if(this.props.displayGroupHeader){
                        dataList = <Table data={listData} {...listProps} />;

                    }else{
                        dataList = <List data={listData} {...listProps}/>;
                    }

                    return(
                        <div key={groupLetter} data-directory-group={groupLetter} >
                            {this._renderGroupHeader(groupLetter)}
                            {dataList}
                        </div>
                    )});
            })();
        }else{
            return(
                <div>{MESSAGE_EMPTY_LIST}</div>
            );
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

