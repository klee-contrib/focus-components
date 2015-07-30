/* globals Awesomplete */

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
    componentDidMount() {
        this._awesomeplete = new Awesomplete(document.querySelector('input[data-focus="autocomplete-input"]'), {
            list: this.props.pickList
        });
        this._awesomeplete.input.addEventListener('awesomplete-select', event => this.props.selectionHandler(event.text));
    },
    getDefaultProps() {
        return {
            pickList: [],
            selectionHandler: text => console.log(`Autocomplete selection : ${text}`),
            type: 'simple'
        };
    },
    propTypes: {
        pickList: types('array'),
        type: types('string')
    },
    render() {
        return (
            <div data-focus='autocomplete'>
                <input data-focus='autocomplete-input' ref='input'/>
            </div>
        );
    }
};

module.exports = builder(Autocomplete);
