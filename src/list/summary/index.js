import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import { translate } from 'focus-core/translation';
import styleBehaviour from '../../mixin/stylable';
import TopicDisplayer from '../../components/topic-displayer';
import Button from '../../components/button';
import numberFormatter from 'focus-core/definition/formatter/number';

const listSummaryMixin = {
    mixins: [styleBehaviour],
    /**
     * Display name.
     */
    displayName: 'ListSummary',

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps() {
        return {
            scopeList: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        nb: types('number'),
        queryText: types('string'),
        scopeList: types('object').isRequired,
        scopeClickAction: types('func'),
        exportAction: types('func')
    },
    /**
     * Return result sentence.
     * @return {object} Result sentence
     */
    _getResultSentence() {
        const { nb, queryText } = this.props;
        const hasText = queryText && queryText.trim().length > 0;
        const sentence = nb > 1 ? hasText ? 'results.for' : 'results.all' : hasText ? 'result.for' : 'result.all';
        return (
            <span>
                <strong>{numberFormatter.format(nb)}&nbsp;</strong>
                <span>{translate(sentence)}
                    {hasText && (
                        <span className='search-text'>&#171;&nbsp;{queryText}&nbsp;&#187;</span>
                    )}
                </span>
            </span>
        );
    },
    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render() {
        const { exportAction, scopeList, scopeClickAction } = this.props;
        return (
            <div data-focus='list-summary'>
                {exportAction && (
                    <div className='print'>
                        <Button handleOnClick={exportAction} icon='print' label='result.export' shape={null} />
                    </div>
                )}
                <span className='sentence'>{this._getResultSentence()}</span>
                <span className='topics'>
                    <TopicDisplayer topicClickAction={scopeClickAction} topicList={scopeList} />
                </span>
            </div>
        );
    }
};

const { mixin, component } = builder(listSummaryMixin);
export { mixin, component };
export default { mixin, component };
