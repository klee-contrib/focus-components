//Dependencies.
import builder from 'focus-core/component/builder';
import React from 'react';
import ReactDOM from 'react-dom';

const markdownEditorMixin = {
    /** @inherideddoc */
    getInitialState() {
        return { value: this.props.value };
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use focus-components/components/input/rich-text instead');
    },
    /** @inherideddoc */
    componentDidMount() {
        if (!window.Showdown) {
            console.warn('The showdown library should be imported. See https://github.com/showdownjs/showdown');
        }
    },
    /**
     * Handle the change of the value.
     */
    handleChange() {
        this.setState({ value: ReactDOM.findDOMNode(this.refs.textarea).value });
    },
    /** @inherideddoc */
    render() {
        const converter = window.Showdown
            ? (data) => { console.warn('showdown should be imported/'); return data; }
            : new window.Showdown.converter();
        return (
            <div className='MarkdownEditor'>
                <textarea
                    onChange={this.handleChange}
                    ref='textarea'
                    defaultValue={this.state.value}
                />

                <div
                    className='content'
                    dangerouslySetInnerHTML={{
                        __html: converter.makeHtml(this.state.value)
                    }}
                />
            </div>
        );
    }
};

const { mixin, component } = builder(markdownEditorMixin);
export { mixin, component };
export default { mixin, component };
