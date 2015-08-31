=== Popin

=== Utilisation simple
Le composant de Popin a pour but de découpler complètement la popin de son contenu.

```jsx
let MySuperContent = require('./myComponent');
React.createClass({
  _openPopin(){
    this.refs.myPopin.togglePopin();
  },
  render(){
    <div>
      <Button type='button' label='open' onCLick={this._openPopin}/>
      <Popin ref='myPopin' type='from-right' modal={false}>
        <MySuperContent />
      </Popin>
    <div>
  }
}
```

Différentes options :
* modal : false pour une popin modal (le fond n'est pas clickable) !
* size : taille de la popin ('small', 'medium', 'large')
* type : 'from-menu', 'from-right' ou 'full'
* overlay : fond grisé ou non 

======================================================================================================
=== Cas de la Popin dont le contenu change suite à une action sur le premier composant :
(a.k.a. la popin de création avec un composant de création qui bascule sur le composant de détail une fois la création terminée.)

1) C'est le parent qui ouvre la popin en imbriquant le contenu, et on ne peut donc plus le changer depuis le composant rendu dans la popin !
--> Il est donc nécessaire que le contenu de la Popin ne soit ni le composant de création, ni le composant de détail mais un composant qui va gérer le dispatch.
<Popin ref='popin' type='from-right' modal={false}>
	<ComposantDispatch />
</Popin>

2) Le ComposantDispatch doit rendre le composant de création ou le composant de Détail selon que l'on est encore en cours de création ou que l'on a obtenu un identifiant.
```jsx	
render() {
	if (this.state && this.state.isCreate) {
		return (
			<UtilisateurDetail id={this.state.id} />
		);
	} else {
		return (
			<UtilisateurCreation hasLoad={false} isEdit={true} .../>
		);
	}
}
```

3) Ensuite il faut que le composant de Creation soit capable de changer le state du ComposantDispatch, afin que le rendu de ce dernier soit recalculé lorsqu'il doit afficher le détail.
Pour cela, le ComposantDispatch passe, en props, une fonction de mise à jour au composant de création (UtilisateurCreation pour l'exemple) :

```jsx
changeMode(id) {
	this.setState({isCreate: true, id: id});
}
```
```jsx
<UtilisateurCreation hasLoad={false} isEdit={true} changeMode={this.changeMode}/>
```

4) Le composant de création appelle cette fonction lorsque la sauvegarde est ok. 
Par exemple en redéfinissant la fonction "displayMessageOnChange" sur le composant de création. (Cette fonction est appellée par le "afterChange" du composant, donc uen fois la sauvegarde bien exécutée)

```jsx
displayMessageOnChange(changeInfos) {
    if (changeInfos && changeInfos.status && changeInfos.status.name) {
        switch (changeInfos.status.name) {
            case 'created':
                if (utilisateurStore.getUtilisateur()) {
                    this.props.changeMode(utilisateurStore.getUtilisateur().utiId);
                }
                break;
            default:
                break;
        }
    }
}
```

======================================================================================================
=== Popin liste : Cas de la liste d'éléments dont chaque détail s'affiche au clic dans une popin :

On serait tenté de placer le <Popin><Detail...></Popin> dans le composant ligne pour l'ouvrir sur un clic, mais si le composant de détail a besoin d'un "form" (pour charger/éditer par exemple), le form se retrouve imbriqué dans le form de la list... Et l'imbrication de form n'est pas recommandée !
Par conséquent, il est de bon gout de placer la Popin à côté de la List, dans un composant parent.

```jsx
<div>
	<Popin ref="editPopin" type='from-right'>
		<EditParamView id={currentParamId} isEdit={true}/>
	</Popin>
	<SmartList {...this._getListPageProps()} />
</div>
```

puis de gérer son ouverture...

TODO : finir la description de ce cas.