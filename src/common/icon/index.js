import builder from 'focus-core/component/builder';
const React = require('react');
import types from 'focus-core/component/types';
const {PropTypes} = React;

const iconMixin = {
    displayName: 'Icon',
    getDefaultProps() {
        return {
            name: '',
            library: 'material'
        };
    },
    componentWillMount () {
        console.warn('FocusComponents v0.15: the \'Icon\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Icon');
    },
    propTypes: {
        handleOnClick: PropTypes.func,
        library: PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
        name: PropTypes.string
    },
    /**
    * Render the img.
    * @returns {XML} Html code.
    */
    render: function renderIcon() {
        const {name, library, onClick, style} = this.props;
        switch (library) {
            case 'material':
                return <i className='material-icons' onClick={onClick} {...style}>{name}</i>;
            case 'font-awesome':
                const faCss = `fa fa-${name}`;
                return <i className={faCss} onClick={onClick} {...style}></i>;
            case 'font-custom':
                return <span className={`icon-${name}`}></span>;
            default:
                return null;
        }
    }
};

module.exports = builder(iconMixin);
