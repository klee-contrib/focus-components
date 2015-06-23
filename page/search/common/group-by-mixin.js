// Dependencies

let isArray = require('lodash/lang/isArray');
let keys = require('lodash/object/keys');
let checkIsNotNull = require('focus').util.object.checkIsNotNull;
let ArgumentNullException = require('focus').exception.ArgumentNullException;

// Components

let SingleGroupComponent = require('./single-group-component').component;
let ListSelection = require('../../../list/selection').list.component;

// Mixins

let i18nMixin = require('../../../common/i18n/mixin');

//Empty Result component to be mututalized.
let EmptyComponent = React.createClass({
    mixins: [i18nMixin],
    render(){
        return (
                <div data-focus='empty-result'>
                    {this.i18n('search.empty')}
                </div>
            );
    }
});

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
let GroupByMixin = {
    mixins: [i18nMixin],
    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps() {
        return ({
            lineOperationList: [],
            orderableColumnList: {},
            lineComponentMapper() {
                throw new ArgumentNullException('Please provide a inferLineComponentFromList(list) function.');
            },
            emptyComponent: EmptyComponent
        });
    },
    /**
     * Change the max rows of a group.
     * @param {string} groupKey Key of the group.
     * @param {int} maxRows Number of needed rows.
     * @returns {Function} The function wich will change the max rows of the group.
     */
    changeGroupByMaxRows(groupKey, maxRows) {
        return (event) => {
            this.refs[groupKey].changeGroupByMaxRows(maxRows);
        };
    },
    getResultListComponent(advancedSearch) {
        // First check if there is any result
        if (this.state.totalRecords === 0) {
            return <this.props.emptyComponent />;
        }
        let isBounded = keys(this.state.map).length > 1;
        let noDecoration = keys(this.state.map).length === 1;
        if (noDecoration && advancedSearch) {
            let groupKey = keys(this.state.map)[0];
            return this._getSingleTypeResultList(groupKey, this.state.map[groupKey], isBounded && this.props.groupMaxRows);
        } else {
            return keys(this.state.map).reduce((groupList, groupKey) => {
                if (this.state.map[groupKey].length > 0) {
                    groupList.push(
                        <SingleGroupComponent
                            data-focus='results-group'
                            key={groupKey}
                            ref={groupKey}
                            renderGroupBy={this.renderGroupByBlock}
                            list={this.state.map[groupKey]}
                            groupKey={groupKey}
                            maxRows={isBounded && this.props.groupMaxRows}
                            />
                    );
                }
                return groupList;
            }, []);
        }
    },
    _getSingleTypeResultList(groupKey, list, maxRows) {
        if (maxRows) {
            list = list.slice(0, maxRows);
        }
        return (
            <ListSelection
                data-focus='results-list'
                data={list}
                ref={groupKey}
                idField={this.props.idField}
                isSelection={this.props.isSelection}
                onSelection={this._selectItem}
                onLineClick={this._lineClick}
                fetchNextPage={this.fetchNextPage}
                hasMoreData={this.state.hasMoreData}
                isLoading={this.state.isLoading}
                operationList={this.props.lineOperationList}
                lineComponent={this.props.lineComponentMapper(list)}
                parentSelector={this.props.parentSelector}
                selectionStatus={this.state.selectionStatus}
                />
        );
    },
    renderGroupByBlock(groupKey, list, maxRows) {
        let GroupWrapper = this.props.groupComponent;
        return (
            <GroupWrapper data-focus="group-result-container" groupKey={groupKey} query={this.state.query} showAll={this.showAllGroupListHandler}>
                {this._getSingleTypeResultList(groupKey, list, maxRows)}
            </GroupWrapper>
        );
    }
};

module.exports = {mixin: GroupByMixin};
