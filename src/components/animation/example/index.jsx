import Animation from 'focus-components/components/animation';

const AnimationExample = React.createClass({
    styleContainer: {
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#D6E2E4'
    },
    render() {
        return (
            <Animation>
                <div style={this.styleContainer}>
                    <h3>{'Test Animation'}</h3>
                </div>
            </Animation>
        );
    }
});

export default AnimationExample;
