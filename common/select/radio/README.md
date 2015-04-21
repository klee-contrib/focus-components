## Technical Configuration
Affichage d'une liste de selection en mode radio bouton.

## Attributes
<table>
	<thead>
        <tr>
            <th>Attribute</th>
            <th>Options</th>
            <th>Possible</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>type</code></td>
            <td><i>string</i></td>
            <td><code>text</code>,<code>date</code>, <code>hour</code></td>
            <td><code>text</code></td>
            <td>Desription of the attribute.</td>
        </tr>
        <tr>
            <td><code>value</code></td>
            <td><i>string</i>,<i>number</i></td>
            <td><code>texte</code></td>
            <td></td>
            <td>La valeur sélectionnée.</td>
        </tr>
        <tr>
            <td><code>values</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>Valeur de selection possible pour la liste.</td>
        </tr>
        <tr>
            <td><code>valueKey</code></td>
            <td><i>string</i></td>
            <td><code>text</code></td>
            <td><code>value</code></td>
            <td>Nom de l'attribut correspondant à la valeur dans la liste.</td>
        </tr>
        <tr>
            <td><code>labelKey</code></td>
            <td><i>string</i></td>
            <td></td>
            <td><code>label</code></td>
            <td>Nom de l'attribut correspondant au libellé dans la liste.</td>
        </tr>
         <tr>
            <td><code>name</code></td>
            <td><i>string</i></td>
            <td><code>text</code></td>
            <td></td>
            <td>Nom de l'attribut sur lequel porte la liste de selection.</td>
        </tr>
         <tr>
            <td><code>style</code></td>
            <td><i>object</i></td>
            <td><code>{className:"radio"}</code></td>
            <td><code>{}</code></td>
            <td>Style à appliquer sur la liste de sélection.</td>
        </tr>
   </tbody>
</table>

## Methods
<table>
	<thead>
		<tr>
          <th>Method</th>
          <th>Parameters</th>
          <th>Returns</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td><code>getValue()</code></td>
          <td>aucun.</td>
          <td><i>string</i></td>
          <td>Récupérer la valeur sélectionnée dans la liste de sélection</td>
      </tr>
   </tbody>
</table>

## Events
<table>
	<thead>
		<tr>
          <th>Event</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td><code>onChange</code></td>
          <td>Evènement levé lorsque la liste change de valeur sélectionnée.</td>
      </tr>
   </tbody>
</table>

## Structure
- div
- label
- input radio

## Example
[Exemple de select-radio](https://github.com/KleeGroup/focus-components/blob/master/common/select/radio/example/index.html)
## Test
todo
## Demo
[Démo de select-radio](http://kleegroup.github.io/focus-components/common/select/radio/example/)
