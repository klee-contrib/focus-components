import React from 'react';
import builder from 'focus-core/component/builder';
import { component as Scrollspy } from '../../common/scrollspy';
import type from 'focus-core/component/types';
import stylable from '../../mixin/stylable';
import { component as DefaultBackToTopComponent } from '../../components/button-back-to-top';
/**
* Mixin used in order to create a Detail.
* @type {Object}
*/
const detailMixin = {
    mixins: [stylable],
    /** @inheritedDoc */
    getDefaultProps() {
        return {
            /**
            * Activate the presence of the sticky navigation component.
            * @type {Boolean}
            */
            hasNavigation: true,
            hasBackToTop: true,
            BackToTopComponent: DefaultBackToTopComponent,
            navigationAffixOffset: 80
        };
    },
    /** @inheritedDoc */
    propTypes: {
        hasNavigation: type('bool'),
        hasBackToTop: type('bool'),
        BackToTopComponent: type(['func', 'object']),
        navigationAffixOffset: type('number')
    },
    /**
    * Returns detail content.
    * @return {object} detail content
    */
    _detailContent() {
        return (
            <div data-focus='detail-content'>
                {this.props.children}
            </div>
        );
    },
    componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.ScrollspyContainer');
    },
    /** @inheritedDoc */
    render() {
        const { hasNavigation, hasBackToTop, BackToTopComponent, navigationAffixOffset } = this.props;
        return (
            <div className={`${this._getStyleClassName()}`} data-focus='detail'>
                {hasNavigation ? <Scrollspy affixOffset={navigationAffixOffset}>{this._detailContent()}</Scrollspy> : this._detailContent()}
                {hasBackToTop && <BackToTopComponent />}
            </div>
        );
    }
};

export default builder(detailMixin);
