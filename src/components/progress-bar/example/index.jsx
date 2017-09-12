import ProgressBar from 'focus-components/components/progess-bar';

const ProgressBarExample = React.createClass({
    getInitialState() {
        return {
            loading: 0
        };
    },
    updateLoading() {
        let { loading } = this.state;
        if (loading < 100) {
            this.setState({ loading: loading + 5 });
            setInterval(this.updateLoading, 500);
        }
    },
    componentDidMount() {
        const { loading } = this.state;
        if (loading < 100) {
            this.updateLoading();
        }
    },
    render() {
        const { loading } = this.state;
        return (
            <div>
                <h5>Default progress bar</h5>
                <ProgressBar completed={loading} />
                <br />
                <h5>Interterminate progress bar</h5>
                <ProgressBar indeterminated />
            </div>
        );
    }
});

export default ProgressBarExample;
