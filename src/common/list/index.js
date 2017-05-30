
//var SelectionList = Focus.components.list.selection.list.component;
import builder from 'focus-core/component/builder';
import React from 'react';
import type from 'focus-core/component/types';
import {omit} from 'lodash';
import memoryMixin from '../../list/mixin/memory-scroll';

let MemoryListMixin = {
    mixins: [memoryMixin],

    propTypes: {
        listComponent: type(['func', 'object'])
    },

    /** @inheritdoc */
    render: function renderFormList() {
        let data = this.props.data || [];
        let hasMoreData = data.length > this.state.maxElements;
        let childProps = omit(this.props, ['lineComponent', 'data']);
        return (
            <this.props.listComponent
                ref='list'
                data={this.getDataToUse()}
                hasMoreData={hasMoreData}
                LineComponent={this.props.LineComponent}
                isSelection={false}
                isManualFetch
                fetchNextPage={this.fetchNextPage}
                reference={this.getReference()}
                {...childProps}
            />
        );
    }
};

const builtComp = builder(MemoryListMixin);
const {component, mixin} = builtComp;

export {
    component,
    mixin
}
export default builtComp;