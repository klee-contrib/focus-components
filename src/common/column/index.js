// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
import React, { Component } from 'react';
import types from 'focus-core/component/types';

/**
 * Column component.
 */
class Column extends Component {
    constructor(props) {
        super(props);
        this._className = this._className.bind(this);
    }
    componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Column\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Column');
    }
    _className() {
        const { size, className } = this.props;
        if (className) { return className; }
        const SIZE_CSS = size ? `mdl-cell--${size}-col` : '';
        return `mdl-cell ${SIZE_CSS} `;
    }
    /** @inheriteDoc */
    render() {
        const { children, ...otherProps } = this.props;
        const className = this._className();
        return (
            <div className={className} {...otherProps}>
                {children}
            </div>
        );
    }
}

//Static props.
Column.displayName = 'Column';
Column.defaultProps = {
    size: 6
};
Column.propTypes = {
    size: types('number'),
    className: types('string')
};

export default Column;
