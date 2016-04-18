## Configuration Technique
Affichage d'une liste de selection en mode radio bouton.

## Attributs
<table>
	<thead>
        <tr>
            <th>Attribut</th>
            <th>Type</th>
            <th>Valeurs possibles</th>
            <th>Valeur par default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
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

## Méthodes
<table>
	<thead>
		<tr>
          <th>Méthode</th>
          <th>Paramètres</th>
          <th>Retour</th>
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

## Evènements
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

## Exemple
[Exemple de select-radio](https://github.com/KleeGroup/focus-components/blob/master/common/select/radio/example/index.html)
## Test
todo
## Démo
[Démo de select-radio](http://kleegroup.github.io/focus-components/common/select/radio/example/)
