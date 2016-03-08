//Needed components
const React = require('react');
const {Component} = React;
const Header = require('../header').component;
const Cartridge = require('../cartridge').component;
const ContentBar = require('../content-bar').component;
const Bar = require('../bar').component;
const ContentActions = require('../content-actions').component;
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

module.exports = AppHeader;
