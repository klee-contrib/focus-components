// Dependencies
const React = require('react');
const {types} = require('focus-core').component;
require('brace');
require('brace/mode/jsx');
require('brace/theme/github');

// Components

const CodeEditor = require('react-ace');

const LiveEditor = React.createClass({
    displayName: 'LiveEditor',
    getInitialState(){
        return {isVisible: true};
    },
    style: {
        title: {
            color: '#fff',
            height: 70,
            'background-color':'rgb(33, 150, 243)'
        }
    },
    propTypes: {
        code: types('string'),
        onChange: types('func'),
        style: types('object')
    },
    _toggleVisible(){
        this.setState({isVisible: !this.state.isVisible});
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render() {
        const {code, name, onChange, style: mainStyle, version} = this.props;
        const {isVisible} = this.state;
        const {style} = this;
        return (
            <div className='demo-card-wide mdl-card mdl-shadow--2dp' data-focus='showcase-live-editor' style={mainStyle}>
                <div className='mdl-card__title' style={style.title} onClick={this._toggleVisible}>
                    <h2 className='mdl-card__title-text'>Component &nbsp; {name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; v {version}</h2>
                </div>
                {isVisible &&
                    <div className='mdl-card__supporting-text' style={{width: '100%'}}>
                        <CodeEditor editorProps={{$blockScrolling: 'Infinity'}} mode='jsx' name='codeEditor' onChange={onChange} theme='github' value={code} width='100%'/>
                        <div style={{fontSize: '1.8em', color: 'rgb(33, 150, 243)', marginTop: '15px'}}>
                            This code is live reloaded, feel free to play with it !
                        </div>
                        <button className='mdl-button mdl-js-button mdl-button--fab mdl-button--colored' onClick={() => {window.location.reload()}} style={{position: 'fixed', right: '10px', bottom: '10px', backgroundColor: 'red'}}>
                            <i className='material-icons' style={{color: 'white'}}>sync_problem</i>
                        </button>
                    </div>
                }
                <div className='mdl-card__menu'>
                    <button className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect' onClick={this._toggleVisible}>
                        <i className='material-icons' style={{color: 'white'}}>{`expand_${isVisible ? 'more' : 'less'}`}</i>
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = LiveEditor;
