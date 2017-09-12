import { component as Detail } from 'focus-components/common/detail';
import { component as Block } from 'focus-components/commmon/block';

const DetailSample = React.createClass({
    render() {
        return (
            <div>
                <h1>Detail sample</h1>
                <Detail>
                    <Block title='Sports'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/sports' title='lorempixel' />
                    </Block>

                    <Block title='Animals'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/animals' title='lorempixel' />
                    </Block>

                    <Block title='Business'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/business' title='lorempixel' />
                    </Block>

                    <Block title='Cats'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/cats' title='lorempixel' />
                    </Block>

                    <Block title='City'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/city' title='lorempixel' />
                    </Block>

                    <Block title='Food'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/food' title='lorempixel' />
                    </Block>

                    <Block title='Nightlife'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/nightlife' title='lorempixel' />
                    </Block>

                    <Block title='Fashion'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/fashion' title='lorempixel' />
                    </Block>

                    <Block title='People'>
                        <img alt='lorempixel' src='http://lorempixel.com/800/600/people' title='lorempixel' />
                    </Block>

                    <Block title='Nature'>
                        <img src='http://lorempixel.com/800/600/nature' title='lorempixel' alt='lorempixel' />
                    </Block>

                    <Block title='Technics'>
                        <img src='http://lorempixel.com/800/600/technics' title='lorempixel' alt='lorempixel' />
                    </Block>

                    <Block title='Transport'>
                        <img src='http://lorempixel.com/800/600/transport' title='lorempixel' alt='lorempixel' />
                    </Block>
                </Detail>
            </div>
        );
    }
});

return <DetailSample />;
