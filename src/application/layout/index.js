// Dependencies

const builder = require('focus-core').component.builder;

// Components

const AppHeaderDefault = require('./app-header');
const LoadingBarDefault = require('../loading-bar').component;
const MessageCenterDefault = require('../message-center').component;
const ErrorCenterDefault = require('../error-center').component;

// Mixins

const stylableBehaviour = require('../../mixin/stylable');

const contentActionsMixin = {
    mixins: [stylableBehaviour],
    /** inheriteddoc */
    getDefaultProps(){
        return {
            AppHeader: AppHeaderDefault,
            LoadingBar: LoadingBarDefault,
            MessageCenter: MessageCenterDefault,
            ErrorCenter: ErrorCenterDefault,
            footerText: 'Please override the footer text by giving a "footerText" property to the Layout component.'
        };
    },
    /** inheriteddoc */
    render() {
        const {LoadingBar, MessageCenter, ErrorCenter, AppHeader, MenuLeft, footerText, children} = this.props;
        return (
            <div className={this._getStyleClassName()} data-focus='layout'>
                <LoadingBar />
                <MessageCenter />
                <ErrorCenter />
                <AppHeader />
                <div data-focus='menu'>
                    {MenuLeft && <MenuLeft/>}
                </div>
                <div data-focus='page-content'></div>
                <footer data-focus='footer'>
                    {footerText}
                </footer>
                {children}
            </div>
        );
    }
};

module.exports = builder(contentActionsMixin);
