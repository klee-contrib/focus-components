import Grid from 'focus-components/common/grid';
import Column from 'focus-components/common/column';

const GreySquare = React.createClass({
    render() {
        const label = this.props.label;
        const style = { backgroundColor: '#BDBDBD', height: '200px', color: 'white' };
        return (
            <div style={style}>
                {label}
            </div>
        );
    }
});

const GridExample = React.createClass({
    render() {
        const style = { width: '600px', height: '200' };
        return (
            <div>
                <h4>Desktop optimized grid</h4>
                <Grid>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={8}><GreySquare label='8' /></Column> <Column size={3}><GreySquare label='3' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={11}><GreySquare label='11' /></Column>
                </Grid>

                <h4>Tablet optimized grid</h4>
                <Grid>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={8}><GreySquare label='8' /></Column>
                    <Column size={4}><GreySquare label='4' /></Column> <Column size={4}><GreySquare label='4' /></Column>
                    <Column size={4}><GreySquare label='4' /></Column> <Column size={3}><GreySquare label='3' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column>
                </Grid>

                <h4>Phone optimized grid</h4>
                <Grid>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={1}><GreySquare label='1' /></Column>
                    <Column size={4}><GreySquare label='4' /></Column>
                    <Column size={2}><GreySquare label='2' /></Column> <Column size={2}><GreySquare label='2' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column> <Column size={2}><GreySquare label='2' /></Column>
                    <Column size={1}><GreySquare label='1' /></Column>
                </Grid>
            </div>
        );
    }
});

export default GridExample;
