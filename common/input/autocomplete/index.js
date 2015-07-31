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
            list: this._extractListFromData(pickList)
        });
        this._awesomeplete.input.addEventListener('awesomplete-select', event => this._selectionHandler(event.text));
    },
    getDefaultProps() {
        return {
            code: '',
            pickList: [],
            type: 'simple',
            validate: true
        };
    },
    propTypes: {
        pickList: types('array'),
        selectionHandler: types('function'),
        type: types('string'),
        validate: types('bool'),
        value: types('string')
    },
    getInitialState() {
        const {code} = this.props;
        return ({
            value: this._getValueFromCode(code)
        });
    },
    componentWillReceiveProps(nextProps) {
        let {pickList, code} = nextProps;
        code = code || ''; // Value can be missing from the new props, in case the parent only changed the list for example
        const value = this._getValueFromCode(code, pickList);
        this._awesomeplete._list = this._extractListFromData(pickList);
        this.setState({value});
    },
    _selectionHandler(value) {
        const {selectionHandler} = this.props;
        if (selectionHandler) {
            const {pickList} = this.props;
            const selectedCode = find(pickList, {value}).code;
            selectionHandler(selectedCode);
        }
        this._isSelecting = true; // Private flag to tell the blur listener not to replace the value
        this.setState({value});
    },
    _extractListFromData(data) {
        return data.map(datum => datum.value);
    },
    _getCodeFromValue(value) {
        const {pickList} = this.props;
        const pick = find(pickList, {value});
        return pick ? pick.code : pick;
    },
    _getValueFromCode(code, pickList=this.props.pickList) {
        const pick = find(pickList, {code});
        return pick ? pick.value : '';
    },
    getValue() {
        const {value} = this.state;
        return this._getCodeFromValue(value);
    },
    _onInputBlur() {
        const {value} = this.state;
        const {validate} = this.props;
        const code = this._getCodeFromValue(value);
        if (!code && validate && !this._isSelecting) {
            this.setState({value: ''});
        }
        this._isSelecting = false;
    },
    _onInputChange(event) {
        const {value} = event.target;
        this.setState({value});
    },
    _renderEdit() {
        let {value} = this.state;
        let {_onInputBlur, _onInputChange} = this;
        return (
            <input onBlur={_onInputBlur} onChange={_onInputChange} ref='input' value={value}/>
        );
    },
    _renderConsult() {
        let {value} = this.state;
        return (
            <span>{value}</span>
        );
    },
    render() {
        let {isEdit} = this.props;
        let {_renderEdit, _renderConsult} = this;
        return (
            <div data-focus='autocomplete'>
                {isEdit && _renderEdit()}
                {!isEdit && _renderConsult()}
            </div>
        );
    }
};

module.exports = builder(Autocomplete);
