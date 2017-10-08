import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
// FIX ME cannot import RichTextEditor from 'react-rte/lib/RichTextEditor';
// Due to use of CSS modules

/**
 * Rich text editor, for both edition and consult mode.
 * See https://github.com/sstur/react-rte for more details and options. 
 * 
 * @class RichTextField
 * @extends {Component}
 */
class RichTextField extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        language: PropTypes.oneOf('html', 'markdown'),
        isEdit: PropTypes.bool.isRequired
    };

    static defaultProps = {
        language: 'markdown'
    };

    /**
     * Creates an instance of RichTextField.
     * @param {any} props props from parent
     * @memberof RichTextField
     */
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value ? RichTextEditor.createValueFromString(this.props.value, this.props.language) : RichTextEditor.createEmptyValue()
        };

        this.onChange = this.onChange.bind(this);
        this.forceChange = this.forceChange.bind(this);
    }

    /** @inheritdoc */
    componentWillReceiveProps(nextProps) {
        // We are only listening to first value, else we have cursor issue in edit mode
        if (nextProps.value && !this.props.value) {
            this.forceChange(nextProps.value);
        }
    }

    /**
     * Method to forcibly change content of editor, if it already have value.
     * 
     * @param {string} value new value for editor content
     * @memberof RichTextField
     */
    forceChange(value) {
        this.setState({
            value: value ? RichTextEditor.createValueFromString(value, this.props.language) : RichTextEditor.createEmptyValue()
        })
    }

    /**
     * Inner onchange on the component, to avoid cursor issue for this component and to return string value.
     * 
     * @param {object} value Value returned by the RTE component
     * @memberof RichTextField
     */
    onChange(value) {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(value.toString(this.props.language));
        }
    }

    /** @inheritdoc */
    render() {
        return (
            <div>
                <RichTextEditor
                    {...this.props}
                    value={this.state.value}
                    onChange={this.onChange}
                    readOnly={!this.props.isEdit}
                />
            </div>
        );
    }
}

export default RichTextField;