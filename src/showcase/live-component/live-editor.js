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
        },
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
            <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={mainStyle}>
                  <div className="mdl-card__title" style={style.title} onClick={this._toggleVisible}>
                    <h2 className="mdl-card__title-text">Component &nbsp; {name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; v {version}</h2>
                  </div>
                      <div className="mdl-card__supporting-text" style={isVisible ? null : {textAlign: 'center'}}>
                        {isVisible ?
                          <CodeEditor editorProps={{$blockScrolling: 'Infinity'}} mode='jsx' name='codeEditor' onChange={onChange} theme='github' value={code}/>
                          :
                          <div>
                            <div>{code.slice(0,100)} ...</div>
                            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onClick={this._toggleVisible}>
                              <i className="material-icons">code</i>
                            </button>
                            <p>Click on the button to display the code panel ...</p>
                          </div>
                        }
                      </div>
                  {isVisible &&
                      <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                          You can change the code, the results will be live on the page...
                        </a>
                      </div>
                  }
                  <div className="mdl-card__menu">
                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onClick={this._toggleVisible}>
                      <i className="material-icons" style={{color: 'white'}}>code</i>
                    </button>
                  </div>
            </div>
        );
    }
});

module.exports = LiveEditor;
