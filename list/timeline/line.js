/**@jsx*/
var React = require('react');
var builder = require('focus').component.builder;
var type = require('focus').component.types;
var lineMixin = {
    displayName: "timeline-line",

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes:{
        data: type('object'),
        dateField: type('string'),
        dateComponent: type('object'),
        onLineClick: type('func')
    },

    /**
     * Get the line value.
     * @returns {{item: *}}
     */
    getValue: function getLineValue(){
        return {
            item : this.props.data
        };
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event){
        if(this.props.onLineClick){
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * render content for a line.
     * @returns {*}
     */
    _renderLineContent: function renderLineContent(){
        if(this.renderLineContent){
            return this.renderLineContent(this.props.data);
        }else{
            return (
                <div>
                    <div className="timeline-heading">
                        <h4 className="timeline-title">{this.props.data.title}</h4>
                    </div>
                    <div className="timeline-body">
                        <p>{this.props.data.body}</p>
                    </div>
                </div>

            );
        }
    },

    /**
     * Render line in list.
     * @returns {*}
     */
    render: function renderLine(){
        if(this.renderLine){
            return this.renderLine();
        }else{
            return (
                <li>
                    <div className="timeline-date">02/06/1982</div>
                    <div className="timeline-badge"></div>
                    <div className="timeline-panel" onClick={this._handleLineClick}>
                        {this._renderLineContent()}
                    </div>
                </li>
            );
        }
    }
};

module.exports = {mixin : lineMixin};
