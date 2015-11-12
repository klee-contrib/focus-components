//Needed components
import React, {Component} from 'react';
import HeaderScrolling from './header-scrolling';
import HeaderTopRow from './header-top-row';
import HeaderContent from './header-content';
import HeaderActions from './header-actions';
/**
 * Application header
 */
class AppHeader extends Component {
    render() {
        return (
            <HeaderScrolling>
                <HeaderTopRow />
                <HeaderContent />
                <HeaderActions />
            </HeaderScrolling>
        );
    }
}
// static props
AppHeader.displayName = 'AppHeader';

module.exports = AppHeader;
