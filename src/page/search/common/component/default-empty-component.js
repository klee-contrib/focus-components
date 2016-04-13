// Dependencies
import React, {Component} from 'react';
import builder from 'focus-core/component/builder';
import {translate} from 'focus-core/translation';

class DefaultEmpty extends Component {
    render() {
        return (
            <div data-focus='empty-result'>
                {translate('search.empty')}
            </div>
        );
    }
}

module.exports = DefaultEmpty;
