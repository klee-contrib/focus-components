import React, { PropTypes } from 'react';
import AutocompleteSelect from '../autocomplete-select/field';

import referenceMixin from '../../../common/form/mixin/reference-behaviour';
import storeMixin from '../../../common/mixin/store-behaviour';
import toNormalizedLowerString from '../../../utils/string-normalize';

const displayName = 'AutocompleteReference';

const propTypes = {
    referenceName: PropTypes.string.isRequired,
    keyName: PropTypes.string,
    labelName: PropTypes.string
}

const defaultProps = {
    keyName: 'code',
    labelName: 'label'
}

const AutocompleteReference = React.createClass({

    displayName: displayName,
    mixins: [referenceMixin, storeMixin],

    querySearcher(query) {
        const normalizedQuery = toNormalizedLowerString(query);
        const { referenceName, labelName, keyName } = this.props;
        //We use this normalizedList in order not to normalize the list for every query
        if (!this.normalizedList && this.state.reference[referenceName]) {
            this.normalizedList = this.state.reference[referenceName].map(x => ({ [keyName]: x[keyName], [labelName]: toNormalizedLowerString(x[labelName]) }));
        }

        let data = (this.normalizedList || []).filter(x => x[labelName].indexOf(normalizedQuery) !== -1);
        const totalCount = data.length;
        // Let's take only the first 100 propositions
        data = data.slice(0, 100)
            .map(elt => (this.state.reference[referenceName] || []).find(item => item[keyName] === elt[keyName]));
        return Promise.resolve({ data, totalCount })
    },

    componentWillReceiveProps({ referenceName, labelName }) {
        if (referenceName !== this.props.referenceName || labelName !== this.props.labelName) {
            this.normalizedList = null;
        }
    },

    keyResolver(key) {
        const data = (this.state.reference[this.props.referenceName] || []).filter(x => x[this.props.keyName] === key)[0];
        return Promise.resolve((data || {})[this.props.labelName] || key)
    },

    getValue() {
        return this.refs.input.getValue();
    },
    _validate() {
        return this.refs.input._validate();
    },
    render() {
        return (
            <AutocompleteSelect
                ref='input'
                {...this.props}
                value={this.state.reference[this.props.referenceName] && this.state.reference[this.props.referenceName].length > 0 ? this.props.value : ''}
                querySearcher={this.querySearcher}
                keyResolver={this.keyResolver}
                keyName={this.props.keyName}
                labelName={this.props.labelName}
            />
        )
    }

})


const AutocompleteReferenceWithProps = React.createClass({

    displayName: 'AutocompleteReferenceWrapped',
    propTypes: propTypes,

    getDefaultProps() {
        return defaultProps;
    },


    render() {
        return <AutocompleteReference {...this.props} referenceNames={[this.props.referenceName]} />;
    }
});

export default AutocompleteReferenceWithProps;