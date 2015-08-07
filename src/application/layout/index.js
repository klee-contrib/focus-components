// Dependencies

let builder = require('focus').component.builder;

// Components

let AppHeader = require('./app-header');
let LoadingBar = require('../loading-bar').component;
let MessageCenter = require('../message-center').component;
let ErrorCenter = require('../error-center').component;

// Mixins

let stylableBehaviour = require('../../mixin/stylable');

let contentActionsMixin = {
    mixins: [stylableBehaviour],
    getDefaultProps(){
        return {
            AppHeader: AppHeader,
            LoadingBar: LoadingBar,
            MessageCenter: MessageCenter,
            ErrorCenter: ErrorCenter,
            footerText: 'Please override the footer text by giving a "footerText" property to the Layout component.'
        };
    },
    render() {
        return (
            <div className={this._getStyleClassName()} data-focus='layout'>
                <this.props.LoadingBar />
                <this.props.MessageCenter />
                <this.props.ErrorCenter />
                <this.props.AppHeader />
                <div data-focus='menu'>
                    {this.props.MenuLeft &&
                        <this.props.MenuLeft/>
                    }
                </div>
                <div data-focus='page-content'></div>
                <footer data-focus='footer'>
                    {this.props.footerText}
                </footer>
                {this.props.children}
            </div>
        );
    }
};

module.exports = builder(contentActionsMixin);
