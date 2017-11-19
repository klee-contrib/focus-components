import builder from 'focus-core/component/builder';
import React from 'react';

const REACT_NOT_COMPONENT_ERROR = 'Uncaught TypeError: undefined is not a function';
const REACT_NOT_COMPONENT_MESSAGE = 'Check your console errors, it seems you are trying to create a component from something which is not a component.';

/**
 * Error center component.
 * @example React.render(<ErrorCenter />, document.querySelector('#container'))
 * @type {Object}
 */
const errorCenter = {
    displayName: 'ErrorCenter',
    /** @inheriteddoc */
    getDefaultProps() {
        return {
            source: window,
            errors: [],
            isErrorsVisible: false,
            numberDisplayed: 3
        }
    },
    /** @inheriteddoc */
    getInitialState() {
        return { errors: this.props.errors, isErrorsVisible: this.props.isErrorsVisible };
    },
    /** @inheriteddoc */
    componentWillMount() {
        this.props.source.onerror = ((e) => {
            let { errors } = this.state;
            errors.push(e);
            this.setState({ errors: errors });
        });
    },
    /**
     * Toggle the visibility of the error component.
     */
    _toggleVisible() {
        this.setState({ isErrorsVisible: !this.state.isErrorsVisible });
    },
    /**
     * Render all the errors.
     * @return {object} - The jsx errors.
     */
    _renderErrors() {
        const { errors, isErrorsVisible } = this.state;
        const { numberDisplayed } = this.props;
        const errorLength = errors.length;
        return (
            <div data-focus='error-center'>
                <div data-focus='error-counter'>
                    <i className='material-icons' style={{ cursor: 'pointer', fontSize: '28px', padding: '15px 5px 5px 5px' }}>error</i>{errorLength}
                </div>
                <div data-focus='error-actions'>
                    <i className='material-icons' style={{ cursor: 'pointer', fontSize: '36px', padding: '10px' }} onClick={() => { window.location.reload(); }}>refresh</i>
                    <i className='material-icons' style={{ cursor: 'pointer', fontSize: '36px', padding: '10px' }} onClick={this._toggleVisible}>{`keyboard_arrow_${isErrorsVisible ? 'down' : 'up'}`}</i>
                    <i className='material-icons' style={{ cursor: 'pointer', fontSize: '36px', padding: '10px' }} onClick={() => { this.setState({ errors: [] }); }}>delete</i>
                </div>
                <ul data-focus='error-stack'>
                    {isErrorsVisible ? errors.slice(errorLength - numberDisplayed, errorLength).map((err) => { const e = REACT_NOT_COMPONENT_ERROR === err ? REACT_NOT_COMPONENT_MESSAGE : err; return <li>{e}</li>; }) : null}
                </ul>
            </div>
        );
    },
    /** @inheriteddoc */
    render() {
        return 0 < this.state.errors.length ? this._renderErrors() : null;
    }
};

const { mixin, component } = builder(errorCenter);
export { mixin, component };
export default { mixin, component };
