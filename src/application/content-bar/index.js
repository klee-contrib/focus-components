const builder = require('focus-core').component.builder;
const React = require('react');

const headerMixin = {
    /** @inheriteddoc */
    render() {
        return (
            <div data-focus='content-bar'>
                {this.props.children}
            </div>
        );
    }
};

module.exports = builder(headerMixin);
