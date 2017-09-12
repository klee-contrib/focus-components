
import { component as Header } from 'focus-component/application/header';

const HeaderExample = React.createClass({
    render() {
        return (
            <div>
                <Header>
                    <div className='mdl-layout__header-row'>
                        <span className='mdl-layout-title'>Title</span>
                        <div className='mdl-layout-spacer' />
                        <nav className='mdl-navigation'>
                            <a className='mdl-navigation__link' href=''>Link</a>
                            <a className='mdl-navigation__link' href=''>Link</a>
                            <a className='mdl-navigation__link' href=''>Link</a>
                            <a className='mdl-navigation__link' href=''>Link</a>
                        </nav>
                    </div>
                </Header>
                <img src='http://lorempixel.com/400/200' />
                <img src='http://lorempixel.com/400/200' />
                <img src='http://lorempixel.com/400/200' />
                <img src='http://lorempixel.com/400/200' />
                <img src='http://lorempixel.com/400/200' />
                <img src='http://lorempixel.com/400/200' />
            </div>
        );
    }
});

return <HeaderExample />;
