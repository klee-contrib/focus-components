import React, {Component, PropTypes} from 'react';
import Translation from '../../../behaviours/translation';

//web components
import {component as Button} from '../../../common/button/action';
import Column from '../../../common/column';
import Grid from '../../../common/grid';

const propTypes = {
    canShowMore: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
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
        const {canShowMore, count, children, groupKey, showAllHandler, showMoreHandler} = this.props;
        const traductionGroupKey = `search.group.${groupKey.toLowerCase()}`;
        return (
            <div data-focus='group-container'>
                <h3>
                    <span>{this.i18n(traductionGroupKey)}</span>
                    <span>{count}</span>
                </h3>
                <p>{this.i18n('search.mostRelevant')}</p>
                <div data-focus="group-container-results">
                    {children}
                </div>
                <div data-focus='group-container-actions'>
                    <div data-focus='group-container-actions__left'>
                        {canShowMore &&
                            <Button handleOnClick={showMoreHandler} label={this.i18n('search.show.more')} />
                        }
                    </div>
                    <div data-focus='group-container-actions__right'>
                        <Button shape={null} color='accent' handleOnClick={() => {showAllHandler(groupKey);}} label={this.i18n('search.show.all')} />
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
