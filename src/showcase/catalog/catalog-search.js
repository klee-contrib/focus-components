//dependencies
const React = require('react');
const ReactDOM = require('react-dom');
const {Component} = React;
const types = require('focusjs').component.types;
const {dispatcher} = require('focusjs');
/**
 * Component describing a component.
 */
class ComponentSearch extends Component{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getStateFromStore = this.getStateFromStore.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this.state = {criteria: {query: null}};
    }
    getStateFromStore(){
        const {store} = this.props;
        return store.getValue();
    }
    componentWillMount(){
        const {store} = this.props;
        store.addCriteriaChangeListener(()=> this.getStateFromStore());
    }
    componentWillUnMount(){
        const {store} = this.props;
        store.removeCriteriaChangeListener(()=> this.getStateFromStore());
    }
    _handleOnChange(){
        const {store} = this.props;
        const query = ReactDOM.findDOMNode(this.refs.input).value;
        //Dispatch the new criteria value..
        dispatcher.handleViewAction({
               data: {criteria: {query}},
               type: 'update',
               identifier: store.identifier
        });
    }
    /** @inheriteDoc */
    render(){
        const {criteria} = this.state;
        const {query} = criteria;
        return (
            <form action="#">
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--expandable'>
                <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor='search-catalog'>
                  <i className='material-icons'>search</i>
                </label>
                <div className='mdl-textfield__expandable-holder'>
                  <input className='mdl-textfield__input' id='search-catalog' onChange={this._handleOnChange} ref='input' type='text' value={query}/>
                  <label className='mdl-textfield__label' htmlFor='search-expandable'>Expandable search</label>
                </div>
              </div>
            </form>
        );
    }
}

//Static props.
ComponentSearch.displayName = 'ComponentSearch';
ComponentSearch.defaultProps = {};
ComponentSearch.propTypes = {
    store: types('func').isRequired
};

module.exports = ComponentSearch;
