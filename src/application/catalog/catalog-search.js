//dependencies
const React = require('react');
const {Component} = React;
const types = require('focus').component.types;
const {dispatcher} = require('focus');
/**
 * Component describing a component.
 */
class ComponentSearch extends Component{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getStateFromStore = this.getStateFromStore.bind(this);
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
    _handleOnClick(){
        const {store} = this.props;
        const query = React.findDOMNode(this.refs.input).value;
        dispatcher.handleViewAction({
               data: {criteria: {query}},
               type: 'update',
               identifier: store.identifier
        });
    }
    /** @inheriteDoc */
    render(){
        return (
            <form action="#">
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--expandable'>
                <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor='search'>
                  <i className='material-icons'>search</i>
                </label>
                <div className='mdl-textfield__expandable-holder'>
                  <input className='mdl-textfield__input' id='search' onClick={this._handleOnClick} ref='input' type='text'/>
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
    store: types('function').isRequired
};

module.exports = ComponentSearch;
