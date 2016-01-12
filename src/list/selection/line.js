// Dependencies

const {types} = require('focus-core').component;
const React = require('react');

// Components

const ContextualActions = require('../action-contextual').component;
const {Checkbox} = require('../../components/input');

// Mixins

const translationMixin = require('../../common/i18n').mixin;
const referenceMixin = require('../../common/mixin/reference-property');
const definitionMixin = require('../../common/mixin/definition');
const builtInComponentsMixin = require('../mixin/built-in-components');

const lineMixin = {
    /**
    * React component name.
    */
    displayName: 'SelectionLine',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**
     * Get default props
     * @return {object} default props
     */
    getDefaultProps() {
        return {
            isSelection: true,
            operationList: {}
        };
    },

    /**
    * line property validation.
    * @type {Object}
    */
    propTypes: {
        data: types('object'),
        isSelected: types('bool'),
        isSelection: types('bool'),
        onLineClick: types('func'),
        onSelection: types('func'),
        operationList: types(['array', 'object'])
    },

    /**
    * State initialization.
    * @return {object} initial state
    */
    getInitialState() {
        const {data} = this.props;
        let {isSelected} = this.props;
        if(this.selectedInitializer) { // this allows to initiate a data specific value for isSelected
            isSelected = this.selectedInitializer(data);
        }
        return {
            isSelected: isSelected || false
        };
    },

    /**
     * Before component is mounted.
     */
    componentWillMount() {
        const {data, isSelection} = this.props;
        this._isSelectionnable = isSelection;
        if(this.selectionnableInitializer) {
            this._isSelectionnable = this.selectionnableInitializer(data);
        }
    },

    /**
     * Component will receive props
     * @param  {object} nextProps new component's props
     */
    componentWillReceiveProps({isSelected, data}) {
        if (data !== this.props.data) {
            this.setState({isSelected: false});
        } else if (isSelected !== undefined) {
            this.setState({isSelected});
        }
    },

    /**
    * Get the line value.
    * @return {object} the line value
    */
    getValue() {
        const {data: item} = this.props;
        const {isSelected} = this.state;
        return {item, isSelected};
    },

    /**
    * Selection Click handler.
    */
    _handleSelectionClick() {
        const isSelected = !this.state.isSelected;
        const {data, onSelection} = this.props;
        this.setState({isSelected});
        if(onSelection) {
            onSelection(data, isSelected);
        }
    },

    /**
    * Line Click handler.
    */
    _handleLineClick() {
        const {data, onLineClick} = this.props;
        if(onLineClick) {
            onLineClick(data);
        }
    },

    /**
    * Render the left box for selection
    * @return {XML} the rendered selection box
    */
    _renderSelectionBox() {
        const {isSelected} = this.state;
        if (this._isSelectionnable) {
            const selectionClass = isSelected ? 'selected' : 'no-selection';
            return (
                <div className={`sl-selection ${selectionClass}`}>
                    <Checkbox onChange={this._handleSelectionClick} value={isSelected}/>
                </div>
            );
        }
        return null;
    },

    /**
    * render content for a line.
    * @return {XML} the rendered line content
    */
    _renderLineContent() {
        const {data} = this.props;
        const {title, body} = data;
        if (this.renderLineContent) {
            return this.renderLineContent(data);
        } else {
            return (
                <div>
                    <div>{title}</div>
                    <div>{body}</div>
                </div>
            );
        }
    },

    /**
    * Render actions which can be applied on the line
    * @return {XML} the rendered actions
    */
    _renderActions() {
        const props = {operationParam: this.props.data, ...this.props};
        if (0 < props.operationList.length) {
            return (
                <div className='sl-actions'>
                    <ContextualActions {...props}/>
                </div>
            );
        }
    },

    /**
    * Render line in list.
    *  @return {XML} the rendered line
    */
    render() {
        if(this.renderLine){
            return this.renderLine();
        } else {
            return (
                <li data-focus='sl-line'>
                    {this._renderSelectionBox()}
                    <div className='sl-content' onClick={this._handleLineClick}>
                        {this._renderLineContent()}
                    </div>
                    {this._renderActions()}
                </li>
            );
        }
    }
};

module.exports = {mixin: lineMixin};
