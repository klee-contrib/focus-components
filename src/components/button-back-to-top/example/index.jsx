const {ButtonBackToTop} = FocusComponents.components;

const ButtonExample = React.createClass({
    render() {
        return (
            <div className='button-bt-example'>
                <img src="http://lorempixel.com/800/600/sports/"/>
                <img src="http://lorempixel.com/800/600/abstract/"/>
                <img src="http://lorempixel.com/800/600/city/"/>
                <img src="http://lorempixel.com/800/600/technics/"/>
                <img src="http://lorempixel.com/800/600/sports/"/>
                <img src="http://lorempixel.com/800/600/abstract/"/>
                <img src="http://lorempixel.com/800/600/city/"/>
                <img src="http://lorempixel.com/800/600/technics/"/>
                <ButtonBackToTop />
            </div>
        );
    }
});

module.exports = ButtonExample;
