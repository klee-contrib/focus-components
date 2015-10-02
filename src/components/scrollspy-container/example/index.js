const ScrollspyContainer = FocusComponents.components.ScrollspyContainer;
const Panel = FocusComponents.components.Panel;

const headerHeigth = 100;

const headerStyles = {
    backgroundColor:'#FFF',
    position: 'fixed',
    top: 0,
    left: 0,
    width: 100 + '%',
    height: headerHeigth + 'px',
    zIndex: 1000,
    textAlign: 'center'
};

const ScrollspyContainerSample = React.createClass({

    getInitialState(){
        return {
            isConditionalBlock: false,
        };
    },

    componentDidMount() {
        setTimeout(()=>{
                this.setState({isConditionalBlock: true})
        }, 3 * 1000);
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        const {isConditionalBlock} = this.state;

        return (
            <div>
                <div style={headerStyles}><h1>header</h1></div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <ScrollspyContainer offset={headerHeigth + 10}>
                    <Panel title="Sports">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/sports" title="lorempixel" />
                    </Panel>

                    <Panel title="Animals">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/animals" title="lorempixel" />
                    </Panel>

                    <Panel title="Business">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/business" title="lorempixel" />
                    </Panel>

                    <Panel title="Cats">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/cats" title="lorempixel" />
                    </Panel>

                    <Panel title="City">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/city" title="lorempixel" />
                    </Panel>

                    <Panel title="Food">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/food" title="lorempixel" />
                    </Panel>

                    {isConditionalBlock &&
                        <Panel title="Conditionnal block">
                            <img alt="lorempixel" src="http://lorempixel.com/800/600/food" title="lorempixel" />
                            <img alt="lorempixel" src="http://lorempixel.com/800/600/business" title="lorempixel" />
                            <img alt="lorempixel" src="http://lorempixel.com/800/600/city" title="lorempixel" />
                            <img alt="lorempixel" src="http://lorempixel.com/800/600/animals" title="lorempixel" />
                            <img alt="lorempixel" src="http://lorempixel.com/800/600/sports" title="lorempixel" />
                        </Panel>
                    }

                    <Panel title="Nightlife">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/nightlife" title="lorempixel" />
                    </Panel>

                    <Panel title="Fashion">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/fashion" title="lorempixel" />
                    </Panel>

                    <Panel title="People">
                        <img alt="lorempixel" src="http://lorempixel.com/800/600/people" title="lorempixel" />
                    </Panel>

                    <Panel title="Nature">
                        <img src="http://lorempixel.com/800/600/nature" title="lorempixel" alt="lorempixel" />
                    </Panel>

                    <Panel title="Technics">
                        <img src="http://lorempixel.com/800/600/technics" title="lorempixel" alt="lorempixel" />
                    </Panel>

                    <Panel title="Transport">
                        <img src="http://lorempixel.com/800/600/transport" title="lorempixel" alt="lorempixel" />
                    </Panel>
                </ScrollspyContainer>
            </div>
        );
    }
});


return <ScrollspyContainerSample />;
