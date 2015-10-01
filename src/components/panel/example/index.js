const Panel = FocusComponents.components.Panel;
const formMixin = FocusComponents.common.form.mixin;

const domain =  {
    "DO_TEXT": {
        style: "do_text",
        type: "text",
        component: "PapaSinge",
        validation: [{
            type: "function",
            value: function() {
                return false;
            }
        }]
    }
};
Focus.definition.domain.container.setAll(domain);
const entities = {
    "contact": {
        "firstName": {
            "domain": "DO_TEXT",
            "required": false
        }
    }
};
Focus.definition.entity.container.setEntityConfiguration(entities);

const PanelSample1 = React.createClass({
    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block without actions</h3>
                <Panel title="Here is the title">
                    <br/>
                    <br/>
                    <p>Here is the content.</p>
                    <br/>
                    <br/>
                </Panel>
            </div>
        );
    }
});

const PanelSample2 = React.createClass({
    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block with actions (default)</h3>
                <Panel title="Here is the title" actions={this._renderActions}>
                    <br/>
                    <br/>
                    <p>Here is the content.</p>
                    <br/>
                    <br/>
                </Panel>
            </div>
        );
    }
});

const PanelSample3 = React.createClass({
    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block with actions (bottom)</h3>
                <Panel title="Here is the title" actions={this._renderActions} actionsPosition="bottom">
                    <br/>
                    <br/>
                    <p>Here is the content.</p>
                    <br/>
                    <br/>
                </Panel>
            </div>
        );
    }
});

const PanelSample4 = React.createClass({
    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block with actions (both)</h3>
                <Panel title="Here is the title" actions={this._renderActions} actionsPosition="both">
                    <br/>
                    <br/>
                    <p>Here is the content.</p>
                    <br/>
                    <br/>
                </Panel>
            </div>
        );
    }
});

return (
    <div>
        <PanelSample1 hasLoad={false} />
        <br/>
        <PanelSample2 hasLoad={false} />
        <br/>
        <PanelSample3 hasLoad={false} />
        <br/>
        <PanelSample4 hasLoad={false} />
    </div>
);
