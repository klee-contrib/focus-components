// Dependencies
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import builder from 'focus-core/component/builder';
import type from 'focus-core/component/types';
import uniqueId from 'lodash/utility/uniqueId';

class Title extends Component {

    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string
    };

    state = {
        spyId: uniqueId('title_')
    };

    render() {
        const { spyId } = this.state;
        const { id, label } = this.props;

        return (
            <div>
                <h3 data-spy={spyId} id={id}>{label}</h3>
            </div>
        );
    }
}

export default Title;