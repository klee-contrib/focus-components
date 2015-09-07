const style = {
    scopes: {
        parent: {
            position: 'absolute'
        },
        visible: {
            cursor: 'pointer',
            height: '50px',
            width: '80px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        },
        selectedScope: {
            height: '50px',
            width: '60px',
            position: 'relative',
            top: '0'
        },
        icon: {
            height: '50px',
            width: '20px',
            position: 'relative',
            top: '-50px',
            left: '64px',
            paddingTop: '15px'
        },
        list: {
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.12)',
            position: 'relative',
            padding: '10px'
        },
        scope: {
            padding: '5px'
        },
        activeScope: {
            backgroundColor: 'rgb(54, 182, 184)'
        }
    }
};

module.exports = style;
