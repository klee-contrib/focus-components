
//var SelectionList = Focus.components.list.selection.list.component;
import builder from 'focus-core/component/builder';
let React = require('react');
import type from 'focus-core/component/types';
let assign = require('object-assign');
let omit = require('lodash/object/omit');
let memoryMixin = require('../../list/mixin/memory-scroll');

let MemoryListMixin = {
    mixins: [memoryMixin],

    propTypes: {
        listComponent: type(['func', 'object'])
    },

    /** @inheritdoc */
    render: function renderFormList() {
        var data = this.props.data || [];
        var hasMoreData = data.length > this.state.maxElements;
        var childProps = omit(this.props, ['lineComponent', 'data']);
        return (
            <this.props.listComponent
                ref='list'
                data={this.getDataToUse()}
                hasMoreData={hasMoreData}
                LineComponent={this.props.LineComponent}
                isSelection={false}
                isManualFetch={true}
                fetchNextPage={this.fetchNextPage}
                reference={this.getReference()}
                {...childProps}
                />
        );
    }
};

module.exports = builder(MemoryListMixin);
