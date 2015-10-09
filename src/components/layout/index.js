import React, {Component, PropTypes} from 'react';
import HeaderLayoutDefault from './header-scrolling';
import LoadingBar from '../../application/loading-bar';
import MessageCenter from '../../application/message-center';
import ErrorCenter from '../../application/error-center';

// Components
const LoadingBarDefault = LoadingBar.component;
const MessageCenterDefault = MessageCenter.component;
const ErrorCenterDefault = ErrorCenter.component;

// component default props.
const defaultProps = {
    AppHeader: HeaderLayoutDefault, //default app header.
    ErrorCenter: ErrorCenterDefault, // default error center
    LoadingBar: LoadingBarDefault, // default loading bar
    MessageCenter: MessageCenterDefault // default message center
};

// component props definition.
const propTypes = {
    AppHeader: PropTypes.element,
    ErrorCenter: PropTypes.element,
    Footer: PropTypes.string,
    LoadingBar: PropTypes.element,
    MenuLeft: PropTypes.element,
    MessageCenter: PropTypes.element
};

/**
* Layout component.
*/
class Layout extends Component {

    /** @inheritDoc */
    render() {
        const {AppHeader, children, ErrorCenter, Footer, LoadingBar, MenuLeft, MessageCenter, ...otherProps} = this.props;
        const menuType = MenuLeft ? 'left' : 'other';
        return (
            <div data-focus='layout' data-menu={menuType} {...otherProps}>
                <LoadingBar />
                <MessageCenter />
                <ErrorCenter />
                <AppHeader />
                {MenuLeft &&
                    <MenuLeft />
                }
                <div data-focus='page-content'>
                    {children}
                </div>
                {Footer &&
                    <footer data-focus='footer'>
                        <Footer />
                    </footer>
                }
            </div>
        );
    }
}

//Static props.
Layout.displayName = 'Layout';
Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;

export default Layout;
