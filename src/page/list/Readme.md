

```javascript
let ParamLine = require('./paramLine');


// Stores
const store = require('stores/parametreTechniqueList');
const services = require('../../../services').administration.getAllParametreTechnique;
    //Creates the props for the page.
const listPageProps = {
        onLineClick: function onLineClick(line) {
            console.info("Ouverture de popin !!!!");
            this.refs.EditPopin.toggleOpen();
        },
        lineComponent: ParamLine,
        store: store,
        service: services

    };

const SmartList = FocusComponents.page.list.component;
  
    module.exports = React.createClass({
        displayName: 'AdministrationList',
        render(){
            return (
                <div>
                    <h2>Paramètres Techniques</h2>
                    <SmartList {...listPageProps} />
                </div>
            );
        }
    })

```
