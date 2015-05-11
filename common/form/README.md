# Form mixin

The purpose of the `formMixin` is to be able to create HTML forms.

Le mixin de form n'est pas un composant autosuffisant, il faut nécessairement redéfinir certaines methodes et certaines propriétés afin de le faire fonctionner correctement.

## Properties

Le composant de formulaire a plusieurs propriétés.
- hasEdit : j'ai un mode edit ou pas
- isEdit: par défaut est ce que je suis en !mode edit ou pas
- style : permet de définir le style css du composant.

## Attributs

Afin de fonctionner il est nécessaire de définir certains attributs, en voici la liste ainsi que leur siginification.


### referenceNames

`referenceNames` est un tableau contenant l'ensemble des listes de référence à charger dans l'application.

### Actions

En fonction des actions dont vous avez besoin il faut les donner les références à vos actions dans l'object `action`.
Par défaut certaines actions sont prévues pour être appellées automatiquement lors des clicks sur les boutons `buttonSave` et à l'initialisation de la page: `callMountedActions` qui appelle automatiquement le chargement de l'objet et le chargement des listes de références.

```javascript
{
  action: {
    save: yoursaveFunction,
    load: yourLoadFunction,
    delete: yourDeleteFunction
  }
}
```

### Stores

Une vue de type formulaire peut avoir plusieurs stores, leur configuration est très simple.
Elle suit le model suivant:

```javascript
{
  stores: [{
    store: yourStoreInstance, properties: ['propertyOne']
  }]
}
```

## Methods

- validate: valide tous les composants fils de la vue.
- fieldFor: Crée un champ correspondant au domaine dans un mode correspondant au mode edit ou non..
- buttonSave: Crée un bouton sauvegarde
- buttonCancel: Crée un bouton annuler
- buttonEdit: Crée un bouton edition

## Exemple

Ce que je dois définir pour que ca fonctionne:

```javascript
var MaSousVue = React.createClass({displayName: "Form",
  mixins: [formMixin],
  //Je présume que le store existe déjà
  stores: [{
    store: contactStore,
    properties: ["contact"]
  }],
  definitionPath: "contact",
  //Fausses actions
  action: {
    load: function(){
      Promise.resolve({contact: {firstName: "pierre", lastName: "besson"}}).then(
        function(data){
        Focus.dispatcher.handleServerAction({
          data: data,
          type: "update"
        });
      });
  }, save: function(data){
    return Promise.resolve(data).then(function(d){Focus.dispatcher.handleServerAction({
      data: data,
      type: "update"
    });})
  }},
  referenceNames: ['papas'],
  renderContent:function renderUserDetail(){
    return React.createElement(Block, {title: "Fiche de l'utilisateur"},
        this.fieldFor("firstName"),
        this.fieldFor("lastName"),
        this.fieldFor("bio"),
        this.fieldFor("isCool"),
        this.fieldFor("isNice"),
        this.selectFor('papaCode', 'papas')
   );
  }
});

```
Attention ce morceau de vue doit être une portion d'une vue composite. Chaque Block est indépendant.
```
vue/
  index.jsx //La vue Principale regroupant les sous vues.
  sousVue.jsx // Un block de la vue
  sousVue2.jsx // Un autre block de la vue
  sousVue3.jsx // Un autre block de la vue
```

Le fichier `index.jsx` doit ressembler à ça:
```javascript
var SousVue1 = require('./sousVue1');
var SousVue2 = require('./sousVue2');

var StickyNavigation = Focus.components.common.stickyNavigation.component;

module.exports = React.createClass({
    render: function renderMovieView() {
        return (
            <div className="movieView">
                <StickyNavigation contentSelector="body"/>
                <SousVue1 id={this.props.id}/>
                <SousVue2 id={this.props.id} style={{className: 'cartridgeCss'}}/>
            </div>
        );
    }
});
```

## Code avancé

Le mixin de formulaire est divisé en sous mixin afin de clarifier les responsabilités et éventuellement de pouvoir surcharger une partie dans le cadre d'un projet. Les mixins sont dans le répertoire `mixin`.
La composition est la suivante:
- `action-behaviour`: Le mixin regroupant l'appel aux différentes actions de la page.
- `reference-behavious` : Le mixin automatisant l'appel aux éléments du store.
- `built-in-components` : Regroupe l'ensemble des composant générables automatiquement par le formulaire. `fieldFor`, ...

Certains mixins faisaient parti du store initialement mais ils sont devenus plus globaux. Ils sont maintenant dans common/mixin.
- `store-behaviour` : regroupe l'automatisation de l'enregistrement aux callBack de modification du store.

## Tricks

Afin de pouvoir changer la valeur des composants de type input, select, il faut que ces derniers aient la value dans leur state propre: voir [doc react form](https://facebook.github.io/react/docs/forms.html).
