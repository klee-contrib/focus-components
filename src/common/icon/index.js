const builder = require('focus-core').component.builder;
const React = require('react');
const types = require('focus-core').component.types;
const oneOf = React.PropTypes.oneOf;

const iconMixin = {
    displayName: 'Icon',
    getDefaultProps() {
        return {
            name: '',
            library: 'material'
        };
    },
    propTypes: {
        handleOnClick: types('function'),
        name: types('string'),
        library: oneOf(['material', 'font-awesome', 'font-custom'])
    },


    /**
    * Render the img.
    * @returns {XML} Html code.
    */
    render: function renderIcon(){
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
