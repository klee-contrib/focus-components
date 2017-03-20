/**@jsx*/
import React from 'react';
import type from 'focus-core/component/types';
import referenceMixin from '../../common/mixin/reference-property';
import definitionMixin from '../../common/mixin/definition';
import builtInComponentsMixin from '../mixin/built-in-components';

let lineMixin = {
    /**
     * React component name.
     */
    displayName: 'timeline-line',

    /**
     * Mixin dependancies.
     */
    mixins: [definitionMixin, referenceMixin, builtInComponentsMixin],

    getInitialState: function getInitialSate() {
        return {};
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type('object'),
        dateField: type('string'),
        dateComponent: type('object'),
        onLineClick: type('func')
    },

    /**
     * Get the line value.
     * @returns {object} - the data od the line.
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data
        };
    },

    /**
     * Line Click handler.
     * @param {object} event - the event
     */
    _handleLineClick: function handleLineClick(event) {
        if(this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * render content for a line.
     * @returns {XML} the line content
     */
    _renderLineContent: function renderLineContent() {
        if(this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        }else{
            return (
                <div>
                    <div className='timeline-heading'>
                        <h4 className='timeline-title'>{this.props.data.title}</h4>
                    </div>
                    <div className='timeline-body'>
                        <p>{this.props.data.body}</p>
                    </div>
                </div>

            );
        }
    },

    /**
     * Render line in list.
     * @returns {XML} - the render of the line
     */
    render: function renderLine() {
        if(this.renderLine) {
            return this.renderLine();
        }else{
            return (
                <li>
                    <div className='timeline-date'>{this.textFor(this.props.dateField, {})}</div>
                    <div className='timeline-badge' />
                    <div className='timeline-panel' onClick={this._handleLineClick}>
                        {this._renderLineContent()}
                    </div>
                </li>
            );
        }
    }
};

export default {
    mixin: lineMixin
};
export {
    lineMixin as mixin
}