Ce mixin a pour but de servir de base aux pages 'composites'.

Il permet aux utilisateurs de Framework de définir l'entête.

Dans la structure d'un détail il y a les éléments suivants:
```html
__views
  __ficheDetail
    index.js(x) => Ce fichier doit récupérer le mixin de détail.
    __blocDetail1 => Répertoire qui récupère le mixin de form  (souvent)
    __blocDetail2 => Un autre block du formulaire.
```

Le mixin attend que le composant définisse une entête (summary et une vri entête)
```javascript
cartridgeConfiguration = {
  summary: {component: "A React Component"},
  cartridge: {component: "A React Component"}
};
```
