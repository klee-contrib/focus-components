## Configuration Technique
Affichage d'une liste de selection multiple en mode checkbox.

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
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>La liste des valeurs sélectionnées.</td>
        </tr>
        <tr>
            <td><code>values</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>Valeurs de selection possibles pour la liste.</td>
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
          <td>Récupérer la liste des valeurs sélectionnées dans la liste de sélection</td>
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
	- input checkbox
		- label

