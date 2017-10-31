//Needed components
import React, { Component } from 'react';
import { component as Header } from '../header';
import { component as Cartridge } from '../cartridge';
import { component as ContentBar } from '../content-bar';
import { component as Bar } from '../bar';
import { component as ContentActions } from '../content-actions';

/**
 * Application header
 */
class AppHeader extends Component {

    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
    }

    render() {
        return (
            <Header>
                <ContentBar>
                    <Bar />
                    <Cartridge />
                </ContentBar>
                <ContentActions />
            </Header>
        );
    }
}
// static props
AppHeader.displayName = 'AppHeader';

export default AppHeader;
