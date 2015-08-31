# Page affichant une liste #
## Elle gère toute seule la pagination ;) ##

###Etape 1 : 
Se créer une ligne qui recevra un objet (paramLine.jsx) Un peu comme ça :
```javascript
module.exports  = React.createClass({
    mixins: [FocusComponents.list.table.line.mixin],
    definitionPath: 'monObjet',
    renderLineContent: function(data){
        return (
            <tr onClick={this.props.onLineClick}>
                <td>{this.textFor("libelle", {})}</td>
                <td>{this.textFor("description", {})}</td>
                <td>{this.textFor("valeur", {})}</td>
            </tr>
        );
    }
});
```

###Etape 2:
On prépare le terrain avec le store et le service associés à la liste.
Le fichier service/js :
```javascript
let URL = require('../../config/server/parametreApplicatif');
let fetch = Focus.network.fetch;
module.exports = {
    getAllObjet(){
        return fetch(URL.getAllObjects()).then((data)=>{ return {dataList: data}});
    },
};
```
La promesse en fin d'url permet ici de transformer le tableau Json en un seul objet dataList. Necessaire pour que la pageList puisse traiter les données.

Et le store.js :
```javascript
module.exports = new Focus.store.ListStore({identifier: 'MESSAGEACCUEIL'});
```
l'identifiant est pas significatif mais nécessaire !
On note la différence par rapport au stores classiques : c'est un ListStore!

###Etape 3:
La page de liste (index.jsx).
On inclue nos deux premières étapes :
```javascript
let ParamLine = require('./paramLine');
const store = require('stores/objectList');
const services = require('../../../services').administration.getAllObjects;
```
On défini les paramètre de la page (Ici les paramètres classiques avec un handler au clic) :
```javascript
//Creates the props for the page.
const listPageProps = {
        onLineClick: function onLineClick(line) {
            console.info("On gère un clic sur la ligne !");
        },
        lineComponent: ParamLine,
        store: storeList,
        service: serviceList
    };
```
Enfin on créé la liste avec ses paramètre pour l'experter!
```javascript
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
