const {Grid} = FocusComponents.components;
const {Column} = FocusComponents.components;

// Blue square to  fill the grid.

const style = {backgroundColor: '#BDBDBD', height: '200px', color: 'white'};
function BlueSquare({label}) {
    return(
        <div style={style}>{label}</div>;
    );
}

function GridColumnSample() {
    return(
        <Grid>
            <Column size='4'><BlueSquare label='size4'/></Column>
            <Column size='3'><BlueSquare label='size3'/></Column>
            <Column size='5'><BlueSquare label='size5'/></Column>
            <Column size='4'><BlueSquare label='size4'/></Column>
        </Grid>
    );
}

return <GridColumnSample/>;
