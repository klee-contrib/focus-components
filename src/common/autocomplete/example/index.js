import { component as AutocompleteFor } from 'focus-components/common/autocomplete/field';

const listLoader = text => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    code: 'RIRI',
                    value: 'Riri'
                },
                {
                    code: 'FIFI',
                    value: 'Fifi'
                },
                {
                    code: 'LOULOU',
                    value: 'Loulou'
                }
            ]);
        }, 500);
    });
};

class AutocompleteSample extends React.Component {
    render() {
        return (
            <div>
                <AutocompleteFor
                    isEdit
                    loader={listLoader}
                />
                <AutocompleteFor
                    isEdit
                    loader={listLoader}
                    value='RIRI'
                />
            </div>
        );
    }
}

return <AutocompleteSample />;
