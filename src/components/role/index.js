import PropTypes from 'prop-types';

import user from 'focus-core/user';
import intersection from 'lodash/array/intersection';
import isArray from 'lodash/lang/isArray';

function Role({ hasAll, hasOne, children, emptyBlock }) {
    let userRoles = user.getRoles();
    //console.log("emptyBlock",emptyBlock);
    if (isArray(hasAll) && intersection(userRoles, hasAll).length === hasAll.length) {
        return children;
    } else if (isArray(hasOne) && intersection(userRoles, hasOne).length > 0) {
        return children;
    }
    return emptyBlock;
}

Role.displayName = 'Role';

Role.propTypes = {
    children: PropTypes.object,
    hasOne: PropTypes.array,
    hasAll: PropTypes.array
};

Role.defaultProps = {
    emptyBlock: null
};

export default Role;