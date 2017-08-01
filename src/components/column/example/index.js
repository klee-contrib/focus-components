import Grid from 'focus-components/components/grid'
import Column from 'focus-components/components/column';

const style = {
    backgroundColor: '#BDBDBD',
    height: '200px',
    color: 'white'
};

function BlueSquare({ label }) {
    return (
        <div style={style}>{label}</div>
    );
}

function GridColumnSample() {
    return (
        <Grid>
            <Column size='4'><BlueSquare label='size4' /></Column>
            <Column size='3'><BlueSquare label='size3' /></Column>
            <Column size='5'><BlueSquare label='size5' /></Column>
            <Column size='4'><BlueSquare label='size4' /></Column>
        </Grid>
    );
}

export default GridColumnSample;
