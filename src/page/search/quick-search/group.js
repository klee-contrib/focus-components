// libraires
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import Translation from '../../../behaviours/translation';
import formatter from 'focus-core/definition/formatter/number';

//web components

const propTypes = {
    count: PropTypes.number.isRequired,
    groupKey: PropTypes.string.isRequired
};

const defaultProps = {
    count: 0
};

@Translation
class QuickSearchGroup extends Component {
    render() {
        const { children, count, groupKey, showAllHandler } = this.props
        return (
            <div data-focus='group-container'>
                <h3>
                    <span>{groupKey}</span>
                    <span>{formatter.format(count)}</span>
                </h3>
                <p>{this.i18n('search.mostRelevant')}</p>
                <div data-focus='group-container-results'>
                    {children}
                </div>
            </div>
        );
    }
}

QuickSearchGroup.propTypes = propTypes;
QuickSearchGroup.defaultProps = defaultProps;
QuickSearchGroup.displayName = 'QuickSearchGroup';

export default QuickSearchGroup;
