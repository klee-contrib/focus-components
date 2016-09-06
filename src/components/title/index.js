// Dependencies
import React, {PropTypes, PureComponent} from 'react';
import builder from 'focus-core/component/builder';
import type from 'focus-core/component/types';
import uniqueId from 'lodash/uniqueId';

class Title extends PureComponent {
    constructor(props) {
        super(props);
        this.spyId = uniqueId('title_');
    };
    render() {
        const {id, label} = this.props;
        return(
            <h3 data-spy={this.spyId} id={id}>{label}</h3>
        );
    }
}
Title.displayName = 'Title';
Title.propType = {
    id: PropTypes.string,
    label: PropTypes.string
};
export default Title;
