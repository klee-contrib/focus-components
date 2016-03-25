const {AutocompleteText} = FocusComponents.components.input;

const _querySearcher = query => {
    const data = [
        {
            key: 'JL',
            label: 'Joh Lickeur'
        },
        {
            key: 'GK',
            label: 'Guénolé Kikabou'
        },
        {
            key: 'YL',
            label: 'Yannick Lounivis'
        }
    ];
    return Promise.resolve({
        data,
        totalCount: data.length
    });
};

class AutocompleteTextExample extends React.Component {
    state = {isEdit: true};
    render() {
        const {isEdit} = this.state;
        return (
            <div>
                <AutocompleteText
                    isEdit={isEdit}
                    querySearcher={_querySearcher}
                    />
            </div>
        );
    }
}

module.exports = AutocompleteTextExample;
