import { component as Scrollspy } from 'focus-components/common/scrollspy';
import { component as Title } from 'focus-components/common/title';

const ScrollspySample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h1>Scrollspy</h1>
                <Scrollspy>
                    <Title label='Sports' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/sports' title='lorempixel' />

                    <Title label='Animals' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/animals' title='lorempixel' />

                    <Title label='Business' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/business' title='lorempixel' />

                    <Title label='Cats' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/cats' title='lorempixel' />

                    <Title label='City' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/city' title='lorempixel' />

                    <Title label='Food' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/food' title='lorempixel' />

                    <Title label='Nightlife' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/nightlife' title='lorempixel' />

                    <Title label='Fashion' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/fashion' title='lorempixel' />

                    <Title label='People' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/people' title='lorempixel' />

                    <Title label='Nature' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/nature' title='lorempixel' />

                    <Title label='Technics' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/technics' title='lorempixel' />

                    <Title label='Transport' />
                    <img alt='lorempixel' src='http://lorempixel.com/800/600/transport' title='lorempixel' />
                </Scrollspy>
            </div>
        );
    }
});

return <ScrollspySample />;
