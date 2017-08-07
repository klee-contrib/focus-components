// Dependencies
import type from 'focus-core/component/types';
// Mixins
import referenceMixin from '../../common/mixin/reference-property';
import definitionMixin from '../../common/mixin/definition';
import builtInComponentsMixin from '../mixin/built-in-components';
import { mixin as translationMixin } from '../../common/i18n';
// Components
import { component as ContextualActions } from '../action-contextual';

let lineMixin = {
    /**
     * React component name.
     */
    displayName: 'table-line',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**@inheritDoc**/
    getDefaultProps() {
        return {};
    },

    /**@inheritDoc**/
    getInitialState() {
        return {};
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type('object'),
        saveAction: type('func'),
        deleteAction: type('func'),
        onLineClick: type('func'),
        onSelection: type('func'),
        operationList: type('array', true)
    },

    /**
     * Render line Actions.
     */
    renderLineActions() {
        if (this.props.operationList.length > 0) {
            return (
                <div data-focus='table-line-actions'>
                    <ContextualActions operationList={this.props.operationList} operationParam={this.props.data} />
                </div>
            );
        }
    },
    _onLineClickHandler(data) {
        return () => { this.props.onLineClick(data); };
    },
    render() {
        return this.renderLineContent(this.props.data);
    }
};

export {
    lineMixin as mixin
}
export default {
    mixin: lineMixin
}