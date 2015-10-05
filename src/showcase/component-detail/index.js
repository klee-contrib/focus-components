//dependencies
import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import hjs from 'highlight.js';
const types = require('focus-core').component.types;
const liStyle = { flex: 1, minWidth: '20%', marginTop: '7px', marginRight: '7px'};

/**
 * Component describing a component.
 */
class ComponentDetail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        hjs.highlightBlock(ReactDOM.findDOMNode(this.refs.code));
    }
    /** @inheriteDoc */
    render() {
        const {name, description, example, photo, keywords, version, code} = this.props;
        return (
            <div>
                    <h1>{name}</h1><h3>{version}</h3>
                    <button
                        className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'
                        onClick={()=>{Backbone.history.navigate(`component/${name}/detail`, true)}}
                        style={{position: 'absolute', top: '100px', right: '50px', width: '100px', height: '100px'}}
                    >
                       <i className="material-icons">code</i>
                    </button>
                    <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                    <div className="mdl-card mdl-cell mdl-cell--12-col">
                      <div className="mdl-card__supporting-text">
                        <h4>Description</h4>
                            {description}
                      </div>
                      <div className="mdl-card__actions">
                        <a href="#" className="mdl-button">View the code</a>
                      </div>
                    </div>
                  </section>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                            <header className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
                              <i className="material-icons">play_circle_filled</i>
                            </header>
                            <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                              <div className="mdl-card__supporting-text">
                                <h4>Tags</h4>
                                {keywords.slice(0, 2).map((tag) => <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' style={{margin: '10px'}}>{tag}</button>)}
                              </div>
                              <div className="mdl-card__actions">
                                <a href="#" className="mdl-button">See all tags</a>
                              </div>
                            </div>

                </section>
                <br />
                <br />
                <br />
                <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                  <div className="mdl-card__supporting-text">
                    <h4>Example code</h4>
                    <pre ref='code'>
                        <code className='javascript'>{code}</code>
                    </pre>
                  </div>
                  <div className="mdl-card__actions">
                    <button onClick={()=>{Backbone.history.navigate(`component/${name}/detail`, true)}} className="mdl-button">Play with the code</button>
                  </div>
                </div>
              </section>

            </div>
        );
    }
}

//Static props.
ComponentDetail.displayName = 'ComponentDetail';
ComponentDetail.defaultProps = {};
ComponentDetail.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('string'),
    photo: types('string'),
    name: types('string')
};

module.exports = ComponentDetail;
