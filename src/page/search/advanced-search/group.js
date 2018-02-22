import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Translation from '../../../behaviours/translation';
import formatter from 'focus-core/definition/formatter/number';
//web components
import Button from '../../../components/button';

const propTypes = {
    canShowMore: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    groupKey: PropTypes.string.isRequired,
    showAllHandler: PropTypes.func.isRequired,
    showMoreHandler: PropTypes.func.isRequired
};

const defaultProps = {
    count: 0
};

@Translation
class AdvancedSearchGroup extends Component {

    render() {
        const { canShowMore, count, children, groupKey, showAllHandler, showMoreHandler } = this.props;
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
                <div data-focus='group-container-actions'>
                    <div data-focus='group-container-actions__left'>
                        {canShowMore && (
                            <Button handleOnClick={showMoreHandler} label={this.i18n('search.show.more')} />
                        )}
                    </div>
                    <div data-focus='group-container-actions__right'>
                        <Button shape={null} color='accent' handleOnClick={() => { showAllHandler(groupKey); }} label={this.i18n('search.show.all')} />
                    </div>
                </div>
            </div>
        );
    }
}

AdvancedSearchGroup.propTypes = propTypes;
AdvancedSearchGroup.defaultProps = defaultProps;
AdvancedSearchGroup.displayName = 'AdvancedSearchGroup';

export default AdvancedSearchGroup;
