// Dependencies

const {checkIsNotNull} = require('focus-core').util.object;
const {builder, types} = require('focus-core').component;
const find = require('lodash/collection/find');
const {omit} = require('lodash/object');
const {isArray} = require('lodash/lang');

// Mixins

const translationMixin = require('../../common/i18n').mixin;
const infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
const referenceMixin = require('../../common/mixin/reference-property');

// Components

const Button = require('../../common/button/action').component;

const listMixin = {
    /**
    * Display name.
    */
    displayName: 'selection-list',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
    * Default properties for the list.
    * @returns {{isSelection: boolean}} the default properties
    */
    getDefaultProps: function getListDefaultProps(){
        return {
            data: [],
            isSelection: true,
            selectionStatus: 'partial',
            selectionData: [],
            isLoading: false,
            operationList: [],
            idField: 'id'
        };
    },

    /**
    * list property validation.
    * @type {Object}
    */
    propTypes: {
        buttonComponent: types('func'),
        data: types('array'),
        idField: types('string'),
        isLoading: types('bool'),
        isSelection: types('bool'),
        lineComponent: types('func', true),
        loader: types('func'),
        onLineClick: types('func'),
        onSelection: types('func'),
        operationList: types('array'),
        selectionData: types('array'),
        selectionStatus: types('string')
    },

    /**
    * called before component mount
    */
    componentWillMount() {
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /**
    * Return selected items in the list.
    * @return {Array} selected items
    */
    getSelectedItems() {
        const selected = [];
        for(let i = 1; i < this.props.data.length + 1; i++){
            const lineName = 'line' + i;
            const lineValue = this.refs[lineName].getValue();
            if(lineValue.isSelected){
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
    * Render lines of the list.
    * @returns {*} DOM for lines
    */
    _renderLines() {
        let lineCount = 1;
        const {data, lineComponent: Line, selectionData, idField, selectionStatus} = this.props;
        if(!isArray(data)){
            console.error(
                'List: Lines: it seems data is not an array, please check the value in your store, it could also be related to your action in case of a load (have a look to shouldDumpStoreOnActionCall option).'
            );
        }
        return data.map((line) => {
            let isSelected;
            const selection = find(selectionData, {[idField]: line[idField]});
            if (selection) {
                isSelected = selection.isSelected;
            } else {
                switch(selectionStatus){
                    case 'none':
                        isSelected = false;
                    break;
                    case 'selected':
                        isSelected = true;
                    break;
                    case 'partial':
                        isSelected = undefined;
                    break;
                    default:
                        isSelected = false;
                }
            }
            return (
                <Line
                    data={line}
                    isSelected={isSelected}
                    key={line[idField]}
                    ref={`line${lineCount++}`}
                    reference={this._getReference()}
                    {...omit(this.props, 'data')}
                    />
            );
        });
    },
    /**
    * Render loading state
    * @return {HTML} the loading state
    */
    _renderLoading() {
        const {isLoading, loader} = this.props;
        if(isLoading){
            if(loader){
                return loader();
            }
            return (
                <li className='sl-loading'>{this.i18n('list.loading')} ...</li>
            );
        }
    },
    /**
    * Render manual fetch state
    * @return {HTML} the rendered manual fetch state
    */
    _renderManualFetch() {
        const {isManualFetch, hasMoreData} = this.props;
        if(isManualFetch && hasMoreData){
            const style = {className: 'primary'};
            return (
                <li className='sl-button'>
                    <Button
                        handleOnClick={this.handleShowMore}
                        label='list.button.showMore'
                        style={style}
                        type='button'
                        />
                </li>
            );
        }
    },

    /**
    * Render the list.
    * @returns {XML} DOM of the component
    */
    render() {
        return (
            <ul data-focus='selection-list'>
                {this._renderLines()}
                {this._renderLoading()}
                {this._renderManualFetch()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);
