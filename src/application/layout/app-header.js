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
