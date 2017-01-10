// Components
import React from 'react';
import searchHeaderMixin from './mixin';

export default React.createClass({
    mixins: [searchHeaderMixin],
    render() {
        return this._SearchBarComponent();
    }
});
