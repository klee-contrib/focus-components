/* globals Awesomplete */

// Dependencies

let builder = Focus.component.builder;
let types = Focus.component.types;
let find = require('lodash/collection/find');

let Autocomplete = {
    componentWillMount() {
        // Check if Awesomplete is set in Window
        if (!window.Awesomplete) {
            throw new Error('Please include Awesomplete to your application. See http://leaverou.github.io/awesomplete/ for more information');
        }
    },
    componentDidMount() {
        let {input} = this.refs;
        let {pickList} = this.props;
        this._awesomeplete = new Awesomplete(React.findDOMNode(input), {
            list: pickList
        });
        this._awesomeplete.input.addEventListener('awesomplete-select', event => this._selectionHandler(event.text));
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
    _selectionHandler(value) {
        const {pickList} = this.props;
        const selectedCode = find(pickList, {value}).code;
        this.setState({selectedCode});
    },
    _extractListFromData(data) {
        return data.map(datum => datum.value);
    },
    getValue() {
        const {pickList} = this.props;
        const {selectedCode} = this.state;
        // Check if current value is in the given pickList, otherwise return undefined
        if (find(pickList, {code: selectedCode})) {
            return selectedCode;
        } else {
            return undefined;
        }
    },
    _renderEdit() {
        return (
            <div data-focus='autocomplete'>
                <input ref='input'/>
            </div>
        );
    },
    _renderConsult() {

    },
    render() {
        let {isEdit} = this.props;
        return isEdit ? this._renderEdit() : this._renderConsult();
    }
};

module.exports = builder(Autocomplete);
