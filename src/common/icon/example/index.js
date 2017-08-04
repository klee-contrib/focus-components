import { component as Icon } from 'focus-components/common/icon';

const IconSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div className='icon-example'>
                <h2>Material</h2>
                <Icon name='account_circle' />
                <br /><br />
                <Icon name='loyalty' style={{ color: 'tomato' }} />
                <br />
                <h2>Font awesome </h2>
                <Icon name='circle' library='font-awesome' />
            </div>
        );
    }
});

return <IconSample />;
