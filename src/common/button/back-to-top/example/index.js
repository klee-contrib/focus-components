import { component as ButtonBackToTop } from 'focus-components/common/button/back-to-top';

const ButtonBTSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div className='button-bt-example'>
                <img src='http://lorempixel.com/800/600/sports/' />
                <img src='http://lorempixel.com/800/600/abstract/' />
                <img src='http://lorempixel.com/800/600/city/' />
                <img src='http://lorempixel.com/800/600/technics/' />
                <img src='http://lorempixel.com/800/600/sports/' />
                <img src='http://lorempixel.com/800/600/abstract/' />
                <img src='http://lorempixel.com/800/600/city/' />
                <img src='http://lorempixel.com/800/600/technics/' />
                <ButtonBackToTop />
            </div>
        );
    }
});

return <ButtonBTSample />;
