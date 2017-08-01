//Needed components
import React from 'react';
import HeaderScrolling from './header-scrolling';
import HeaderTopRow from './header-top-row';
import HeaderContent from './header-content';
import HeaderActions from './header-actions';

/**
 * Application header
 */
const AppHeader = () => {
    return (
        <HeaderScrolling>
            <HeaderTopRow />
            <HeaderContent />
            <HeaderActions />
        </HeaderScrolling>
    );
}

AppHeader.displayName = 'AppHeader';

export default AppHeader;
