import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import { isEqual } from 'lodash';

class MyStatefulEditor extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string,
        readOnly: PropTypes.bool
    };

    state = {
        value: this.props.value ? RichTextEditor.createValueFromString(this.props.value, 'markdown') : RichTextEditor.createEmptyValue()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && !this.props.value) {
            this.setState({
                value: nextProps.value ? RichTextEditor.createValueFromString(nextProps.value, 'markdown') : RichTextEditor.createEmptyValue()
            })
        }
    }

    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(value.toString('markdown'));
        }
    };

    render() {
        return (
            <div>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                    readOnly={!this.props.isEdit}
                />
            </div>
        );
    }
}

export default MyStatefulEditor;