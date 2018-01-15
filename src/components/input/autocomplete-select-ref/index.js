import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import AutocompleteSelect from '../autocomplete-select/field';
import AutocompleteSelectMultiple from '../autocomplete-select-multiple/field';

import referenceMixin from '../../../common/form/mixin/reference-behaviour';
import storeMixin from '../../../common/mixin/store-behaviour';
import toNormalizedLowerString from '../../../utils/string-normalize';

const displayName = 'AutocompleteReference';

const propTypes = {
    referenceName: PropTypes.string.isRequired,
    keyName: PropTypes.string,
    labelName: PropTypes.string,
    multiple: PropTypes.bool
}

const defaultProps = {
    keyName: 'key',
    labelName: 'label',
    multiple: false
}

const AutocompleteReference = createReactClass({

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
        const data = (this.state.reference[this.props.referenceName] || []).find(x => x[this.props.keyName] === key);
        return Promise.resolve((data || {})[this.props.labelName] || key)
    },

    getValue() {
        return this.refs.input.getValue();
    },
    _validate() {
        return this.refs.input._validate();
    },
    render() {
        const ToRenderComp = this.props.multiple ? AutocompleteSelectMultiple : AutocompleteSelect;
        const hasListLoaded = this.state.reference[this.props.referenceName] && this.state.reference[this.props.referenceName].length > 0;
        // We must not render the component with value before the reference list is loaded
        const value = hasListLoaded ? this.props.value : this.props.multiple ? [] : '';
        return (
            <ToRenderComp
                ref='input'
                {...this.props}
                value={value}
                querySearcher={this.querySearcher}
                keyResolver={this.keyResolver}
                keyName={this.props.keyName}
                labelName={this.props.labelName}
            />
        )
    }

})


class AutocompleteReferenceWithProps extends React.Component {
    static displayName = 'AutocompleteReferenceWrapped';
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    render() {
        return <AutocompleteReference {...this.props} referenceNames={[this.props.referenceName]} />;
    }
}

export default AutocompleteReferenceWithProps;