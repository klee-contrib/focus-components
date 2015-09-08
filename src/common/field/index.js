// Dependencies
const builder = require('focus').component.builder;
const type = require('focus').component.types;
// Mixins
const valueBehaviour = require('./mixin/value-behaviour');
const validationBehaviour = require('./mixin/validation-behaviour');
// Components
const builtInComponents = require('./mixin/built-in-components');

/**
 * Mixin for the field helper.
 * @type {Object}
 */
const FieldMixin = {
    /** @inheriteDoc */
    mixins: [valueBehaviour, validationBehaviour, builtInComponents],
    /** @inheriteDoc */
   getDefaultProps() {
        return {
            isEdit: true,
            type: 'text'
        };
    },
    /** @inheritdoc */
    propTypes: {
        /**
        * Edition mode of the field.
        * @type {Boolean}
        */
        isEdit: type('bool'),
        /**
        * HTML input type.
        * @type {String}
        */
        type: type('string'),
        /**
        * Field name.
        * @type {string}
        */
        name: type('string'),
        value: type(['string', 'number'])
    },
    /** @inheritdoc */
    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value, values: newProps.values});
    },
    /**
    * Get the css class of the field component.
    */
    _className(){
        const stateClass = this.state.error ? 'is-invalid' : '';
        return `mdl-grid ${stateClass}`;
    },
    /** @inheritdoc */
    render() {
        const {FieldComponent, InputLabelComponent, domain, isRequired, values, hasLabel, isEdit} = this.props;
        const isCustomComponent = FieldComponent || InputLabelComponent;
        const {label, input, select, display} = this;
        return (
            <div className={this._className()} data-domain={domain} data-focus='field' data-mode={isEdit ? 'edit' : 'consult'} data-required={isRequired}>
                {isCustomComponent && this._renderFieldComponent()}
                {!isCustomComponent && hasLabel && label()}
                {!isCustomComponent &&
                    <div className ={`${this._getContentGridClassName()}`} data-focus='field-value-container'>
                        {isEdit ? (values ? select() : input()) : display()}
                    </div>
                }
            </div>
        );
    }
};
module.exports = builder(FieldMixin);
