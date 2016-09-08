import React, {PropTypes} from 'react';

const consultFormComponent = (children, loading) => (
     <div data-focus='form' data-mode='consult' data-loading={loading}>{children}</div>
);

const editFormComponent = (children, loading, otherProps) => (
    <form className='form-horizontal' data-focus='form' data-mode='edit' data-loading={loading} noValidate>
        <fieldset>
            {children}
        </fieldset>
    </form>
);

const formComponent = ({children, editing, loading, ...otherProps}) => editing ? editFormComponent(children, loading, otherProps) : consultFormComponent(children, loading);

formComponent.displayName = 'Form';
formComponent.propTypes = {
    editing: PropTypes.bool.isRequired,
    loading: PropTypes.bool
};
formComponent.defaultProps = {
    editing: false,
    loading: false
};
export default formComponent;
