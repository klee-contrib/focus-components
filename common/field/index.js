// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;

// Mixins

let valueBehaviour = require('./mixin/value-behaviour');
let validationBehaviour = require('./mixin/validation-behaviour');

// Components

let builtInComponents = require('./mixin/built-in-components');

/**
 * Mixin for the field helper.
 * @type {Object}
 */
let FieldMixin = {
    /** @inheriteDoc */
    mixins: [valueBehaviour, validationBehaviour, builtInComponents],
    /** @inheriteDoc */
   getDefaultProps() {
        return {

            /**
            * Edition mode of the field.
            * @type {Boolean}
            */
            isEdit: true,
            /**
            * HTML input type.
            * @type {String}
            */
            type: 'text',
            /**
            * Field name.
            * @type {string}
            */
            name: undefined,
            /**
            * Css properties of the component.
            * @type {Object}
            */
            style: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        isEdit: type('bool'),
        type: type('string'),
        name: type('string'),
        value: type(['string', 'number'])
    },
    /** @inheritdoc */
    componentWillReceiveProps: function fieldWillReceiveProps(newProps){
        this.setState({value: newProps.value, values: newProps.values});
    },
    /**
    * Get the css class of the field component.
    */
    _className(){
        let stateClass = this.state.error ? 'has-feedback has-error' : '';
        return `form-group ${stateClass} ${this.props.style.className}`;
    },
    /** @inheritdoc */
    render() {
        let {domain, isRequired, isEdit, values} = this.props;
        let {input, label, select, display, help, error, _className} = this;
        return (
            <div className={_className()} data-domain={domain} data-focus='field' data-mode={isEdit ? 'edit' : 'consult'} data-required={isRequired}>
                {label()}
                {isEdit ? (values ? select() : input()) : display()}
                {help()}
                {error()}
            </div>
        );
    }
};
module.exports = builder(FieldMixin);
