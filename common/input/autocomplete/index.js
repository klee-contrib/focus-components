// Dependencies

let builder = Focus.component.builder;
let types = Focus.component.types;

let Autocomplete = {
    componentWillMount() {
        // Check if Awesomplete is set in Window
        if (!window.Awesomplete) {
            throw new Error('Please include Awesomplete to your application. See http://leaverou.github.io/awesomplete/ for more information');
        }
    },
    getDefaultProps() {
        return {
            pickList: [],
            type: 'simple'
        };
    },
    propTypes: {
        pickList: types('array'),
        type: types('string')
    },
    render() {
        return (
            <div data-focus='autocomple'>
                <input className='awesomplete' list='focus-autocomplete-list'/>
                <datalist id='focus-autocomplete-list'>
                    {this.props.pickList.map((choice) => {
                        return (
                            <option>
                                {choice}
                            </option>
                        );
                    })}
                </datalist>
            </div>
        );
    }
};

module.exports = builder(Autocomplete);
