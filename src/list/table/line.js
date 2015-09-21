// Dependencies

let type = require('focus-core').component.types;

// Mixins

let translationMixin = require('../../common/i18n').mixin;
let referenceMixin = require('../../common/mixin/reference-property');
let definitionMixin = require('../../common/mixin/definition');
let builtInComponentsMixin = require('../mixin/built-in-components');

// Components

let ContextualActions = require('../action-contextual').component;

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
                    <ContextualActions operationList={this.props.operationList} operationParam={this.props.data}/>
                </div>
            );
        }
    },
    _onLineClickHandler(data) {
        return () => {this.props.onLineClick(data); };
    },
    render() {
        return this.renderLineContent(this.props.data);
    }
};

module.exports = {mixin: lineMixin};
