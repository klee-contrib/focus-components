// Dependencies
import builder from 'focus-core/component/builder';
// Components
import AppHeaderDefault from './app-header';
import { component as LoadingBarDefault } from '../loading-bar';
import { component as MessageCenterDefault } from '../message-center';
import { component as ErrorCenterDefault } from '../error-center';
// Mixins
import stylableBehaviour from '../../mixin/stylable';

const contentActionsMixin = {
    mixins: [stylableBehaviour],
    /** inheriteddoc */
    getDefaultProps() {
        return {
            AppHeader: AppHeaderDefault,
            LoadingBar: LoadingBarDefault,
            MessageCenter: MessageCenterDefault,
            ErrorCenter: ErrorCenterDefault,
            displayDevBar: true,
            footerText: 'Please override the footer text by giving a "footerText" property to the Layout component.'
        };
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
    },
    /** inheriteddoc */
    render() {
        const { LoadingBar, MessageCenter, ErrorCenter, AppHeader, MenuLeft, footerText, displayDevBar, children } = this.props;
        return (
            <div className={this._getStyleClassName()} data-focus='layout'>
                <LoadingBar displayDevBar={displayDevBar} />
                <MessageCenter />
                <ErrorCenter />
                <AppHeader />
                <div data-focus='menu'>
                    {MenuLeft && <MenuLeft />}
                </div>
                <div data-focus='page-content' />
                <footer data-focus='footer'>
                    {footerText}
                </footer>
                {children}
            </div>
        );
    }
};

const { mixin, component } = builder(contentActionsMixin);
export { mixin, component };
export default { mixin, component };
