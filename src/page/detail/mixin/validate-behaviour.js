import { isFunction, isEmpty } from 'lodash';
import assign from 'object-assign';
export default {
    validate: function validateDetail() {
        let validationMap = {};
        for (let blockKey in this.refs) {
            //validate only the reference elements which have valide function
            // todo: @pierr see if it is sufficient
            if (isFunction(this.refs[blockKey].validate)) {
                let validationRes = this.refs[blockKey].validate();
                if (validationRes !== undefined) {
                    assign(validationMap, {
                        [blockKey]: validationRes
                    });
                }
            }

        }
        if (isEmpty(validationMap)) {
            return true;
        }
    }
};
