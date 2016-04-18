import React, {PropTypes, Component} from 'react';
import Translation from '../../../behaviours/translation';

@Translation
class DisplayText extends Component {
    static defaultProps = {
        formatter: (data) => data
    };

    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.oneOfType(['string', 'number']),
        name: PropTypes.string,
        style: PropTypes.object
    };

    /**
    * Render the value.
    * @return {string} The formated value.
    */
    renderValue() {
        const {formatter, value} = this.props;
        return formatter(value);
    }

    render() {
        return(
            <div {...this.props}>
                {this.renderValue()}
            </div>
        );
    }
}

DisplayText.displayName = 'DisplayText';

export default DisplayText;
