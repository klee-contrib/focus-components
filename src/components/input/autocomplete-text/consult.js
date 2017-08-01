import React from 'react';

function AutocompleteTextConsult({ label, name, type, value }) {
    return (
        <div label={label} name={name} type={type}>
            {value}
        </div>
    );
}

export default AutocompleteTextConsult;
