import Column from 'focus-components/common/column';
import Grid from 'focus-components/common/grid';

// Blue square to  fill the grid.
const BlueSquare = React.createClass({
    render() {
        const label = this.props.label;
        const style = { backgroundColor: '#BDBDBD', height: '200px', color: 'white' };
        return <div style={style}>{label}</div>;
    }
});


const GridColumnSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <Grid>
                <Column size='4'><BlueSquare label='size4' /></Column>
                <Column size='3'><BlueSquare label='size3' /></Column>
                <Column size='5'><BlueSquare label='size5' /></Column>
                <Column size='4'><BlueSquare label='size4' /></Column>
            </Grid>
        );
    }
});

return <GridColumnSample />;
