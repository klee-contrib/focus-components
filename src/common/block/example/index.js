const Block = FocusComponents.common.block.component;

const BlockSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return
            <Block title="Here is the title">
                <br/>
                <br/>
                <br/>
                <br/>
                <p>Here is the content.</p>
                <br/>
                <br/>
                <br/>
                <br/>
            </Block>
    }
});

const mountNode = document.querySelector("body")
return <BlockSample />;
