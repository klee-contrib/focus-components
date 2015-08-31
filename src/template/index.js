const {builder, types} = require('focus').component;
const React = require('react');
const i18nBehaviour = require('../common/i18n/mixin');

// const uuid = require('uuid').v4;
const templateMixin = {
    mixins: [i18nBehaviour],

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        title: types('string').isRequired
    },

    /**
    * Render the template HTML of focus component demo.
    * @return {VirtualDOM} - The virtual DOM of the template.
    */
    render() {

        return (
            <div className='demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header' data-focus='template'>
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
                    <h1>
                        <strong>FOCUS</strong>
                        <span>components</span>
                    </h1>
                    <h2>Showcase</h2>
                </header>
                <nav className='demo-navigation mdl-navigation mdl-color--blue-grey-800'>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>home</i>Home</a>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>insert_link</i>My awsome component 1</a>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>insert_link</i>My awsome component 2</a>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>insert_link</i>My awsome component 3</a>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>insert_link</i>My awsome component 4</a>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>insert_link</i>My awsome component 5</a>
                  <a className='mdl-navigation__link' href='/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>insert_link</i>My awsome component 6</a>
                  <div className='mdl-layout-spacer'></div>
                  <a className='mdl-navigation__link' href='http://kleegroup.github.io/focus-docs/'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>help_outline</i>Documentation</a>
                  <a className='mdl-navigation__link' href='https://github.com/KleeGroup/focus-components'><i className='mdl-color-text--blue-grey-400 fa fa-github' role='presentation'></i>Github</a>
                </nav>
              </div>
              <main className='mdl-layout__content mdl-color--grey-100'>
                <div className='demo-content'>
                    {this.props.children}
                </div>
              </main>
            </div>
        );
    }
};

module.exports = builder(templateMixin);
