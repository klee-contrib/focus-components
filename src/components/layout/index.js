import React, { PropTypes } from 'react';

import ConfirmWrapperDefault from '../confirm';
import { component as ErrorCenterDefault } from '../../application/error-center';
import HeaderDefaultTemplate from './header-default-template';
import LoadingBarDefault from './header-loading-bar';
import MessageCenterDefault from '../message-center';

// component default props.
const defaultProps = {
    AppHeader: HeaderDefaultTemplate, //default app header.
    ErrorCenter: ErrorCenterDefault, // default error center
    LoadingBar: LoadingBarDefault, // default loading bar
    MessageCenter: MessageCenterDefault, // default message center
    ConfirmWrapper: ConfirmWrapperDefault // default confirm wrapper,
};

// component props definition.
const propTypes = {
    AppHeader: PropTypes.func,
    ConfirmWrapper: PropTypes.func,
    ErrorCenter: PropTypes.func,
    Footer: PropTypes.func,
    LoadingBar: PropTypes.func,
    LoadingStatusBar: PropTypes.func,
    MenuLeft: PropTypes.func,
    MessageCenter: PropTypes.func
};

/**
* Layout component.
*/
const Layout = ({ AppHeader, children, ConfirmWrapper, ErrorCenter, Footer, LoadingBar, MenuLeft,
    MessageCenter, DevTools, OtherRootComponent, ...otherProps }) => {

    const menuType = MenuLeft ? 'left' : 'other';

    return (
        <div data-focus='layout' data-menu={menuType} {...otherProps}>
            <LoadingBar />
            <MessageCenter />
            {ErrorCenter &&
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
            {DevTools && <DevTools />}
            {OtherRootComponent && <OtherRootComponent />}
        </div>
    );
}

//Static props.
Layout.displayName = 'Layout';
Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;

export default Layout;
