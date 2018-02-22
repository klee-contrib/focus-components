=== Popin

Le composant de Popin a pour but de cdécoupler complètement la popin de son contenu.

```jsx
let MySuperContent = require('./myCOmponent');
React.createClass({
  _openPopin(){
    this.refs.myPopin.togglePopin();
  },
  render(){
    <div>
      <Button type='button' label='open' onCLick={this._openPopin}/>
      <Popin ref='myPopin' type='from-right'>
        <MySuperContent />
      </Popin>
    <div>
  }
}

```
