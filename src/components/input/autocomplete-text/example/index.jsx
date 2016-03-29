const {AutocompleteText} = FocusComponents.components.input;

const _querySearcher = query => {
    let data = [
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

const _querySearcher2 = query => {
    let data = [];
    if(data.length == 0) {
        data =  [
            {
                key: 'ERR',
                label: 'Oops, no data to show'
            }
        ];
    }
    return Promise.resolve({
        data,
        totalCount: data.length
    });
};

const _querySearcher3 = query => {
    let data = [];
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
                    placeholder={'Your search'}
                    />
                <br/>
                <AutocompleteText
                    isEdit={isEdit}
                    querySearcher={_querySearcher2}
                    />
                <br/>
                <AutocompleteText
                    isEdit={isEdit}
                    querySearcher={_querySearcher3}
                    />
            </div>
        );
    }
}

module.exports = AutocompleteTextExample;
