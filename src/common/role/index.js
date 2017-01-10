import builder from 'focus-core/component/builder';
import user from 'focus-core/user';
import {intersection, isArray} from 'lodash';
import type from 'focus-core/component/types';

/**
 * Mixin button.
 * @type {Object}
 */
const roleMixin = {
    propTypes: {
        hasOne: type('array'),
        hasAll: type('array')
    },
    render() {
        let userRoles = user.getRoles();
        if(isArray(this.props.hasAll) && intersection(userRoles, this.props.hasAll).length === this.props.hasAll.length) {
            return this.props.children;
        } else if(isArray(this.props.hasOne) && intersection(userRoles, this.props.hasOne).length > 0) {
            return this.props.children;
        }
        return null;

    }
};

const builtComp = builder(roleMixin);
const {component, mixin} = builtComp;

export {
    component,
    mixin
}
export default builtComp;