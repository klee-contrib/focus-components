import React, {Component, PropTypes} from 'react';
import HeaderDefaultTemplate from './header-default-template';
import LoadingBar from '../../application/loading-bar';
import MessageCenter from '../../application/message-center';
import ErrorCenter from '../../application/error-center';
import ConfirmWrapperDefault from '../confirm';
import LoadingStatusBarDefault from '../../dev-tools/loading-status-bar';
// Components
const LoadingBarDefault = LoadingBar.component;
const MessageCenterDefault = MessageCenter.component;
const ErrorCenterDefault = ErrorCenter.component;

// component default props.
const defaultProps = {
    AppHeader: HeaderDefaultTemplate, //default app header.
    ErrorCenter: ErrorCenterDefault, // default error center
    LoadingBar: LoadingBarDefault, // default loading bar
    LoadingStatusBar: LoadingStatusBarDefault,
    MessageCenter: MessageCenterDefault, // default message center
    ConfirmWrapper: ConfirmWrapperDefault, // default confirm wrapper,
    errorCenterDisplay: true // ErrorCenter displayed by default.
};

// component props definition.
const propTypes = {
    AppHeader: PropTypes.func,
    ConfirmWrapper: PropTypes.func,
    ErrorCenter: PropTypes.func,
    Footer: PropTypes.func,
    LoadingBar: PropTypes.func,
    MenuLeft: PropTypes.func,
    MessageCenter: PropTypes.func,
    LoadingStatusBar: PropTypes.func,
    errorCenterDisplay: PropTypes.bool
};

/**
* Layout component.
*/
class Layout extends Component {

    /** @inheritDoc */
    render() {
        const {AppHeader, children, ConfirmWrapper, ErrorCenter, Footer, LoadingBar, MenuLeft, MessageCenter, LoadingStatusBar, errorCenterDisplay, ...otherProps} = this.props;
        const menuType = MenuLeft ? 'left' : 'other';
        return (
            <div data-focus='layout' data-menu={menuType} {...otherProps}>
                <LoadingBar />
                <MessageCenter />
                {errorCenterDisplay && 
                    <ErrorCenter />
                }
                <ConfirmWrapper />
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
