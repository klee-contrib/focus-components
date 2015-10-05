// Dependencies

const {types} = require('focus-core').component;
const React = require('react');

// Mixins

const i18nBehaviour = require('../../common/i18n/mixin');

const Layout = React.createClass({
    displayName: 'ShowcaseLayout',
    mixins: [i18nBehaviour],

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        title: types('string').isRequired
    },

    /**
    * Render the layout HTML of focus components showcase.
    * @return {VirtualDOM} - The virtual DOM of the layout.
    */
    render() {
        const {links} = this.props;
        return (
            <div className='demo-layout mdl-layout mdl-layout--fixed-drawer mdl-layout--fixed-header' data-focus='template'>
              <header className='demo-header mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600'>
                <div className='mdl-layout__header-row'>
                  <span className='mdl-layout-title'>{this.i18n(this.props.title)}</span>
                  <div className='mdl-layout-spacer'></div>
                  <div className='mdl-textfield mdl-js-textfield mdl-textfield--expandable'>
                    <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor='search'>
                      <i className='material-icons'>search</i>
                    </label>
                    <div className='mdl-textfield__expandable-holder'>
                      <input className='mdl-textfield__input' id='search' type='text' />
                      <label className='mdl-textfield__label' htmlFor='search'>Enter your query...</label>
                    </div>
                  </div>
                  <button className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon' id='hdrbtn'>
                    <i className='material-icons'>more_vert</i>
                  </button>
                  <ul className='mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right' htmlFor='hdrbtn'>
                    <li className='mdl-menu__item'>About</li>
                    <li className='mdl-menu__item'>Contact</li>
                    <li className='mdl-menu__item'>Legal information</li>
                  </ul>
                </div>
              </header>
              <div className='demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'>
                <header className='demo-drawer-header'>
                    <a href="/">
                        <h1>
                            <strong>FOCUS</strong>
                            <span>components</span>
                        </h1>
                        <h2>Showcase</h2>
                    </a>
                    <div className="links">
                        <a alt="focus-docs" href="http://kleegroup.github.io/focus-docs/" target="_blank" title="Documentation focus-components"><i className="mdl-color-text--blue-grey-400 fa fa-book" role='presentation'></i></a>
                        <a alt="focus-components sur Github" href="https://github.com/KleeGroup/focus-components" target="_blank" title="focus-components sur Github"><i className="mdl-color-text--blue-grey-400 fa fa-github" role="presentation"></i></a>
                    </div>
                </header>
                <nav className='demo-navigation mdl-navigation mdl-color--blue-grey-800'>
                    <h3>Tags</h3>
                    {links.map((link)=>{
                        return <a className='mdl-navigation__link' href={link.url || '/'}><i className='mdl-color-text--blue-grey-400 fa fa-cube' role='presentation'></i>{link.content}</a>
                    })}
                    <div className='mdl-layout-spacer'></div>
                    <div className='brand-powered'><a href="http://www.kleegroup.com">Propulsé par</a></div>
                </nav>
              </div>
              <main className='mdl-layout__content mdl-color--grey-100' style={{zIndex: '100'}}>
                <div className='demo-content'>
                    {this.props.children}
                </div>
              </main>
            </div>
        );
    }
});

module.exports = Layout;
