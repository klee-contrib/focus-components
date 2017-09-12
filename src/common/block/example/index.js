import { component as Block } from 'focus-components/common/block';
import { mixin as formMixin } from 'focus-components/common/form';

const domain = {
    DO_TEXT: {
        style: 'do_text',
        type: 'text',
        component: 'PapaSinge',
        validation: [{
            type: 'function',
            value() {
                return false;
            }
        }]
    }
};

Focus.definition.domain.container.setAll(domain);
const entities = {
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false
        }
    }
};
Focus.definition.entity.container.setEntityConfiguration(entities);

const BlockSample1 = React.createClass({
    mixins: [formMixin],
    definitionPath: 'contact',
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block without actions</h3>
                <Block title='Here is the title'>
                    <br />
                    <br />
                    <p>Here is the content.</p>
                    <br />
                    <br />
                </Block>
            </div>
        );
    }
});

const BlockSample2 = React.createClass({
    mixins: [formMixin],
    definitionPath: 'contact',
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block with actions (default)</h3>
                <Block title='Here is the title' actions={this._renderActions}>
                    <br />
                    <br />
                    <p>Here is the content.</p>
                    <br />
                    <br />
                </Block>
            </div>
        );
    }
});

const BlockSample3 = React.createClass({
    mixins: [formMixin],
    definitionPath: 'contact',
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block with actions (bottom)</h3>
                <Block title='Here is the title' actions={this._renderActions} actionsPosition='bottom'>
                    <br />
                    <br />
                    <p>Here is the content.</p>
                    <br />
                    <br />
                </Block>
            </div>
        );
    }
});

const BlockSample4 = React.createClass({
    mixins: [formMixin],
    definitionPath: 'contact',
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent() {
        return (
            <div>
                <h3>Block with actions (both)</h3>
                <Block title='Here is the title' actions={this._renderActions} actionsPosition='both'>
                    <br />
                    <br />
                    <p>Here is the content.</p>
                    <br />
                    <br />
                </Block>
            </div>
        );
    }
});

return (
    <div>
        <BlockSample1 />
        <br />
        <BlockSample2 />
        <br />
        <BlockSample3 />
        <br />
        <BlockSample4 />
    </div>
);
